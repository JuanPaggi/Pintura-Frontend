import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTagsComponent } from './panel-tags.component';

describe('PanelTagsComponent', () => {
  let component: PanelTagsComponent;
  let fixture: ComponentFixture<PanelTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
