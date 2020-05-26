import {Component, HostListener, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Router} from '@angular/router';
import {QueryService} from 'app/core/queries/query.service';
import {MatDialog} from '@angular/material/dialog';
import {HelpDialogComponent} from './help-dialog.component';


@Component({
  moduleId: module.id,
  selector: 'som-toolbar',
  templateUrl: 'som-toolbar.component.html',
  styleUrls: ['./som-toolbar.component.css']
})
export class SomToolbarComponent implements OnInit {
    public retrievers = [];
    constructor(private _queryService: QueryService, private _dialog: MatDialog, private _router: Router) {
  }

  /**
   * Lifecycle Callback (OnInit): Adds a new QueryTermContainer.
   */
  public ngOnInit() {
    this._queryService.retrieversAsObservable.subscribe(x => this.retrievers = x);
  }

  @HostListener('window:keyup', ['$event'])
  public keyEvent(event: KeyboardEvent) {
    /** H will open the help dialog. */
    if (event.keyCode == 72) {
      this.onHelpClicked();
    }
    /** Q will open the som overview. */
    if (event.keyCode == 81) {
      this._router.navigateByUrl('som-overview');
    }
    /** E will set som deepness to query close (exact). */
    if (event.keyCode == 69) {
      this._queryService.mode_selection = this._queryService.query_mode[0];
    }
    /** N will set som deepness to query near. */
    if (event.keyCode == 78) {
      this._queryService.mode_selection = this._queryService.query_mode[1];
    }
    /** L will set som deepness to exploration little. */
    if (event.keyCode == 76) {
      this._queryService.mode_selection = this._queryService.query_mode[2];
    }
    /** W will set som deepness to exploration wide. */
    if (event.keyCode == 87) {
      this._queryService.mode_selection = this._queryService.query_mode[3];
    }
    /** O will set som deepness to overview. */
    if (event.keyCode == 79) {
      this._queryService.mode_selection = this._queryService.query_mode[4];
    }
    /** T will train a som. */
    if (event.keyCode == 84) {
      this.onSomTrainClicked();
    }
    /** S will set som size to 5. */
    if (event.keyCode == 83) {
      this._queryService.size = 5;
    }
    /** D will set som size to 10. */
    if (event.keyCode == 68) {
      this._queryService.size = 10;
    }
    /** X will set som size to 20. */
    if (event.keyCode == 88) {
      this._queryService.size = 20;
    }
    /** + will increase the som size by 5. */
    if (event.keyCode == 49) {
      this._queryService.size += 5;
    }
    /** - will decrease the som size by 5. */
    if (event.keyCode == 173) {
      this._queryService.size -= 5;
    }
    /** M will swap manual mode. */
    if (event.keyCode == 77) {
      this._queryService.mode_manual = !this._queryService.mode_manual;
    }
    /** left key will open previous cluster. */
    if (event.keyCode == 37) {
      this._queryService.getCluster(-1);
    }
    /** right key will open next cluster. */
    if (event.keyCode == 39) {
      this._queryService.getCluster(1);
    }
    /** up key will open cluster row above. */
    if (event.keyCode == 38) {
      this._queryService.getCluster(-this._queryService.size);
    }
    /** down key will open cluster row below. */
    if (event.keyCode == 40) {
      this._queryService.getCluster(this._queryService.size);
    }
    /** C will clear relevance feedback. */
    if (event.keyCode == 67) {
      this._queryService.clearFeedback();
    }
  }

  public onSomTrainClicked() {
    this._queryService.trainSOM();
    this._router.navigateByUrl('som-overview');
  }

  public onHelpClicked() {
    this._dialog.open(HelpDialogComponent);
  }
  
}
