import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatSliderModule } from '@angular/material/slider';

// modulos
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';

/** componente nofound */
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { ComponentsModule } from './components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: environment.apiv1, options: { transports: [ 'websocket' ] } };

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PagesModule,
    ComponentsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
