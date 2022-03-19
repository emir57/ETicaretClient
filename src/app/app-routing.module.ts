import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';

const routes: Routes = [
  {path:"admin",component:LayoutComponent,children:[
    {path:"customers",loadChildren:()=> import("./admin/components/customer/customer.module").then(module=>module.CustomerModule)},
    {path:"products",loadChildren:()=> import("./admin/components/products/products.module").then(module=>module.ProductsModule)},
    {path:"orders",loadChildren:()=> import("./admin/components/order/order.module").then(module=>module.OrderModule)},
    {path:"dashboard",loadChildren:()=> import("./admin/components/dashboard/dashboard.module").then(module=>module.DashboardModule)},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
