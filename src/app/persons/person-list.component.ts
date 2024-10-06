import { Component, OnInit } from '@angular/core';
import { PersonService, Person } from '../services/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html'
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [];

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.loadPersons();
  }

  // Cargar personas desde la API
  loadPersons(): void {
    this.personService.getAllPersons().subscribe(data => {
      this.persons = data;
    });
  }

  deletePerson(person: Person): void {
    this.personService.deletePerson(person.id, person.rowVersion).subscribe(() => {
      this.persons = this.persons.filter(p => p.id !== person.id);
    });
  }
}