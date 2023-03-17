import { Component } from '@angular/core';
import { MenuController } from './_services/menu-controller.service';
import { SocketService } from './_services/socket.service';
import { AppToastService } from './_services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Forever AI';
  constructor(
    public menuController: MenuController,
    public toastService: AppToastService
  ) {}

  onCloseMenu() {
    if(this.menuController.menuIsOpen) this.menuController.toggleMenu()
  }
}
