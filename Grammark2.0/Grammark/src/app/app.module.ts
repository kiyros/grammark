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

import { WordinessComponent } from './resources/wordiness/wordiness.component';
import { TransitionsComponent } from './resources/transitions/transitions.component';
import { GrammarComponent } from './resources/grammar/grammar.component';
import { EggcornsComponent } from './resources/eggcorns/eggcorns.component';

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
    EggcornsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    material
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
