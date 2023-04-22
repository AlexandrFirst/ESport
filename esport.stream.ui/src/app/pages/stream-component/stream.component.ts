import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HubConnection } from '@microsoft/signalr';
import { YesNoComponent } from 'src/app/components/modals/yes-no/yes-no.component';
import { MediaModel, MediaType } from 'src/app/models/media-models';
import { StreamUser } from 'src/app/models/stream-models';
import { SignalService } from 'src/app/services/signal.service';
import { StreamService } from 'src/app/services/stream.service';
import * as kurentoUtils from 'kurento-utils';
import { ClientMessage, IClientMessageBody, MessageType } from 'src/app/models/signal-models';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  private streamId: string;

  userInfo: StreamUser;
  isLoading: boolean = true;
  isRecording: boolean = false;

  isConnecting: boolean = false;


  @ViewChild('video') videoElement: ElementRef;

  private allMediaDevices: MediaModel[] = [];

  public videoInput: MediaModel = MediaModel.createEmtyMediaModel(MediaType.VIDEO);
  public audioInput: MediaModel = MediaModel.createEmtyMediaModel(MediaType.AUDIO);

  private v_mediaStream: MediaStream;
  private s_mediaStream: MediaStream;

  public isConnectionSetup = true;
  public isCommunicationOn: boolean = false;

  private hubConnection: HubConnection;
  private webRtcPeer: kurentoUtils.WebRtcPeer

  public chatMessages: string[] = [];

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
          this.messageHandlers(m.connection)
        })

        if (value.isOrganizer) {
          this.setupDevices();
        }

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


  }

  videoInputSelected(sourceId: string) {
    navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: sourceId
      }
    }).then(x => {
      this.videoElement.nativeElement.srcObject = x;
      this.v_mediaStream = x;

      console.log('source id: ', sourceId, "media: ", x)
      this.s_mediaStream = x;
    })
  }

  audioInputSelected(sourceId: string) {
    navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId: sourceId
      }
    }).then(x => {
      console.log('source id: ', sourceId, "media: ", x)
      this.s_mediaStream = x;
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

  private displayMessage(message: string, timer: number = -1): MatDialogRef<YesNoComponent, any> {
    let dialogRef = this.dialog.open(YesNoComponent, {
      data: {
        message: message,
        timer: timer
      }
    });

    return dialogRef;
  }

  public record() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

  private startRecording() {
    if (!this.isConnectionSetup || !this.isCommunicationOn) {
      console.log("Unable to record not initialized connection");
      return;
    }

    const data = {
      streamId: this.streamId
    }
    var message: ClientMessage = {
      body: JSON.stringify(data)
    };

    const dialog = this.displayMessage('Start recording?');
    let local = this;

    dialog.afterClosed().subscribe({
      next(value) {
        if (value.ok) {
          local.sendMessage(MessageType.StartRecording, message)
          local.isRecording = true;
        }
      },
      error(err) {
        console.error(err)
      }
    })

  }

  private stopRecording() {
    if (!this.isRecording) {
      console.log('Cant stop recording of not-recording stream')
    }

    if (!this.isConnectionSetup || !this.isCommunicationOn) {
      console.log("Unable to stop not initialized connection");
      return;
    }

    const dialog = this.displayMessage('Stop recording?');

    let local = this;

    dialog.afterClosed().subscribe({
      next(value) {
        if (value.ok) {
          const data = {
            streamId: local.streamId
          }
          var message: ClientMessage = {
            body: JSON.stringify(data)
          };

          local.sendMessage(MessageType.StopRecording, message)
          local.isRecording = false;
        }
      },
      error(err) {
        console.error(err)
      }
    })


  }

  public async presenter() {
    if (!this.isConnectionSetup) {
      console.log("Connection is not set up")
      return;
    }

    this.isConnecting = true

    const constraints: MediaStreamConstraints = {
      video: {
        deviceId: this.videoInput.MediaDeviceId
      },
      audio: {
        deviceId: this.audioInput.MediaDeviceId
      }
    }

    var options = {
      localVideo: this.videoElement.nativeElement,
      mediaConstraints: constraints,
      configuration: [
        {
          urls: "stun:a.relay.metered.ca:80",
        },
        {
          urls: "turn:a.relay.metered.ca:80",
          username: "e76b1e18382eb8485e4ced0f",
          credential: "awmeGuNs0IsK0VkM",
        },
        {
          urls: "turn:a.relay.metered.ca:80?transport=tcp",
          username: "e76b1e18382eb8485e4ced0f",
          credential: "awmeGuNs0IsK0VkM",
        },
        {
          urls: "turn:a.relay.metered.ca:443",
          username: "e76b1e18382eb8485e4ced0f",
          credential: "awmeGuNs0IsK0VkM",
        },
        {
          urls: "turn:a.relay.metered.ca:443?transport=tcp",
          username: "e76b1e18382eb8485e4ced0f",
          credential: "awmeGuNs0IsK0VkM",
        },
      ],
      onicecandidate: (candidate: any) => {
        const data = {
          iceCandidate: candidate,
          streamId: this.streamId
        }
        this.onIceCandidate(data);
      }
    }

    this.webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, (error) => {
      if (error) {
        console.log("[presenter] WebRtcPeerSendonly: ", error);
        return;
      }
      this.webRtcPeer?.generateOffer((_error: any | undefined, sdp: string) => { 
         this.onOfferPresenter(_error, sdp) 
      });
    })
    console.log('presenter peer connection', this.webRtcPeer)
  }

  public viewer() {
    if (!this.isConnectionSetup) {
      console.log("Connection is not set up")
      return;
    }

    this.isConnecting = true;

    var options = {
      remoteVideo: this.videoElement.nativeElement,
      configuration: [
        {
          urls: "stun:a.relay.metered.ca:80",
        },
        {
          urls: "turn:a.relay.metered.ca:80",
          username: "e76b1e18382eb8485e4ced0f",
          credential: "awmeGuNs0IsK0VkM",
        },
        {
          urls: "turn:a.relay.metered.ca:80?transport=tcp",
          username: "e76b1e18382eb8485e4ced0f",
          credential: "awmeGuNs0IsK0VkM",
        },
        {
          urls: "turn:a.relay.metered.ca:443",
          username: "e76b1e18382eb8485e4ced0f",
          credential: "awmeGuNs0IsK0VkM",
        },
        {
          urls: "turn:a.relay.metered.ca:443?transport=tcp",
          username: "e76b1e18382eb8485e4ced0f",
          credential: "awmeGuNs0IsK0VkM",
        },
      ],
      onicecandidate: (candidate: any) => {
        const data = {
          iceCandidate: candidate,
          streamId: this.streamId
        }

        this.onIceCandidate(data);
      }
    }

    this.webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, (error) => {
      if (error) {
        console.log("[viewer] WebRtcPeerSendonly: ", error);
        return;
      }
      this.webRtcPeer?.generateOffer((_error: any | undefined, sdp: string) => {
        setTimeout(() => this.onOfferViewer(_error, sdp), 1000)
      });
    })
    console.log('viewer peer connection', this.webRtcPeer)
  }

  public stop() {
    if (!this.isConnectionSetup || !this.isCommunicationOn) {
      console.log("Unable to stop not initialized connection");
      return;
    }

    const data = {
      message: "Message to stop connecting",
      streamId: this.streamId
    }
    var message: ClientMessage = {
      body: JSON.stringify(data)
    };

    this.sendMessage(MessageType.Stop, message)

    this.dispose();
  }

  private messageHandlers(hubConnection: HubConnection) {
    if (!hubConnection) {
      console.log("Unable to get hubconnection")
      return;
    }


    hubConnection.on("Send", (messageBody: IClientMessageBody) => {
      console.log(messageBody)
      const parsedMessage = JSON.parse(messageBody.body);
      switch (messageBody.id) {
        case 'presenterResponse':
          this.presenterResponse(parsedMessage)
          break;
        case 'viewerResponse':
          this.viewerResponse(parsedMessage);
          break;
        case 'stopCommunication':
          this.dispose();
          break;
        case 'iceCandidate':
          console.log('Ice candidate: ', parsedMessage);
          this.webRtcPeer?.addIceCandidate(parsedMessage)
          break;
        case 'ChatMessage':
          console.log('chatMessage: ', parsedMessage);
          this.chatMessages.push(parsedMessage.Message);
          console.log(this.chatMessages)
          break;
        default:
          console.log('unrecognised message: ', parsedMessage);
      }
    });

  }

  private onIceCandidate(candidate: any) {
    console.log('local candidate: ', candidate);
    var message: ClientMessage = {
      body: JSON.stringify(candidate)
    };

    this.sendMessage(MessageType.onIceCandidate, message)
  }

  private onOfferPresenter(error: any, offerSdp: any) {
    if (error) {
      console.log("onOfferPresenter: ", error);
      return;
    }

    console.log("Offer sdp: ", offerSdp);

    const data = {
      sdpOffer: offerSdp,
      streamId: this.streamId
    }
    var message: ClientMessage = {
      body: JSON.stringify(data)
    };

    this.sendMessage(MessageType.Presenter, message)
  }

  private onOfferViewer(error: any, offerSdp: any) {
    if (error) {
      console.log("onOfferViewer: ", error);
      return;
    }

    console.log("Offer sdp: ", offerSdp);

    const data = {
      sdpOffer: offerSdp,
      streamId: this.streamId
    }
    var message: ClientMessage = {
      body: JSON.stringify(data)
    };

    this.sendMessage(MessageType.Viewer, message)
  }

  private sendMessage(messageType: MessageType, body: ClientMessage) {
    if (!this.isConnectionSetup) {
      console.log("unable to send message")
      return;
    }

    this.hubConnection.send("Message", messageType, body);
  }

  public presenterResponse(parsedMessage: any) {
    console.log('Presenter response message: ', parsedMessage);
    if (parsedMessage.message !== 'accepted') {
      console.log(parsedMessage.errors);
      this.dispose();
      return;
    }
    else {
      this.webRtcPeer?.processAnswer(parsedMessage.sdpAnswer, (error: string | undefined) => {
        if (error) console.error(error)
        else {
          console.log('connection is established')
          this.isCommunicationOn = true;
          this.isConnecting = false;
        }
      });
    }
  }

  public sendMessageToChat(inputField: any) {
    const val = inputField?.value
    if (val) {
      const data = {
        streamId: this.streamId,
        message: val
      }
      var message: ClientMessage = {
        body: JSON.stringify(data)
      };

      this.sendMessage(MessageType.ChatMessage, message)
    }
  }

  public viewerResponse(parsedMessage: any) {
    console.log('Viewer response message: ', parsedMessage);
    if (parsedMessage.message !== 'accepted') {
      console.log(parsedMessage.errors);
      this.dispose();
      return;
    }
    else {
      this.webRtcPeer?.processAnswer(parsedMessage.sdpAnswer, (error: string | undefined) => {
        if (error) { console.error(error) }
        else {
          console.log('connection is established')
          this.isCommunicationOn = true;
          this.isConnecting = false;
        }
      });
    }
  }

  private dispose(message: string = 'ok') {
    if (this.isConnectionSetup) {
      this.webRtcPeer?.dispose();
      this.isCommunicationOn = false;
      this.router.navigate(["streams"], {
        queryParams: {
          "messsage": message
        }
      })
    }
  }
}
