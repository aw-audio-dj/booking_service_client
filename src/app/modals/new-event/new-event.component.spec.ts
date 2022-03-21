import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEventModal } from './new-event.component';

describe('NewEventComponent', () => {
  let component: NewEventModal;
  let fixture: ComponentFixture<NewEventModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEventModal ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEventModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
