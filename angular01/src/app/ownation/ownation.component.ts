import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Routes,RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-ownation',
  standalone: true,
  imports: [HttpClientModule,CommonModule,RouterModule,FormsModule],
  templateUrl: './ownation.component.html',
  styleUrl: './ownation.component.css'
})
export class OwnationComponent {
  fundraiserId: string | undefined;
  fundraiser: any = {};
  public donation: any = {
    donorName: '',
    donationAmount: 5
  };
  amountError: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.fundraiserId = params['id'];
      this.fetchFundraiserDetails();
    });
  }

  fetchFundraiserDetails() {
    this.http.get(`http://localhost:3000/api/fundraiser/${this.fundraiserId}`).subscribe((response: any) => {
      this.fundraiser = response;
      console.log( this.fundraiser)
    }, error => {
      console.error('Error fetching fundraiser data:', error);
      alert('An error occurred while fetching the fundraiser data.');
    });
  }

  onSubmit() {
    this.amountError = '';

    if (this.donation.donationAmount < 5) {
      this.amountError = 'Minimum donation amount is $5';
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0]; 
    console.log(this.donation)
    this.http.post('http://localhost:3000/api/donation', {
      fundraiser_id: this.fundraiserId,
      giver_name: this.donation.donorName,
      date: currentDate,
      amount: this.donation.donationAmount
    }).subscribe(response => {
      alert(`Thank you for donating to ${this.fundraiser.ORGANIZER}!`);
      this.router.navigate([`/fundraiser`], { queryParams: { id: this.fundraiserId } });
    }, error => {
      console.error('Error:', error);
      alert('An error occurred while submitting the donation.');
    });
  }
}
