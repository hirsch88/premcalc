import { APP_INITIALIZER, ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { TranslocoService, provideTransloco } from '@ngneat/transloco';
import { BalConfigService, provideBaloiseDesignSystem } from '@baloise/ds-angular';
import { initializeI18n } from './i18n.initialize';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['de', 'fr', 'it', 'en'],
        defaultLang: 'de',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader
    }),
    provideBaloiseDesignSystem({
      defaults: {
        region: 'CH',
      },
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeI18n,
      multi: true,
      deps: [TranslocoService, BalConfigService],
    },
  ],
};
