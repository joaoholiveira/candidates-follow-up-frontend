import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanalRetornoFormComponent } from './canal-retorno-form.component';

describe('CanalRetornoFormComponent', () => {
  let component: CanalRetornoFormComponent;
  let fixture: ComponentFixture<CanalRetornoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanalRetornoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanalRetornoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
