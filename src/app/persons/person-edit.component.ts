import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService, Person } from '../services/person.service';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html'
})
export class PersonEditComponent implements OnInit {
  person: Person = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: new Date(),
    phoneNumber: '',
    rowVersion: ''
  };

  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.personService.getPersonById(+id).subscribe(data => {
        this.person = data;
      });
    }
  }

  // Guardar la persona (crear o actualizar)
  savePerson(): void {
    if (this.person.id === 0) {
      this.personService.createPerson(this.person).subscribe(() => {
        this.successMessage = '¡Persona creada exitosamente!';
      });
    } else {
      this.personService.updatePerson(this.person).subscribe(() => {
        this.router.navigate(['/persons']);
      });
    }
  }
}