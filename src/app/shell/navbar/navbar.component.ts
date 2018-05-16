import { Component, OnInit } from '@angular/core';
import { Router, ResolveEnd } from '@angular/router';
import { UserService } from '../../common/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  loggedIn;
  navCollapse: boolean;
  route: string;

  constructor(private router: Router,
    private userService: UserService) {
    this.loggedIn = !!this.userService.getAuthToken();
    this.userService.loggedIn$.subscribe(v => this.loggedIn = v);
  }

  ngOnInit() {
    this.navCollapse = true;
    this.router.events.subscribe(e => {
      if (e instanceof ResolveEnd) {
        this.route = e.url;
      }
    });
  }

  logout() {
    this.userService.logout();
  }
}
