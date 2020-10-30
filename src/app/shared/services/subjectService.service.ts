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

	private keyWordSubject = new Subject<any>();
	public keyWordObservable = this.keyWordSubject.asObservable();
	keyWordSub(): void {
		this.keyWordSubject.next();
	}

	private mainTitleSubject = new Subject<any>();
	public mainTitleObservable = this.mainTitleSubject.asObservable();
	mainTitleSub(): void {
		this.mainTitleSubject.next();
	}
}