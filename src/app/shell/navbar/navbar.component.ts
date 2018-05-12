import { Component, OnInit, Input } from '@angular/core';
import { Router, ResolveEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  @Input() loggedIn;
  navCollapse: boolean;
  route: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.navCollapse = true;
    this.router.events.subscribe(e => {
      if (e instanceof ResolveEnd) {
        this.route = e.url;
      }
    });
  }

}
