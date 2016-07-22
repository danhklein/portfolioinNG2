'use strict';

import {Component} from '@angular/core';
import {ProjectsService} from './projects.service';

@Component({
  selector: 'my-projects',
  templateUrl: 'components/projects/projects.component.html',
  styleUrls: ['components/projects/projects.component.css']
})
export class ProjectsComponent{
  constructor(projectsService){
    this.title = "Projects";
    this.projectsService = projectsService;
    this.projects = [];
    this.selectedProject = "";
    this.clicked = project => {
      this.selectedProject = project;
    };
  }

  static get parameters() {
    return [[ProjectsService]];
  }

  ngOnInit(){
    this.getProjects();
  }

  getProjects(){
    this.projectsService.getList()
      .subscribe(
       projects => this.projects = projects,
       error => this.errorMessage = error
      )
  }}
