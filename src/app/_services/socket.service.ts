import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import io, { Socket } from 'socket.io-client';

@Injectable()
export class SocketService {
    connected: boolean = false;

    public io: Socket;
    public roomId = '';

    constructor(){
        this.io = io(environment.endpoint);

        this.io.on('get-auth', () => {
            let token = localStorage.getItem('auth-token');
            console.log('FOUND TOKEN', token);
            
            if(token) this.io.emit('auth-token', token);
            else this.io.emit('no-auth');
        })

        this.io.on('set-auth', (token: string) => {
            console.log('SET TOKEN', token);
            
            localStorage.setItem('auth-token', token);
        })
    }
}

export interface Connection {
    client_auth: boolean;
    message?: string;
    room?: string;
}