import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../service/blog.service';
import { AuthService } from 'src/app/core/auth.service';
import firebase from 'firebase';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SeoService } from 'src/app/core/seo.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {

  $key: any;
  socialMedia: any[] = [];
  currentUserUid: any;
  authState: Observable<firebase.User | null> | undefined;
  blogObservable: Observable<any> | undefined;
  pageView: any;
  likes: Observable<any> | undefined;
  constructor(private route: ActivatedRoute, private blogService: BlogService, private authService: AuthService, private seo: SeoService) {
    this.socialMedia = this.blogService.getSocialMedia;
    this.route.params.subscribe(routes => {
      this.$key = routes.id.replace(/-/g, ' ');
      this.authState = this.authService.getAuthState;
      this.authState.pipe(first()).toPromise().then(user => {
        this.currentUserUid = user?.uid;
      }).catch(err => console.log(err));

      this.blogService.getByTitle(this.$key).snapshotChanges().subscribe((d: any) => {
        if (d) {
          this.blogService.setTitle(this.$key);
        }
        this.blogObservable = this.blogService.getBlog(d[0].key).snapshotChanges().pipe(
          map((blogs: any) => {
            const payload = blogs.payload.val() as any;
            if (payload.content.length !== 0) {
              this.seo.generateTags({
                title: payload.title,
                description: payload.content[0]?.paragraph?.replace(/<\/?[^>]+>/ig, ' '),
                image: payload.titleImage
              });
            }
            return { key: blogs.key, ...blogs.payload.val() as any };
          })
        );
      });

      this.pageViews(routes.id).then(view => {
        this.pageView = view ? view + 1 : 1;
        this.blogService.getPageViews(routes.id).set(this.pageView);
        this.likes = this.getLikes(routes.id);
      });

    });
  }

  ngOnInit() {
  }

  getLike(like: any) {
    return like[this.currentUserUid];
  }

  getLikes(id: any) {
    return this.blogService.getLikes(id).snapshotChanges().pipe(
      map((d: any) => {
        if (!d.payload.val()) { return 0; }
        return {count: Object.keys(d.payload.val()).length, ...d.payload.val() as any };
      })
    );
  }

  async pageViews(id: any): Promise<any> {
    return await (this.blogService.getPageViews(id).valueChanges().pipe(first()).toPromise());
  }

  updateLike() {
    this.blogService.updateLikes(this.$key);
  }

  openLink(link: any) {
    window.open(link, '_blank', 'toolbar=yes,top=500,left=500,width=400,height=400');
  }

}
