import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, Renderer2, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { DrawerMode } from '../../models/drawermode.type';
import { DrawerPosition } from '../../models/drawerposition.type';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion'
import { DrawerService } from '../../services/drawer/drawer.service';
import { UtilsService } from '../../services/utils/utils.service';

@Component({
  selector: 'drawer',
  imports: [],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.sass',
})
export class DrawerComponent {
  static ngAcceptInputType_fixed: BooleanInput
  static ngAcceptInputType_opened: BooleanInput
  static ngAcceptInputType_transparentOverlay: BooleanInput

  @Input() fixed: boolean = false
  @Input() mode: DrawerMode = 'side'
  @Input() name: string = ''
  @Input() opened: boolean = false
  @Input() position: DrawerPosition = 'left'
  @Input() transparentOverlay: boolean = false
  @Output() readonly fixedChanged: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() readonly modeChanged: EventEmitter<DrawerMode> = new EventEmitter<DrawerMode>()
  @Output() readonly openedChanged: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() readonly positionChanged: EventEmitter<DrawerPosition> = new EventEmitter<DrawerPosition>()

  private _animationsEnabled: boolean = false
  private _hovered: boolean = false
  private _overlay!: HTMLElement | null
  private _animation!: Animation | null

  constructor(
    private _elementRef: ElementRef,
    private _renderer2: Renderer2,
    private _DrawerService: DrawerService,
    private _UtilsService: UtilsService,
    private _cdr: ChangeDetectorRef
  ) {}


  @HostBinding('class') get classList(): any {
    return {
      'drawer-animations-enabled'         : this._animationsEnabled,
      'drawer-fixed'                      : this.fixed,
      'drawer-hover'                      : this._hovered,
      [`drawer-mode-${this.mode}`]        : true,
      'drawer-opened'                     : this.opened,
      [`drawer-position-${this.position}`]: true
    }
  }

  @HostBinding('style') get styleList(): any {
    return {
      'visibility': this.opened ? 'visible' : 'hidden'
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    if ( 'fixed' in changes ) {
      this.fixed = coerceBooleanProperty(changes['fixed'].currentValue)
      this.fixedChanged.next(this.fixed)
    }

    if ( 'mode' in changes ) {
      const previousMode = changes['mode'].previousValue
      const currentMode = changes['mode'].currentValue

      // Disable the animations
      this._disableAnimations()

      // If the mode changes: 'over -> side'
      if ( previousMode === 'over' && currentMode === 'side' ) {
        this._hideOverlay()
      }

      // If the mode changes: 'side -> over'
      if ( previousMode === 'side' && currentMode === 'over' ) {
        if ( this.opened ) {
          this._showOverlay()
        }
      }

      // Execute the observable
      this.modeChanged.next(currentMode)

      // Enable the animations after a delay
      setTimeout(() => {
        this._enableAnimations()
      }, 500)
    }

    // Opened
    if ( 'opened' in changes ) {
      const open = coerceBooleanProperty(changes['opened'].currentValue)
      this._toggleOpened(open)
    }

    // Position
    if ( 'position' in changes ) {
      this.positionChanged.next(this.position);
    }

    // Transparent overlay
    if ( 'transparentOverlay' in changes ) {
      this.transparentOverlay = coerceBooleanProperty(changes['transparentOverlay'].currentValue);
    }
  }

  /**
   * On init
   */
  ngOnInit(): void {
    this._DrawerService.registerComponent(this.name, this)
  }

  ngOnDestroy(): void {
    if ( this._animation ) {
      this._animation.cancel()
    }
    this._DrawerService.deregisterComponent(this.name)
  }

  open(): void {
    if ( this.opened ) {
      return
    }
    this._toggleOpened(true)
  }

  close(): void {
    if ( !this.opened ) {
      return
    }
    this._toggleOpened(false)
  }

  toggle(): void {
    if ( this.opened ) {
      this.close()
    } else {
      this.open()
    }
  }

  private _enableAnimations(): void {
    if ( this._animationsEnabled ) {
      return
    }
    this._animationsEnabled = true;
  }

  private _disableAnimations(): void {
    if ( !this._animationsEnabled ) {
      return
    }
    this._animationsEnabled = false
  }

  private _showOverlay(): void {
    this._overlay = this._renderer2.createElement('div')
    if ( !this._overlay ) {
      return;
    }
    this._overlay.classList.add('drawer-overlay')
    
    // Set z-index to be below the drawer (110) but above everything else
    this._renderer2.setStyle(this._overlay, 'z-index', '105')

    if ( this.fixed ) {
      this._overlay.classList.add('drawer-overlay-fixed')
    }

    if ( this.transparentOverlay ) {
      this._overlay.classList.add('drawer-overlay-transparent')
    }

    // Insert overlay before the drawer element to ensure proper stacking
    const parent = this._elementRef.nativeElement.parentElement
    this._renderer2.insertBefore(parent, this._overlay, this._elementRef.nativeElement)

    // Add click listener before animation
    this._overlay.addEventListener('click', (event: Event) => {
      this.close()
      this._cdr.markForCheck()
    })
    
    console.log('Overlay created with z-index:', this._overlay.style.zIndex)

    this._animation = this._overlay.animate([
      { opacity: 0 },
      { opacity: 1 }
    ], {
      duration: 300,
      easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
      fill: 'forwards'
    });

    this._animation.onfinish = () => {
      this._animation = null
    };
  }

  private _hideOverlay(): void {
    if ( !this._overlay ) {
      return
    }

    this._animation = this._overlay.animate([
      { opacity: 1 },
      { opacity: 0 }
    ], {
      duration: 300,
      easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
      fill: 'forwards'
    });

    this._animation.onfinish = () => {
      this._animation = null

      if (this._overlay) {
        this._overlay.parentNode?.removeChild(this._overlay)
        this._overlay = null
      }
    };
  }

  private _toggleOpened(open: boolean): void {
    this.opened = open
    this._enableAnimations()

    if ( this.mode === 'over' ) {
      if ( open ) {
        this._showOverlay()
      } else {
        this._hideOverlay()
      }
    }
    this.openedChanged.next(open)
  }
}

