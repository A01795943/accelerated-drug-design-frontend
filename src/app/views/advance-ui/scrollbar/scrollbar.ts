import { Component } from '@angular/core';
import { UIExamplesList } from '@component/ui-examples-list/ui-examples-list';
import { SimplebarAngularModule } from 'simplebar-angular';

@Component({
  selector: 'app-scrollbar',
  standalone: true,
  imports: [UIExamplesList,SimplebarAngularModule],
  templateUrl: './scrollbar.html',
  styles: ``
})
export class Scrollbar {
title="Scrollbar"
}
