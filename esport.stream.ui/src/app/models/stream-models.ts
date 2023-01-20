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