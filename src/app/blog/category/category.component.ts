import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../service/blog.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  blogs: Observable<any> | undefined;
  constructor(private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router) {
    this.route.params.subscribe(routes => {
      let id = routes.id;
      this.getCategoryBlogs(id);
    })
  }

  ngOnInit() {
  }

  shareBlog(Url: any, title: any) {
    const shareURL = 'https://www.willntrix.com/blog/' + encodeURI(this.getTitle(title));
    window.open(Url + shareURL, '_blank', 'toolbar=yes,top=500,left=500,width=400,height=400')
  }

  getTitle(title: any) {
    return title.replace(/ /g, '-');
  }

  getCategoryBlogs(chipName: any) {
    this.blogs = this.blogService.getCategoryWiseBlogs(chipName);
  }
  getBlog(title: string) {
    this.router.navigate(['/blog', title.replace(/ /g, '-')]);
  }
}
