import { Injectable } from '@angular/core';
declare var alertify: any

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message: string, messageType: MessageType, delay: number = 2, position: Position = Position.BottomRight) {
    alertify.set("notifier", "position", position);
    // alertify[messageType](message);
    alertify.notify(message, messageType, delay);
  }

  dismiss() {
    alertify.dismissAll();
  }

}

export enum MessageType {
  Error = "error",
  Success = "success",
  Info = "info",
  Warning = "warning"
}

export enum Position {
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left",
  BottomCenter = "bottom-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  TopCenter = "top-center"
}
