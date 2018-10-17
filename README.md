```
ng generate component Nav
ng generate component Home
ng generate component Order
ng generate component Track
npm install --save jquery
npm install --save bootstrap

```



```JSON
//angular.json
"styles": [
  "src/styles.css",
  "./node_modules/bootstrap/dist/css/bootstrap.min.css"
],
"scripts": [
  "./node_modules/jquery/dist/jquery.min.js",
  "./node_modules/bootstrap/dist/js/bootstrap.min.js"
]
```



```
//.editorconfig
indent_style = tab
indent_size = 4
```



```ts
//app.modules.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { RouterModule, Router, ActivatedRoute, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { TrackComponent } from './track/track.component';

const appRoutes: Routes =
	[
		{ path: 'home', component: HomeComponent },
		{ path: 'order', component: OrderComponent },
		{ path: 'track', component: TrackComponent },
		{ path: '**', component: HomeComponent }
	];

@NgModule({
  declarations: [
	AppComponent,
	NavComponent,
	HomeComponent,
	OrderComponent,
	TrackComponent
  ],
  imports: [
	BrowserModule,
	RouterModule.forRoot(appRoutes),
	FormsModule,
	ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```



```html
//app.component.html
<div>
  <app-nav></app-nav>
</div>

<div class='col-xl-12 body-content'>
  <router-outlet></router-outlet>
</div>
```



```html
//nav.component.html
<nav class="navbar navbar-expand-sm navbar-dark bg-dark">
	<a style="color:whitesmoke" class="navbar-brand">PizzAPIe</a>
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
		<div class="navbar-nav">
			<a class="nav-item nav-link active" [routerLink]="['home']" [routerLinkActive]="['active']">Home <span class="sr-only">(current)</span></a>
			<a class="nav-item nav-link" [routerLink]="['order']" [routerLinkActive]="['active']">Order</a>
			<a class="nav-item nav-link" [routerLink]="['track']" [routerLinkActive]="['active']">Track</a>

		</div>
	</div>
</nav>

```



```html
//home.component.html
<div style="padding: 1em;" class="container-fluid">
	<div class="row ">
		<p class="h2"> Welcome! </p>
	</div>
</div>
```

Import needed components
```ts
//order.component.ts
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TrackComponent } from '../track/track.component';
```

Pizza Data Types
```ts
//order.component.ts
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
		this.router.navigate(["track"]);
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


```
