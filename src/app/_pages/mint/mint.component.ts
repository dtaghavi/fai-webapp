import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Images, OpenAIService } from 'src/app/_services/openai.service';
import { SocketService } from 'src/app/_services/socket.service';
import { AppToastService } from 'src/app/_services/toast.service';


const aspectReg = /(-{2}ar|-{2}aspect{1})\s(\d+:\d+)/gm


@Component({
    selector: 'app-mint',
    templateUrl: './mint.component.html',
    styleUrls: ['./mint.component.scss']
})
export class MintComponent {
    prompt?: string;

    get prePrompt(): string {
        let aspect = '';
        switch(this.aspect) {
            case 'portrait':
                aspect = ', --ar 2:3';
                break;
            case 'landscape':
                aspect = ', --ar 3:2';
                break;
        }
        return `${this.prompt}${aspect}`;
    }

    images?: Images;
    containerAspect?: number;
    aspect: Aspects  = 'square';
    previewMode?: 'quad' | 'upscale';

    waiting: boolean = false;
    zoom?: string;
    percent?: number;
    error?: string;

    get hidePrompt() {
        return window.innerHeight <= 880 && this.previewBox;
    }
    get previewBox(): boolean {
        return this.waiting || this.images != undefined;
    }

    get isLoading(): boolean {
        return this.waiting && this.percent != undefined;
    }

    lastUpdate?: Updates;

    description?: SafeHtml;

    // products?: Array<ShopifyBuy.ProductVariant>;
    // product?: ProductVariant;

    constructor(
        private sanitizer: DomSanitizer,
        private toastService: AppToastService,
        private openai: OpenAIService
    ) {
        // this.socket.io.on('prompt-preview', async (update: Updates) => {
        //     this.containerAspect = await this.getAspect(update.url);
        //     this.preview = update.url;
        //     this.error = undefined;
        //     this.lastUpdate = update;
        //     // console.log('Update', update);

        //     switch (update.type) {
        //         case 'preview':
        //             if (update.percentage) {
        //                 this.percent = +update.percentage;
        //                 this.waiting = true;
        //             }
        //             break;
        //         case 'quad':
        //             this.waiting = false;
        //             this.percent = undefined;
        //             this.zoom = undefined;
        //             this.previewMode = update.type;
        //             break;
        //         case 'upscale':
        //             this.waiting = false;
        //             this.percent = undefined;
        //             this.zoom = undefined;
        //             this.previewMode = update.type;
        //             // this.getProducts();
        //             break;
        //     }
        // })

        // this.socket.io.on('prompt-waiting', () => {
        //     this.waiting = true;
        // })

        // this.socket.io.on('prompt-error', (error: any) => {
        //     this.waiting = false;
        //     this.percent = undefined;
        //     this.zoom = undefined;
        //     this.error = error;
        //     if (typeof this.error != 'string') this.error = JSON.stringify(this.error);
        // })

        // this.getProducts();
    }

    // async getProducts() {
    //     let products = await this.shopify.getProducts(this.aspect).catch(() => {
    //         this.error = 'Error fetching Shopify Products';
    //     });
    //     if (!products) return;

    //     console.log(products);

    //     let product = products[0];

    //     if (!product) {
    //         this.error = 'Shopify Product missing';
    //         return;
    //     }
    //     this.description = this.sanitizer.bypassSecurityTrustHtml(product.descriptionHtml);
    //     this.products = product.variants
    //     // console.log(this.products);

    //     // this.product?.price.amount
    // }

    // onProductChanged() {
    //     console.log(this.product);

    // }
    async generateImage() {
        if(this.prompt?.length) {
            this.waiting = true;
            let urls: any = await this.openai.generateImage(this.prompt).catch(err => {
                console.log({ err });
            })

            console.log(urls);
            this.images = urls;
            this.previewMode = 'quad';
            this.waiting = false;
        }
    }

    onSetAspect(aspect: Aspects) {
        if (this.waiting) return;
        this.aspect = aspect;
    }

    getAspect(url: string): Promise<number> {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = (ev) => {
                resolve(img.height / img.width * 100);
            }
            img.onerror = (error) => {
                reject(error);
            }
            img.src = url;
        });
    }

    onClear() {
        this.images = undefined;
        this.previewMode = undefined;
        this.containerAspect = undefined;
        this.error = undefined;
        this.zoom = undefined;
    }

    onCreate() {
        // this.preview = undefined;
        // this.previewMode = undefined;
        // this.zoom = undefined;
        // this.error = undefined;
        // if (!this.prompt) {
        //     this.error = 'Empty Prompt field';
        //     return;
        // }
        // let reg = new RegExp(aspectReg).exec(this.prompt);
        // if (reg) {
        //     let [aspect, , ratio] = reg;
        //     this.prompt = this.prompt.replace(aspect, '').trim()
        //     switch (ratio) {
        //         case '2:3':
        //             this.aspect = 'portrait';
        //             break;
        //         case '3:2':
        //             this.aspect = 'landscape';
        //             break;
        //         default:
        //             this.aspect = 'square';
        //     }
        // }
        // // console.log('REG', reg, this.prePrompt);

        // this.socket.io.emit('create-prompt', this.prePrompt)
    }

    onInteract(interaction: InteractionsType) {
        // if (this.lastUpdate) {
        //     this.socket.io.emit('prompt-interact', {
        //         message: this.lastUpdate.message,
        //         channel: this.lastUpdate.channel,
        //         interaction
        //     })
        // }
    }

    onZoom(index: number) {
        this.zoom = `zoom zoom-${index}`;
    }
    onUnZoom(ev: Event) {
        ev.stopPropagation();
        this.zoom = undefined;
        this.onViewClick(ev, true);
    }

    onViewClick(ev: Event, off: boolean = false) {
        // console.log(ev);
        ev.preventDefault()

        let target = <HTMLElement>ev.target;
        let at = 0;
        let max = 10;
        let lost = false;
        let buttons = target;
        while (!buttons.classList.contains('buttons') && at <= max && !lost) {
            if (buttons.parentElement) {
                buttons = buttons.parentElement;
                at++;
            } else {
                lost = true;
            }
        }
        if (buttons) {
            if (off) buttons.classList.remove('hide');
            else buttons.classList.toggle('hide');
        }
    }

    async mint(image: any) {
        console.log("Minting: ", image);
        
         this.toastService.show({
            header: 'Mint Not Live',
            body: 'Minting will be allowed upon the launch of FAI Token.',
            delay: 10000
        })
    }

    // addingToCart: boolean = false;
    // async addToCart() {
    //     if (!this.product) {
    //         this.error = 'Select Product Option';
    //         return;
    //     }
    //     this.addingToCart = true;
    //     await this.shopify.addItemToCart({
    //         product_id: this.product.id,
    //         data: {
    //             image: this.preview!
    //         }
    //     });
    //     this.addingToCart = false;
    // }
    // onVariants(quad: '1')
}

type Aspects = 'square' | 'portrait' | 'landscape';

type ViewState = 'quad' | 'upscale' | 'loading';

type InteractionType = 'variants' | 'upscale';
type InteractionQuad = '1' | '2' | '3' | '4';
type InteractionsType = `${InteractionType}-${InteractionQuad}`;

type Updates = ResultUpdate | PreviewUpdate;

interface Update {
    type: string;
    message: string;
    channel: string;
}

interface ResultUpdate extends Update {
    type: 'quad' | 'upscale';
    url: string;
}

interface PreviewUpdate extends Update {
    type: 'preview';
    url: string;
    percentage?: string;
}