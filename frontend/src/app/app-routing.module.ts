import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SettingsComponent } from './settings/settings.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [{path : '', redirectTo:'home', pathMatch:'full'},
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
