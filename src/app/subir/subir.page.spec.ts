import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubirPage } from './subir.page';

describe('SubirPage', () => {
  let component: SubirPage;
  let fixture: ComponentFixture<SubirPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
