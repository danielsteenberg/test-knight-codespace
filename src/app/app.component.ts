import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'klight';

  showHeaderFooter: boolean = true;

  constructor(private route: Router) {}

  ngOnInit() {
    this.route.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          console.log('this.router.url', this.route.url);
          if (this.route.url === '/enlarged') {
            this.showHeaderFooter = false;
          } else {
            this.showHeaderFooter = true;
          }
        }
      }
    );
  }
}
