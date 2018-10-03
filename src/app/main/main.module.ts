import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { MainComponent } from "./main.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { jqxListMenuComponent } from "jqwidgets-scripts/jqwidgets-ts/angular_jqxlistmenu";
import { jqxMenuComponent } from "jqwidgets-scripts/jqwidgets-ts/angular_jqxmenu";

@NgModule({
    imports: [CommonModule,RouterModule,FormsModule,BrowserModule],
    declarations: [MainComponent,jqxListMenuComponent,jqxMenuComponent],
    exports: [MainComponent]
})

export class MainModule {
    
}