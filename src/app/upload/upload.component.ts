import { MediaService } from './../services/media.service';
import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { Response } from '_debugger';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})


export class UploadComponent implements OnInit {
  file: File;
  @ViewChild('title') title: ElementRef;
  @ViewChild('description') description: ElementRef;
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
          alert('Error!');
          this.router.navigate(['/front']);
        }
      );
    } else {
      alert('Login first');
      this.router.navigate(['login']);
    }
  }
}
