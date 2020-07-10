import { Component, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  days:any=[];
  tempTopics:any=[];
  message = '';
  modelRef: any;
  
// topic section

  constructor(private modalService: NgbModal) {
    days:[]=this.days;
    tempTopics:[]=this.tempTopics;
   }
  open(content) {
    this.modelRef = this.modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
    });

    this.modelRef.result.then(
      (result) => {
        console.log(result)
        this.message = result;
      },
      (reason) => {
        this.message = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  

  // event handler 

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //day addition
  counter=1;
  addDay(){
    var obj={
      id:this.counter,
      name:"day"+this.counter,
      topics:[]
    };
    this.days.push(obj);
    this.counter++;
  }
// getting day id
dayid(id:number){
  localStorage.setItem("day",id.toString());
}
  //topic addition
  addTopic(){
    var id=parseInt(localStorage.getItem("day"));
    this.days[id-1].topics.push((<HTMLInputElement>document.getElementById('t_name')).value);
    this.tempTopics=this.days[id-1].topics
    this.modelRef.close();
  }
  ngOnInit(): void {
  }

}

