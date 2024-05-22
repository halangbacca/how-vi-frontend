import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Matricula } from '../../models/Matricula';
import { ListarMatricula } from '../../models/ListarMatricula';

@Injectable({
  providedIn: 'root',
})
export class MatriculaService {
  url = `${environment.URL_API}${environment.API_MATRICULA}`;

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders(environment.HEADER),
  };

  getMatricula(): Observable<ListarMatricula[]> {
    return this.httpClient
      .get<ListarMatricula[]>(this.url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  efetuarMatricula(matricula: Matricula): Observable<Matricula[]> {
    return this.httpClient
      .post<Matricula[]>(this.url, JSON.stringify(matricula), this.httpOptions)
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
