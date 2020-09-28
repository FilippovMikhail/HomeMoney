import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {UserModel} from '../../../../shared/models/user.model';
import {AuthService} from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  user: UserModel;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
