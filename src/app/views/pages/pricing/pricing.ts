import { Component } from '@angular/core';
import { PricingPlans } from './data'

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [],
  templateUrl: './pricing.html',
  styles: ``
})
export class Pricing {
  title="Pricing"
  plans = PricingPlans
}
