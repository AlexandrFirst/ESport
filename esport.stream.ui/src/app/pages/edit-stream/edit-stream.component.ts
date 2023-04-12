import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2Data, Select2SearchEvent } from 'ng-select2-component';
import { first, firstValueFrom } from 'rxjs';
import { CompetitionModel } from 'src/app/models/competition-models';
import { CreateStreamEvent, StreamEventDto } from 'src/app/models/stream-models';
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

  private streamId: string | undefined;
  public isCreateMode: boolean = false;

  constructor(private route: ActivatedRoute,
    private competitionService: CompetitionService,
    private streamService: StreamService,
    private router: Router) {
    this.streamId = route.snapshot.params["id"];
    this.streamEventData = []
  }
  async ngOnInit(): Promise<void> {
    this.getAllCompetition().then(x => {
      this.convertToSelect2OptionModel(x);
    }).finally(() => {
      if (!this.streamId) {
        this.isCreateMode = true;
      } else {
        this.isCreateMode = false;
        this.getStreamInfoData()
      }
    });
  }

  private getStreamInfoData() {
    if (this.isCreateMode) {
      console.error('Unable to get data in create mode');
      return;
    }
    const _streamId: string | undefined = this.streamId;
    this.streamService.getStreamEvent(_streamId).subscribe({
      next: (x: StreamEventDto) => {
        this.streamEventForm.setValue({
          name: x.name,
          description: x.description,
          competitionId: x.eventId,
          dateTimeRange: [x.startTime, x.endTime]
        })

        debugger;
      },
      error: (er) => {
        console.log(er)
      }
    })
  }

  public updateStreamEvent(data: any) {
    console.log(data);
  }

  async updateBtnClick() {
    debugger;
    if (this.isCreateMode || !this.streamId) {
      console.error('Cannot update in created mode or when stream id is abscent')
      return;
    }

    if (!this.streamEventForm.valid) {
      return;
    }

    const dataToUpdate = this.getEventFormData();
    this.streamService.updateStreamEvent(this.streamId, dataToUpdate).subscribe({
      next: (x) => {
        this.router.navigate(["streams"])
        console.log('stream is updated successfully')
      },
      error: (er) => {
        console.error('Unable to update stream due to: ', er);
      }
    });
  }

  searchStreamEvent(event: Select2SearchEvent) {
    this.getAllCompetition(event.search).then(x => {
      this.convertToSelect2OptionModel(x);
    });
  }

  saveStreamEvent(event: any) {
    if (!this.streamEventForm.valid) {
      return;
    }
    const dataToSend = this.getEventFormData();
    this.streamService.createStreamEvent(dataToSend).subscribe(streamId => {
      console.log('strteam event is created with id: ', streamId)
      this.router.navigate(["streams"]);
    })
  }

  private getEventFormData() {
    let formData = this.streamEventForm.value;
    const dataToSend = new CreateStreamEvent({
      name: formData["name"],
      eventId: formData["competitionId"],
      description: formData["description"],
      startTime: formData["dateTimeRange"][0],
      endTime: formData["dateTimeRange"][1],
    });
    return dataToSend;
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

  cancelBtnClick() {
    this.router.navigate(["streams"])
  }
}
