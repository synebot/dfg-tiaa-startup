import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicFormService, EventPipelineService, DynamicFormEvent } from 'dfg-dynamic-form';
import { AppRuntimeInfoService } from '../../../app-communication/service/app-runtime-info.service';
import { FormSaveLoadService } from '../../../app-communication/service/form-save-load.service';
import { BaseSectionRenderComponent } from '../../base-shell/base-section-render.component';

@Component({
  selector: 'app-section-renderer',
  templateUrl: './section-renderer.component.html',
  styleUrls: ['./section-renderer.component.css'],
})
export class SectionRendererComponent extends BaseSectionRenderComponent implements OnInit {


  constructor(
    protected route: ActivatedRoute, protected router: Router, protected appRuntimeInfoService: AppRuntimeInfoService,
    protected formSaveLoadService: FormSaveLoadService, protected eventPipelineService: EventPipelineService,
    protected dynamicFormService: DynamicFormService, protected changeDetectorRef: ChangeDetectorRef) {
    super(route, router, appRuntimeInfoService, formSaveLoadService, eventPipelineService, dynamicFormService, changeDetectorRef);
  }

  public ngOnInit(): void {

  }

  protected afterFormConfigLoaded(): void {

  }

  protected handleFormEvents(event: DynamicFormEvent): boolean {

    return true;
  }

}
