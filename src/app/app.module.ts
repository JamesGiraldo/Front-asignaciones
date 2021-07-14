import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// modulos
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';

/** componente nofound */
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
