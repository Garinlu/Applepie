import {SuiModal, ComponentModalConfig, ModalSize} from "ng2-semantic-ui"
import {Component} from '@angular/core';

interface IConfirmModalContext {
  title:string;
  question:string;
}

@Component({
  selector: 'modal-comp',
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  constructor(public modal:SuiModal<IConfirmModalContext, void, void>) {}
}

export class ConfirmModal extends ComponentModalConfig<IConfirmModalContext, void, void> {
  constructor(title:string, question:string, size = ModalSize.Small) {
    super(ModalComponent, { title, question });

    this.isClosable = false;
    this.transitionDuration = 200;
    this.size = size;
  }
}