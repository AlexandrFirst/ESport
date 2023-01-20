import { Injectable } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { environment } from 'environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class SignalService {

  private hubConnection: HubConnection;
  private isConnectionEstablished: boolean = false;
  constructor() { }

  public setup(): Promise<any> {
    return new Promise((res, rej) => {
      this.hubConnection = new HubConnectionBuilder()
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .withUrl(`http://localhost:5004/kurrento`, {
          transport: HttpTransportType.WebSockets,
          skipNegotiation: true,
          withCredentials: true,
        })
        .build()

      this.hubConnection.start().then(_ => {
        console.log("Connection with server established")
        this.isConnectionEstablished = true;
      }).catch(err => {
        console.error("Error while establishing the connection")
      })

      this.hubConnection.onclose(e => {
        console.log("connection is closing", e)
      })

      this.hubConnection.onreconnecting(e => {
        console.log("connection is reconnectiong", e)
      })

      this.hubConnection.onreconnecting(e => {
        console.log("connection is reconnected", e)
      })

      res({
        message: "Setup of connextion done",
        connection: this.hubConnection
      })
    });
  }
}
