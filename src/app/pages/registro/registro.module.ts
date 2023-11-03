import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RegistroRoutingModule } from './registro-routing.module';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        RegistroRoutingModule,
        SharedModule
    ]
})
export class RegistroModule { }
