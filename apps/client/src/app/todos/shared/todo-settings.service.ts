import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { scan } from 'rxjs/operators';

export interface TodoSettingsOptions {
  isPollingEnabled: boolean;
}

@Injectable()
export class TodoSettings {
  private settings$$ = new BehaviorSubject<Partial<TodoSettingsOptions>>({
    isPollingEnabled: true
  });

  settings$ = this.settings$$.pipe(
    scan((prev, next) => ({ ...prev, ...next }))
  );

  update(updates: Partial<TodoSettingsOptions>) {
    this.settings$$.next(updates);
  }
}
