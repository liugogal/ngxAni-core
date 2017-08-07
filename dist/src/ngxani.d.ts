import { NgxCss } from './ngxcss';
import { IEase } from './ngxease';
/**
* NgxAni
*
* use
* --CODE: this.ngxani.to(a,.3,{height:'100px',ease: this.ngxani['easeOutBack']});
* --CODE: this.ngxani.fromTo(a,.3,{height:'200px'},{height:'100px'});
*
* property
* --CODE: this.ngxani.useTranstionEvent=false;  Whether to use the native transtionend event - there are compatibility issues with the default settimeout
* --CODE: this.ngxani.compatible=true;  Compatible with old browsers, old browsers do not have animation
* --CODE: this.ngxani.debug=true;  debug mode
*
* @langversion TypeScript 2.0
* @frameworks Angular 2.0.1
* @tiptext
*
*/
export declare class NgxAni {
    private ngxCss;
    private keyword;
    private anis;
    useTranstionEvent: boolean;
    debug: boolean;
    compatible: boolean;
    ease: IEase;
    constructor(ngxCss: NgxCss);
    readonly support: boolean;
    /**
    * to
    * this.ngxani.to(a,.3,{height:'100px'});
    */
    to(ele: any, time: number, args: {
        ease?: string;
        delay?: number;
        [propName: string]: any;
    }): string;
    /**
    * fromTo
    * this.ngxani.fromTo(a,.3,{height:'200px'},{height:'100px'});
    */
    fromTo(ele: any, time: number, fromArgs: Object, toArgs: Object): void;
    /**
    * kill
    * this.ngxani.kill(a);
    */
    kill(ele: any, complete?: boolean): void;
    getTransform(param: {
        x?: string | number;
        y?: string | number;
        scale?: string | number;
        rotate?: string | number;
        pre?: string | Object;
        no?: Object;
        [propName: string]: any;
    }): {
        'transform': string;
        '-webkit-transform': string;
        '-ms-transform': string;
        '-o-transform': string;
        '-moz-transform': string;
    };
    private start(ele, transition, time, args);
    /**
    * no animation
    */
    private noAniStart(ele, transition, time, args);
    /**
    * Set the style set style or add class
    */
    private setStyle(ele, args);
    /**
    * add callbacks
    */
    private addCallback(ele, time, args);
    private getPureStyleKeys(args);
    /**
    * get pure style
    */
    private getPureStyle(args);
}
