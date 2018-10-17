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
