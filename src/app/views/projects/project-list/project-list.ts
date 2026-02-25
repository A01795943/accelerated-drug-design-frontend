import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectService, type ProjectSummaryDto } from '@core/services/project.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-list.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProjectList implements OnInit {
  title = 'Projects';
  projects: ProjectSummaryDto[] = [];
  loading = true;
  error: string | null = null;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading = true;
    this.error = null;
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || 'Failed to load projects. Is the backend running at localhost:8080?';
        this.loading = false;
      },
    });
  }
}
