/**
 * Created by wujincun on 2016/8/30.
 */
(function ($) {
    $.extend({
        carousel: function (option) {
            function CarouselObj(option) {
                this.init(option);
                this.render();
                this.bind()
            }

            $.extend(CarouselObj.prototype, {
                init: function (option) {
                    var opt = {
                        stage: $("#carousel"),
                        imgsWrap: $(".imgsWrap"),
                        index: 0,
                        hasDot: true,
                        toLeftBtn: $('.left_btn'),
                        toRightBtn: $('.right_btn'),
                        hasNoGap: true,
                        direction: -1,
                        interval: 2000
                    };
                    this.option = $.extend(opt, option);
                    //dom元素
                    this.stage = this.option.stage;
                    this.imgsWrap = this.option.imgsWrap;
                    this.imgs = this.imgsWrap.find('li');
                    this.toLeftBtn = this.option.toLeftBtn;
                    this.toRightBtn = this.option.toRightBtn;
                    //组件宽度
                    this.imgW = this.imgs.eq(0).outerWidth();

                    this.index = this.option.index;
                    this.timer = null;
                },
                render: function () {
                    var _this = this;
                    //设置imgsWrap的宽度
                    var len = this.imgs.length;
                    this.imgsWrap.css({'width': this.imgs.outerWidth() * len + 'px'});
                    //加...
                    if (this.option.hasDot) {
                        html = '<ul class="dotsWrap clearfix">';
                        for (var i = 0; i < len; i++) {
                            html += "<li class='dot'></li>";
                        }
                        html += '</ul>';
                        $(html).appendTo(this.stage);
                        this.dotWrap = $('.dotsWrap');
                        this.dots = this.dotWrap.find('.dot');
                        this.dots.eq(0).addClass('active');
                        this.dotWrap.css({'width': this.dots.eq(0).outerWidth(true) * this.dots.length + 'px'})//未减去最后一个的margin值
                    }
                    //无缝轮播提前复制第一张图片插在最后
                    if (this.option.hasNoGap) {
                        this.imgs.eq(0).clone(true).appendTo(this.imgsWrap);
                        this.imgs = this.imgsWrap.find('li');
                        len = this.imgs.length;
                        this.imgsWrap.css({'width': this.imgs.outerWidth() * len + 'px'});
                    }
                    //
                    timer = setInterval(function () {
                        _this.move()
                    }, 1000)
                },
                bind: function () {
                    var _this = this;
                    this.toLeftBtn.on('click', function () {
                        _this.index --;
                        var n = -1;
                        _this.dots.eq(_this.index).addClass('active').siblings().removeClass('active');
                        _this.imgsWrap.stop().animate({'left': n * _this.index * _this.imgW + 'px'}, 1000)
                    });
                    this.toRightBtn.on('click', function () {

                    });
                    this.stage.mouseenter(function () {
                        clearInterval(timer)
                    }).mouseleave(function () {
                        timer = setInterval(function () {
                            _this.move()
                        }, 1000)
                    });
                },
                move: function () {
                    var n = this.option.direction * 1;
                    this.index++;
                    var len = this.imgs.length;
                    if (this.index >= len - 1) {
                        this.dots.eq(0).addClass('active').siblings().removeClass('active');
                    }
                    if (this.index == this.imgs.length) {
                        this.imgsWrap.css({'left': 0});
                        this.index = 0;
                        this.animate(n)
                    } else {
                        this.animate(n)
                    }
                },
                animate:function (n) {
                    this.dots.eq(this.index).addClass('active').siblings().removeClass('active');
                    this.imgsWrap.stop().animate({'left': n * this.index * this.imgW + 'px'}, 1000);
                }

            });
            return new CarouselObj(option);
        }

    });

})(jQuery);
$.carousel({});