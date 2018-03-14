import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigureFn, configureTests } from '@modules/testing';

import { PizzaDisplayComponent } from './pizza-display.component';
import { Pizza, Topping } from '../../models';

describe(`${PizzaDisplayComponent.name}`, () => {
  let component: PizzaDisplayComponent;
  let fixture: ComponentFixture<PizzaDisplayComponent>;
  const toppingsMock: Topping[] = [
    {
      id: 1,
      name: 'anchovy',
    },
    {
      id: 2,
      name: 'bacon',
    },
  ];
  const pizzaMock: Pizza = {
    id: 1,
    name: 'Pepperoni pizza',
    toppings: [],
  };

  beforeEach(
    async(() => {
      const configure: ConfigureFn = (testBed) => {
        testBed.configureTestingModule({
          declarations: [PizzaDisplayComponent],
          imports: [NoopAnimationsModule],
        });
      };

      configureTests(configure).then((testBed) => {
        fixture = testBed.createComponent(PizzaDisplayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should display pizza`, () => {
    component.pizza = pizzaMock;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it(`should display pizza with toppings`, () => {
    const pizza = {
      ...pizzaMock,
      toppings: toppingsMock,
    };
    component.pizza = pizza;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
    expect(component.pizza.toppings).toEqual(toppingsMock);
  });
});