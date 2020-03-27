import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdaterDialogComponent } from './updater-dialog.component';

describe('UpdaterDialogComponent', () => {
  let component: UpdaterDialogComponent;
  let fixture: ComponentFixture<UpdaterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdaterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdaterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
