import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {DownloadComponent} from './download/download.component';
import {ResourcesComponent} from './resources/resources.component';
import {ContactComponent} from './contact/contact.component';

import { WordinessComponent } from './resources/wordiness/wordiness.component';
import { TransitionsComponent } from './resources/transitions/transitions.component';
import { GrammarComponent } from './resources/grammar/grammar.component';
import { EggcornsComponent } from './resources/eggcorns/eggcorns.component';

const routes: Routes = [
  {
    path:'',
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
  },
  {
    path:'resources/wordiness',
    component:WordinessComponent
  },
  {
    path:'resources/transitions',
    component:TransitionsComponent
  },
  {
    path:'resources/grammar',
    component:GrammarComponent
  },
  {
    path:'resources/eggcorns',
    component:EggcornsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
