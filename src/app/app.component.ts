import { Component } from '@angular/core';
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
    public toastService: AppToastService
  ) {}
}
