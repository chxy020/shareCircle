import { Directive, ElementRef, HostListener, OnInit, Output, EventEmitter, Input } from '@angular/core';
declare var $;

@Directive({
    selector: '[dropload]'
})
export class DropLoadDirective implements OnInit{
    @Output() public drapUp = new EventEmitter<any>();
    @Output() public drapDown = new EventEmitter<any>();

    @Input() public options:number = 1;
    
    constructor(private el: ElementRef) {
    }

    public ngOnInit(): void {
        let config = {
            scrollArea : window,
            scope:this,
            domUp : {
                domClass   : 'dropload-up',
                domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
                domUpdate  : '<div class="dropload-update">↑释放更新</div>',
                domLoad    : '<div class="dropload-load"><span class="loading-dp"></span>数据加载中...</div>'
            },
            domDown : {
                domClass   : 'dropload-down',
                domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
                domLoad    : '<div class="dropload-load"><span class="loading-dp"></span>数据加载中...</div>',
                domNoData  : '<div class="dropload-noData">已无更多内容</div>'
            },
            threshold : 150,
            // distance: 100,
            // autoLoad:false
        };
        // console.log(this.options)
        if(this.options === 1){
            config["loadUpFn"] = function(me){
                // console.log("loadUpFn----",me,this);
                this.scope.drapUp.emit(me);
            }
            config["loadDownFn"] = function(me){
                // console.log("loadDownFn----",me,this);
                this.scope.drapDown.emit(me);
            }
        }else if(this.options === 2){
            config["loadUpFn"] = function(me){
                // console.log("loadUpFn----",me,this);
                this.scope.drapUp.emit(me);
            }
        }else if(this.options === 3){
            config["loadDownFn"] = function(me){
                // console.log("loadDownFn----",me,this);
                this.scope.drapDown.emit(me);
            }
        }
        $(this.el.nativeElement).dropload(config);
    } 
}