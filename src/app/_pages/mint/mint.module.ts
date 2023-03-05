import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MintComponent } from "./mint.component";

const Routes: Routes = [
    {
        path: '',
        component: MintComponent
    }
]
@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        RouterModule.forChild(Routes)
    ],
    declarations: [MintComponent]
})
export class MintComponentModule {}