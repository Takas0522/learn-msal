import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private service: AppService,
    private router: Router
  ) {}

  navigateReaderPage() {
    this.router.navigate(['reader']);
  }

  navigateWriterPage() {
    this.router.navigate(['writer']);
  }

}
