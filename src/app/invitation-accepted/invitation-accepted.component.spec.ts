import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationAcceptedComponent } from './invitation-accepted.component';

describe('InvitationAcceptedComponent', () => {
  let component: InvitationAcceptedComponent;
  let fixture: ComponentFixture<InvitationAcceptedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitationAcceptedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitationAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
