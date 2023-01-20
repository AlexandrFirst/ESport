export enum MediaType {
    VIDEO, AUDIO
}


export class MediaModel {
    MediaDeviceId: string;
    MediaDeviceType: MediaType;
    MediaDeviceName: string;

    public static createEmtyMediaModel(mediaType: MediaType): MediaModel {
        if (mediaType === MediaType.AUDIO) {
            return new MediaModel({ deviceId: "-1", groupId: "", kind: 'audioinput', label: 'None' } as MediaDeviceInfo);
        } else {
            return new MediaModel({ deviceId: "-1", groupId: "", kind: 'videoinput', label: 'None' } as MediaDeviceInfo);
        }
    }

    constructor(deviceInfo: MediaDeviceInfo) {
        if (deviceInfo.kind == "audioinput") {
            this.MediaDeviceType = MediaType.AUDIO;
        } else if (deviceInfo.kind == "videoinput") {
            this.MediaDeviceType = MediaType.VIDEO;
        }
        this.MediaDeviceName = deviceInfo.label;
        this.MediaDeviceId = deviceInfo.deviceId;
    }
}