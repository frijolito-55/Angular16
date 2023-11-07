import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-subirreceta',
  templateUrl: './subirreceta.component.html',
  styleUrls: ['./subirreceta.component.css']
})
export class SubirrecetaComponent implements OnInit {
  dataUser: any;
  archivoSeleccionado: File | null = null;
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.afAuth.currentUser.then(user => {
      if (user && user.emailVerified) {
        this.dataUser = user;
        console.log(user);
        // this.subirPDF();
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  logOut() {
    this.afAuth.signOut().then(() => this.router.navigate(['/login']));
  }

  // seleccionarArchivo(event: any): void {
  //   this.archivoSeleccionado = event.target.files[0];
  // }

  // subirPDF(): void {
  //   if (this.archivoSeleccionado) {
  //     const filePath = `pdfs/${Date.now()}_${this.archivoSeleccionado.name}`;
  //     const referencia = this.storage.ref(filePath);
  //     const tarea = referencia.put(this.archivoSeleccionado);

  //     tarea.then(() => {
  //       console.log('PDF subido con éxito');
  //     }).catch(error => {
  //       console.error('Error al subir el PDF:', error);
  //     });
  //   }
  // }

  selectImage() {
    // Hacer clic en el campo de entrada de archivo oculto
    this.fileInput?.nativeElement.click();
  }

  async onFileChange(event:any){
    const file = event.target.files[0]
    if(file){
      const path = `receta_medica/${file.name}`
      const uploadTask =await this.storage.upload(path,file)
      const url = await uploadTask.ref.getDownloadURL()
      console.log(url)
    }
  }
}