import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, scan, shareReplay } from 'rxjs/operators';

export interface TodoSettingsOptions {
  isPollingEnabled: boolean;
  pollingInterval: number;
}

@Injectable()
export class TodoSettings {
  private settings$$ = new BehaviorSubject<Partial<TodoSettingsOptions>>({
    isPollingEnabled: true,
    pollingInterval: 5000
  });

  settings$ = this.settings$$.pipe(
    scan((prev, next) => ({ ...prev, ...next })),
    distinctUntilChanged(this.ensureSettingsHaveChanged),
    shareReplay(1)
  );

  update(updates: Partial<TodoSettingsOptions>) {
    this.settings$$.next(updates);
  }
  private ensureSettingsHaveChanged(
    previous: TodoSettingsOptions,
    current: TodoSettingsOptions
  ): boolean {
    return (
      previous.isPollingEnabled === current.isPollingEnabled &&
      previous.pollingInterval === current.pollingInterval
    );
  }
}
