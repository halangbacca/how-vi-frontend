import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Aluno } from '../../models/Aluno';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  url = `${environment.URL_API}${environment.API_ALUNO}`;

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders(environment.HEADER),
  };

  getAluno(): Observable<Aluno[]> {
    return this.httpClient
      .get<Aluno[]>(this.url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  saveAluno(aluno: Aluno): Observable<Aluno[]> {
    return this.httpClient
      .post<Aluno[]>(this.url, JSON.stringify(aluno), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteAluno(id: Number): Observable<Aluno> {
    return this.httpClient.delete<Aluno>(`${this.url}/${id}`);
  }

  updateAluno(aluno: Aluno): Observable<Aluno[]> {
    return this.httpClient
      .put<Aluno[]>(
        `${this.url}/${aluno.id}`,
        JSON.stringify(aluno),
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
