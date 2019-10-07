import { Component, Input } from '@angular/core';

@Component({
  selector: 'nde-todo-counter',
  templateUrl: './todo-counter.component.html',
  styleUrls: ['./todo-counter.component.scss']
})
export class TodoCounterComponent {
  @Input() count: number;
}
