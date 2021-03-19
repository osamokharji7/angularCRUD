import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';

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
  toasterMessage='';

  constructor(private tutorialService: TutorialService) { 
    this.options=[{id:0,role:'--Choose--'},{id:1,role:'OPERATOR'}, {id:2, role:'ADMIN'}];
  }

  ngOnInit() {
    this.retrieveTutorials();
    document.getElementById('popup').style.display='none';
  }
  showSuccess() {
    this.toasterMessage="User deleted successfully!";
    var x= document.getElementById('snackbarSuccess');
    x.className='show';
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
  showError() {
    this.toasterMessage="Error while deleting user!";
    var x =document.getElementById('snackbarError');
    x.className='show';
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
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
  var modal = document.getElementById('id01');
document.getElementById('id01').style.display='block';
}
  refreshList() {
    this.retrieveTutorials();
    this.currentTutorial = null;
    this.currentIndex = -1;
  }
cancelDelete()
{
  document.getElementById('id01').style.display='none';
}
confirmDelete()
{
  this.tutorials=this.tutorials.filter(x=>x.username!=this.chosenUsername);
  document.getElementById('id01').style.display='none';
  this.showSuccess();
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
