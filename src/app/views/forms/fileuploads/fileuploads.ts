import { Component } from '@angular/core';
import { FileUploader } from '@component/file-uploader/file-uploader';

@Component({
  selector: 'app-fileuploads',
  standalone: true,
  imports: [FileUploader],
  templateUrl: './fileuploads.html',
  styles: ``
})
export class Fileuploads {
title="File Uploads"
}
