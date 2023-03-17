import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponentModule } from './_pages/home/home.module';
import { MintComponentModule } from './_pages/mint/mint.module';
import { SocketService } from './_services/socket.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './_components/nav-bar/nav-bar.component';
import { SocialsBarComponent } from './_components/socials-bar/socials-bar.component';
import { AppToastService } from './_services/toast.service';
import { OpenAIService } from './_services/openai.service';
import { HttpClientModule } from '@angular/common/http';
import { MenuController } from './_services/menu-controller.service';
import { SideMenuComponent } from './_components/side-menu/side-menu.component';
import { SideMenuComponentModule } from './_components/side-menu/side-menu.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SocialsBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeComponentModule,
    MintComponentModule,
    FontAwesomeModule,
    HttpClientModule,
    NgbModule,
    SideMenuComponentModule
  ],
  providers: [
    SocketService,
    AppToastService,
    OpenAIService,
    MenuController
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
