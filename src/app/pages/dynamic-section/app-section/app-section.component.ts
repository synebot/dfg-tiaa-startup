import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionConfig } from 'dfg-dynamic-form';

@Component({
  selector: 'app-app-section',
  templateUrl: './app-section.component.html',
  styleUrls: ['./app-section.component.css'],
})
export class AppSectionComponent implements OnInit {

  public sectionName: string;

  constructor(private route: ActivatedRoute) { }

  public ngOnInit() {
    // Current Section is set at route resolver level
    this.route.paramMap.subscribe(params => {
      this.sectionName = params.get('sectionName');
    });
  }

}
