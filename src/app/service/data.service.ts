import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private messageloginSource=new BehaviorSubject<string>('');
  currentloginmessage=this.messageloginSource.asObservable();
  
  private messagesignupSource=new BehaviorSubject<string>('');
  currentsignupmessage=this.messagesignupSource.asObservable();

  //Toggle Login element   
  private previousState = new BehaviorSubject<string>('0');
  newState = this.previousState.asObservable();
  
  constructor(private http: HttpClient) { }

  changeloginMessage(message:string){
    this.messageloginSource.next(message)
  }
  changesignupMessage(message:string){
    this.messagesignupSource.next(message)
  }

  //Toggle login element
  changeElementStatus(state: string) {
	this.previousState.next(state);
  }

//   // Get User Profile
//   url = '../../../../assets/users.json';

//   getProfile(): Observable<Profile[]> {
// 	return this.http.get<Profile[]>(this.url);
//   }
}

// user profile model
export class Profile {
	fname: string;
	lanme: string;
	email: string;
	phone: string;
	company: string;
	subscribe: boolean;
}
