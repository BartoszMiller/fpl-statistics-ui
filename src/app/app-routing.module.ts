import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlayersComponent} from './players/players.component';
import {UserFormComponent} from './user-form/user-form.component';

const routes: Routes = [
  {path: '', component: PlayersComponent},
  {path: 'players', component: PlayersComponent},
  {path: 'adduser', component: UserFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
