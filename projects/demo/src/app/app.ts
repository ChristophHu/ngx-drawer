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
  @ViewChild('settingsDrawer') settingsDrawer!: ElementRef<any>
  divEl: HTMLElement | null = null

  ngAfterViewInit(): void {
    console.log('settingsDrawer', this.settingsDrawer)
    this.divEl = this.settingsDrawer.nativeElement
  }
  format() {
    console.log('formatting drawer', this.divEl)
    this.divEl?.classList.remove('-mr-96')
    this.divEl?.classList.add('mr-0')
  }
}
