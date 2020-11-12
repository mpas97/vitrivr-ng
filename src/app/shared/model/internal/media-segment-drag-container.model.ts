import { MediaObjectDescriptor, MediaSegmentDescriptor } from 'app/core/openapi';
import {SegmentScoreContainer} from '../results/scores/segment-score-container.model';

/**
 * This is an internal helper class used for Drag & Drop operatoin. It contains information on a dragged MediaSegment.
 */
export class MediaSegmentDragContainer {
  /** Format string used to identify drag objects. */
  public static FORMAT = 'application/vitrivr-mediasegment';

  /**
   *
   * @param {MediaType} _object The MediaObject packaged in this MediaSegmentDragContainer
   * @param {MediaSegment} _segment The MediaSegment packaged in this MediaSegmentDragContainer
   */
  private constructor(private _object: MediaObjectDescriptor, private _segment: MediaSegmentDescriptor) {
  }

  /**
   * Getter for mediatype
   *
   * @return {MediaType}
   */
  get object(): MediaObjectDescriptor {
    return this._object;
  }

  /**
   * Getter for segment.
   *
   * @return {MediaSegment}
   */
  get segment(): MediaSegmentDescriptor {
    return this._segment;
  }

  /**
   * Creates a new MediaSegmentDragContainer from a provided JSON string. The JSON must contain they
   * keys 'mediatype' and 'segment'.
   *
   * @param {string} json JSON string that should be parsed.
   * @return {MediaSegmentDragContainer} Resulting MediaSegmentDragContainer.
   */
  public static fromJSON(json: string): MediaSegmentDragContainer {
    let object = JSON.parse(json);
    return new MediaSegmentDragContainer(object['object'], object['segment']);
  }

  /**
   * Creates a new MediaSegmentDragContainer from a provided SegmentScoreContainer.
   *
   * @param {SegmentScoreContainer} container The SegmentScoreContainer that should be transformed.
   * @return {MediaSegmentDragContainer} Resulting MediaSegmentDragContainer.
   */
  public static fromScoreContainer(container: SegmentScoreContainer): MediaSegmentDragContainer {
    return new MediaSegmentDragContainer(container.objectScoreContainer, container);
  }

  /**
   * Converts the given MediaSegmentDragContainer to a JSON string.
   *
   * @return {string} JSON string representing the MediaSegmentDragContainer
   */
  public toJSON() {
    return JSON.stringify({
      object: this._object,
      segment: this._segment
    }, ['object', 'segment', 'objectId', 'mediatype', 'name', 'path', 'contentURL', 'segmentId', 'sequenceNumber', 'start', 'end', 'startabs', 'endabs'])
  }
}
