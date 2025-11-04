import { Component, signal } from '@angular/core';
import { DrawerComponent } from '../../../ngx-drawer/src/public-api';

@Component({
  selector: 'app-root',
  imports: [
    DrawerComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected readonly title = signal('demo');
}
