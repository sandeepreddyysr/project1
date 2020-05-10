import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifcaitonViewComponent } from './notifcaiton-view.component';

describe('NotifcaitonViewComponent', () => {
  let component: NotifcaitonViewComponent;
  let fixture: ComponentFixture<NotifcaitonViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifcaitonViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifcaitonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
