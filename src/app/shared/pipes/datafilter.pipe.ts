import {Pipe, PipeTransform} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({
    name: 'datadeleteitem'
})
export class DataDelteItemPipe implements PipeTransform {
    transform(list: Array<any>, i?: any): any {
        return list.filter(item=>!item.del);
    }
}

@Pipe({
    name: 'datafilteritem'
})
export class DataFilterItemPipe implements PipeTransform {
    transform(list: Array<any>, id: any): any {
        return list.filter(item=>item.id != id);
    }
}


@Pipe({
    name: 'formattime'
})
export class FormatTimePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        // console.log("value----",value);
        if(value){
            let time = value;
            let pubsh = new Date(time);
            let pubshtime = parseInt((Date.parse(new Date(time).toString())/1000).toString());
            let now = parseInt((Date.parse(new Date().toString())/1000).toString());
            let nowtime = new Date();
            let nowY = nowtime.getFullYear();
            let nowM = parseInt((nowtime.getMonth()).toString())+1;
            let nowD = nowtime.getDate();
            let todaytime = parseInt((Date.parse((new Date(nowY+"-"+nowM+"-"+nowD+" 00:00:00")).toString())/1000).toString()); //今天0点0分时间戳
            // let nowh = nowtime.getHours();
            // let nowm = nowtime.getMinutes();
            let yesterdaytime = todaytime-24*60*60; //昨天0点0分时间戳
            let idate = '';

            if(pubshtime<yesterdaytime){
                idate = time;
            }else if(pubshtime>yesterdaytime && pubshtime<todaytime ){
                idate = '昨天 '+ ('0'+pubsh.getHours()).slice(-2) +':'+ ('0'+pubsh.getMinutes()).slice(-2) ;
            }else{
                let cha = now-pubshtime;
                if(cha<=60){
                    idate = cha+'秒之前';
                }else if(cha>60 && cha<=3600){
                    idate = parseInt((cha/60).toString())+'分钟之前';
                }else if(cha>3600){
                    idate = parseInt((cha/3600).toString())+'小时之前';
                }
            }
            return idate;
        }
        return value;
    }
}



@Pipe({
    name: 'imagelazyload'
})
export class ImageLazyLoadPipe implements PipeTransform {
    baseUrl = "";
    constructor (private sanitizer: DomSanitizer) {
        this.baseUrl = window["context"]["apiroot"];
    }

    transform(url: any, ele: any, video_image:any): any {
        // console.log(ele);

        // setTimeout(()=>{
        //     let img = new Image();
        //     img.src = this.baseUrl + "/" + video_image;
        //     img.onload = function(){
        //         // console.log(ele)
        //         ele.src = this.baseUrl + "/" + video_image;
                
        //     }.bind(this);
        // },50);

        if(video_image){
            this.loadImage(ele,video_image);
        }

        return url;
        // if(p2 > p1 && behavior > 1){
        //     // return txt;
        //     if(behavior == 2){
        //         return this.sanitizer.bypassSecurityTrustHtml(`<marquee style="vertical-align: bottom;" behavior="scroll" scrollamount="2" >${txt}</marquee>`);
        //     }else{
        //         return this.sanitizer.bypassSecurityTrustHtml(`<marquee style="vertical-align: bottom;" behavior="alternate" scrollamount="2" >${txt}</marquee>`);
        //     }
        //     // return `<marquee behavior="scroll" scrollamount="2" >${txt}</marquee>`;
        // }else{
        //     return txt;
        // }
    }

    images = [];
    loaded = false;
    loadImage(ele,video_image){
        this.images.push({dom:ele,url:video_image});
        if(!this.loaded){
            this.startLoad();
        }
    }

    startLoad(){
        if(!this.loaded && this.images.length > 0){
            this.loaded = true;
            let item = this.images.shift();
            let ele = item.dom;
            let url = item.url
            let img = new Image();
            // img.src = this.baseUrl + "/" + url;
            img.src = url;
            img.onload = function(){
                this.loaded = false;
                // console.log(ele)
                // ele.src = this.baseUrl + "/" + url;
                ele.src = url;

                this.startLoad();
            }.bind(this);
            img.onerror = function(){
                this.loaded = false;
                this.startLoad();
            }.bind(this);
        }
    }
}