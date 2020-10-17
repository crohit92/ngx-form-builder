import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from "@angular/core";
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { NgxFormElementType, NgxFormSchema } from '../models/ngx-form-schema';

@Component({
    selector: 'ngx-form-builder',
    template: `
    <ng-container *ngIf="group">
        <form [formGroup]="group">
            <ng-container *ngFor="let key of keysOf(schema)">
                <ng-container *ngIf="schema[key].type === 'control'" [ngSwitch]="schema[key].controlType">
                    <ng-container *ngSwitchCase="NgxFormElementType.Text">
                        <ng-container *ngTemplateOutlet="textEl||defaultEl;context:{formControl:schema[key]?.formControl,name:schema[key]?.name,formGroup:schema[key]?.formGroup}"></ng-container>
                    </ng-container>
                </ng-container>
            </ng-container>
        </form>
    </ng-container>
    <ng-template #defaultEl></ng-template>
    `
})
export class NgxFormBuilderComponent {
    NgxFormElementType = NgxFormElementType;
    group: FormGroup;
    _schema: NgxFormSchema;

    @Input() set schema(value: NgxFormSchema) {
        if (value) {
            this._schema = value;
            this.group = this.init(value);
            this.schemaParsed.next(this.group);
        }
    }

    get schema(): NgxFormSchema {
        return this._schema;
    }

    @Output() schemaParsed = new EventEmitter<FormGroup>();

    @ContentChild("TextEl", {
        read: TemplateRef
    }) textEl: TemplateRef<any>;
    constructor() { }

    init(schema: NgxFormSchema) {
        const rawFormGroup = {};
        for (const key of Object.keys(schema)) {
            if (schema[key].type === "control") {
                const control = new FormControl(schema[key]?.value);
                Object.assign(rawFormGroup, { [key]: control });
                schema[key].formControl = control;
            } else {
                const group = this.init(schema[key].controls);
                Object.assign(rawFormGroup, { [key]: group });
                schema[key].formGroup = group;
            }
            schema[key].name = key;
        }
        return new FormGroup(rawFormGroup);
    }

    keysOf(obj) {
        return Object.keys(obj);
    }

}
