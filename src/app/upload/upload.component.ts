import { MediaService } from './../services/media.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { Response } from '_debugger';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})


export class UploadComponent implements OnInit {
  file: File;
  title = '';
  description = '';
  constructor(private mediaService: MediaService,
              private router: Router) { }

  ngOnInit() {
  }

  setFile(evt: any) {
    console.log(evt.target.files[0]);
    this.file = evt.target.files[0];
  }

  startUpload() {
    if (localStorage.getItem('token') !== null) {
      this.mediaService.uploadFile(this.file, this.title, this.description).subscribe(
        (data: any) => {
          console.log(data);
          alert('Upload successfully');
          this.router.navigate(['/front']);
        }, (error: HttpErrorResponse) => {
          console.log(error);
          this.router.navigate(['/front']);
        }
      );
    } else {
      this.router.navigate(['login']);
    }
  }
}
