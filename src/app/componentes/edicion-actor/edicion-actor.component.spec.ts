import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionActorComponent } from './edicion-actor.component';

describe('EdicionActorComponent', () => {
  let component: EdicionActorComponent;
  let fixture: ComponentFixture<EdicionActorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdicionActorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicionActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
