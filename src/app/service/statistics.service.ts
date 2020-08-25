import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Season} from '../model/season';
import {Observable} from 'rxjs/Observable';
import {Round} from '../model/round';
import {Team} from '../model/team';
import {Position} from '../model/position';
import {Player} from '../model/player';

@Injectable()
export class StatisticsService {

  private readonly seasonsUrl: string;
  private readonly positionsUrl: string;
  private readonly playersUrl: string;

  constructor(private http: HttpClient) {
    this.seasonsUrl = 'http://localhost:8080/seasons';
    this.positionsUrl = 'http://localhost:8080/positions';
    this.playersUrl = 'http://localhost:8080/players';
  }

  public findAllPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(this.positionsUrl);
  }

  public findAllSeasons(): Observable<Season[]> {
    return this.http.get<Season[]>(this.seasonsUrl);
  }

  public findRoundsBySeason(seasonCode: string): Observable<Round[]> {
    return this.http.get<Round[]>(this.seasonsUrl + '/' + seasonCode + '/rounds');
  }

  public findTeamsBySeason(seasonCode: string): Observable<Team[]> {
    return this.http.get<Team[]>(this.seasonsUrl + '/' + seasonCode + '/teams');
  }

  public findSeasons(seasonCode: string): Observable<Team[]> {
    return this.http.get<Team[]>(this.seasonsUrl + '/' + seasonCode + '/teams');
  }

  public findPlayers(fromSeason: string, toSeason: string, fromRound: number, toRound: number): Observable<Player[]> {
    const params = new HttpParams()
      .set('fromSeason', fromSeason)
      .set('toSeason', toSeason)
      .set('fromRound', fromRound.toFixed())
      .set('toRound', toRound.toFixed());
    return this.http.get<Player[]>(this.playersUrl, {params: params});
  }
}
