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
  dataCitas: { [key: string]: { nombre: string, titulo: string, fecha: string, hora: string, descripcion: string, uid: string } } = {};

  constructor(private afAuth: AngularFireAuth,
      private router: Router) { }

  ngOnInit(): void {
    this.afAuth.currentUser.then(user => {
      if(user && user.emailVerified) {
        const app = initializeApp(environment.firebase);
        const db = getDatabase(app);
        const databaseRef = ref(db, '/citas_usuario/');
        onValue(databaseRef, (snapshot) => {
        this.dataCitas = snapshot.val();
        // console.log(this.dataCitas); // Maneja los datos como desees
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
