import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OrdersComponent } from './components/orders/orders.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ReportsComponent } from './components/reports/reports.component';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [{path : '', redirectTo:'home', pathMatch:'full'},
                        {path:'landing', component:LandingComponent},
                        {path:'home', component: HomeComponent},
                        {path:'orders', component: OrdersComponent},
                        {path:'favorites', component: FavoritesComponent},
                        {path:'settings', component: SettingsComponent},
                        {path:'reports', component: ReportsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
