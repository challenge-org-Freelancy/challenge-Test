import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './features/home/home.component';
import { ChallengeCreatorComponent } from './features/challenges/challengeCreator/challenge-creator.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ChallengeCreatorComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
