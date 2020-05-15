/**
 *
 */
import {QueryResult} from './query-result.interface';

export interface RetrieverQueryResult extends QueryResult {
  content: string[],
}
