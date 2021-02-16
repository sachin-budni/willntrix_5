  
import { NgModule } from '@angular/core';
import { VideoPipe } from './blog/pipe/video.pipe';
// import { VideoPipe } from './blog/pipe/video.pipe';


@NgModule({
  declarations: [
      VideoPipe
    ],
  exports: [
    VideoPipe
  ]
})
export class ShareModule { }