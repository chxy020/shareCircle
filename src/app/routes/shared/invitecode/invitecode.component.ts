import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'invitecode',
	templateUrl: './invitecode.component.html'
})

export class InviteCodeComponent implements OnInit {
	sharedCode;

	constructor(
		private route: ActivatedRoute,
		private router: Router
	) {
	}

	ngOnInit() {
		this.sharedCode = this.route.snapshot.paramMap.get('code');
	}
}
