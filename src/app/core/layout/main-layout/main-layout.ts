import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeader } from '../header/app-header';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, AppHeader],
  template: `
    <app-header/>
    <main>
      <router-outlet/>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {}