import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPost } from './post.model';
import { AuthService } from '../auth/auth.service';
import { UIService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private router: Router,
    private db: AngularFirestore,
    private authService: AuthService,
    private uiService: UIService
  ) {}

  getAll() {
    return this.db
      .collection('posts')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            const data: any = doc.payload.doc.data();
            return { ...data };
          });
        })
      );
  }

  getOneById(id: string) {
    return this.db.collection('posts').doc(id).snapshotChanges();
  }

  create(data: any) {
    const id = this.db.createId();
    const user = this.authService.getUser();
    const post = {
      ...data,
      id: id,
      uid: user.uid,
      author: user.name,
      authorEmail: user.email,
      date: new Date(),
      likes: [],
      comments: [],
    };

    this.db.collection('posts').doc(id).set(post);
    this.router.navigate(['/posts']);
  }

  update() {}

  del() {}

  cancelSubscriptions() {}
}
