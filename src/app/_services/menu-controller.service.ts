import { Injectable } from "@angular/core";

@Injectable()
export class MenuController {
    public menuIsOpen: boolean = false;
    public menuItems: MenuItem[] = [
        {
            url: '/mint',
            label: 'DAPP'
        },
        {
            url: 'https://vividuniverse.gitbook.io/foreverai/tokenomics/fai-token-metrics',
            label: 'TOKENOMICS'
        },
        {
            url: 'https://vividuniverse.gitbook.io/foreverai/',
            label: 'WHITEPAPER'
        }
    ]
    
    constructor() {

    }

    toggleMenu(event?: Event) {
        if(event) event.stopPropagation();
        this.menuIsOpen = !this.menuIsOpen;
    }
}

export interface MenuItem {
    sideMenuOnly?: boolean;
    external?: boolean;
    icon?: string;
    url: string;
    label: string;
}