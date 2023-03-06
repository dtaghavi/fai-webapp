import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    sectionOne;

    private background_index = 1;
    // get BGImgPath(): string {
    //     return `../../../assets/slide/${this.background_index}.png`;
    // }
    constructor() {
        this.sectionOne = document.getElementById('section-one');
        for( let i = 1; i < 4; i++) {
            let img = new Image()
            img.src = `/assets/slide/${i}.png`;
        }

        setInterval(() => {
            if (this.background_index == 4) {
                this.background_index = 1;
            } else {
                this.background_index++;
            }

            if(this.sectionOne) {
                this.sectionOne.style.backgroundImage = `url('../../../assets/slide/${this.background_index}.png')`;
            } else {
                this.sectionOne = document.getElementById('section-one');
                if(this.sectionOne) this.sectionOne.style.backgroundImage = `url('../../../assets/slide/${this.background_index}.png')`;
            }
        }, 4000);
    }
}
