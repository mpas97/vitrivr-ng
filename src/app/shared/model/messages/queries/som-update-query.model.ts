import {MessageType} from '../message-type.model';
import {SomTrainQueryMessage} from '../interfaces/requests/som-train-query.interface';
import {QueryConfig} from '../interfaces/requests/query-config.interface';

export class SomUpdateQuery implements SomTrainQueryMessage {
  public readonly messageType: MessageType = 'Q_SOM_UPDATE';

  constructor(public readonly size: string, public readonly positives: string[], public readonly negatives: string[], public readonly config: QueryConfig = null) {
  }
}