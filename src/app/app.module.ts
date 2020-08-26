import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {PlayersComponent} from './players/players.component';
import {UserFormComponent} from './user-form/user-form.component';
import {StatisticsService} from './service/statistics.service';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [StatisticsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
