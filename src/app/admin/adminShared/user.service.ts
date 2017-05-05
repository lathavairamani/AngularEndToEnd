import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class UserService implements CanActivate {
  userLoggedIn: boolean = false;
  loggedInUser: string;
  authUser: any;
  
  constructor( private router : Router ){
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyABtu3aEa8STqgQhTRTLVIZlbdGAg1GMlo",
      authDomain: "gigabytegames-4544c.firebaseapp.com",
      databaseURL: "https://gigabytegames-4544c.firebaseio.com",
      projectId: "gigabytegames-4544c",
      storageBucket: "gigabytegames-4544c.appspot.com",
      messagingSenderId: "707631163190"
    };
    firebase.initializeApp(config);
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.verifyLogin(url);
  }
  
  verifyLogin(url: string): boolean {
    if (this.userLoggedIn) { return true; }
    
    this.router.navigate(['/admin/login']);
    return false;
  }
  
  register(email: string, password: string){
    firebase.auth().createUserWithEmailAndPassword(email, password).
      catch(function(error){
        alert(`${error.message} Please try again`);
      });
  }
  
  verifyUser() {
    this.authUser = firebase.auth().currentUser;
    
    if(this.authUser){
      alert(`Welcome ${this.authUser.email}`);
      this.loggedInUser = this.authUser.email;
      this.userLoggedIn = true;
      this.router.navigate(['/admin']);
    }
  }

  login(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).
    catch(function(error){
      alert(`${error.message} Unable to login. Please try again !!`);
    });
  }
  
  logout() {
    this.userLoggedIn = false;
    firebase.auth().signOut().
    then(function() {
      alert(`Logged out !!!`);
    }, function(error){
      alert(`${error.message} Unable to logout. Please try again !!!`);
    });
  }
  
}