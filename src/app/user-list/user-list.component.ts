import {Component, OnInit} from '@angular/core';
import {Season} from '../model/season';
import {StatisticsService} from '../service/statistics.service';
import {Round} from '../model/round';
import {Team} from '../model/team';
import {Position} from '../model/position';

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

  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit() {
    this.statisticsService.findAllSeasons().subscribe(data => {
      this.fromSeason = data[data.length - 2].code;
      this.updateFromRounds(this.fromSeason);
      this.toSeason = data[data.length - 2].code;
      this.updateToRounds(this.toSeason);
      this.seasons = data;
      this.statisticsService.findTeamsBySeason(this.seasons.filter(season => season.active === true)[0].code).subscribe(teams => {
        this.teams = teams;
      });
    });
    this.statisticsService.findAllPositions().subscribe(data => {
      this.positions = data;
    });
  }

  updateFromRounds(seasonCode) {
    this.statisticsService.findRoundsBySeason(seasonCode).subscribe(data => {
      this.fromRounds = data;
      if (data.length > 0) {
        this.fromRound = data[0].round;
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
}
