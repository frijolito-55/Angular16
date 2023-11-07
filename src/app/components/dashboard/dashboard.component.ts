import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  dataUser: { [key: string]: { correo: string, nombre: string, uid: string } } = {};

  constructor(private afAuth: AngularFireAuth,
      private router: Router) { }

  ngOnInit(): void {
    this.afAuth.currentUser.then(user => {
      if(user && user.emailVerified) {
        // this.dataUser = user;
        // console.log(user)
        const app = initializeApp(environment.firebase);
        const db = getDatabase(app);
        const databaseRef = ref(db, '/Usuarios/');
        // onValue(databaseRef, (snapshot) => {
        //   const dataUser: { [key: string]: { correo: string, nombre: string, uid: string } } = snapshot.val();
        //   console.log(dataUser); // Maneja los datos como desees
        // });
        onValue(databaseRef, (snapshot) => {
          this.dataUser = snapshot.val();
          console.log(this.dataUser); // Maneja los datos como desees
        });
      } else {
        this.router.navigate(['/login']);
      }
    })
  }

  logOut() {
    this.afAuth.signOut().then(() => this.router.navigate(['/login']));
  }

}
export class DashoardComponent {

}
