import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../../../models';

@Pipe({
  name: 'pinned'
})
export class PinnedPipe implements PipeTransform {
  transform(todos: Todo[]): Todo[] {
    if (!Array.isArray(todos)) {
      return [];
    }

    return todos.filter(todo => todo.isPinned);
  }
}
