import * as THREE from 'three';
import {Component, ViewChild, Input} from "@angular/core";
import {MdDialog} from '@angular/material';
import {M3DQueryTerm} from "../../../shared/model/queries/m3d-query-term.model";
import {M3DLoaderDialogComponent} from "./m3d-loader-dialog.component";
import {M3DLoaderComponent} from "../../../shared/components/m3d/m3d-loader.component";

import Mesh = THREE.Mesh;

@Component({
    selector: 'qt-m3d',
    template:`
        <m3d-loader #preview  [width]="150" [height]="150" [interaction]="false" (click)="onViewerClicked()" mdTooltip="Click to change 3D model..."></m3d-loader>
        <div style="display:flex; align-items: center; justify-content: center;">
            <md-icon class="muted" mdTooltip="Low resolution">looks_1</md-icon>
            <div class="toolbar-spacer-small"></div>
            <md-slider min="0" max="2" step="1" value="1" [(ngModel)]="sliderSetting" (change)="onSliderChanged($event)"></md-slider>
            <div class="toolbar-spacer-small"></div>
            <md-icon class="muted" mdTooltip="High resolution">looks_3</md-icon>
        </div>
        <hr class="fade" [style.margin-top]="'10px'" [style.margin-bottom]="'20px'"/>
    `
})

export class M3DQueryTermComponent {
    @ViewChild('preview')
    private preview: M3DLoaderComponent;

    /** The M3DQueryTerm object associated with this M3DQueryTermComponent. That object holds all the query-settings. */
    @Input() m3dTerm: M3DQueryTerm;

    /** Value of the slider. */
    public sliderSetting : number;

    /**
     * Default constructor.
     *
     * @param dialog
     * @param _renderer
     */
    constructor(private dialog: MdDialog) {}

    /**
     * This method is invoked whenever the slider value changes.
     *
     * @param event
     */
    public onSliderChanged(event:any) {
        this.m3dTerm.setting(this.sliderSetting);
    }

    /**
     * Triggered whenever the m3d-loader component is clicked by the user. Causes the
     * selection dialog to be opened.
     */
    public onViewerClicked() {
        let dialogRef = this.dialog.open(M3DLoaderDialogComponent);
        let subscription = dialogRef.afterClosed().subscribe((result : Mesh) => {
            if (result) {
                this.preview.setMesh(result);
                this.preview.render();
                this.m3dTerm.data =  "data:application/3d-json;base64," + btoa(JSON.stringify(result.geometry.toJSON().data));
            }
            subscription.unsubscribe();
        });
    }
}