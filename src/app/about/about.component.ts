import { Component, OnInit } from '@angular/core';
// import { SeoService } from '../core/seo.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  // constructor(private seo: SeoService) {
  //   this.seo.generateTags({
  //     title: 'Willntrix - AboutUs',
  //     // tslint:disable-next-line: max-line-length
  //     description: 'Willntrix is a learning institute Organized by well professionalized trainers having rich corporate training skills and consulting experience that helps to endure the learning skills for the student.',
  //     image: 'https://www.willntrix.com/assets/Logo_v6.png'
  //   });
  // }

  ngOnInit() {
  }
  // tslint:disable-next-line: member-ordering
  contetnt =[
    // tslint:disable-next-line: max-line-length
    'At Willntrix, we make it our aim to make you excel in Microsoft Excel by providing you with the training of the best in the field experts. With our community of Excel Experts you get trained on Advance excel and VBA (Macro) which makes you to create VBA projects and fix/solution for all your basic and advanced excel needs with just one click of your mouse. “Willntrix” is a youth institute working for the excellence in IT Training, Consulting and outsourcing. Our Trainers are working in IT firms in Bangalore and they give live project examples for a better understanding. Combined together, Willntrix can solve the most complex of Excel queries that you might have. We can assist you in all your Excel related queries and difficulties. Be it the matter of creating interactive spreadsheets or designing complex dashboards, you name we will train you on it . ',
    // tslint:disable-next-line: max-line-length
    'We also know the only way you truly understand a subject is by practicing it in a real environment. This is why we’ve set flexible timings according to free time.We provide questions and challenges. If you are not able come on particular day, you will be given task through mail.',
    // tslint:disable-next-line: max-line-length
    'So, what are you waiting for? Join our dynamic community today and Get Better at Excel! We love to hear from you. You can get in touch with us at (www.willntrix.com) for enrolling into our institution.'
  ]

  aboutContet = [
   'Willntrix is a learning institute Organized by well professionalized trainers having rich corporate training skills and consulting experience that helps to endure the learning skills for the student.',
     'Willntrix takes an opportunity to enrich the knowledge of every learner.We aim to excel you in Microsoft Excel by providing the best training with the help of experts ,which can help you to expertise in the field of Advance excel and VBA (macro)',
      'These courses help you to create VBA projects, solution for all your basics and in development of your creative ideas \'Willntrix\' is that institute where all the youth brains with super excellence and dedication are working.',
   'We mainly focus to blossom ideas in IT training, consulting and outsourcing.',
       'We have various expertise trainers who are working in enormous fields related   to IT, Excel and many other courses.',
'They help every learner to gain maximum knowledge about courses by their smart training skills.',
    'Willntrix mainly focus to solve almost all the complex queries that anyone could have and assist you in all excel related queries.',
  'We are here to provide you with all the flexible and proper facility that every learner wish to have been while learning '
  ]
  vision=[
    'To be recognized as a premier technical institute of learning process, developing skills and promoting innovative and creative ideas that inspires young minds.'
  ]
  mision=[
    'To pursue excellence through student centric  dynamic teaching - learning process',
    'To provide quality education for development of innovative minds ',
    'To imbibe moral and ethical values for better learning'
  ]

}
