import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'test-error',component:TestErrorComponent,data:{breadcrumb:'test-error'}},
  {path:'server-error',component:ServerErrorComponent,data:{breadcrumb:'server-error'}},
  {path:'not-found',component:NotFoundComponent,data:{breadcrumb:'not-found'}},
  {path:'shop', loadChildren:()=>import('./shop/shop.module').then(mod=> mod.ShopModule),data:{breadcrumb:'shop'}},
  {path:'**', redirectTo:'not-found' ,pathMatch:'full',data:{breadcrumb:'not-found'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
