import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
  /**
   *
   */
  constructor(private spinner: NgxSpinnerService) { }

  showSpinner(name: SpinnerType) {
    this.spinner.show(name)
  }
}


export enum SpinnerType {
  BallAtom = "s1",
  BallPulseAsync = "s2",
  BallSpinClockwise = "s3"
}
