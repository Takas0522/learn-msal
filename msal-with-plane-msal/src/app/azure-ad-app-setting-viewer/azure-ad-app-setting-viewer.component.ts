import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { IAuthSettings } from '../auth/models/auth-settings.mode';
import { MatDialog } from '@angular/material/dialog';
import { AuthSettingDialogComponent } from '../auth/auth-setting-dialog/auth.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-azure-ad-app-setting-viewer',
  templateUrl: './azure-ad-app-setting-viewer.component.html',
  styleUrls: ['./azure-ad-app-setting-viewer.component.scss'],
  providers: [ AuthService ]
})
export class AzureAdAppSettingViewerComponent implements AfterViewInit {

  @Input()
  adApplicationData: IAuthSettings;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngAfterViewInit(): void {
    this.authService.clientInit(this.adApplicationData);
    // this.authService.loginState$.subscribe(state => {
    //   console.log(state);
    // });

    // this.authService.userAccount$.subscribe(info => {
    //   console.log(info);
    // });
  }

  getIdToken() {
    this.authService.login();
  }

  editAzureAdApplication() {
    const dialogRef = this.dialog.open(AuthSettingDialogComponent, {
      width: '50vw',
      data: this.adApplicationData
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

}
