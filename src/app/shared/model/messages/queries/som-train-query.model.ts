import {MessageType} from '../message-type.model';
import {SomTrainQueryMessage} from '../interfaces/requests/som-train-query.interface';
import {QueryConfig} from '../interfaces/requests/query-config.interface';

export class SomTrainQuery implements SomTrainQueryMessage {
  public readonly messageType: MessageType = 'Q_SOM_TRAIN';

  constructor(public readonly size: number, public readonly retriever_knn: string, public readonly retriever_som: string, public readonly deepness: number, public readonly positives: string[], public readonly negatives: string[], public readonly blacklist: string[], public readonly config: QueryConfig = null) {
  }
}