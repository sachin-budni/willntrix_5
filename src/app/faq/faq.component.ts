import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { SeoService } from '../core/seo.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor(private seo: SeoService) {
    this.seo.generateTags({
      title: 'Willntrix - FAQ\'s',
      description: 'Can I get free demo class on Advance MIS and Data analytics before joining?',
      image: 'https://www.willntrix.com/assets/faq.svg'
    });
  }

  get faqs() {
    return this.seo.fAQContent;
  }
  ngOnInit() {
  }
}
