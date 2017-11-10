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
    this.presentToast2();
  }

  removeTask(task) {
    this.tasks.remove(task);
    this.presentToast();
  }

  addTask(newTask) {
    this.tasks.push(newTask);
    this.newTask = {name: '',estado:false};
    
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

  Finaliza(key,estado){
    this.tasks.update(key, {estado: true});
    console.log("estado = "+estado);
  }

  presentToast2() {
    let toast = this.toastCtrl.create({
      message: 'Se completo la tarea',
      duration: 3000,
      position: 'down'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
 

