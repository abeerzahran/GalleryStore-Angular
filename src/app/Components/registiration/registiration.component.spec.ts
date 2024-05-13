import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistirationComponent } from './registiration.component';

describe('RegistirationComponent', () => {
  let component: RegistirationComponent;
  let fixture: ComponentFixture<RegistirationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistirationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
