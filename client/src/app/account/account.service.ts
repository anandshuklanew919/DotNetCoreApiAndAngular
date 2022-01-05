import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IAddress } from '../shared/models/address';
import { IUser } from '../shared/models/user';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
baseUrl = environment.apiUrl;
private currentSource = new ReplaySubject<IUser>(1);
currentUser$ = this.currentSource.asObservable();

  constructor(private httpClient: HttpClient,private router:Router) { }

  loadCurrentUser(token:string){
    if(token === null){
      this.currentSource.next(null);
      return of(null);
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${token}`);
    return this.httpClient.get(this.baseUrl+'account',{headers}).pipe(
      map((user:IUser)=>{
         if(user){
           localStorage.setItem('token',user.token);
           this.currentSource.next(user);
         }
      }) 
    )
  }

 

  login(values:any){
    return this.httpClient.post(this.baseUrl + 'account/login', values).pipe(
      map((user:IUser) =>{
        if(user){
          localStorage.setItem('token', user.token);
          this.currentSource.next(user);
        }
      })
    );
  }

  register(values:any){
    return this.httpClient.post(this.baseUrl + 'account/register', values).pipe(
      map((user:IUser) => {
        if(user){
          localStorage.setItem('token',user.token);
          this.currentSource.next(user);
        }
      })
    );
  }

  logout(){
    localStorage.removeItem('token');
    this.currentSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email:string){
    return this.httpClient.get(this.baseUrl+"account/emailexists?email="+email);
  }

  getUserAddress(){
    return this.httpClient.get<IAddress>(this.baseUrl+'account/address');
  }

  updateUserAddress(address:IAddress){
    return this.httpClient.put<IAddress>(this.baseUrl+'account/address',address);
  }
}
