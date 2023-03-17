import { Component } from '@angular/core';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';
import { MenuController } from 'src/app/_services/menu-controller.service';
import Web3 from 'web3';

declare const window: any;

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
    web3?: Web3;
    connected: boolean = false;
    connected_user?: string;
    hamBurger = faHamburger;

    get trimmedAddr() {
        if (this.connected_user) return `${this.connected_user.slice(0, 3)}...${this.connected_user.slice(-4)}`
        else return 'Connect Wallet'
    }
    constructor(
        public menu: MenuController
    ) {
    }

    handleConnectClick() {
        if (!window.ethereum) {
            alert('Please install MetaMask to use this dApp!');
            return;
        }

        this.web3 = new Web3(window.ethereum);
        if (!this.connected) {
            window.ethereum.request({ method: 'eth_requestAccounts' }).then(async () => {
                // get network id
                let network_id = await this.web3!.eth.getChainId();
                console.log({ network_id });
                // ensure actor is on the ethereum network
                if (network_id !== 1) {
                    // todo handle for not ethereum network
                    console.log("Not the ethereum network");
                }
                this.connected = true;
                // request account after connection
                const accounts = await this.web3!.eth.getAccounts();
                console.log({ accounts });
                // first address returned from connecting
                this.connected_user = accounts[0];
                // console.log('Connected to MetaMask wallet with address: ', accounts[0]);
            }).catch((error: any) => {
                console.error(error);
                alert('An error occurred while connecting to MetaMask.');
            });

            window.ethereum.on('networkChanged', (networkId: string) => {
                console.log({ networkId });
                
                if (networkId !== '1') {
                    // TODO: Notify user they need to switch to Eth Mainnet. 
                }
                // console.log(this.network);
            });

            window.ethereum.on('accountsChanged', async (res: string[]) => {
                if (res.length) {
                    console.log('accounts Changed', res);
                    this.connected_user = res[0];
                } else {
                    this.connected = false;
                    this.connected_user = undefined;
                }
            });
        }
    }

    onOpen(ev: Event) {
        ev.stopPropagation()
        this.menu.menuIsOpen = true;
    }

    onClose(ev: Event) {
        ev.stopPropagation()
        this.menu.menuIsOpen = false;
    }
}
