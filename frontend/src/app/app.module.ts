import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { OrdersComponent } from './components/orders/orders.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReportsComponent } from './components/reports/reports.component';
import { LandingComponent } from './components/landing/landing.component';
import { MystoresComponent } from './components/mystores/mystores.component';
import { FormsModule } from '@angular/forms';
import { ViewallComponent } from './components/viewall/viewall.component';
import { ViewtypesComponent } from './components/viewtypes/viewtypes.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrdersComponent,
    FavoritesComponent,
    SettingsComponent,
    NavbarComponent,
    ReportsComponent,
    LandingComponent,
    MystoresComponent,
    ViewallComponent,
    ViewtypesComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
