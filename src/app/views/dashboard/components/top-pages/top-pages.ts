import { Component } from '@angular/core';
import { topPages } from '@views/dashboard/data'

@Component({
  selector: 'dashboard-top-pages',
  standalone: true,
  imports: [],
  templateUrl: './top-pages.html',
  styles: ``
})
export class TopPages {
  pageList = topPages
}
