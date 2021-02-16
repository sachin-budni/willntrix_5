import { Component, OnInit } from '@angular/core';
import { BlogService } from '../service/blog.service';
import { map, switchMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  $items: Observable<any> | undefined;
  $blogs: any[] = [];
  limit = 5;
  bolgs = [];
  constructor(private blogService: BlogService, private router: Router, private title: Title) {
    this.title.setTitle('WillntriX - Blogs');
    this.getBlogs();
  }

  ngOnInit() {
  }

  // nextMove(blogs) {
  //   this.setNext(blogs.length !== this.limit);
  //   return blogs.length !== this.limit ? blogs : blogs.slice(1, (this.limit));
  // }

  setNext(time: any) {
    this.blogService.setNext(time);
  }
  setPrev(time: any) {
    this.blogService.setPrev(time);
  }

  get next() {
    return this.blogService.getNext;
  }

  get prev() {
    return this.blogService.getPrev;
  }
  removePrev() {
    this.blogService.removePrev();
  }

  getBlogs(time?: any) {
    this.$items = this.blogService.getBlogs(this.limit, time).snapshotChanges().pipe(
      map(blogs => {
        return this.mapArrayData(blogs).reverse();
      })
    );
    this.$items.subscribe((blogs: any) => {
      window.scroll(0, 0);
      this.$blogs = blogs.length !== this.limit ? blogs : blogs.filter((v: any, i: any) => i !== (this.limit - 1));
      this.setNext(blogs.length === this.limit ? blogs[this.limit - 1].date + 5 : undefined);
    });
  }
  nextPage() {
    if (this.$blogs.length !== 0) {
      this.setPrev(this.$blogs[0].date + 10);
    }
    this.getBlogs(this.next);
  }

  mapArrayData(blogValue: any) {
    return blogValue.map((blog: any) => {
      const blogPlayload = blog.payload.val() as any;
      return { key: blog.key, ...blogPlayload };
    });
  }

  prevPage() {
    const last = this.prev.pop();
    this.getBlogs(last);
  }

  shareBlog(Url: any, title: any) {
    window.open(Url + encodeURI('https://www.willntrix.com/blog/' + this.getTitle(title)),
      '_blank', 'toolbar=yes,top=500,left=500,width=400,height=400');
  }

  getBlog(title: string) {
    this.router.navigate(['/blog', title.replace(/ /g, '-')]);
  }
  getTitle(title: any) {
    return title.replace(/ /g, '-');
  }

}
