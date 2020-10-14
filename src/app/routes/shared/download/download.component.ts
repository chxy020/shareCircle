import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'download-app',
	templateUrl: './download.component.html'
})

export class DownloadComponent implements OnInit {
	sharedCode;

	constructor(
		private route: ActivatedRoute,
		private router: Router
	) {
	}

	ngOnInit() {
		// this.sharedCode = this.route.snapshot.paramMap.get('code');
	}
}
