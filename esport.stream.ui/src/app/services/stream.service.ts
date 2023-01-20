import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable } from 'rxjs';
import { CreateStreamEvent, Stream, StreamUser } from '../models/stream-models';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  constructor(private httpClinet: HttpClient) { }

  public getAllStreams(page: number, size: number): Observable<Stream[]> {
    return this.httpClinet.get<Stream[]>(environment.apiHost + `/api/streams/${page}/${size}`, {
      withCredentials: true
    });
  }

  public getStreamUser(streamId: string): Observable<StreamUser>{
    let params = new HttpParams().set("streamId",streamId);
    return this.httpClinet.get<StreamUser>(environment.apiHost + `/api/streams/user/`, {
      withCredentials: true,
      params: params
    });
  }

  public createStreamEvent(streamEvent: CreateStreamEvent): Observable<number> {
    return this.httpClinet.post<number>(environment.apiHost + `/api/streams/create`, streamEvent, {
      withCredentials: true
    })
  }
}
