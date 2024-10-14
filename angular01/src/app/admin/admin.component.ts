import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Routes,RouterModule } from '@angular/router';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HttpClientModule,CommonModule,RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit  {

  public fundraisers: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchadmin();
  }
  fetchadmin() {
   
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
      this.http.delete(`http://localhost:3000/api/fundraiser/${id}`).subscribe(() => {
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

  addForm() {
    this.router.navigate(['addadmin'])
  }

}
