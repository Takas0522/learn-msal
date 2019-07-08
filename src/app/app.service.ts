import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IAuthSettings } from './auth/models/auth-settings.mode';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private appData: Subject<IAuthSettings[]> = new Subject();

  constructor() { }

  get appData$() {
    return this.appData.asObservable();
  }

  getAzureAdAppData() {
    // localstorageから取りたいがとりあえず配列から生成
    const dummyData = [...Array(10).keys()].map(x => {
      const d: IAuthSettings = {
        applicationName: `${x}App`,
        authority: `${x}Auth`,
        clientId: `${x}cluent`,
        isAuthB2C: (x % 2) === 0,
        policyName: `${x}Policy`,
        scopes: [],
        tenantId: `${x}Tenatm`
      };
      return d;
    });
    this.appData.next(dummyData);
  }

  setAzureAdAppData(data: IAuthSettings) {

  }
}
