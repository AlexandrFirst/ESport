import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { debounceTime, filter, map, Observable } from 'rxjs';
import { CompetitionModel } from '../models/competition-models';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(private httpClinet: HttpClient) { }

  public getAllCompetitions(searchString?: string): Observable<CompetitionModel[]> {
    return this.httpClinet.get<CompetitionModel[]>(environment.apiHost + `/api/competitions/all`, {
      withCredentials: true,
      
    }).pipe(debounceTime(100), map(competition => competition.filter(v => v.title.includes(searchString || ''))));
  }
}
