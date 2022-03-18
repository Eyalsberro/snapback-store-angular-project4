import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ShopComponent } from './component/shop/shop.component';
import { OnlyloggeduserGuard } from './guards/onlyloggeduser.guard';

const routes: Routes = [
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:"shop", component: ShopComponent, canActivate:[OnlyloggeduserGuard]},
  {path:'', redirectTo:'shop',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
