import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriasComponent } from './galerias.component';

describe('GaleriasComponent', () => {
  let component: GaleriasComponent;
  let fixture: ComponentFixture<GaleriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaleriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
