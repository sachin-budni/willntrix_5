import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AuthService } from './core/auth.service';
import firebase from 'firebase';
import { IconSocialMedia } from './core/SocilaIcon';
import { iconSocialMedia } from './core/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mobileQuery: MediaQueryList;
  spinnerFlag = true;
  // tslint:disable-next-line: variable-name
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              private auth: AuthService,
              public dialog: MatDialog,
              private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.assetsIcons();

    // interval(2000).subscribe(() => {
    //   this.spinnerFlag = true;
    // });
    this.mobileQuery = media.matchMedia('(max-width: 900px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  assetsIcons() {
    // this.iconRegistry.addSvgIcon('facebook', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/facebook.svg'));
    this.iconRegistry.addSvgIcon('twitter', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/twitter.svg'));
    // this.iconRegistry.addSvgIcon('instagram', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/instagram.svg'));
    this.iconRegistry.addSvgIcon('whatsapp', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/whatsapp.svg'));
    this.iconRegistry.addSvgIcon('whatsappicon', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/whatsapp_app.png'));
  }

  sendMessage(social: IconSocialMedia) {
    window.open(social.url, '_blank');
    // switch (social.route) {
    //   case 'whatsapp':
    //     window.open('https://wa.me/918722443194', '_blank');
    //     break;
    //   case 'messager':
    //     window.open('https://m.me/willntrix', '_blank');
    //     break;
    //   case 'instagram':
    //     window.open('https://www.instagram.com/direct/t/340282366841710300949128117640330200706', '_blank');
    //     break;
    //   case 'email':
    //     window.open('mailto:shrishailr.willntrix@gmail.com', '_blank');
    //     break;
    //   case 'sms':
    //     window.open('sms:+918722443194', '_blank');
    //     break;
    //   case 'dial':
    //     window.open('tel:8722443194', '_blank');
    //     break;
    // }
  }
  get socialIcon(): IconSocialMedia[] {
    return iconSocialMedia;
  }
  logOut() {
    return this.auth.logout()
  }

  get currentUser(): Observable<firebase.User | null> {
    return this.auth.currentUser;
  }

  // openDiscount(): void {
  //   this.dialog.open(DiscountComponent, {
  //     disableClose: true,
  //     maxWidth: '100vw',
  //     // panelClass: 'my-class'
  //   });
  // }
}
