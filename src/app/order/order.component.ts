import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TrackComponent } from '../track/track.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
	public pizzaOptions = new PizzaOptions();
	public orderForm: FormGroup;
	public submitted = false;
	public price: number = 0;
	


	constructor(private formBuilder: FormBuilder, private router: Router) {
	}

	ngOnInit() {
	
		
		this.orderForm = this.formBuilder.group({
			name: ['John', [Validators.required, Validators.minLength(4)]],
			phone: ['555-555-5555', [Validators.required]],
			size: ['', [Validators.required]],
			sauce: ['', [Validators.required]],
			cheese: ['', [Validators.required]],
			topping: ['', [Validators.required]],
			quantity: [1, [Validators.required]]
		}, { updateOn: 'blur' });

		this.orderForm.valueChanges.subscribe(val => {
			var temp = [val.size, val.sauce, val.cheese, val.toppings]
			this.price = 0;
			for (let i of temp) {
				if (i) {
					this.price += i.unitPrice;
				}
			}
			this.price *= val.quantity;
		});

	}

	onSubmit() {
		this.submitted = true;
		if (this.orderForm.invalid) {
			return;
		}
		this.router.navigate(["track"], { queryParams: { num: 12345 }});
	}

	get f() { return this.orderForm.controls; }

}


export class PizzaElement {
	constructor(id, unitPrice) {
		this.id = id;
		this.unitPrice = unitPrice;
	}
	id: string;
	unitPrice: number;
}

export class PizzaOptions {
	constructor() {
		this.sizes = [new PizzaElement("Small", 5), new PizzaElement("Medium", 7), new PizzaElement("Large", 9)];
		this.sauces = [new PizzaElement("-", 0), new PizzaElement("Tomato", 1), new PizzaElement("Alfredo", 1.5),
			new PizzaElement("Pesto", 1.5)];
		this.cheeses = [new PizzaElement("-", 0), new PizzaElement("Mozzarella", 2), new PizzaElement("Feta", 3)];
		this.toppings = [new PizzaElement("-", 0), new PizzaElement("Pepperoni", 7), new PizzaElement("Green Peppers", 9),
			new PizzaElement("Mushrooms", 9), new PizzaElement("Olives", 9), new PizzaElement("Chives", 9)];
	}
	sizes = new Array<PizzaElement>();
	sauces = new Array<PizzaElement>();
	cheeses = new Array<PizzaElement>();
	toppings = new Array<PizzaElement>();
}

