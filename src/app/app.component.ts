import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Grammark';
}

// @Component()
// export class SomeComponent {

//   constructor(private db: AngularFirestore) {
//       const things = db.collection('things').valueChanges();
//       things.subscribe(console.log);
//   }
// }

