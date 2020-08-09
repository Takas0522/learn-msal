import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { IAuthSettings } from './auth/models/auth-settings.mode';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private appData: BehaviorSubject<IAuthSettings[]> = new BehaviorSubject([]);

  get appData$() {
    return this.appData.asObservable();
  }

  getAzureAdAppData() {
    const adappdata = localStorage.getItem('adapp');
    if (typeof(adappdata) !== 'undefined' && adappdata !== null) {
      const azureAdAppData = JSON.parse(adappdata) as IAuthSettings[];
      this.appData.next(azureAdAppData);
    }
  }

  setAzureAdAppData(data: IAuthSettings) {
    const datas = this.appData.getValue() as IAuthSettings[];
    datas.push(data);
    localStorage.removeItem('adapp');
    localStorage.setItem('adapp', JSON.stringify(datas));
    this.appData.next(datas);
  }
}
