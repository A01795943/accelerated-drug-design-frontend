import { Component } from '@angular/core';
import { UIExamplesList } from '@component/ui-examples-list/ui-examples-list';

@Component({
  selector: 'app-avatars',
  standalone: true,
  imports: [UIExamplesList],
  templateUrl: './avatars.html',
  styles: ``
})
export class Avatars {
title="Avatar"
}
