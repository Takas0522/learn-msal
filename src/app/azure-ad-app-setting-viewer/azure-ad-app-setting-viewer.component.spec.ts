import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AzureAdAppSettingViewerComponent } from './azure-ad-app-setting-viewer.component';

describe('AzureAdAppSettingViewerComponent', () => {
  let component: AzureAdAppSettingViewerComponent;
  let fixture: ComponentFixture<AzureAdAppSettingViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AzureAdAppSettingViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AzureAdAppSettingViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
