import { Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  AfterViewInit
} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import { first } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';

interface TableHeaderName {
  headerName: string;
  columnName: string;
  iconName?: 'edit' | 'delete';
  type?: 'date' | 'img';
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit {

  user$: Observable<any> | undefined;
  @ViewChild('UserProfile') UserProfile: any;
  @ViewChild('StundentRegister') StundentRegister: any;
  @ViewChild('DailyEntry') DailyEntry: any;
  @ViewChild('workshop') workshop: any;
  @ViewChild('democlass') democlass: any;
  @ViewChild('placementdata') placementdata: any;
  @ViewChild('enquiry') enquiry: any;
  // tslint:disable-next-line: max-line-length
  TabIndex = ['UserProfile', 'StundentRegister', 'DailyEntry', 'workshop', 'democlass', 'placementdata', 'enquiry'];
  // TabIndex = ['StundentRegister', 'DailyEntry', 'workshop', 'democlass', 'placementdata', 'enquiry'];
  UserProfileColumns: TableHeaderName[] = [
    { columnName: 'userId', headerName: 'User ID' },
    { columnName: 'userName', headerName: 'User Name' },
    { columnName: 'userPhoneNo', headerName: 'Phone Number' },
    { columnName: 'userEmail', headerName: 'User Email' },
    { columnName: 'lastSeen', headerName: 'Last LogIn', type: 'date' },
    { columnName: 'userProfile', headerName: 'Profile Image', type: 'img' },
    { columnName: 'Edit', headerName: 'Edit', iconName: 'edit' },
    { columnName: 'Delete', headerName: 'Delete', iconName: 'delete' }
  ];
  userColumns = this.UserProfileColumns.map(a => a.columnName);

  StudentRegisterColumns: TableHeaderName[] = [
    { columnName: 'wxid', headerName: 'WX ID' },
    { columnName: 'CandidateName', headerName: 'Student Name' },
    { columnName: 'ContactDetails', headerName: 'ContactDetails' },
    { columnName: 'Gender', headerName: 'Gender' },
    { columnName: 'Date', headerName: 'Date', type: 'date' },
    { columnName: 'ProjectCourse', headerName: 'Project Course' },
    { columnName: 'WhatsappNo', headerName: 'Whatsapp No' },
    { columnName: 'email', headerName: 'Student Email' },
    { columnName: 'joiningDate', headerName: 'Joining Date', type: 'date' },
    { columnName: 'refferedBy', headerName: 'Reffered By' }
  ];
  studentRegCol = this.StudentRegisterColumns.map(a => a.columnName);

  StudentDailyEntryColumns: TableHeaderName[] = [
    { columnName: 'UserId', headerName: 'User ID' },
    { columnName: 'wxid', headerName: 'WX ID' },
    { columnName: 'CandidateName', headerName: 'Candidate Name' },
    { columnName: 'trainerConsultant', headerName: 'Trainer Consultant' },
    { columnName: 'attendenceDate', headerName: 'Attendence Date', type: 'date' },
    { columnName: 'startTime', headerName: 'Start Time' },
    { columnName: 'entTime', headerName: 'End Time' },
    { columnName: 'reminder', headerName: 'Reminder' },
    { columnName: 'aboutClass', headerName: 'About Class' }
  ];
  studentDailyEntryCol = this.StudentDailyEntryColumns.map(a => a.columnName);

  WorkshopColumns: TableHeaderName[] = [
    { columnName: 'Name', headerName: 'Name' },
    { columnName: 'ContactNo', headerName: 'Contact No' },
    { columnName: 'email', headerName: 'Email' },
    { columnName: 'WorthyWeekendDate', headerName: 'Weekend Date', type: 'date' },
    { columnName: 'Location', headerName: 'Location' },
    { columnName: 'Native', headerName: 'Native' },
    { columnName: 'Gender', headerName: 'Gender' }
  ];
  workShopCol = this.WorkshopColumns.map(a => a.columnName);

  DemoClassColumns: TableHeaderName[] = [
    { columnName: 'name', headerName: 'Name' },
    { columnName: 'phone', headerName: 'Contact No' },
    { columnName: 'email', headerName: 'Email' },
    { columnName: 'course', headerName: 'Course' },
    { columnName: 'dob', headerName: 'Date of Attend', type: 'date' }
  ];
  demoClassCol = this.DemoClassColumns.map(a => a.columnName);

  PlacementColumns: TableHeaderName[] = [
    { columnName: 'name', headerName: 'Name' },
    { columnName: 'phone', headerName: 'Contact No' },
    { columnName: 'email', headerName: 'Email' },
    { columnName: 'deg', headerName: 'Designation' },
    { columnName: 'quil', headerName: 'Qualification' },
    { columnName: 'gender', headerName: 'Gender' },
    { columnName: 'work', headerName: 'Work', type: 'date' }
  ];
  placementCol = this.PlacementColumns.map(a => a.columnName);

  StudentEnquiryColumns: TableHeaderName[] = [
    { columnName: 'name', headerName: 'Name' },
    { columnName: 'mobileNo', headerName: 'Contact No.' },
    { columnName: 'subject', headerName: 'Subject' },
    { columnName: 'message', headerName: 'Message' },
    { columnName: 'date', headerName: 'Date', type: 'date' },
  ];
  studentEnqCol = this.StudentEnquiryColumns.map(a => a.columnName);
  data = '';
  newdata = [];
  datas: any;
  selected = 'Company';
  dataSource = new MatTableDataSource<any>([]);
  allInstituteData = {};
  filterDate: any;

  close(event: any) {
    console.log(event);
  }

  // tslint:disable-next-line: member-ordering
  @ViewChild('alertContainer', { read: ViewContainerRef, static: true }) container: any;

  // tslint:disable-next-line: member-ordering
  componentRef: ComponentRef<any> | undefined;

  constructor(private afStore: AngularFirestore, private afDB: AngularFireDatabase,
              // tslint:disable-next-line: no-shadowed-variable
              private afAuth: AngularFireAuth, private messaging: AngularFireMessaging) {
  }
  ngOnInit() {
    // this.user$ = this.afStore.collection('UserProfile').valueChanges();
    this.getPermission();
  }

  updateToken(token: string) {
    this.afAuth.authState.subscribe(user => {
      if (!user) { return; }

      const data = { [user.uid]: token };
      this.afDB.object('fcmTokens/').update(data);
    });
  }

  get requestToken(): Promise<any> {
    return this.messaging.requestToken.pipe(first()).toPromise().then(token => token);
  }

  getPermission() {
    this.requestToken.then(token => {
      this.updateToken(token);
    }).catch(err => {
      console.log('Unable to get permission to notify.', err);
    });
  }

  ngAfterViewInit() {
    this.afStore.collection<any>('UserProfile').valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.UserProfile;
    });
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  Chnage(select: any) {
    this.data = JSON.parse(this.datas[select]);
  }

  formate(data: any) {
    try {
      let d = JSON.parse(this.data);
      if (typeof d === 'string') {
        d = JSON.parse(d);
      }
      this.data = JSON.stringify(d, undefined, 4);
    } catch (e) {
      alert(e);
    }
  }



  onLinkClick(event: MatTabChangeEvent, tab: MatTabGroup) {
    switch (event.index) {
      case 0:
      case 1:
      case 2:
      case 3:
        this.afStore.collection<any>(this.TabIndex[event.index]).snapshotChanges().subscribe(d => {
          const data = d.map(d1 => {
            const data1 = d1.payload.doc.data();
            data1.id = d1.payload.doc.id;
            return data1;
          });
          this.dataSource = new MatTableDataSource(data.reverse());
          const tabName: string = this.TabIndex[event.index];
          const self: any = this;
          const obj = self[tabName] as any;
          this.dataSource.sort = obj;
        });


        break;
      // case 3:
      case 4:
      case 5:
      case 6:
        this.afDB.list(this.TabIndex[event.index]).snapshotChanges().subscribe(d => {
          const data = d.map(d1 => {
            const data1 = d1.payload.val() as any;
            data1.id = d1.payload.key;
            return data1;
          });
          this.dataSource = new MatTableDataSource(data.reverse());
          const tabName: string = this.TabIndex[event.index];
          const self: any = this;
          const obj = self[tabName] as any;
          this.dataSource.sort = obj;
        });
        break;
      case 7: {
        this.afDB.object('Institutes/-LaqbRlsrJ1qxQ9bERS1').valueChanges().subscribe((d: any) => {
          this.allInstituteData = d;
          this.data = d.Company;
          this.data = JSON.stringify(d.Company, undefined, 4);
        });
      }
      break;
    }
  }
}
