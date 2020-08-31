import {Component, OnInit} from '@angular/core';
import {Season} from '../model/season';
import {StatisticsService} from '../service/statistics.service';
import {Team} from '../model/team';
import {Position} from '../model/position';
import {Player} from '../model/player';

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

  apps: string[] = ['0-25', '25-50', '50-70', '70-80', '90-100'];
  app: string = this.apps[4];

  constructor(private statisticsService: StatisticsService) {
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
      this.app === undefined ? undefined : this.app
    ).subscribe(data => {
      this.players = data;
    });
  }
}
