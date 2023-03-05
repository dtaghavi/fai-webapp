import { Component } from '@angular/core';
import { SocketService } from './_services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Forever AI';
  constructor(
    private socket: SocketService
  ) {}
}
