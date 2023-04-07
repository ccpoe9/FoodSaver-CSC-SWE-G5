import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OrdersComponent } from './components/orders/orders.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ReportsComponent } from './components/reports/reports.component';
import { LandingComponent } from './components/landing/landing.component';
import { MystoresComponent } from './components/mystores/mystores.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [{path : '', redirectTo:'landing', pathMatch:'full'},
                        {path:'landing', component:LandingComponent},
                        {path:'home', component: HomeComponent, canActivate : [AuthGuard]},
                        {path:'orders', component: OrdersComponent , canActivate : [AuthGuard]},
                        {path:'favorites', component: FavoritesComponent , canActivate : [AuthGuard]},
                        {path:'settings', component: SettingsComponent , canActivate : [AuthGuard]},
                        {path:'reports', component: ReportsComponent , canActivate : [AuthGuard]},
                        {path:'mystores', component:MystoresComponent , canActivate : [AuthGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
