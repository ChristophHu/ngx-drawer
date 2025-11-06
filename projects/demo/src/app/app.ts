import { Component } from '@angular/core';
import { DrawerComponent } from '@christophhu/ngx-drawer';
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
export class App {

}
