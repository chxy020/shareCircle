import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SubjectService {
	constructor() {}

	private quitCircleSubject = new Subject<any>();
	public quitCircleObservable = this.quitCircleSubject.asObservable();
	quitCircleSub(): void {
		this.quitCircleSubject.next();
	}
}