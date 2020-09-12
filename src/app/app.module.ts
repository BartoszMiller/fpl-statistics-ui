import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {PlayersComponent} from './players/players.component';
import {MoneyballComponent} from './moneyball/moneyball.component';
import {StatisticsService} from './service/statistics.service';
import {MoneyballService} from './service/moneyball.service';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    MoneyballComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [StatisticsService, MoneyballService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
