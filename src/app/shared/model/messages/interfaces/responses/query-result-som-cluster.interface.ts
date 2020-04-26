import {QueryResult} from './query-result.interface'

/**
 * QueryResult message.interface.ts: Defines the general structure of a QueryResult.
 */
export interface SomClusterQueryResult extends QueryResult {
  content: string[];
}