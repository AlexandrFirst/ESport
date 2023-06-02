import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable, throwError } from 'rxjs';
import { CreateStreamEvent, IRecordFilter, IRecordedStream, Stream, StreamEventDto, StreamUser } from '../models/stream-models';

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

  public getStreamUser(streamId: string): Observable<StreamUser> {
    let params = new HttpParams().set("streamId", streamId);
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

  public getStreamEvent(streamId: string | undefined): Observable<StreamEventDto> {
    if (streamId === undefined) {
      return throwError(() => {
        const error: any = new Error(`unable retrieve stream with undefined id`);
        error.timestamp = Date.now();
        return error;
      })

    }
    return this.httpClinet.get<StreamEventDto>(environment.apiHost + `/api/streams/${streamId}`, { withCredentials: true });
  }

  public updateStreamEvent(streamId: string, streamEvent: CreateStreamEvent): Observable<number> {
    return this.httpClinet.put<number>(environment.apiHost + `/api/streams/updateStream/${streamId}`, streamEvent, {
      withCredentials: true
    });
  }

  public getAllRecords(recordFilter: IRecordFilter): Observable<IRecordedStream[]> {
    return this.httpClinet.post<IRecordedStream[]>(environment.apiHost + `/api/streams-records`, recordFilter, { withCredentials: true });
  }
}
