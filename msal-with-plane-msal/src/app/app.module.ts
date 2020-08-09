import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthSettingDialogComponent } from './auth/auth-setting-dialog/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AzureAdAppSettingViewerComponent } from './azure-ad-app-setting-viewer/azure-ad-app-setting-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthSettingDialogComponent,
    AzureAdAppSettingViewerComponent
  ],
  entryComponents: [
    AuthSettingDialogComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
