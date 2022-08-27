import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFollowUpComponent } from './table-follow-up.component';

describe('TableFollowUpComponent', () => {
  let component: TableFollowUpComponent;
  let fixture: ComponentFixture<TableFollowUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableFollowUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
