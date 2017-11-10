import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tasks: FirebaseListObservable<any[]>;
  items = []; // Variable para ordenar items
  
  newTask = {name: ''};
  
  constructor(public navCtrl: NavController,public db: AngularFireDatabase) {
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
  }

  addTask(newTask) {
    this.tasks.push(newTask);
    this.newTask = {name: ''};
  }

  // re ordenar items
  reorderItems(indexes) {
    let element = this.items[indexes.from];
    this.items.splice(indexes.from, 1);
    this.items.splice(indexes.to, 0, element);
  }

}
 

