import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dos-todos-api-error',
  template: `
    <h3>Sorry</h3>
    <ul>
      <li>The server crashed.</li>
      <li>There is a 50:50 chance that requests succeed.</li>
      <li>Please reload the page.</li>
    </ul>
  `,
  styles: [
    `
      :host {
        font-family: 'Roboto', sans-serif;
        padding: 8px;
        background-color: #ed4337;
        color: #ffffff;
      }
    `
  ]
})
export class TodosApiErrorComponent {}
