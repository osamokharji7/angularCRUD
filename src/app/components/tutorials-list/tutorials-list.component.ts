import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {

  tutorials:any[];
  options:any[];
  currentTutorial = null;
  currentIndex = -1;
  title = '';
  chosenUsername='';
  showpopup: boolean;
  chosenRole=0;
  toasterMessage='';

  constructor(private tutorialService: TutorialService) { 
    this.options=[{id:0,role:'--Choose--'},{id:1,role:'OPERATOR'}, {id:2, role:'ADMIN'}];
  }
showSuccess() {
    this.toasterMessage="User role changed successfully!";
    var x= document.getElementById('snackbarSuccess');
    x.className='show';
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
  showError() {
    this.toasterMessage="Error while updating user role!";
    var x =document.getElementById('snackbarError');
    x.className='show';
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
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
  this.showSuccess();

}
togglePopup(val) {
  this.chosenUsername = val;
  if (document.getElementById('popup').style.display == 'none')
  document.getElementById('popup').style.display = 'block';
  else if (document.getElementById('popup').style.display == 'block')
  document.getElementById('popup').style.display = 'none';
}
  refreshList() {
    this.retrieveTutorials();
    this.currentTutorial = null;
    this.currentIndex = -1;
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
