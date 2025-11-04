import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDrawer } from './ngx-drawer';

describe('NgxDrawer', () => {
  let component: NgxDrawer;
  let fixture: ComponentFixture<NgxDrawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxDrawer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxDrawer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
