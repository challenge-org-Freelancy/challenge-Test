import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengesListComponent } from './components/challenges-list/challenges-list.component';

const routes: Routes = [
  {
    path: '',
    component: ChallengesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengesRoutingModule { }
