import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2Data, Select2SearchEvent } from 'ng-select2-component';
import { first, firstValueFrom } from 'rxjs';
import { CompetitionModel } from 'src/app/models/competition-models';
import { CreateStreamEvent } from 'src/app/models/stream-models';
import { CompetitionService } from 'src/app/services/competition.service';
import { StreamService } from 'src/app/services/stream.service';

@Component({
  selector: 'app-edit-stream',
  templateUrl: './edit-stream.component.html',
  styleUrls: ['./edit-stream.component.scss']
})
export class EditStreamComponent implements OnInit {
  
  streamEventData: Select2Data;
  streamEventForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    competitionId: new FormControl('', [Validators.required, Validators.minLength(1)]),
    description: new FormControl(''),
    dateTimeRange: new FormControl('')
  });

  private streamId: number | undefined;
  private isCreateMode: boolean = false;

  constructor(private route: ActivatedRoute,
    private competitionService: CompetitionService,
    private streamService: StreamService,
    private router: Router) {
    this.streamId = route.snapshot.params["id"];
    this.streamEventData = []
  }

  ngOnInit(): void {
    if (!this.streamId) {
      this.isCreateMode = true;
    } else {
      this.isCreateMode = false;
    }

    this.getAllCompetition().then(x => {
      this.convertToSelect2OptionModel(x);
    });
  }

  updateStreamEvent(data: any) {
    console.log(data)
  }

  searchStreamEvent(event: Select2SearchEvent) {
    this.getAllCompetition(event.search).then(x => {
      this.convertToSelect2OptionModel(x);
    });
  }

  saveStreamEvent(event: any){
    if(!this.streamEventForm.valid){
      return;
    }

    let formData = this.streamEventForm.value;
    const dataToSend = new CreateStreamEvent({
      name: formData["name"],
      eventId: formData["competitionId"],
      description: formData["description"],
      startTime: formData["dateTimeRange"][0],
      endTime: formData["dateTimeRange"][1],
    });

    this.streamService.createStreamEvent(dataToSend).subscribe(streamId => {
      console.log('strteam event is created with id: ', streamId)
    })
  }

  private async getAllCompetition(searchString?: string): Promise<CompetitionModel[]> {
    return await firstValueFrom(this.competitionService.getAllCompetitions(searchString));
  }

  private convertToSelect2OptionModel(models: CompetitionModel[]) {
    this.streamEventData = models.map(p => {
      const select2Model = new CompetitionModel({ ...p });
      return select2Model.convertToSelect2Group();
    })
  }

  cancelBtnClick(){
    this.router.navigate(["streams"])
  }
}
