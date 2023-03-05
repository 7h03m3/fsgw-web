import { environment } from '../../environments/environment';

export class BaseApi {
  protected url = '';

  constructor(url: string) {
    const baseUrl = environment.backendBaseUrl;
    this.url = baseUrl + url;
  }
}
