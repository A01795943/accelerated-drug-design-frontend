import { Route } from '@angular/router';
import { ProjectList } from './project-list/project-list';
import { ProjectCreate } from './project-create/project-create';
import { ProjectDetail } from './project-detail/project-detail';
import { GenerationJobDetail } from '@views/projects/generation-job-detail/generation-job-detail';
import { JobEda } from '@views/projects/job-eda/job-eda';
import { MetricsCompare } from '@views/projects/metrics-compare/metrics-compare';

export const PROJECTS_ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: ProjectList,
    data: { title: 'Projects List' },
  },
  {
    path: 'create',
    component: ProjectCreate,
    data: { title: 'Create Project' },
  },
  {
    path: 'detail/:id',
    component: ProjectDetail,
    data: { title: 'Project Detail' },
  },
  {
    path: 'detail/:projectId/compare',
    component: MetricsCompare,
    data: { title: 'Comparar métricas' },
  },
  {
    path: 'detail/:projectId/job/:jobId',
    component: GenerationJobDetail,
    data: { title: 'Job Detail' },
  },
  {
    path: 'detail/:projectId/job/:jobId/eda',
    component: JobEda,
    data: { title: 'EDA' },
  },
];
