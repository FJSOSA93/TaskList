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
  newTask = {name: ''};
  
  constructor(public navCtrl: NavController,public db: AngularFireDatabase, private toastCtrl: ToastController) {
    this.tasks = db.list('/tasks');

    // funciona para reordenar los items
    for (var x = 0; x < 5; x++) {
      this.items.push(x);
    }
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
    this.newTask = {name: ''};
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

}
 

