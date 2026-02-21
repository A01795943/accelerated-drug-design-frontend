import { Component } from '@angular/core';
import { ProductDetail } from './component/product-detail/product-detail';
import { ProductInfo } from './component/product-info/product-info';
import { ProductPricing } from './component/product-pricing/product-pricing';
import { FileUploader } from '@component/file-uploader/file-uploader'

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    ProductDetail,
    FileUploader,
    ProductInfo,
    ProductPricing,
  ],
  templateUrl: './edit.html',
  styles: ``,
})
export class Edit {
  title = 'PRODUCT EDIT';
}
