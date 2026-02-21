import { Component } from '@angular/core';
import { FileUploader } from '@component/file-uploader/file-uploader'
import { SellerInformation } from './components/seller-information/seller-information'
import { SellerProductInfo } from './components/seller-product-info/seller-product-info'
import { SellerDetail } from './components/seller-detail/seller-detail'

@Component({
  selector: 'app-seller-edit',
  standalone: true,
  imports: [SellerDetail,FileUploader,SellerInformation,SellerProductInfo],
  templateUrl: './seller-edit.html',
  styles: ``,
})
export class SellerEdit {
  title = 'Seller Edit';
}
