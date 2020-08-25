import {Component, OnInit} from '@angular/core';
import {Season} from '../model/season';
import {StatisticsService} from '../service/statistics.service';
import {Round} from '../model/round';
import {Team} from '../model/team';
import {Position} from '../model/position';
import {Player} from '../model/player';
import {flatMap, map} from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  seasons: Season[];
  fromSeason: string;
  toSeason: string;

  fromRounds: Round[];
  fromRound: number;

  toRounds: Round[];
  toRound: number;

  teams: Team[];
  team: Team;

  positions: Position[];
  position: Position;

  players: Player[];

  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit() {

    this.statisticsService.findAllPositions().subscribe(data => {
      this.positions = data;
    });

    this.statisticsService.findAllSeasons().pipe(
      flatMap(seasons => {
        this.seasons = seasons;
        this.fromSeason = seasons[seasons.length - 2].code;
        this.toSeason = seasons[seasons.length - 2].code;
        this.statisticsService.findTeamsBySeason(this.seasons.filter(season => season.active === true)[0].code).subscribe(teams => {
          this.teams = teams;
        });
        return this.statisticsService.findRoundsBySeason(this.fromSeason);
      }),
      map(rounds => {

        this.fromRounds = rounds;
        if (rounds.length > 0) {
          this.fromRound = rounds[0].round;
        }
        // if (this.fromSeason !== this.toSeason) {
        //   this.updateToRounds(this.toSeason);
        // } else {
        //   this.toRounds = rounds;
        if (rounds.length > 0) {
          this.toRound = rounds[rounds.length - 1].round;
        }
        // }
      })
    ).subscribe(() => this.updatePlayers());
  }

  updateFromRounds(seasonCode) {
    this.statisticsService.findRoundsBySeason(seasonCode).subscribe(data => {
      this.fromRounds = data;
      if (data.length > 0) {
        this.fromRound = data[0].round;
      }
      if (this.fromSeason !== this.toSeason) {
        this.updateToRounds(this.toSeason);
      } else {
        this.toRounds = data;
        if (data.length > 0) {
          this.toRound = data[data.length - 1].round;
        }
      }
    });
  }

  updateToRounds(seasonCode) {
    this.statisticsService.findRoundsBySeason(seasonCode).subscribe(data => {
      this.toRounds = data;
      if (data.length > 0) {
        this.toRound = data[data.length - 1].round;
      }
    });
  }

  updatePlayers() {
    this.statisticsService.findPlayers(this.fromSeason, this.toSeason, this.fromRound, this.toRound).subscribe(data => {
      this.players = data;
    });
  }
}
