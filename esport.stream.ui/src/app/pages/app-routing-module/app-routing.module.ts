import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StreamListComponent } from '../stream-list/stream-list.component';
import { StreamComponent } from '../stream-component/stream.component';
import { EditStreamComponent } from '../edit-stream/edit-stream.component';
import { RecordedStreamsComponent } from '../recorded-streams/recorded-streams.component';



const routes: Routes = [
  {
    path: 'streams',
    component: StreamListComponent,
    pathMatch: 'full'
  },
  {
    path: 'records',
    component: RecordedStreamsComponent,
    pathMatch: 'full'
  },
  {
    path: "streams/:id",
    component: StreamComponent,
    pathMatch: 'full'
  },
  {
    path: "add",
    component: EditStreamComponent,
    pathMatch: 'full'
  },
  {
    path: "edit/:id",
    component: EditStreamComponent,
    pathMatch: 'full'
  },
  {
    path:'',
    redirectTo: '/streams',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
