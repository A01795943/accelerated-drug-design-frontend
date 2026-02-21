import { Component } from '@angular/core';
import { SellerDetail } from './components/seller-detail/seller-detail'
import { FileUploader } from '@component/file-uploader/file-uploader'
import { SellerInformation } from './components/seller-information/seller-information'
import { SellerProductInfo } from './components/seller-product-info/seller-product-info'

@Component({
  selector: 'app-seller-add',
  standalone: true,
  imports: [SellerDetail,FileUploader,SellerInformation,SellerProductInfo],
  templateUrl: './seller-add.html',
  styles: ``
})
export class SellerAdd {
  title="Seller Add"
}
