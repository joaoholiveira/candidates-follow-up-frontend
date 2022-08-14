import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanalRetornoComponent } from './canal-retorno.component';

describe('CanalRetornoComponent', () => {
  let component: CanalRetornoComponent;
  let fixture: ComponentFixture<CanalRetornoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanalRetornoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanalRetornoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
