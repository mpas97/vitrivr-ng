import {Observable} from 'rxjs';
import {SegmentScoreContainer} from '../shared/model/results/scores/segment-score-container.model';
import {ResultsContainer} from '../shared/model/results/scores/results-container.model';
import {ChangeDetectorRef} from '@angular/core';
import {QueryService} from '../core/queries/query.service';
import {FilterService} from '../core/queries/filter.service';
import {SelectionService} from '../core/selection/selection.service';
import {EventBusService} from '../core/basics/event-bus.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConfigService} from '../core/basics/config.service';
import {ResolverService} from '../core/basics/resolver.service';
import {MatDialog} from '@angular/material/dialog';
import {VbsSubmissionService} from '../core/vbs/vbs-submission.service';
import { AbstractSomResultsViewComponent } from './abstract-som-results-view.component';

/**
 * More specialized AbstractResultsView, tailored for views which display segments
 */
export abstract class AbstractSomSegmentResultsViewComponent<T> extends AbstractSomResultsViewComponent<T> {

  protected constructor(_cdr: ChangeDetectorRef,
                        _queryService: QueryService,
                        _filterService: FilterService,
                        _selectionService: SelectionService,
                        _eventBusService: EventBusService,
                        _router: Router,
                        _snackBar: MatSnackBar,
                        protected _configService: ConfigService,
                        public _resolver: ResolverService,
                        protected _dialog: MatDialog,
                        protected _vbs: VbsSubmissionService) {
    super(_cdr, _queryService, _filterService, _selectionService, _eventBusService, _router, _snackBar);
  }


  /**
   * Getter for the filters that should be applied to SegmentScoreContainer.
   */
  get filters(): Observable<((v: SegmentScoreContainer) => boolean)[]> {
    return this._filterService.segmentFilter;
  }


  /**
   * Subscribes to the data exposed by the ResultsContainer.
   *
   * @return {Observable<MediaObjectScoreContainer>}
   */
  protected abstract subscribe(results: ResultsContainer): void;


}
