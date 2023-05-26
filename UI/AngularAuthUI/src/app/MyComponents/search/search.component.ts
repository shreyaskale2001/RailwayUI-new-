import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
// import Swal from 'sweetalert2'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  startDate: string = "";
  ArrivalLocation: string = "";
  DestinationLocation: string = "";
  currentDate: string = new Date().toISOString().slice(0, 10);
  resultArray!:any[];
  responseStatusCode!:number;

  constructor(private auth:AuthService, private router:Router){}

  onSubmit() {

    if (this.startDate.trim() == "" || this.ArrivalLocation.trim() == "" || this.DestinationLocation.trim() == "") {
      alert("Please Enter All The Details!");
      // Swal.fire({
      //   title: 'Error!',
      //   text: 'Please Enter All The Details!',
      //   icon: 'error',
      //   confirmButtonText: 'Ok'
      // });
    }
    else {
      console.log(this.startDate + " " + this.ArrivalLocation + " " + this.DestinationLocation);
      this.auth.search({
        startDate: this.startDate,
        ArrivalLocation: this.ArrivalLocation,
        DestinationLocation: this.DestinationLocation
      }).subscribe({
        next:(res)=>{
          this.resultArray=res;
        },
        error:(err)=>{
          this.resultArray=[];
          alert(err?.error.message);
          // Swal.fire({
          //   title: 'Error!',
          //   text: err?.error.message,
          //   icon: 'error',
          //   confirmButtonText: 'Ok'
          // });
        }
      });
    }
  }
  bookBtn(TId:number){
    // alert(TId);
    this.router.navigate(['booking'], {queryParams:{id:TId}});
  }
}
