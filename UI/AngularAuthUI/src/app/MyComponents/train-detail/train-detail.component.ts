import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { UserdataService } from 'src/app/Services/userdata.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-train-detail',
  templateUrl: './train-detail.component.html',
  styleUrls: ['./train-detail.component.css']
})
export class TrainDetailComponent {

  journeyIdN!:number;

  trainNo!:string;
  trainName!: string;
  arrivalLocation!: string;
  destinationLocation!: string;
  startDate!: Date;
  journeyTime!: number;
  seatCount_AC1tire!: number;
  seatCount_AC2tire!: number;
  seatCount_AC3tire!: number;
  seatCount_Slepper!: number;
  seatCount_SecoundSetting!: number;

  trainData:any;

  currentDate:string = new Date().toISOString().slice(0,16);


  resultArray!:any;
  // userName:string="";
  constructor(private auth: AuthService, private userData:UserdataService){}

  GetAllTrains(){
    this.auth.GetAllTrains().subscribe({
      next:(res)=>{
        this.resultArray=res;
        // if(res==null || res.length==0){
        //   Swal.fire({
        //     title: 'Error!',
        //     text: "No Any Flight To Show!",
        //     icon: 'error',
        //     confirmButtonText: 'Ok'
        //   });
        // }
      },
      error:(err)=>{alert(err?.error.message);
        // Swal.fire({
        //   title: 'Error!',
        //   text: err?.error.message,
        //   icon: 'error',
        //   confirmButtonText: 'Ok'
        // });
      }
    });
  }

  ngOnInit(){
    // this.userData.getUsernameFromStore().subscribe(val=>{
    //   let userNameFromToken=this.auth.getUsernameFromToken();
    //   this.userName=val || userNameFromToken;
    //   this.airlineName=val || userNameFromToken;
    // });
    this.GetAllTrains();
  }

  deleteTrain(id:number){
    // Swal.fire({
    //   title: "Do you want to delete?",
    //   showDenyButton: true,
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes',
    //   denyButtonText: 'No',
    //   customClass: {
    //     actions: 'my-actions',
    //     cancelButton: 'order-1 right-gap',
    //     confirmButton: 'order-2',
    //     denyButton: 'order-3',
    //   }
    // })
    // .then((result) => {
      if (confirm("Do you want to delete")) {
        this.auth.deleteTrain(id).subscribe({
          next:(res)=>{
            alert('Deleted! success')
            this.GetAllTrains();
          },
          error:(err)=>{
            alert(err?.error.message);
            // Swal.fire({
            //   title: 'Error!',
            //   text: err?.error.message,
            //   icon: 'error',
            //   confirmButtonText: 'Ok'
            // });
          }
        });
      } else
      {
        alert('Deletetion Cancelled!');
      }
    // });
  }

  editTrainClicked(id:number){
    this.auth.getTrainById(id).subscribe({
      next:(res)=>{
        this.trainData=res;
        this.journeyIdN=this.trainData.journeyId;
        this.trainNo = this.trainData.trainNo;
        this.trainName=this.trainData.trainName;
        this.arrivalLocation =this.trainData.arrivalLocation;
        this.destinationLocation =this.trainData.destinationLocation;
        this.startDate =this.trainData.startDate;
        this.journeyTime =this.trainData.journeyTime;
        this.seatCount_AC1tire =this.trainData.seatCount_AC1tire;
        this.seatCount_AC2tire =this.trainData.seatCount_AC2tire;
        this.seatCount_AC3tire =this.trainData.seatCount_AC3tire;
        this.seatCount_Slepper =this.trainData.seatCount_Slepper;
        this.seatCount_SecoundSetting =this.trainData.seatCount_SecoundSetting;
      },
      error:(err)=>{
        Swal.fire({
          title: 'Error!',
          text: err?.error.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  editTrain(){
    if(this.trainNo == null ||
      this.trainName==null ||
      this.arrivalLocation == null ||
      this.destinationLocation == null ||
      this.startDate == null ||
      this.journeyTime == null ||
      this.seatCount_AC1tire == null ||
      this.seatCount_AC2tire == null ||
      this.seatCount_AC3tire == null ||
      this.seatCount_AC3tire == null ||
      this.seatCount_SecoundSetting == null ||
      this.seatCount_Slepper  == null ||
      this.trainNo=="" ||
      this.arrivalLocation=="" ||
      this.destinationLocation==""){
        alert("Error!");
      }
      else{
        this.auth.updateTrain({
          journeyId:this.journeyIdN,
          trainNo:this.trainNo,
          trainName:this.trainName,
          arrivalLocation:this.arrivalLocation,
          destinationLocation:this.destinationLocation,
          startDate:this.startDate,
          journeyTime:this.journeyTime,
          seatCount_AC1tire:this.seatCount_AC1tire,
          seatCount_AC2tire:this.seatCount_AC2tire,
          seatCount_AC3tire:this.seatCount_AC3tire,
          seatCount_Slepper:this.seatCount_Slepper,
          seatCount_SecoundSetting:this.seatCount_SecoundSetting
        }).subscribe({
          next:(res)=>{
            alert("Success!");
            document.getElementById("updateTrainModalClose")?.click();
            this.trainNo = "";
            this.trainName == null;
            this.arrivalLocation = "";
            this.destinationLocation = "";
            this.startDate = new Date();
            this.journeyTime = 0;
            this.seatCount_AC1tire = 0;
            this.seatCount_AC2tire = 0;
            this.seatCount_AC3tire = 0;
            this.seatCount_Slepper = 0;
            this.seatCount_SecoundSetting = 0;
            this.GetAllTrains();
          },
          error:(err)=>{
            Swal.fire({
              title: 'Error!',
              text: err?.error.message,
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        });
      }
  }

  addTrain(){
    alert("Called");
    if(
      this.trainName==null ||
      this.arrivalLocation == null ||
      this.destinationLocation == null ||
      this.startDate == null ||
      this.journeyTime == null ||
      this.seatCount_AC1tire == null ||
      this.seatCount_AC2tire == null ||
      this.seatCount_AC3tire == null ||
      this.seatCount_Slepper == null ||
      this.seatCount_SecoundSetting == null ||
      this.trainNo=="" ||
      this.arrivalLocation=="" ||
      this.destinationLocation==""){
        alert("Error!");
        alert("message");
      }
      else{
        this.auth.addTrain({
          // trainNo:this.trainNo,
          trainName:this.trainName,
          arrivalLocation:this.arrivalLocation,
          destinationLocation:this.destinationLocation,
          startDate:this.startDate,
          journeyTime:this.journeyTime,
          seatCount_AC1tire:this.seatCount_AC1tire,
          seatCount_AC2tire:this.seatCount_AC2tire,
          seatCount_AC3tire:this.seatCount_AC3tire,
          seatCount_Slepper:this.seatCount_Slepper,
          seatCount_SecoundSetting:this.seatCount_SecoundSetting


        }).subscribe({
          next:(res)=>{
            alert("Success!");
            document.getElementById("addTrainModalClose")?.click();

            // this.trainNo = "";
            this.trainName == "";
            this.arrivalLocation = "";
            this.destinationLocation = "";
            this.startDate = new Date();
            this.journeyTime = 0;
            this.seatCount_AC1tire = 0;
            this.seatCount_AC2tire = 0;
            this.seatCount_AC3tire = 0;
            this.seatCount_Slepper = 0;
            this.seatCount_SecoundSetting = 0;
            this.GetAllTrains();
          },
          error:(err)=>{
            Swal.fire({
              title: 'Error!',
              text: err?.error.message,
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        });
      }
  }
}
