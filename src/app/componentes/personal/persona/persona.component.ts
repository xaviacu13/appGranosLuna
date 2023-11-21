import { Component, OnInit } from '@angular/core';

import{PersonalService} from '../../../servicios/persona.service';
import { NgForm } from '@angular/forms';
import { Personal } from '../../../models/personal';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  constructor(private personalService:PersonalService) { }

  ngOnInit() {
    this.personalService.getPersonal();
    this.resetForm();
    
  }
  onSubmit(personalForm:NgForm)
  {
    this.personalService.insertPersonal(personalForm.value);
    this.resetForm(personalForm);
  }
  resetForm(personalForm?: NgForm)
  {
    if (personalForm != null)
    personalForm.reset();
    this.personalService.selectedPersonal=new Personal();
  }
}
