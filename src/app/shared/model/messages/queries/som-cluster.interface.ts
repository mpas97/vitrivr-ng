import {MessageType} from '../message-type.model';
import {QueryConfig} from '../interfaces/requests/query-config.interface';
import { SomCluterQueryMessage } from '../interfaces/requests/som-cluster-query.interface';

export class SomClusterQuery implements SomCluterQueryMessage {
  public readonly messageType: MessageType = 'Q_SOM_CLUSTER';

  constructor(public readonly cids: string[], public readonly config: QueryConfig = null) {
  }
}