import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-error-404-alt',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './error-404-alt.html',
  styles: ``,
})
export class Error404Alt {
  title = 'Page 404 (alt)';
}
