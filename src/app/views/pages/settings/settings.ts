import { Component } from '@angular/core';
import { GeneralSetting } from './components/general-setting/general-setting';
import { StoreSetting } from './components/store-setting/store-setting';
import { LocalizationSetting } from './components/localization-setting/localization-setting';
import { CategorySetting } from './components/category-setting/category-setting';
import { ReviewSetting } from './components/review-setting/review-setting';
import { VoucherSetting } from './components/voucher-setting/voucher-setting';
import { TaxSetting } from './components/tax-setting/tax-setting';
import { CustomerSetting } from './components/customer-setting/customer-setting';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    GeneralSetting,
    StoreSetting,
    LocalizationSetting,
    CategorySetting,
    ReviewSetting,
    VoucherSetting,
    TaxSetting,
    CustomerSetting,
  ],
  templateUrl: './settings.html',
  styles: ``,
})
export class Settings {
  title = 'Settings';
}
