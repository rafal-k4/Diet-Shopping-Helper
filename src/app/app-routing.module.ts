import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';


const routes: Routes = [
  { path: '', redirectTo: '\home', pathMatch: 'full' },
  { path: '\home', component: HomeComponent },
  { path: '\shoppinglist', component: ShoppingListComponent },
  { path: '**', redirectTo: '\home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
