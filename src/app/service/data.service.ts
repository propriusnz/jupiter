import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private messageloginSource=new BehaviorSubject<string>('');
  currentloginmessage=this.messageloginSource.asObservable();
  
  private messagesignupSource=new BehaviorSubject<string>('');
  currentsignupmessage=this.messagesignupSource.asObservable();
  
  constructor() { }
  changeloginMessage(message:string){
    this.messageloginSource.next(message)
  }
  changesignupMessage(message:string){
    this.messagesignupSource.next(message)
  }
}
