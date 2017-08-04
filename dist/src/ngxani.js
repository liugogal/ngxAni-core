"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ngxcss_1 = require("./ngxcss");
var ngxease_1 = require("./ngxease");
var dic_1 = require("./dic");
var gethtmlelement_1 = require("./gethtmlelement");
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
var NgxAni = (function () {
    function NgxAni(ngxCss) {
        this.ngxCss = ngxCss;
        this.keyword = ['nokill', 'ease', 'delay', 'all', 'class', 'onStart', 'onUpdate', 'onComplete'];
        this.anis = {};
        this.useTranstionEvent = false;
        this.debug = false;
        this.compatible = true;
        this.ease = ngxease_1.NgxEASE;
        for (var key in ngxease_1.NgxEASE) {
            this[key] = ngxease_1.NgxEASE[key];
        }
    }
    Object.defineProperty(NgxAni.prototype, "support", {
        get: function () {
            return this.ngxCss.hasTransition();
        },
        enumerable: true,
        configurable: true
    });
    /**
    * to
    * this.ngxani.to(a,.3,{height:'100px'});
    */
    NgxAni.prototype.to = function (ele, time, args) {
        var transition = '';
        var styles = this.getPureStyleKeys(args);
        for (var i = 0; i < styles.length; i++) {
            if (i > 0)
                transition += ', ';
            var style = styles[i];
            if (/transform/ig.test(style)) {
                if (!/transform/ig.test(transition)) {
                    var prefix = this.ngxCss.getPrefix(2);
                    transition += prefix + 'transform';
                }
            }
            else {
                transition += this.ngxCss.convertStyleMode(styles[i], 'css');
            }
            //transition += this.ngxCss.convertStyleMode(styles[i], 'css');
            transition += ' ' + time + 's';
            if (args.ease)
                transition += ' ' + args.ease;
            if (args.delay)
                transition += ' ' + args.delay + 's';
        }
        if (this.compatible && !this.support)
            return this.noAniStart(ele, transition, time, args);
        else
            return this.start(ele, transition, time, args);
    };
    /**
    * fromTo
    * this.ngxani.fromTo(a,.3,{height:'200px'},{height:'100px'});
    */
    NgxAni.prototype.fromTo = function (ele, time, fromArgs, toArgs) {
        var _this = this;
        this.kill(ele);
        this.setStyle(ele, fromArgs);
        setTimeout(function () { _this.to(ele, time, toArgs); }, 22.2);
    };
    /**
    * kill
    * this.ngxani.kill(a);
    */
    NgxAni.prototype.kill = function (ele, complete) {
        ele = gethtmlelement_1.getHTMLElement(ele);
        this.ngxCss.css3(ele, 'transition', 'none !important');
        this.ngxCss.css3(ele, 'transition', 'none');
        dic_1.Dic.get(ele).id && clearTimeout(dic_1.Dic.get(ele).id);
        dic_1.Dic.get(ele).event && this.ngxCss.removeEventListener(ele, dic_1.Dic.get(ele).event, dic_1.Dic.get(ele).handler);
    };
    NgxAni.prototype.getTransform = function (param) {
        var transform = "";
        if (param.x !== undefined || param.y !== undefined) {
            var x = typeof param.x == 'string' ? param.x : (param.x || 0) + 'px';
            var y = typeof param.y == 'string' ? param.y : (param.y || 0) + 'px';
            transform += " translate(" + x + ", " + y + ")";
        }
        if (param.scale)
            transform += " scale(" + param.scale + ", " + param.scale + ")";
        if (param.rotate)
            transform += " rotate(" + param.rotate + "deg)";
        if (param.pre)
            transform = param.pre + " " + transform;
        var css = {
            'transform': transform,
            '-webkit-transform': transform,
            '-ms-transform': transform,
            '-o-transform': transform,
            '-moz-transform': transform
        };
        if (param.no) {
            for (var key in param.no) {
                css[key] = param.no[key];
            }
        }
        return css;
    };
    NgxAni.prototype.start = function (ele, transition, time, args) {
        ele = gethtmlelement_1.getHTMLElement(ele);
        var id = dic_1.Dic.setId(ele);
        (!args.nokill) && this.kill(ele);
        //set ani
        this.ngxCss.css3(ele, 'transition', transition);
        this.setStyle(ele, args);
        this.addCallback(ele, time, args);
        this.debug && console.trace(ele, ele.__nxid, transition);
        return id;
    };
    /**
    * no animation
    */
    NgxAni.prototype.noAniStart = function (ele, transition, time, args) {
        var _this = this;
        ele = gethtmlelement_1.getHTMLElement(ele);
        var id = dic_1.Dic.setId(ele);
        (!args.nokill) && this.kill(ele);
        this.useTranstionEvent = false;
        setTimeout(function () {
            args.delay = 0;
            _this.setStyle(ele, args);
            _this.addCallback(ele, 0, args);
        }, 50);
        this.debug && console.trace(ele, ele.__nxid, transition);
        return id;
    };
    /**
    * Set the style set style or add class
    */
    NgxAni.prototype.setStyle = function (ele, args) {
        ele = gethtmlelement_1.getHTMLElement(ele);
        //add style
        this.ngxCss.css(ele, this.getPureStyle(args));
        //add class
        args.className && this.ngxCss.addClass(ele, args.className);
    };
    /**
    * add callbacks
    */
    NgxAni.prototype.addCallback = function (ele, time, args) {
        var _this = this;
        var delay = args.delay || 0;
        var allTime = (time + delay) * 1000;
        if (args.onStart)
            setTimeout(args.onStart, delay * 1000);
        if (args.onComplete) {
            if (this.useTranstionEvent) {
                dic_1.Dic.get(ele).event = this.ngxCss.getTranstionEndEvent();
                dic_1.Dic.get(ele).fun = args.onComplete;
                dic_1.Dic.get(ele).handler = (function (ele) {
                    dic_1.Dic.get(ele).fun();
                    _this.ngxCss.removeEventListener(ele, dic_1.Dic.get(ele).event, dic_1.Dic.get(ele).handler);
                }).bind(null, ele);
                this.ngxCss.addEventListener(ele, dic_1.Dic.get(ele).event, dic_1.Dic.get(ele).handler);
            }
            else {
                dic_1.Dic.get(ele).id = setTimeout(args.onComplete, allTime);
            }
        }
    };
    //get style key name
    NgxAni.prototype.getPureStyleKeys = function (args) {
        if (args.all || args.css || args.className)
            return ['all'];
        var keys = [];
        for (var key in args) {
            if (this.keyword.indexOf(key) < 0)
                keys.push(key);
        }
        return keys;
    };
    /**
    * get pure style
    */
    NgxAni.prototype.getPureStyle = function (args) {
        var obj = {};
        for (var key in args) {
            if (this.keyword.indexOf(key) < 0)
                obj[key] = args[key];
        }
        return obj;
    };
    return NgxAni;
}());
NgxAni = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ngxcss_1.NgxCss])
], NgxAni);
exports.NgxAni = NgxAni;
