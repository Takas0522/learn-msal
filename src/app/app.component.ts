import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthSettingDialogComponent } from './auth/auth-setting-dialog/auth.component';
import { IAuthSettings } from './auth/models/auth-settings.mode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LearnMsal';

  constructor(
    private dialog: MatDialog
  ) {}

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
