import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
  .app-content {
    position: relative;
    padding-top: 3.6rem;
    padding-bottom: 96px;
    min-height: 100vh;
    background-image: linear-gradient(60deg, #fafafa 10%, #ffffff 10%, #ffffff 50%, #fafafa 50%, #fafafa 60%, #ffffff 60%, #ffffff 100%);
    background-size: 57.74px 100.00px;
  }`]
})
export class AppComponent {
  title = 'app';
}
