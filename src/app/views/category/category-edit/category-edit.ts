import { Component } from '@angular/core';
import { FileUploader } from '@component/file-uploader/file-uploader'
import { GeneralInfo } from './components/general-info/general-info'
import { MetaOption } from './components/meta-option/meta-option'

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [FileUploader,GeneralInfo,MetaOption],
  templateUrl: './category-edit.html',
  styles: ``,
})
export class CategoryEdit {
  title = 'Category Edit';
}
