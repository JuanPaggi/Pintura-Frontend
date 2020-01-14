import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelGaleriasComponent } from './panel-galerias.component';

describe('PanelGaleriasComponent', () => {
  let component: PanelGaleriasComponent;
  let fixture: ComponentFixture<PanelGaleriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelGaleriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelGaleriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
