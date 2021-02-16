import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'video'
})
export class VideoPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }
  transform(url: string): any {
    let link: string;
    if (url && url.indexOf('watch?v=') !== -1) {
      link = url.replace('watch?v=', 'embed/');
    } else {
      link = url;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }

}
