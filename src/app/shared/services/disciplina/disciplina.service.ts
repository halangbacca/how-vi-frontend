import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Disciplina } from '../../models/Disciplina';

@Injectable({
  providedIn: 'root',
})
export class DisciplinaService {
  url = `${environment.URL_API}${environment.API_DISCIPLINA}`;

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders(environment.HEADER),
  };

  getDisciplina(): Observable<Disciplina[]> {
    return this.httpClient
      .get<Disciplina[]>(this.url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  saveDisciplina(disciplina: Disciplina): Observable<Disciplina[]> {
    return this.httpClient
      .post<Disciplina[]>(
        this.url,
        JSON.stringify(disciplina),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteDisciplina(id: Number): Observable<Disciplina> {
    return this.httpClient.delete<Disciplina>(`${this.url}/${id}`);
  }

  updateDisciplina(disciplina: Disciplina): Observable<Disciplina[]> {
    return this.httpClient
      .put<Disciplina[]>(
        `${this.url}/${disciplina.id}`,
        JSON.stringify(disciplina),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }
}
