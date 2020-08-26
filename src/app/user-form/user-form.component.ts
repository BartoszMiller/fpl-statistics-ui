import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StatisticsService} from '../service/statistics.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: StatisticsService) {
  }

  onSubmit() {
  }

  gotoUserList() {
    this.router.navigate(['/users']);
  }
}
