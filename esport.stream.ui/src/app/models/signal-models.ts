export class ClientMessage{
    body: string;
}

export interface IClientMessageBody{
    id: string;
    body: string;
}

export enum MessageType{
    Presenter = 1, Viewer = 2, Stop = 3, onIceCandidate = 4 
}