import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
  /**
   *
   */
  constructor(public spinner: NgxSpinnerService) { }

  showSpinner(name: SpinnerType, duration: number = 1000) {
    this.spinner.show(name);

    setTimeout(() => this.hideSpinner(name), duration);
  }
  hideSpinner(name: SpinnerType) {
    this.spinner.hide(name);
  }
}


export enum SpinnerType {
  BallAtom = "s1",
  BallPulseAsync = "s2",
  BallSpinClockwise = "s3"
}
