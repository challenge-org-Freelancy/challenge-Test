import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './features/home/home.component';
import { ChallengeCreatorComponent } from './features/challenges/challengeCreator/challenge-creator.component';
import { DashboardHeaderComponent } from './features/challenge-admin/components/dashboard-header/dashboard-header.component';
import { QuickActionCardsComponent } from './features/challenge-admin/components/quick-action-cards/quick-action-cards.component';
import { ChallengesPreviewComponent } from './features/challenge-admin/components/challenges-preview/challenges-preview.component';
import { ParticipantAnalyticsComponent } from './features/challenge-admin/components/participant-analytics/participant-analytics.component';
import { DeadlineAnalyticsComponent } from './features/challenge-admin/components/deadline-analytics/deadline-analytics.component';
import { AiAssistancePanelComponent } from './features/challenge-admin/components/ai-assistance-panel/ai-assistance-panel.component';
import { EditChallengeModalComponent } from './features/challenge-admin/components/edit-challenge-modal/edit-challenge-modal.component';
import { ParticipantsModalComponent } from './features/challenge-admin/components/participants-modal/participants-modal.component';
import { ModernChallengesGridComponent } from './features/challenge-admin/components/modern-challenges-grid/modern-challenges-grid.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardHeaderComponent,
    QuickActionCardsComponent,
    ChallengesPreviewComponent,
    ParticipantAnalyticsComponent,
    DeadlineAnalyticsComponent,
    AiAssistancePanelComponent,
    EditChallengeModalComponent,
    ParticipantsModalComponent,
    ModernChallengesGridComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ChallengeCreatorComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
