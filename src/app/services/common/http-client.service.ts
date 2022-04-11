import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient,
    @Inject("baseUrl") private baseUrl: string) { }

  private url(requestParameter: Partial<RequestParameters>): String {
    return `${requestParameter.baseUrl ?
      requestParameter.baseUrl : this.baseUrl}/
              ${requestParameter.controller}
              ${requestParameter.action ? `/${requestParameter.action}` : ""}`
  }

  get<T>(requestParameter: Partial<RequestParameters>, id?: string) {
    let url: string = "";
    if (requestParameter.fullEndPoint) {
      url = requestParameter.fullEndPoint;
    } else {
      url = `${this.url(requestParameter)}`;
    }
  }
  post() {

  }
  put() {

  }
  delete() {

  }
}

export class RequestParameters {
  controller?: string;
  action?: string;
  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;
}
