import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Routes,RouterModule } from '@angular/router';
@Component({
  selector: 'app-fundraiser',
  standalone: true,
  imports: [HttpClientModule,CommonModule,RouterModule],
  templateUrl: './fundraiser.component.html',
  styleUrl: './fundraiser.component.css'
})
export class FundraiserComponent {

  fundraiserId: number | undefined;

  fundraiser: any = {};
  donations: any[] = [];


  constructor(private route: ActivatedRoute,private http: HttpClient, private router: Router) { 
    
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((res)=>{
      this.fundraiserId = res['id']
      this.http.get(`http://localhost:3000/api/fundraisers/${this.fundraiserId}`).subscribe((response: any) => {
      this.fundraiser = response.fundraiser;
      this.donations = response.donations;
      }, error => {
        console.error('Error fetching fundraisers:', error);
      });
      
    })
  }
}
