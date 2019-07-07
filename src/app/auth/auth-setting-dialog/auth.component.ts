import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { IAuthSettings } from '../models/auth-settings.mode';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [AuthService]
})
export class AuthSettingDialogComponent implements OnInit {

  authFormGroup: FormGroup;
  private initData: IAuthSettings;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private matDialogRef: MatDialogRef<AuthSettingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IAuthSettings
  ) {
    this.initData = data;
  }

  ngOnInit() {
    this.authFormGroup = this.formBuilder.group({
      applicationName: [this.initData.applicationName, Validators.required],
      clientId: [this.initData.clientId, Validators.required],
      authority: [this.initData.authority],
      tenantId: [this.initData.tenantId],
      policyName: [this.initData.policyName],
      isAuthB2C: [this.initData.isAuthB2C]
    });
  }

  loginAndAddAuthData() {

    this.authFormGroup.markAllAsTouched();
    if (this.authFormGroup.invalid) {
      return;
    }

    const configSetting = this.authFormGroup.value;
    this.authService.clientInit(configSetting);
    this.authService.login();
    this.authService.loginState$.subscribe(x => {
      if (x === 'AUTH_COMP') {
        this.matDialogRef.close(configSetting);
      } else {
        alert('Can Not Auth');
      }
    });
  }

}
