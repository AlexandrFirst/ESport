import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StreamListComponent } from '../stream-list/stream-list.component';
import { StreamComponent } from '../stream-component/stream.component';



const routes: Routes = [
  {
    path: 'streams',
    component: StreamListComponent,
    pathMatch: 'prefix'
  },
  {
    path: "streams/:id",
    component: StreamComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
