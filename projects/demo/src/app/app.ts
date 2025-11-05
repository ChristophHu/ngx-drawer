import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DrawerComponent } from '../../../ngx-drawer/src/public-api';
import { IconsComponent } from '@christophhu/ngx-icons';

@Component({
  selector: 'app-root',
  imports: [
    DrawerComponent,
    IconsComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App implements AfterViewInit {
  // @ViewChild('settingsDrawer') settingsDrawer!: ElementRef<any>
  // divEl: HTMLElement | null = null
  // open: boolean = false

  ngAfterViewInit(): void {
    // console.log('settingsDrawer', this.settingsDrawer)
    // this.divEl = this.settingsDrawer.nativeElement
  }
  // format() {
  //   if (this.open) {
  //     this.divEl?.classList.remove('mr-0')
  //     this.divEl?.classList.add('-mr-96')
  //     this.open = false
  //   } else {
  //     this.divEl?.classList.remove('-mr-96')
  //     this.divEl?.classList.add('mr-0')
  //     this.open = true
  //   }
  // }
}
