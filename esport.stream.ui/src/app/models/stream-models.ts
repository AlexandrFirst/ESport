import { Select2Group, Select2Option } from "ng-select2-component";
import { BaseModel } from "./base-model";

export interface Stream {
    id: string;
    organiserId: number;
    eventId: string;
    name: string;
    description: string;
    connectionId: string;
    startTime: Date | undefined;
    endTime: Date | undefined;
}

export interface StreamUser {
    isOrganizer: boolean;
    isStreamStarted: boolean;
}

export interface ICreateStreamEvent {
    eventId: string;
    name: string;
    description: string;
    previewImageId?: string;
    startTime?: Date;
    endTime?: Date;
}

export interface IStreamEventDto extends ICreateStreamEvent {
    id: string;
}

export class StreamEventDto extends BaseModel implements IStreamEventDto {
    id: string;
    eventId: string;
    name: string;
    description: string;
    previewImageId?: string | undefined;
    startTime?: Date | undefined;
    endTime?: Date | undefined;

    constructor(data?: IStreamEventDto) {
        super();
        this.copyData(data)
    }
}

export class CreateStreamEvent extends BaseModel implements ICreateStreamEvent {

    eventId: string;
    name: string;
    description: string;
    previewImageId?: string | undefined;
    startTime?: Date | undefined;
    endTime?: Date | undefined;

    constructor(data?: ICreateStreamEvent) {
        super();
        this.copyData(data)
    }
}