import {MessageType} from '../message-type.model';
import {RetrieverQueryMessage} from '../interfaces/requests/retriever.query.interface';

export class RetrieverQuery implements RetrieverQueryMessage {
  public readonly messageType: MessageType = 'Q_RETRIEVER';

  constructor() {
  }
}
