import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'category', component: CategoryComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WordRoutingModule { }
