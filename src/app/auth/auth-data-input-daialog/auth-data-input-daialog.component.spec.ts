import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthDataInputDaialogComponent } from './auth-data-input-daialog.component';

describe('AuthDataInputDaialogComponent', () => {
  let component: AuthDataInputDaialogComponent;
  let fixture: ComponentFixture<AuthDataInputDaialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthDataInputDaialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthDataInputDaialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
