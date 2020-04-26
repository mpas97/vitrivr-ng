import {QueryResult} from './query-result.interface';
import {MediaSegment} from '../../../media/media-segment.model';

export interface SegmentQueryResult extends QueryResult {
  type: SEGMENT_TYPE,
  content: MediaSegment[],
}

export enum SEGMENT_TYPE {DEFAULT = 'DEFAULT', SOM_OVERVIEW = 'SOM_OVERVIEW', SOM_CLUSTER = 'SOM_CLUSTER'}