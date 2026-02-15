import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'challenges/create',
    redirectTo: 'challenges/wizard',
    pathMatch: 'full'
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
  },
  {
    path: 'admin/challenges',
    loadChildren: () => import('./features/challenge-admin/challenge-admin.module').then(m => m.ChallengeAdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
