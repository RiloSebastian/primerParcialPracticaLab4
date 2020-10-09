import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarActorComponent } from './eliminar-actor.component';

describe('EliminarActorComponent', () => {
  let component: EliminarActorComponent;
  let fixture: ComponentFixture<EliminarActorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarActorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
