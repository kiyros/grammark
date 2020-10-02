import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {DownloadComponent} from './download/download.component';
import {ResourcesComponent} from './resources/resources.component';
import {ContactComponent} from './contact/contact.component';



const routes: Routes = [
  {
    path:'home',
    pathMatch: 'full',
    component:HomeComponent
  },
  {
    path:'about',
    component:AboutComponent
  },
  {
    path:'download',
    component:DownloadComponent
  },
  {
    path:'resources',
    component:ResourcesComponent
  },
  {
    path:'contact',
    component:ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
