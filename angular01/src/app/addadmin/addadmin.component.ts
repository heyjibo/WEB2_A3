import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {FormSubmittedEvent} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { Routes,RouterModule } from '@angular/router';
import { response } from 'express';
import { error } from 'console';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-fundraiser',
  standalone: true,
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css'],
  imports: [HttpClientModule,RouterModule,FormsModule,CommonModule],
})
export class AddadminComponent {
  fundraiserId: string | undefined;
  pageTitle: string = 'Create New Fundraiser';
  fundraiser: any = {
    ORGANIZER: '',
    CAPTION: '',
    TARGET_FUNDING: null,
    CURRENT_FUNDING: 0,
    CITY: '',
    ACTIVE: '1',
    CATEGORY_ID: null
  };

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.fundraiserId = params['id'];
      if (this.fundraiserId) {
        this.pageTitle = 'Update Fundraiser';
        this.fetchFundraiserDetails();
      }
    });
  }

  fetchFundraiserDetails() {
    this.http.get(`http://localhost:3000/api/fundraiser/${this.fundraiserId}`).subscribe((response: any) => {
      this.fundraiser = response;
    }, error => {
      console.error('Error fetching fundraiser data:', error);
      alert('An error occurred while fetching the fundraiser data.');
    });
  }

  onSubmit(){
    
    const method = this.fundraiserId ? 'PUT' : 'POST';
    console.log(method)
    const url = this.fundraiserId ? `http://localhost:3000/api/fundraiser/${this.fundraiserId}` : 'http://localhost:3000/api/fundraiser';
    console.log(url)
    debugger
    if(this.fundraiserId){
      this.http.put(`http://localhost:3000/api/fundraiser/${this.fundraiserId}`, this.fundraiser).subscribe(response => {
        console.log(response)
        alert(this.fundraiserId ? 'Fundraiser updated successfully!' : 'Fundraiser created successfully!');
        window.history.back();
      }, error => {
        console.error('Error:', error);
        alert(`An error occurred while ${this.fundraiserId ? 'updating' : 'creating'} the fundraiser.`);
      });
    }else{
      this.http.post('http://localhost:3000/api/fundraiser',this.fundraiser ).subscribe(response => {
        console.log(response)
        alert(this.fundraiserId ? 'Fundraiser updated successfully!' : 'Fundraiser created successfully!');
        window.history.back();
      },error => {
        console.error('Error:', error);
        alert(`An error occurred while ${this.fundraiserId ? 'updating' : 'creating'} the fundraiser.`);
      });
    }
  }
}