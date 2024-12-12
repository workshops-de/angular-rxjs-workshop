import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'dos-root',
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>\n'
})
export class AppComponent {}
