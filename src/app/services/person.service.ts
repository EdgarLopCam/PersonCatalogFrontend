import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  phoneNumber: string;
  rowVersion: string;
}


@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = 'https://localhost:7053/api/persons';

  constructor(private http: HttpClient) { }

  // Obtener todas las personas
  getAllPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }

  // Obtener una persona por su ID
  getPersonById(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva persona
  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, person);
  }

  // Actualizar una persona
  updatePerson(person: Person): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${person.id}`, person);
  }

  // Eliminar una persona
  deletePerson(id: number, rowVersion: string): Observable<void> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: { rowVersion }
    };
    return this.http.delete<void>(`${this.apiUrl}/${id}`, options);
  }
}