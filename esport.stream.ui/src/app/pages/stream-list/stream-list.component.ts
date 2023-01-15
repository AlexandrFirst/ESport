import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Stream } from 'src/app/models/stream-models';
import { StreamService } from 'src/app/services/stream.service';

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.scss']
})
export class StreamListComponent implements OnInit {
  
  streams: Stream[] = [];

  constructor(private streamService: StreamService, private router: Router) {     
  }

  ngOnInit(): void {
    this.streamService.getAllStreams(1, 10).subscribe(x => {
      this.streams = x
    })
  }

  public goToAddEditPage(){
    this.router.navigate(['add'])
  }

}
