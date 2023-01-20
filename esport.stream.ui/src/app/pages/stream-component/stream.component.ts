import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HubConnection } from '@microsoft/signalr';
import { YesNoComponent } from 'src/app/components/modals/yes-no/yes-no.component';
import { MediaModel, MediaType } from 'src/app/models/media-models';
import { StreamUser } from 'src/app/models/stream-models';
import { SignalService } from 'src/app/services/signal.service';
import { StreamService } from 'src/app/services/stream.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  private streamId: string;

  userInfo: StreamUser;
  isLoading: boolean = false;

  @ViewChild('video') videoElement: ElementRef;

  private allMediaDevices: MediaModel[] = [];

  public videoInput: MediaModel = MediaModel.createEmtyMediaModel(MediaType.VIDEO);
  public audioInput: MediaModel = MediaModel.createEmtyMediaModel(MediaType.AUDIO);

  private isConnectionSetup = true;
  private hubConnection: HubConnection;

  get videoDevices(): MediaModel[] {
    return this.allMediaDevices.filter(x => x.MediaDeviceType == MediaType.VIDEO);
  }

  get audioDevices(): MediaModel[] {
    return this.allMediaDevices.filter(x => x.MediaDeviceType == MediaType.AUDIO);
  }

  constructor(private route: ActivatedRoute,
    private dialog: MatDialog, private router: Router,
    private streamService: StreamService,
    private signalService: SignalService) {

    this.streamId = route.snapshot.params["id"];
  }

  ngOnInit(): void {
    if (!this.streamId) {
      let dialogRef = this.displayMessage('No id is passed')
      dialogRef.afterClosed().subscribe(x => {
        this.router.navigate(['streams'])
      })
      return;
    }
    this.isLoading = true;
    this.streamService.getStreamUser(this.streamId).subscribe({
      next: (value: StreamUser) => {
        this.userInfo = value;

        this.signalService.setup().then(m => {
          this.isConnectionSetup = true;
          this.hubConnection = m.connection;
        })
      },
      error: (error: any) => {
        console.log(error)
        let dialogRef = this.displayMessage(`Try again in 5 minutes: ${error.message}`)
        dialogRef.afterClosed().subscribe(x => {
          this.router.navigate(['streams'])
        })
      },
      complete: () => {
        this.isLoading = false;
      }
    })

    this.setupDevices();
  }

  videoInputSelected(sourceId: string) {
    navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: sourceId
      }
    }).then(x => {
      this.videoElement.nativeElement.srcObject = x;
    })
  }

  audioInputSelected(sourceId: string) {
    navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId: sourceId
      }
    }).then(x => {
      console.log(this.videoInput)
      console.log(this.audioInput)
    })
  }

  private setupDevices() {
    navigator.mediaDevices.enumerateDevices().then(x => {
      x.forEach(device => {
        this.allMediaDevices.push(new MediaModel(device));
      })

      this.initAudioInput();
      this.initVideoInput();
    })
  }

  private initVideoInput() {
    const _videoInputs = this.allMediaDevices.filter(x => x.MediaDeviceType == MediaType.VIDEO);
    if (_videoInputs.length && _videoInputs.length > 0) {
      this.videoInput = _videoInputs[0];
      this.videoInputSelected(this.videoInput.MediaDeviceId);
    }
  }

  private initAudioInput() {
    const _audioInputs = this.allMediaDevices.filter(x => x.MediaDeviceType == MediaType.AUDIO);
    if (_audioInputs.length && _audioInputs.length > 0) {
      this.audioInput = _audioInputs[0];
      this.audioInputSelected(this.audioInput.MediaDeviceId);
    }
  }

  private displayMessage(message: string): MatDialogRef<YesNoComponent, any> {
    let dialogRef = this.dialog.open(YesNoComponent, {
      data: {
        message: message
      }
    });

    return dialogRef;
  }
}
