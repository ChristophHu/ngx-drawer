import { Component, Input, ViewChild } from '@angular/core'
import { DrawerComponent } from '../drawer.component/drawer.component'

@Component({
  selector: 'drawer-wrapper',
  imports: [
    DrawerComponent
  ],
  templateUrl: './drawer-wrapper.component.html',
  styleUrl: './drawer-wrapper.component.sass',
})
export class DrawerWrapperComponent {
  @ViewChild('drawer') drawer: any

  @Input() fixed: boolean = false
  @Input() mode: string = 'side'
  @Input() name: string = 'drawer'
  @Input() opened: boolean = false
  @Input() position: string = 'left'
  @Input() title: string = 'Kein Titel hinterlegt'
  @Input() transparentOverlay: boolean = false
}
