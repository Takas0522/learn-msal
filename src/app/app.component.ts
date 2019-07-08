import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthSettingDialogComponent } from './auth/auth-setting-dialog/auth.component';
import { IAuthSettings } from './auth/models/auth-settings.mode';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  appDatas: IAuthSettings[] = [];

  constructor(
    private dialog: MatDialog,
    private appService: AppService
  ) {}


  ngOnInit() {
    this.appService.appData$.subscribe(x => this.appDatas = x);
    this.appService.getAzureAdAppData();
  }

  addAzureAdApplication() {
    const initData: IAuthSettings = {
      applicationName: '',
      authority: '',
      clientId: '',
      isAuthB2C: false,
      policyName: '',
      scopes: [],
      tenantId: ''
    };
    const dialogRef = this.dialog.open(AuthSettingDialogComponent, {
      width: '50vw',
      data: initData
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

}
