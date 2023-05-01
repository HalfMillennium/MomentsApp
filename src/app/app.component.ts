import { Component } from '@angular/core';
import { MenuItem } from './utils/interfaces';
import {MENU_ITEMS} from './utils/resources';
import { environment } from 'src/environments/environment';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'moments';
  readonly MENU_ITEMS = MENU_ITEMS;
  userAuthenticated = false;

  async signInUserEmail(email: string, password: string) {
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Initialize Firebase
    const app = initializeApp(environment.firebase);
    const auth = getAuth(app);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        this.userAuthenticated = true;
      })
      .catch((error) => {
        console.log(`Fatal error [signInUserEmail]: ${error.code},${error.message}`);
      });
  }

  async registerUserEmail(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.userAuthenticated = true;
      })
      .catch((error) => {
        console.log(`Fatal error [registerUserEmail]: ${error.code},${error.message}`);
      });
  }
}
