import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { PassiveVoiceComponent } from './home/fixes/passive-voice/passive-voice.component';
import { AcademicStyleComponent } from './home/fixes/academic-style/academic-style.component';
import { NominalizationsComponent } from './home/fixes/nominalizations/nominalizations.component';
import { SentencesComponent } from './home/fixes/sentences/sentences.component';

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
    PassiveVoiceComponent,
    AcademicStyleComponent,
    NominalizationsComponent,
    SentencesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    material,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
