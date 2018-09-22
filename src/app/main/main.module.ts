import { NgModule } from "@angular/core";
import { MainComponent } from "./main.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";


@NgModule({
    imports: [CommonModule,RouterModule],
    declarations: [MainComponent],
    exports: [MainComponent]
})

export class MainModule {
    
}