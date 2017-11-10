import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tasks: FirebaseListObservable<any[]>;
  items = []; // Variable para ordenar items
  status= false;
  newTask = {name: '',estado:false};
  
  
  constructor(public navCtrl: NavController,public db: AngularFireDatabase, private toastCtrl: ToastController) {
    this.tasks = db.list('/tasks');

    // funciona para reordenar los items
  
  }

  updateTask(key, name) {
    this.tasks.update(key, {name: name});
  }

  removeTask(task) {
    this.tasks.remove(task);
    this.presentToast();
  }

  addTask(newTask) {
    this.tasks.push(newTask);
    this.newTask = {name: '',estado:false};
    this.presentToastguarda();
  }


  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Se elimino la tarea',
      duration: 3000,
      position: 'down'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  presentToastguarda() {
    let toast = this.toastCtrl.create({
      message: 'Se ha guardado la tarea',
      duration: 3000,
      position: 'down'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  presentToastfinal() {
    let toast = this.toastCtrl.create({
      message: 'Excelente continua asi!',
      duration: 3000,
      position: 'down'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  Finaliza(key,estado){
    this.tasks.update(key, {estado: true});
   
    this.presentToastfinal();
  }

}
 

