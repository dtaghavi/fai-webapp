import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NavBarComponent } from "src/app/_components/nav-bar/nav-bar.component";
import { HomeComponentRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        CommonModule,
        HomeComponentRoutingModule
    ],
    declarations: [
        HomeComponent
    ]
})
export class HomeComponentModule {}