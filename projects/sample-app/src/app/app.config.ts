import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {ReactiveStateModule} from '../../../ng-reactive-state/src/lib/reactive-state/reactive-state.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(ReactiveStateModule.forRoot({showDevTools: true}))
  ]
};
