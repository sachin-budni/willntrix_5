import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/core/auth.service';

@Injectable()
export class BlogService {
  private next = true;
  private prev = [];
  constructor(private auth: AuthService, private afDb: AngularFireDatabase,
              private title: Title, private meta: Meta) { }

  setTitle(title: string) {
    this.title.setTitle(title);
  }

  addTags(name: any, content: any) {
    this.meta.addTag({ name, content });
  }

  getBlogs(limit= 5, endAt?: any) {
    return endAt ? this.afDb.list('blogs', (ref: any) => ref.orderByChild('date').endAt(endAt).limitToLast(limit)) :
    this.afDb.list('blogs', (ref: any) => ref.orderByChild('date').limitToLast(limit));
  }
  getPrevBlogs(limit= 5, startAt?: any) {
    return this.afDb.list('blogs', (ref: any) => ref.orderByChild('date').startAt(startAt).limitToFirst(limit));
  }
  get getCategories() {
    return this.afDb.object('category/chips');
  }

  get getRecentlyPosts() {
    return this.afDb.list('blogs', (ref: any) => ref.limitToLast(3));
  }

  getByTitle(title: string) {
    return this.afDb.list('blogs', (ref: any) => ref.orderByChild('title').equalTo(title));
  }

  getBlog(title: string) {
    return this.afDb.object(`blogs/${title}`);
  }
  getPageViews(id: any) {
    return this.afDb.object(`views/${id}`);
  }

  getLikes(blogId: any) {
    return this.afDb.object(`likes/${blogId}`);
  }

  getCategoryWiseBlogs(chipName: any) {
    return this.afDb.list('blogs').snapshotChanges().pipe(
      map((d: any) => {
        const blogs = d.filter((b: any) => {
          const payload = b.payload.val();
          if (payload && payload['category'].includes(chipName)) {
            return { key: b.key, ...payload as any };
          }
        });
        return blogs.map((b: any) => { return { key: b.key, ...b.payload.val() as any }; });
      })
    );
  }
  get getSocialMedia() {
    const socialShare = [
      {
        name: 'facebook',
        link: `https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=${window.location.href}`
      },
      {
        name: 'whatsapp',
        link: `https://wa.me/?text=${window.location.href}`
      },
      {
        name: 'twitter',
        link: `https://twitter.com/share?url=${window.location.href}`
      }
    ];
    return socialShare;
  }

  updateLikes(id: any) {
    if (this.auth.user && this.auth.user.uid) {
      const data = {} as any;
      const uid: any = this.auth.user.uid;
      data[uid] = true;
      return this.afDb.object(`likes/${id}`).update(data);
    } else {
      alert('Please Login');
      return;
    }
  }

  blogSearch(start: any) {
    if (start && typeof start === 'object') {
      start = start.title;
    }
    return this.afDb.list('/blogs', ref => ref.orderByChild('title').limitToFirst(10).startAt(start).endAt(start + '\uf8ff'));
  }

  setNext(time: any) {
    this.next = time;
  }
  setPrev(blog: any) {
    this.prev.push(blog as never);
  }

  get getNext() {
    return this.next;
  }

  removePrev() {
    this.prev.pop();
  }

  get getPrev() {
    return this.prev;
  }

}
