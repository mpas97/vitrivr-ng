import {Component, ViewChild, Input, OnDestroy, OnInit} from "@angular/core";
import {SketchDialogComponent} from "./sketch-dialog.component";
import {MdDialog, MdDialogRef} from '@angular/material';
import {ImageQueryTerm} from "../../../shared/model/queries/image-query-term.model";
import {BinarySketchDialogComponent} from "./binary-sketch-dialog.component";
import {Subscription} from "rxjs";

@Component({
    selector: 'qt-image',
    template:`
        <img #previewimg style="width:150px; height:150px; border:solid 1px;" (click)="onViewerClicked()"/>
        
        <div style="display:flex; align-items: center; justify-content: center;">
            <md-slide-toggle [(ngModel)]="mode3D" (change)="onModeToggled($event)">3D sketch mode</md-slide-toggle>
        </div>
        
        <div style="display:flex; align-items: center; justify-content: center;" *ngIf="!mode3D">
            <md-icon class="muted" mdTooltip="Rough sketch">brush</md-icon>
            <div class="toolbar-spacer-small"></div>
            <md-slider min="0" max="4" step="1" value="2" [(ngModel)]="sliderSetting" (change)="onSettingsChanged($event)"></md-slider>
            <div class="toolbar-spacer-small"></div>
            <md-icon class="muted"  mdTooltip="Example image">insert_photo</md-icon>
        </div>
        <hr class="fade" [style.margin-top]="'10px'" [style.margin-bottom]="'20px'"/>
    `
})

export class ImageQueryTermComponent implements OnInit, OnDestroy {

    /** Component used to display a preview of the selected AND/OR sketched image. */
    @ViewChild('previewimg') private previewimg: any;

    /** The ImageQueryTerm object associated with this ImageQueryTermComponent. That object holds all the settings. */
    @Input() imageTerm: ImageQueryTerm;

    /** Slider to adjust the query-term settings; i.e. to select the features used for image-queries. */
    public sliderSetting : number = 2;

    /** Slider to onToggleButtonClicked between normal image / sketch mode and 3D-sketch mode. */
    public mode3D : boolean = false;

    /** */
    private dialogAfterOpenSubscription : Subscription;

    /**
     * Default constructor.
     *
     * @param dialog
     */
    constructor(private dialog: MdDialog) {}

    /**
     * Called when component is initialized; subscribes to MDDialog afterOpen subscription.
     */
    public ngOnInit() {
        this.dialogAfterOpenSubscription = this.dialog.afterOpen.subscribe(dialogRef => {
            let component = <SketchDialogComponent> dialogRef.componentInstance;

            /* Transfer current image if mode hasn't changed. */
            if (!this.mode3D) {
                component.sketchpad.setImageBase64(this.previewimg.nativeElement.src);
            }
        });
    }

    /**
     * Called when component is destroyed; un-subscribes from MDDialog afterOpen subscription.
     */
    public ngOnDestroy() {
        this.dialogAfterOpenSubscription.unsubscribe();
    }

    /**
     * Triggered whenever either the slider for the query settings is used.
     * Adjusts the settings in the ImageQueryTerm.
     *
     * @param event
     */
    public onSettingsChanged(event:any) {
        this.imageTerm.setting(this.sliderSetting);
    }

    /**
     * Triggered whenever the Mode 3D Slide toggle is used to switch between
     * 3D-sketch mode and normal mode.
     *
     * @param event
     */
    public onModeToggled(event:any) {
        if (this.mode3D) {
            this.sliderSetting = 101;
        } else {
            this.sliderSetting = 2;
        }
        this.imageTerm.setting(this.sliderSetting);
    }

    /**
     * Triggered whenever someone click on the image, which indicates that it should
     * be edited.
     */
    public onViewerClicked() {
        /* Initialize the correct dialog-component. */
        let dialogRef = null;
        if (this.mode3D) {
            dialogRef = this.dialog.open(BinarySketchDialogComponent)
        } else {
            dialogRef = this.dialog.open(SketchDialogComponent)
        }

        /* Register the onClose callback. */
        let subscription = dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.previewimg.nativeElement.src = result;
                this.imageTerm.data = result;
            }
            subscription.unsubscribe();
        });
    }
}