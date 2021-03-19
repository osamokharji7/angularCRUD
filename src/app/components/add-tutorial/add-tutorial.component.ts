import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import swal from 'sweetalert2'; 

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {
  
  tutorials:any[];
  options:any[];
  currentTutorial = null;
  currentIndex = -1;
  title = '';
  chosenUsername='';
  showpopup: boolean;
  chosenRole=0;
  constructor(private tutorialService: TutorialService) { 
    this.options=[{id:0,role:'--Choose--'},{id:1,role:'OPERATOR'}, {id:2, role:'ADMIN'}];
  }

  ngOnInit() {
    this.retrieveTutorials();
    document.getElementById('popup').style.display='none';
  }

  retrieveTutorials() {
    this.tutorialService.getAll()
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
    //this.tutorials=this.tutorialService.getAll();
  }
onRoleChange(event) {
  this.tutorials.forEach((el)=>{
    if(el.username == this.chosenUsername)
    el.role = this.options.filter(x=>x.id==this.chosenRole)[0].role;
  });
}
deleteUser(val) {
  this.chosenUsername = val;
  swal.fire({  
    title: 'Are you sure want to delete '+this.chosenUsername+' ?',  
    text: 'You will not be able to recover this file!',  
    icon: 'warning',  
    showCancelButton: true,  
    confirmButtonText: 'Confirm',  
    cancelButtonText: 'Cancel'  
  }).then((result) => {  
    if (result.value) {  
      this.tutorialService.tutorials=this.tutorials.filter(x=>x.username!=this.chosenUsername);
      this.retrieveTutorials();
    } else if (result.dismiss === swal.DismissReason.cancel) {  
      
    }  
  })  
}
  refreshList() {
    this.retrieveTutorials();
    this.currentTutorial = null;
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial, index) {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials() {
    this.tutorialService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  // searchTitle() {
  //   this.tutorialService.findByTitle(this.title)
  //     .subscribe(
  //       data => {
  //         this.tutorials = data;
  //         console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }
}
