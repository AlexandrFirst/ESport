import { Select2Option } from "ng-select2-component";
import { BaseModel } from "./base-model";

export interface ICompetitionModel {
    _id: string;
    title: string;
    dateStart: Date;
    organizationId: number;
}

export class CompetitionModel extends BaseModel implements ICompetitionModel {

    _id: string;
    title: string;
    dateStart: Date;
    organizationId: number;

    constructor(data?: ICompetitionModel) {
        super();
        this.copyData(data);
    }
   
    public convertToSelect2Group(): Select2Option {
        return {
            value: this._id,
            label: this.title,
            data: { organisationId: this.organizationId, dateStart: this.dateStart },
            id: this._id,
        }
    }
}