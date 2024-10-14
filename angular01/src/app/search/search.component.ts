import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes,RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule,HttpClientModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  searchParams = {
    organizer: '',
    city: '',
    category: ''
  };
  fundraisers: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  onSearch() {
    const queryParams = new URLSearchParams(this.searchParams).toString();
    this.http.get(`http://localhost:3000/api/search?${queryParams}`).subscribe((results: any) => {
      if (results == null) {
        this.fundraisers = [];
        alert('No fundraisers found.');
      } else {
        this.fundraisers = results;
      }
    }, error => {
      console.error('Error searching fundraisers:', error);
    });
  }

  clearForm() {
    this.searchParams = {
      organizer: '',
      city: '',
      category: ''
    };
    this.fundraisers = [];
  }

  goHome() {
    window.history.back();
  }

}
