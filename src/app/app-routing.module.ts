import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ChallengeCreatorComponent } from './features/challenges/challengeCreator/challenge-creator.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'challenges/create',
    component: ChallengeCreatorComponent
  },
  {
    path: 'challenges/wizard',
    loadChildren: () => import('./features/challenge-creation/challenge-creation.module').then(m => m.ChallengeCreationModule)
  },
  {
    path: 'challenges/participate',
    loadChildren: () => import('./features/challenges/challengeParticipate/challenge-participate.module').then(m => m.ChallengeParticipateModule)
  },
  {
    path: 'challenges',
    loadChildren: () => import('./features/challenges/challenges.module').then(m => m.ChallengesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
