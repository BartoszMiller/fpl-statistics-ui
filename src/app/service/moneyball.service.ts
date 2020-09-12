import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {DreamTeam} from '../model/dreamTeam';

@Injectable()
export class MoneyballService {

  private readonly moneyballUrl: string;
  private readonly addWhitelistUrl: string;
  private readonly addBlacklistUrl: string;
  private readonly deleteWhitelistUrl: string;
  private readonly deleteBlacklistUrl: string;

  constructor(private http: HttpClient) {
    this.moneyballUrl = 'http://localhost:8080/moneyball';
    this.addWhitelistUrl = 'http://localhost:8080/whitelist/add/';
    this.addBlacklistUrl = 'http://localhost:8080/blacklist/add/';
    this.deleteWhitelistUrl = 'http://localhost:8080/whitelist/remove/';
    this.deleteBlacklistUrl = 'http://localhost:8080/blacklist/remove/';
  }

  public findMoneyball(budget: string, fromSeason: string, toSeason: string, fromRound: number, toRound: number, shortName: string, sort: string, app: string, homeGames: boolean, awayGames: boolean): Observable<DreamTeam> {

    let params = new HttpParams()
      .set('budget', budget)
      .set('fromSeason', fromSeason)
      .set('toSeason', toSeason)
      .set('fromRound', fromRound.toFixed())
      .set('toRound', toRound.toFixed())
      .set('sort', sort)
      .set('homeGames', homeGames.toString())
      .set('awayGames', awayGames.toString());

    if (shortName !== undefined) {
      params = params.set('team', shortName);
    }
    if (app !== undefined) {
      params = params.set('app', app);
    }
    return this.http.get<DreamTeam>(this.moneyballUrl, {params: params});
  }

  public addToWhiteList(playerId: number) {
    this.http.get(this.addWhitelistUrl + playerId).subscribe(data => {
    });
  }

  public addToBlackList(playerId: number) {
    this.http.get(this.addBlacklistUrl + playerId).subscribe(data => {
    });
  }

  public removeFromWhiteList(playerId: number) {
    this.http.get(this.deleteWhitelistUrl + playerId).subscribe(data => {
    });
  }

  public removeFromBlackList(playerId: number) {
    this.http.get(this.deleteBlacklistUrl + playerId).subscribe(data => {
    });
  }
}
