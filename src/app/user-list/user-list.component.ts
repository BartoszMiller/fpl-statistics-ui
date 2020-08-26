import {Component, OnInit} from '@angular/core';
import {Season} from '../model/season';
import {StatisticsService} from '../service/statistics.service';
import {Team} from '../model/team';
import {Position} from '../model/position';
import {Player} from '../model/player';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  seasons: Season[] = [];
  teams: Team[] = [];
  positions: Position[] = [];
  players: Player[] = [];

  fromSeason: Season = new Season();
  fromRound: number;
  toSeason: Season = new Season();
  toRound: number;
  team: Team;
  position: Position;

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
      this.team === undefined ? undefined : this.team.shortName,
      this.position === undefined ? undefined : this.position.code.toFixed()
    ).subscribe(data => {
      this.players = data;
    });
  }
}
