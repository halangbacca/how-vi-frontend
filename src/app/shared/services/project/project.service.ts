import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../../models/Project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  url = `${environment.URL_API}${environment.API_PROJECT}`;

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders(environment.HEADER),
  };

  getProject(): Observable<Project[]> {
    return this.httpClient
      .get<Project[]>(this.url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  saveProject(project: Project): Observable<Project[]> {
    return this.httpClient
      .post<Project[]>(this.url, JSON.stringify(project), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteProject(id: Number): Observable<Project> {
    return this.httpClient.delete<Project>(`${this.url}/${id}`);
  }

  updateProject(project: Project): Observable<Project[]> {
    return this.httpClient
      .put<Project[]>(
        `${this.url}/${project.id}`,
        JSON.stringify(project),
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
