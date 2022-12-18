import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private _currentPost = new BehaviorSubject({});

  constructor(
    private router: Router,
    private db: AngularFirestore,
    private authService: AuthService
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
            // throw new Error('Error');
          });
        })
      );
  }

  getAllByUserId(userId: string) {
    return this.db
      .collection('posts', (ref) => ref.where('uid', '==', userId))
      .get();
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
      date: new Date().toString(),
      likes: [],
      comments: [],
    };

    this.db.collection('posts').doc(id).set(post);
    this.router.navigate(['/posts']);
  }

  update(id: string, data: {}): any {
    this.db.collection('posts').doc(id).update(data);
    this.router.navigate(['/posts']);
  }

  del(id: string) {
    this.db
      .collection('posts')
      .doc(id)
      .delete()
      .then(function () {
        console.log('Document successfully deleted!');
      })
      .catch(function (error) {
        console.log('Error removing document: ', error);
      });
  }

  getCurrentPost() {
    return this._currentPost.asObservable();
  }

  setCurrentPost(data: {}) {
    this._currentPost.next(data);
  }

  likePost(id: string, data: {}) {
    this.db.collection('posts').doc(id).update(data);
  }

  addComment(newComments: {}, selectedId?: string) {
    this.db.doc('posts/' + selectedId).update({ comments: newComments });
  }

  cancelSubscriptions() {}
}
