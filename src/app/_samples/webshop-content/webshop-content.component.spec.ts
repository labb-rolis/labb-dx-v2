import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebshopContentComponent } from './webshop-content.component';

describe('WebshopContentComponent', () => {
  let component: WebshopContentComponent;
  let fixture: ComponentFixture<WebshopContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebshopContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebshopContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
