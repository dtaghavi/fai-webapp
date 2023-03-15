import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class OpenAIService {

    constructor(
        private http: HttpClient
    ) {
    }

    generateImage(prompt: string): Promise<Images> {
        return new Promise(async (resolve, reject) => {
            if(prompt.length) {
                let images: any = await this.http.post(environment.endpoint + '/generateImage', {prompt}).toPromise().catch((err) => {
                    console.log({ err });
                    reject(err)
                })
                // console.log(images);
                
                resolve(images.resolve.data);
            } else {
                reject("Must provide a prompt.");
            }
        })
    }

    getVariations(image_url: string) {
        return new Promise((resolve, reject) => {
            if (!image_url.length) return reject("Must provide the image to get a variation of.");
            this.http.get(image_url, {responseType: 'blob'}).subscribe(async (blob: Blob) => {
                const file = new File([blob], 'image.jpg', {type: blob.type});

                const formData = new FormData();
                formData.append('image', file, file.name);

                const variations = await this.http.post(environment.endpoint + '/getVariations', {image: formData}).toPromise().catch((err) => {
                    reject(err);
                })

                console.log({ variations });
                
                resolve(variations);
            })
        })
    }
}

export type Images = {url: string}[];
