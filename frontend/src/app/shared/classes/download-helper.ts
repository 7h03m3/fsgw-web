import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DownloadHelper {
  public static downloadPdfFile(
    response: HttpResponse<Blob>,
    mimetype: string
  ) {
    const contentDisposition = response.headers.get('Content-Disposition');
    let filename = 'file.pdf';
    if (contentDisposition) {
      filename = contentDisposition.substring(21, contentDisposition.length);
    }

    if (response.body) {
      const blob = new Blob([response.body], { type: mimetype });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.download = filename;
      anchor.href = url;
      anchor.click();
    }
  }
}
