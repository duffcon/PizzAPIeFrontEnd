import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})


export class TrackComponent implements OnInit {
	public trackerForm: FormGroup;
	public submitted = false;
	public orderFound = false;

	constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) {

	}

	ngOnInit() {
		
		this.route.queryParams.subscribe(val => {

			if (val.hasOwnProperty("num")) {
				this.orderFound = true;
			}
			else {
				this.orderFound = false;
			}
		});

		this.trackerForm = this.formBuilder.group({
			ordernumber: ['12345'],
			phone: ['555-555-5555', [Validators.required, Validators.pattern('^[0-9+-]+[0-9+-]+[0-9]$'), Validators.minLength(12), Validators.maxLength(12)]]
		}, { updateOn: 'blur' });

	}

	get f() { return this.trackerForm.controls; }

	onSubmit() {
		this.submitted = true;

		if (this.trackerForm.invalid) {
			this.orderFound = false;
			return;
		}
		this.orderFound = true;
	}
}
