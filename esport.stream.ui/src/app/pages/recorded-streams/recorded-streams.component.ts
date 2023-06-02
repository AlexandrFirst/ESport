import { Component, OnInit } from '@angular/core';
import { IRecordedStream } from 'src/app/models/stream-models';
import { StreamService } from 'src/app/services/stream.service';

@Component({
  selector: 'app-recorded-streams',
  templateUrl: './recorded-streams.component.html',
  styleUrls: ['./recorded-streams.component.scss']
})
export class RecordedStreamsComponent implements OnInit {

  records: IRecordedStream[] = [];

  constructor(private streamService: StreamService) {
  }

  ngOnInit(): void {
    this.streamService.getAllRecords({ page: 1, pageSize: 100 }).subscribe({
      next: (data: IRecordedStream[]) => {
        this.records = [...data]
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getVideoSrc(publicId: string): string{
    return `https://localhost:5002/records/${publicId}`;
  }
}
