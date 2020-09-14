import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ResultsContainer} from '../../shared/model/results/scores/results-container.model';
import {SegmentScoreContainer} from '../../shared/model/results/scores/segment-score-container.model';
import {EventBusService} from '../../core/basics/event-bus.service';
import {SelectionService} from '../../core/selection/selection.service';
import {FilterService} from '../../core/queries/filter.service';
import {QueryService} from '../../core/queries/query.service';
import {ConfigService} from '../../core/basics/config.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ResolverService} from '../../core/basics/resolver.service';
import {MatDialog} from '@angular/material/dialog';
import {VbsSubmissionService} from '../../core/vbs/vbs-submission.service';
import { AbstractSomSegmentResultsViewComponent } from '../abstract-som-segments-results-view.component';

@Component({
  selector: 'som-overview',
  templateUrl: 'som.component.html',
  styleUrls: ['som.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SomComponent extends AbstractSomSegmentResultsViewComponent<SegmentScoreContainer[]> {

    constructor(_cdr: ChangeDetectorRef,
                _queryService: QueryService,
                _filterService: FilterService,
                _selectionService: SelectionService,
                _eventBusService: EventBusService,
                _router: Router,
                _snackBar: MatSnackBar,
                _configService: ConfigService,
                _resolver: ResolverService,
                _dialog: MatDialog,
                _vbs: VbsSubmissionService) {
        super(_cdr, _queryService, _filterService, _selectionService, _eventBusService, _router, _snackBar, _configService, _resolver, _dialog, _vbs);
    }
    
    scrollIncrement(): number {
        return 500;
    }

    xDim(): string {
        return 'repeat('+this._queryService.size+', 120px)';
    }

    yDim(): string {
        return 'repeat('+this._queryService.size+', 100px)';
    }

    get queryService(): QueryService{
        return this._queryService;
    }
    
    /**
     * Subscribes to the data exposed by the ResultsContainer.
     *
     * @return {Observable<MediaObjectScoreContainer>}
     */
    protected subscribe(results: ResultsContainer) {
        if (results) {
        this._dataSource = results.somOverviewSegmentsAsObservable;
        }
    }
}
      