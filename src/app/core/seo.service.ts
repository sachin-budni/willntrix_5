import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

export interface Config {
  title: string;
  description: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  fAQContent = [
    {
      no: '1.  ',
      que: 'Can I get free demo class on Advance MIS and Data analytics before joining?',
      ans: 'Yes, you can get a demo class free of cost for all the courses. Demo class is conducted so that candidate can get the live training session from the corporate trainers and enrol our program to get the best facilities'
    },
    {
      no: '2.  ',
      que: 'Why should I join Willntrix for Advanced Excel and VBA (macros) training?',
      ans: 'We are the leading training Institute for Adv. Excel and VBA. If you wish to make the career in Analytics / MIS field, you are at the right place. After completion of training, you will be getting placed in reputed companies.'
    },
    {
      no: '3.  ',
      que: 'As a non-technical person can I take Excel / VBA training?',
      ans: 'Our training course is for both technical and non-technical person. If you have problem-solving skills and ability to manage time and resources, this course is suitable for you'
    },
    {
      no: '4.  ',
      que: 'Will I get practical exposure during my training?',
      ans: 'Our training programs provide complete practical training along with theory. You will get classroom training, workshops and other facilities.'
    }
  ];

  constructor(private title: Title, private meta: Meta) { }

  generateTags(config: Config) {
    this.title.setTitle(config.title);

    this.meta.updateTag({ name: 'twitter:site', content: 'Willntrix' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image });

    this.meta.updateTag({ property: 'og:type', content: 'Education Institute' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Willntrix' });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: config.image });
  }
}
