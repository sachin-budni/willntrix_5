import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AdminService } from '../service/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { QuillConfig } from 'ngx-quill';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-blog-admin',
  templateUrl: './blog-admin.component.html',
  styleUrls: ['./blog-admin.component.scss']
})
export class BlogAdminComponent implements OnInit {
  maxFileSize = 200 * 1024;
  constructor(private fb: FormBuilder, private adminSerivce: AdminService, private routes: ActivatedRoute,
              private dialog: MatDialog, private router: Router) {
    this.adminSerivce.fetchCategoryData().then((data: any) => {
      if (data[0]) {
        this.categoryChips = data[0];
      }
    });
  }

  get contentForm() {
    return this.adminForm?.get('content') as FormArray;
  }

  categoryChips = [];
  selectedCategotyChips = [];
  chip = '';
  user: any;
  productForm: FormGroup = this.fb.group({});
  adminForm: FormGroup = this.fb.group({});

  selectedValue = 0;
  selectedCar: string | undefined;
  editData: any;
  quillConfig: QuillConfig = {
    modules: {
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          ['link'],
          [{ color: [] }, { background: [] }],
          [{ script: 'sub' }, { script: 'super' }],
          ['blockquote', 'code-block'],            // custom button values
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ size: ['10px', '20px', '80px'] }]
        ]
      }
    }
  };


  jsonFormate = { title: 'sachin', authorName: 'shiva', content:
  [{ paragraph: 'gsgdfgdfgfd' }, { image: '' }, { link: '' }, { image: '' }] };
  images = '';

  allData: Observable<any> | undefined;

  ngOnInit() {
    this.routes.params.subscribe(route => {
      if (route.id) {
        this.blogEdit(route.id);
      }
    });
    this.adminForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      authorName: ['', [Validators.required, Validators.minLength(2)]],
      titleImage: ['', [Validators.required, Validators.minLength(5)]],
      content: this.fb.array([])
    });
    this.adminSerivce.authData.subscribe(user => {
      this.user = user;
      this.adminForm?.get('authorName')?.setValue(this.user.displayName);
    });
  }

  getControllerValue(item: any) {
    return item.controls.image.value;
  }

  addSellingPoint(name: any) {
    switch (name) {
      case 'paragraph':
        this.contentForm.insert(this.selectedValue, this.fb.group({ paragraph: '' }));
        break;
      case 'image':
        this.contentForm.insert(this.selectedValue, this.fb.group({ image: '' }));
        break;
      case 'link':
        this.contentForm.insert(this.selectedValue, this.fb.group({ link: '' }));
        break;
    }
    this.selectedValue = this.contentForm.length;
  }

  blogEdit(id: any) {
    this.adminSerivce.blog(id).valueChanges().subscribe(data => {
      if (data) {
        this.setValueToFormControls(data);
        this.editData = id;
      }
    });
  }

  setValueToFormControls(data: any) {
    this.adminForm?.get('title')?.setValue(data.title);
    this.adminForm?.get('titleImage')?.setValue(data.titleImage);
    this.adminForm?.get('authorName')?.setValue(data.authorName);
    this.selectedCategotyChips = data.category;

    this.setContentValues(data.content);
  }

  setContentValues(content: any) {
    for (let i = 0; i < content.length; i++) {
      const controlName = Object.keys(content[i])[0];
      this.addSellingPoint(controlName);
      const controllerIndex = this.contentForm.controls[i] as any;
      const name = controllerIndex['controls'];
      name[controlName].setValue(content[i][controlName])
    }
  }

  update() {
    this.jsonFormate.content.forEach(element => {
      const f1 = this.fb.group(element);
      this.contentForm.push(f1);
    });
  }

  containValue(item: any, name: string): any {
    return item.contains(name)
  }

  drop(event: CdkDragDrop<any>) {
    console.log(event);
    console.log(this.contentForm);
    moveItemInArray(this.contentForm.controls, event.previousIndex, event.currentIndex);
  }

  uplaod(event: any, name: any, index: any) {
    const files: any = event.srcElement.files;
    if (files.length !== 0 && files.item(0).size >= this.maxFileSize) {
      alert('Maximum 200KB allowed');
      return;
    }
    const imagePercentage = this.adminSerivce.uploadImages(files);
    imagePercentage.subscribe((d: any) => { }, err => { }, () => {
      this.adminSerivce.getImage(files.item(0).name).subscribe(s => {
          if (index || index === 0) {
            const controllert: any = this.contentForm.controls[index] as any;
            const name: any =controllert['controls'];
            name.image.setValue(s as string);
          } else {
            this.adminForm?.controls[name].setValue(s as string);
          }
      });
    });
  }

  getData(item: any) {
    this.allData = this.adminSerivce.getDataDB();
  }


  onSubmit(value: any) {
    if (this.adminForm?.valid && this.selectedCategotyChips.length > 0) {
      value.id = this.user.uid;
      value.category = this.selectedCategotyChips;
      if (this.editData) {
        this.adminSerivce.blog(this.editData).update(value);
      } else {
        this.adminSerivce.addBlog(value).then((data: any) => {
          console.log(data);
        }).catch((err: any) => {
          console.log(err);
        });
      }
      for (let i = 0; i < this.selectedCategotyChips.length; i++) {
        if (!this.categoryChips.includes(this.selectedCategotyChips[i])) {
          this.categoryChips.push(this.selectedCategotyChips[i]);
        }
      }
      this.addChips(this.categoryChips);
      this.router.navigate(['blog']);
    }
  }

  addChips(data: any) {
    this.adminSerivce.addChips(this.categoryChips as any);
  }

  deleteSellingPoint(index: any) {
    this.contentForm.removeAt(index);
  }

  remove(index: number) {
    this.selectedCategotyChips.splice(index, 1);
  }

  addChip(chipName: string) {
    if (!this.selectedCategotyChips.includes(chipName as never)) {
      this.selectedCategotyChips.push(chipName as never);
    }
  }

  addCatogoryChip(event: any) {
    if (event.target.value.length > 3 && !this.selectedCategotyChips.includes(event.target.value as never)) {
      this.selectedCategotyChips.push(event.target.value as never);
    }
    event.target.value = '';
  }


}
