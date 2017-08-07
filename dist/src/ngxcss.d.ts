/**
* NgxCss Control style function class
*
*
* @langversion TypeScript 2.0
* @frameworks Angular 2.0.1
* @tiptext
*
*/
export declare class NgxCss {
    private div;
    private pfObj;
    constructor();
    /** is support css transition */
    hasTransition(): boolean;
    /** is support css 3d */
    has3d(): boolean;
    /** get transtion end */
    getTranstionEndEvent(): string;
    getPrefix(mode?: number): string;
    css(ele: HTMLElement, props: Object, type?: number): void;
    css2(ele: HTMLElement, style: string, value: any): void;
    css3(ele: HTMLElement, style: string, value: any): void;
    setOriginCenter(ele: HTMLElement): void;
    /** backgroundColor <-> background-color */
    convertStyleMode(style: string, mode?: string): string;
    addClass(ele: HTMLElement, newClass: string): void;
    removeClass(ele: HTMLElement, className: string): void;
    hasClass(ele: HTMLElement, className: string): any;
    addEventListener(ele: HTMLElement, event: string, handler: any): void;
    removeEventListener(ele: HTMLElement, event: string, handler: any): void;
}
