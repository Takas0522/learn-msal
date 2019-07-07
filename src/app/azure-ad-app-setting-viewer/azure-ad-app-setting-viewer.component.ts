import { Component, OnInit, Input } from '@angular/core';
import { IAuthSettings } from '../auth/models/auth-settings.mode';
import { MatDialog } from '@angular/material/dialog';
import { AuthSettingDialogComponent } from '../auth/auth-setting-dialog/auth.component';

@Component({
  selector: 'app-azure-ad-app-setting-viewer',
  templateUrl: './azure-ad-app-setting-viewer.component.html',
  styleUrls: ['./azure-ad-app-setting-viewer.component.scss']
})
export class AzureAdAppSettingViewerComponent implements OnInit {

  @Input()
  adApplicationData: IAuthSettings;

  constructor(
    private dialog: MatDialog
  ) {
    this.makeDummyData();
  }

  ngOnInit() {
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

  private makeDummyData() {
    this.adApplicationData = {
      applicationName: 'hogehoge',
      authority: 'fugafuga',
      clientId: 'piypiyo',
      isAuthB2C: false,
      policyName: 'polipoli',
      scopes: [],
      tenantId: 'tenten'
    };
  }
}
