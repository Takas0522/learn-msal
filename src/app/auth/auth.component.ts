import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [AuthService]
})
export class AuthComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  authFormGroup: FormGroup;

  ngOnInit() {
    this.authFormGroup = this.formBuilder.group({
      applicationName: ['', Validators.required],
      clientId: ['', Validators.required]
    });
  }

  login() {
    const configSetting = this.authFormGroup.value;
    this.authService.login();
  }

}
