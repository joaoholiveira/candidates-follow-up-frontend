import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCanalRetornoComponent } from './edit-canal-retorno.component';

describe('EditCanalRetornoComponent', () => {
  let component: EditCanalRetornoComponent;
  let fixture: ComponentFixture<EditCanalRetornoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCanalRetornoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCanalRetornoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
