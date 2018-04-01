import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDocumentComponent } from './update-document.component';

describe('UpdateDocumentComponent', () => {
  let component: UpdateDocumentComponent;
  let fixture: ComponentFixture<UpdateDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
