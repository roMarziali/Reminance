import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkChips } from './work-chips';

describe('WorkChips', () => {
  let component: WorkChips;
  let fixture: ComponentFixture<WorkChips>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkChips]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkChips);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
