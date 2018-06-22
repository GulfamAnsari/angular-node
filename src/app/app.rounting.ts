import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import {LoginComponent} from './login/login.component';
import {DashboardComponent } from './dashboard/dashboard.component'
export const appRoutes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { useHash: false })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}