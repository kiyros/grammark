import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MatToolbarModule} from '@angular/material/toolbar';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DownloadComponent } from './download/download.component';
import { ResourcesComponent } from './resources/resources.component';
import { ContactComponent } from './contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

const material = [
  MatToolbarModule
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    DownloadComponent,
    ResourcesComponent,
    ContactComponent,
    WordinessComponent,
    TransitionsComponent,
    GrammarComponent,
    EggcornsComponent,
    OverviewComponent,
    PassiveVoiceFixComponent,
    WordinessFixComponent,
    AcademicStyleFixComponent,
    GrammarFixComponent,
    NominalizationsFixComponent,
    SentencesFixComponent,
    EggcornsFixComponent,
    TransitionsFixComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    material,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
