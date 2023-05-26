import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  userName: string="";
  age: string="";
  gender: string="";
  ticketType: string="";
  TrainNo: number=0;
  passanger:number=0;

  row:any;

  private routeSubscription!: Subscription;
  constructor(private route:ActivatedRoute, private auth:AuthService, private router:Router){}

  ngOnInit() {
    this.routeSubscription = this.route.queryParamMap.subscribe(params => {
      this.TrainNo = Number(params.get('id'));
    });
      // alert(this.journeyId);
      this.auth.getTrainById(this.TrainNo).subscribe({
        next:(res)=>{
          this.row=res;
        },
        error:(err)=>{
          this.row=null;
          // Swal.fire({
          //   title: 'Error!',
          //   text: err?.error.message,
          //   icon: 'error',
          //   confirmButtonText: 'Ok'
          // });
          alert("Error");
        }
      });
  }

  onSubmit(){
    console.log(this.userName+" "+this.age+" "+this.gender+" "+this.ticketType+" "+this.TrainNo + " " +this.passanger);
    this.auth.bookTicket({
      userName: this.userName,
      age: this.age,
      gender: this.gender,
      ticketType: this.ticketType,
      TrainNo: this.TrainNo,
      passanger:this.passanger
    }).subscribe({
      next:(res)=>{
      //   Swal.fire({
      //     title: 'Success!',
      //     text: "Your Ticket is Booked Successfully! - SeatNo: "+res.seatNo+", Airline: "+res.airline+", Booking ID: "+res.bookingId,
      //     icon: 'success',
      //     confirmButtonText: 'Ok'
        //});
        alert("Sucsess");
        this.router.navigate(["home"]);
      },
      error:(err)=>{
        // Swal.fire({
        //   title: 'Error!',
        //   text: err?.error.message,
        //   icon: 'error',
        //   confirmButtonText: 'Ok'
        // });
        alert("Error backend");
      }
    });
  }
}
