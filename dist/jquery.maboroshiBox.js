/*!
 *  jQury.maboroshiBox.js
 *  MIT-style license.
 *  2014 maboroshi, inc.
 */

(function($, window, undefined) {
  'use strict';

  /**
  * 便利関数など詰め合わせ
  * @namespace helper
  */
  var helper = {
  };

  /**
  * モーダル用プラグイン
  * @class MaboroshiBox
  * @constructor
  * @param {Node}   対象となるエレメント
  * @param {Object} jQuery.fn.maboroshiBoxから渡ってくるoption
  */
  // コンストラクタ定義
  var MaboroshiBox = function (el, options) {
    // プロパティ定義
    this.el        = el;
    this.$el       = $(this.el);
    this.options   = options;
    this.$target   = $(this.$el.attr('href')).addClass('maboroshiBox-modal');

    // メソッド実行
    this.init();
    this.createCloseButton();
    this.addEvent();
  };

  // メソッド定義
  MaboroshiBox.prototype = {

    /**
    * 初期化のためのメソッド
    * @method init
    */
    init: function () {
      // 背景レイヤー設定
      this.$bgLayer = $('<div class="maboroshiBox-bgLayer"/>').appendTo('body');
    },

    /**
     * クローズボタンを作成するメソッド
     * @method createCloseButton
     */
    createCloseButton: function () {
      this.closeButton = $('<span class="' + this.options.closeClassName + '">閉じる</span>');
    },

    /**
     * イベントを紐付けるためのメソッド
     * @method addEvent
     */
    addEvent: function () {
      var self = this;
      // 指定クラス名の要素にopenメソッドをバインド
      self.$el.on('click', function (evt) {
        self.open(evt);
      });

      // bgLayerとクローズボタンにcloseメソッドをバインド
      self.$bgLayer.on('click', function () {
        self.close();
      });
      self.closeButton.on('click', function () {
        self.close();
      });
    },

    /**
     * モーダルを開くためのメソッド
     * @method open
     * @param {Object} イベントオブジェクト
     */
    open: function (evt) {
      evt.preventDefault();
      this.$bgLayer.fadeIn('fast');
      this.$target
        .append(this.closeButton)
        .fadeIn('fast');
      return false;
    },

    /**
     * モーダルを閉じるためのメソッド
     * @method close
     */
    close: function () {
      this.$target.fadeOut('fast');
      this.$bgLayer.fadeOut('slow');
    }
  };

  // jQueryのメンバーメソッドとしてmaboroshiBoxを定義
  $.fn.maboroshiBox = function (options) {
    // デフォルトオプションをユーザー定義で上書き
    options = $.extend({}, $.fn.maboroshiBox.defaults, options);

    return this.each(function (i, el) {
      var maboroshiBox = new MaboroshiBox(el, options);
    });
  };

  // デフォルトオプション定義
  $.fn.maboroshiBox.defaults = {
    type: null,
    closeClassName: 'maboroshi-closeButton'
  };
})(jQuery, this);