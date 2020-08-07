import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Section          } from 'dfg-dynamic-form';
import { ActionConfig     } from 'dfg-dynamic-form';
import { UIMessageService } from '../../../app-communication/service/ui-message.service';

@Component({
  selector: 'app-form-action-bar',
  templateUrl: 'form-action-bar.component.html'
})

export class FormActionBarComponent implements OnInit, OnChanges {

  @Input() activeRouteSection: Section;

  cancelActionName = 'Cancel';
  saveActionName = 'Save';
  @Output() oncancel: EventEmitter<ActionConfig> = new EventEmitter();
  @Output() onsave: EventEmitter<ActionConfig> = new EventEmitter();

  constructor(private uiMessageService: UIMessageService) { }

  ngOnInit() { }

  ngOnChanges(): void {

    if (this.activeRouteSection) {

      this.cancelActionName = this.activeRouteSection.loadConfig.actionName ? this.activeRouteSection.loadConfig.actionName : this.cancelActionName;
      this.saveActionName = this.activeRouteSection.saveConfig.actionName ? this.activeRouteSection.saveConfig.actionName : this.saveActionName;
    }

  }

  cancelClick() {
    this.oncancel.emit(this.activeRouteSection.loadConfig);
  }

  saveClick() {
    this.onsave.emit(this.activeRouteSection.saveConfig);
  }

}
