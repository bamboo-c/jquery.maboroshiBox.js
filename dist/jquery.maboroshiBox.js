/*!
 *  jQuery.maboroshiBox.js
 *  MIT-style license.
 *  2014 maboroshi, inc.
 */

(function ($, window, undefined) {
    'use strict';

    var arrayProto = Array.prototype,
        slice      = arrayProto.slice,

        /**
         * ユーティリティ関数集
         */
        helper = {

            /**
             * レガシー用デバッグ関数
             * @method debug
             * @return {Function} ログを出力する関数
             */
            debug: (function () {
                // window.consoleがない場合はalertデバッグ
                var fn = function () {
                    alert(arguments[0]);
                };
                if ('console' in window) {
                    fn = function () {
                        var args = slice.call(arguments);
                        console.log(args);
                    };
                }
                return fn;
            })(),

            /**
             * 遅延処理
             * @method wait
             * @param {Integer} delay
             * @example
             * helper.wait(3000).done(function () {
             *   // do something
             * });
             */
            wait: function (delay) {
                var deferred = $.Deferred();
                setTimeout(function () {
                    deferred.resolve();
                }, +delay);
                return deferred.promise();
            },

            /**
             * 端末によりイベント振り分け
             * @property
             * @return {String} 'click' or 'touchend'
             */
            clickEvent: (function () {
                return 'ontouchend' in window ? 'touchend' : 'click';
            })()
        };

    /**
     * モーダル用プラグイン
     * @class MaboroshiBox
     * @constructor
     */
    function MaboroshiBox() {

        /**
         * 背景レイヤー
         * @property $bgLayer
         * @type Object
         */
        this.$bgLayer = $('<div class="maboroshiBox__bgLayer"/>');

        /**
         * 閉じるボタン
         * @property $closeButton
         */
        this.$closeButton = $('<span class="maboroshiBox__closeButton">閉じる</span>');

        // メソッド実行
        this._init();
    }

    /**
     * 初期化のためのメソッド
     * @method _init
     * @protected
     */
    MaboroshiBox.prototype._init = function () {
        var self = this;

        self.$bgLayer.appendTo('body');

        // $bgLayerとクローズボタンにcloseメソッドをバインド
        self.$bgLayer.on(helper.clickEvent, function () {
            self._close();
        });

        self.$closeButton.on(helper.clickEvent, function () {
            self._close();
        });
    };

    /**
     * モーダルを開くためのメソッド
     * @method _open
     * @protected
     * @param {Object} イベントオブジェクト
     */
    MaboroshiBox.prototype._open = function (evt, $el, options) {
        var $target;

        if (options.type === 'inline') {
            $target = $($el.attr('href'));
        }

        this.$bgLayer.fadeIn('fast');
        $target
            .addClass('js-maboroshiBox--visible')
            .append(this.$closeButton)
            .fadeIn('fast')
            .css({
                top: this._getTop($target)
            });

        evt.preventDefault();
        return false;
    };

    /**
     * モーダルを閉じるためのメソッド
     * @method _close
     * @protected
     */
    MaboroshiBox.prototype._close = function () {
        $('.js-maboroshiBox--visible')
            .removeClass('js-maboroshiBox--visible')
            .fadeOut('fast');

        this.$bgLayer.fadeOut('slow');
    };

    /**
     * 天地中央にするための高さを求めるメソッド
     * @method _getTop
     * @protected
     * @return {Number} モーダルに設定する高さ
     */
    MaboroshiBox.prototype._getTop = function ($el) {
        var winHeight    = $(window).height(),
            targetHeight = $el.height();
        return (winHeight - targetHeight) / 2;
    };

    /**
     * イベントを紐付けるためのメソッド
     * @method bindEvent
     * @public
     */
    MaboroshiBox.prototype.bindEvent = function (obj) {
        var $el  = $(obj.el),
            self = this;

        $el.on(helper.clickEvent, function (evt) {
            self._open.apply(self, [evt, $el, obj.options]);
        });
    };

    var maboroshiBox = new MaboroshiBox();


    // jQueryのメンバーメソッドとしてmaboroshiBoxを定義
    $.fn.maboroshiBox = function (options) {
        options = $.extend({
            type: 'inline'
        }, options);

        return this.each(function (i, el) {
            maboroshiBox.bindEvent({
                el: el,
                options: options
            });
        });
    };

})(jQuery, this);