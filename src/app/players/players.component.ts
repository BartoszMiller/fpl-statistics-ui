import {Component, OnInit} from '@angular/core';
import {Season} from '../model/season';
import {StatisticsService} from '../service/statistics.service';
import {Team} from '../model/team';
import {Position} from '../model/position';
import {Player} from '../model/player';
import {MoneyballService} from '../service/moneyball.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  seasons: Season[] = [];
  teams: Team[] = [];
  positions: Position[] = [];
  players: Player[] = [];

  fromSeason: Season = new Season();
  fromRound: number;
  toSeason: Season = new Season();
  toRound: number;
  team: Team[] = [];
  position: Position;
  sorts: string[] = ['Cost', 'Appearances', 'Minutes', 'Points', 'Points per Apps', 'Value', 'Value per Apps'];
  sort = this.sorts[3];

  apps: string[] = ['>0', '>30', '>40', '>50', '>60', '>70', '>80', '>90', '>95'];
  app: string = this.apps[0];

  homeGames = true;
  awayGames = true;

  constructor(private statisticsService: StatisticsService, private moneyballService: MoneyballService) {
  }

  ngOnInit() {

    this.statisticsService.findAllPositions().subscribe(data => {
      this.positions = data;
    });

    this.statisticsService.findAllSeasons().subscribe(seasons => {
      this.seasons = seasons.filter(season => season.rounds.length > 0);
      this.fromSeason = seasons.slice().reverse().find(season => season.rounds.length > 0);
      this.toSeason = seasons.slice().reverse().find(season => season.rounds.length > 0);
      this.fromRound = this.fromSeason.rounds[0].round;
      this.toRound = this.toSeason.rounds[this.toSeason.rounds.length - 1].round;
      this.updatePlayers();
      this.statisticsService.findTeamsBySeason(seasons.filter(season => season.active === true)[0].code).subscribe(teams => {
        this.teams = teams;
      });
    });
  }

  updatePlayers() {
    this.statisticsService.findPlayers(
      this.fromSeason.code,
      this.toSeason.code,
      this.fromRound,
      this.toRound,
      this.team === undefined ? undefined : this.team.map(team => team.shortName).join(','),
      this.position === undefined ? undefined : this.position.code.toFixed(),
      this.sort,
      this.app === undefined ? undefined : this.app,
      this.homeGames,
      this.awayGames
    ).subscribe(data => {
      this.players = data;
    });
  }

  addToWhiteList(playerId: number) {
    this.moneyballService.addToWhiteList(playerId);
    this.updatePlayers();
  }

  addToBlackList(playerId: number) {
    this.moneyballService.addToBlackList(playerId);
    this.updatePlayers();
  }

  removeFromWhiteList(playerId: number) {
    this.moneyballService.removeFromWhiteList(playerId);
    this.updatePlayers();
  }

  removeFromBlackList(playerId: number) {
    this.moneyballService.removeFromBlackList(playerId);
    this.updatePlayers();
  }
}
