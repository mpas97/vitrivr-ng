import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../app-routing.module';
import {MaterialModule} from '../../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ContainerPipesModule} from '../../shared/pipes/containers/container-pipes.module';
import {VbsModule} from '../../core/vbs/vbs.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {VgCoreModule} from 'videogular2/core';
import {SomToolbarComponent} from './som-toolbar.component';
import {HelpDialogComponent} from './help-dialog.component';

@NgModule({
  imports: [MaterialModule, BrowserModule, FormsModule, AppRoutingModule, FlexLayoutModule, ContainerPipesModule, VbsModule, InfiniteScrollModule, VgCoreModule],
  declarations: [SomToolbarComponent, HelpDialogComponent],
  exports: [SomToolbarComponent, HelpDialogComponent],
  entryComponents: [HelpDialogComponent]
})
export class SomToolbarModule {
}
