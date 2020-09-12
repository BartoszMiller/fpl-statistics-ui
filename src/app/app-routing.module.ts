import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlayersComponent} from './players/players.component';
import {MoneyballComponent} from './moneyball/moneyball.component';

const routes: Routes = [
  {path: '', component: PlayersComponent},
  {path: 'players', component: PlayersComponent},
  {path: 'moneyball', component: MoneyballComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
