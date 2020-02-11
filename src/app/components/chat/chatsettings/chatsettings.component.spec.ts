import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsettingsComponent } from './chatsettings.component';

describe('ChatsettingsComponent', () => {
  let component: ChatsettingsComponent;
  let fixture: ComponentFixture<ChatsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
