import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanalRetornoComponent } from './components/views/canal-retorno/canal-retorno.component';
import { FollowupComponent } from './components/views/followup/followup.component';
import { HomeComponent } from './components/views/home/home.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "follow-up", component: FollowupComponent },
  { path: "canal-retorno", component: CanalRetornoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
