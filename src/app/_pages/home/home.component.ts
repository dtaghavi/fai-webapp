import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    sectionOne;

    private background_index = 1;
    get BGImgPath(): string {
        return `../../../assets/slide/${this.background_index}.png`;
    }
    constructor() {
        this.sectionOne = document.getElementById('section-one');

        setInterval(() => {
            if (this.background_index == 5) {
                this.background_index = 1;
            } else {
                this.background_index++;
            }

            if(this.sectionOne) {
                this.sectionOne.style.backgroundImage = `url('../../../assets/slide/${this.background_index}.png')`;
            } else {
                this.sectionOne = document.getElementById('section-one');
                this.sectionOne!.style.backgroundImage = `url('../../../assets/slide/${this.background_index}.png')`;
            }
    
        }, 10000);
    }
}
