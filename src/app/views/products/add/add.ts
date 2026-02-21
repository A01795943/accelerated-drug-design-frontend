import { Component } from '@angular/core';
import { FileUploader } from '@component/file-uploader/file-uploader'
import { Detail } from './components/detail/detail'
import { Info } from './components/info/info'
import { Pricing } from './components/pricing/pricing'

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FileUploader,Detail,Info,Pricing],
  templateUrl: './add.html',
  styles: ``,
})
export class Add {
  title = 'CREATE PRODUCT';
}
