import { Component, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HttpClientModule,CommonModule,RouterModule ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent  {

  public fundraisers: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchFundraisers();
  }

  run() {
    alert("After clicking, the run() method was executed")
  }

  fetchFundraisers() {
   
    this.http.get('http://localhost:3000/api').subscribe((response: any) => {
      console.log(response)
      this.fundraisers = response;
    }, error => {
      console.error('Error fetching fundraisers:', error);
    });
  }

  viewDetails(id: number) {
    this.router.navigate(['/fundraiser', id]);
  }

  searchForm() {
    this.router.navigate(['/search']);
  }

  updateFundraiser(id: number) {
    console.log('Updating fundraiser with ID:', id);
    this.router.navigate(['/addadmin', id]);
  }

  deleteFundraiser(id: number) {
    if (confirm('Are you sure you want to delete this fundraiser?')) {
      this.http.delete(`/api/fundraiser/${id}`).subscribe(() => {
        this.fundraisers = this.fundraisers.filter(fundraiser => fundraiser.FUNDRAISE_ID !== id);
        alert('Fundraiser deleted successfully!');
      }, error => {
        console.error('Error deleting fundraiser:', error);
        alert('An error occurred while deleting the fundraiser.');
      });
    }
  }

  back() {
    this.router.navigate(['/']);
  }

  onButtonClick() {
    this.router.navigate(['/admin']);
  }

  handleClick(){
    console.log(12313213)
  }
}
