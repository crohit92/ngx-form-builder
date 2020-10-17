import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFormBuilderComponent } from './components/ngx-form-builder.component';



@NgModule({
  declarations: [NgxFormBuilderComponent],
  exports: [NgxFormBuilderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class NgxFormBuilderModule {
}
