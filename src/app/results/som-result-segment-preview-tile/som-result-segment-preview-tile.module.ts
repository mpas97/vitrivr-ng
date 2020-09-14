import {NgModule} from '@angular/core';
import {MaterialModule} from '../../material.module';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from '../../app-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ContainerPipesModule} from '../../shared/pipes/containers/container-pipes.module';
import {VbsModule} from '../../core/vbs/vbs.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {VgCoreModule} from 'videogular2/core';
import {SomResultSegmentPreviewTileComponent} from './som-result-segment-preview-tile.component';

@NgModule({
  imports: [MaterialModule, BrowserModule, FormsModule, AppRoutingModule, FlexLayoutModule, ContainerPipesModule, VbsModule, InfiniteScrollModule, VgCoreModule],
  declarations: [SomResultSegmentPreviewTileComponent],
  exports: [SomResultSegmentPreviewTileComponent]
})
export class SomResultSegmentPreviewTileModule {
}
