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

import { OverviewComponent } from './home/overview/overview.component';

import { PassiveVoiceFixComponent } from './home/fixes/passive-voice-fix/passive-voice-fix.component';
import { WordinessFixComponent } from './home/fixes/wordiness-fix/wordiness-fix.component';
import { AcademicStyleFixComponent } from './home/fixes/academic-style-fix/academic-style-fix.component';
import { GrammarFixComponent } from './home/fixes/grammar-fix/grammar-fix.component';
import { NominalizationsFixComponent } from './home/fixes/nominalizations-fix/nominalizations-fix.component';
import { SentencesFixComponent } from './home/fixes/sentences-fix/sentences-fix.component';
import { EggcornsFixComponent } from './home/fixes/eggcorns-fix/eggcorns-fix.component';
import { TransitionsFixComponent } from './home/fixes/transitions-fix/transitions-fix.component';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

const routes: Routes = [
  { path:'', pathMatch: 'full', component:HomeComponent },

  { path:'about', component:AboutComponent },

  { path:'download', component:DownloadComponent },

  { path:'resources',component:ResourcesComponent},

  { path:'contact', component:ContactComponent },

  { path:'resources/wordiness', component:WordinessComponent },

  { path:'resources/transitions', component:TransitionsComponent },

  { path:'resources/grammar', component:GrammarComponent },

  { path:'resources/eggcorns', component:EggcornsComponent },

  { path:'home/overview', component:OverviewComponent },

  { path:'home/fixes/passive-voice-fix', component:PassiveVoiceFixComponent},

  { path:'home/fixes/wordiness-fix', component:WordinessFixComponent},

  { path:'home/fixes/academic-style-fix', component:AcademicStyleFixComponent},

  { path:'home/fixes/grammar-fix', component:GrammarFixComponent},

  { path:'home/fixes/nominalizations-fix', component:NominalizationsFixComponent},

  { path:'home/fixes/sentences-fix', component:SentencesFixComponent},

  { path:'home/fixes/eggcorns-fix', component:EggcornsFixComponent},

  { path:'home/fixes/transitions-fix', component:TransitionsFixComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
