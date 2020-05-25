import {Component, HostListener, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Router} from '@angular/router';
import { QueryService } from 'app/core/queries/query.service';
import { FilterService } from 'app/core/queries/filter.service';


@Component({
  moduleId: module.id,
  selector: 'som-toolbar',
  templateUrl: 'som-toolbar.component.html',
  styleUrls: ['./som-toolbar.component.css']
})
export class SomToolbarComponent implements OnInit {
    public retrievers = [];
    constructor(private _queryService: QueryService, private _filterService: FilterService, private _router: Router) {
  }

  /**
   * Lifecycle Callback (OnInit): Adds a new QueryTermContainer.
   */
  public ngOnInit() {
    this._queryService.retrieversAsObservable.subscribe(x => this.retrievers = x);
  }

  @HostListener('window:keyup', ['$event'])
  public keyEvent(event: KeyboardEvent) {
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
      this._queryService.trainSOM();
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
    /** up key will pick the privious retriever. */
    if (event.keyCode == 38) {
      const currentIndex = this.retrievers.indexOf(this._queryService.retriever_selection);
      const nextIndex = currentIndex===0 ? this.retrievers.length-1 : currentIndex-1;
      this._queryService.retriever_selection = this.retrievers[nextIndex];
    }
    /** down key will pick the next retriever. */
    if (event.keyCode == 40) {
      const currentIndex = this.retrievers.indexOf(this._queryService.retriever_selection);
      const nextIndex = (currentIndex + 1) % this.retrievers.length;
      this._queryService.retriever_selection = this.retrievers[nextIndex];
    }
    /** M will swap manual mode. */
    if (event.keyCode == 77) {
      this._queryService.mode_manual = !this._queryService.mode_manual;
    }
    /** left key will decrease deepness. */
    if (event.keyCode == 37) {
      if (this._queryService.mode_manual) this._queryService.deepness--;
    }
    /** right key will increase deepness. */
    if (event.keyCode == 39) {
      if (this._queryService.mode_manual) this._queryService.deepness++;
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
  
}
