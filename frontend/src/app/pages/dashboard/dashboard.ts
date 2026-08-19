import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  data: any = {
    totalBooks: 0,
    availableBooks: 0,
    unavailableBooks: 0,
    totalBorrows: 0
  };

  constructor(
    private http: HttpClient,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getDashboard();
  }

  getDashboard(): void {

    this.http.get<any>(
      'http://localhost:3000/api/dashboard'
    ).subscribe({

      next: (response) => {

        console.log(
          'DASHBOARD RESPONSE:',
          response
        );

        this.data = response.data;

        console.log(
          'DASHBOARD DATA:',
          this.data
        );

        this.changeDetector.detectChanges();

      },

      error: (error) => {

        console.error(
          'DASHBOARD ERROR:',
          error
        );

      }

    });

  }

}