import {NgModule} from '@angular/core';
import {ListModule} from './list/list.module';
import {GalleryModule} from './gallery/gallery.module';
import {FeatureDetailsComponent} from './feature-details.component';
import {BrowserModule} from '@angular/platform-browser';
import {HistoryComponent} from './history.component';
import {MaterialModule} from '../material.module';
import {TemporalListModule} from './temporal/temporal-list.module';
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import { SomModule } from './som/som.module';
import { ClusterModule } from './som/cluster.module';

@NgModule({
  imports: [GalleryModule, ListModule, TemporalListModule, BrowserModule, MaterialModule, VgCoreModule, SomModule, ClusterModule],
  declarations: [FeatureDetailsComponent, HistoryComponent],
  exports: [GalleryModule, ListModule, TemporalListModule, SomModule, ClusterModule],
  entryComponents: [FeatureDetailsComponent, HistoryComponent]
})
export class ResultsModule {
}
