<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
=======
import { Component } from '@angular/core';
>>>>>>> a081836f245d328b349da0525d944f7704ebe4e3

@Component({
  selector: 'app-mispacientes',
  templateUrl: './mispacientes.component.html',
  styleUrls: ['./mispacientes.component.css']
})
<<<<<<< HEAD
export class MispacientesComponent  implements OnInit{
  dataUser: any;

  constructor(private afAuth: AngularFireAuth,
    private router: Router) { }

ngOnInit(): void {
  this.afAuth.currentUser.then(user => {
    if(user && user.emailVerified) {
      this.dataUser = user;
      console.log(user)
    } else {
      this.router.navigate(['/login']);
    }
  })
}

logOut() {
  this.afAuth.signOut().then(() => this.router.navigate(['/login']));
}

=======
export class MispacientesComponent {
>>>>>>> a081836f245d328b349da0525d944f7704ebe4e3

}
