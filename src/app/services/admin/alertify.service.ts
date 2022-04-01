import { Injectable } from '@angular/core';
declare var alertify: any

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message: string, options: Partial<AlertifyOptions>) {
    alertify.set("notifier", "position", options.position);
    // alertify[messageType](message);
    const notify = alertify.notify(message, options.messageType, options.delay);
    if (options.dismissOthers) {
      notify.dismissOthers();
    }
  }

  dismiss() {
    alertify.dismissAll();
  }

}
export class AlertifyOptions {
  messageType: MessageType = MessageType.Info;
  position: Position = Position.BottomRight;
  delay: number = 2;
  dismissOthers: boolean = false;
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
