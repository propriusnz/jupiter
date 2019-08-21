import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  private panelStatus = new BehaviorSubject<string>('Dashboard');
  currentPanel = this.panelStatus.asObservable();
  constructor() { }
  changePanel(status: string) {
    this.panelStatus.next(status);
  }

}
