import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnationComponent } from './ownation.component';

describe('OwnationComponent', () => {
  let component: OwnationComponent;
  let fixture: ComponentFixture<OwnationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
