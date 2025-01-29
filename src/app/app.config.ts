import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import MyPreset from './mypreset';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), providePrimeNG({
    theme: {
      preset: MyPreset,
      options: {
        darkModeSelector: false || 'none'
      }
    }
  }), provideHttpClient(), MessageService]
};
