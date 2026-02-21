import { Component, inject, Signal, viewChild, ViewChild, type OnInit } from '@angular/core'
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
  type Event,
} from '@angular/router'
import { TitleService } from '@core/services/title.service'
import {
  NgProgressbar,
  NgProgressRef,
} from 'ngx-progressbar'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgProgressbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  progressRef!: NgProgressRef
  @ViewChild(NgProgressRef) progressBar!: NgProgressRef

  private titleService = inject(TitleService)
  private router = inject(Router)

  constructor() {
    this.router.events.subscribe((event: Event) => {
      this.checkRouteChange(event)
    })
  }

  ngOnInit(): void {
    this.titleService.init()
  }

  checkRouteChange(routerEvent: Event) {
    if (routerEvent instanceof NavigationStart) {
      this.progressBar.start()
    }
    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      setTimeout(() => {
        this.progressBar.complete()
      }, 200)
    }
  }
}
