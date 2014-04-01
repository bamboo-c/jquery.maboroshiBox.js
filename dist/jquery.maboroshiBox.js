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
    this.$target   = $(this.el.hash);
    this.options   = options;

    // メソッド実行
    this.init();
    this.createCloseButton();
    this.bindEvent();
  };

  // メソッド定義
  MaboroshiBox.prototype = {

    /**
    * 初期化のためのメソッド
    * @method init
    */
    init: function () {
      // 初期化済みなら処理中断
      if (MaboroshiBox.initialized) {
        return;
      }
      // 背景レイヤー設定
      MaboroshiBox.$bgLayer     = $('<div class="maboroshiBox__bgLayer"/>').appendTo('body');
      this.$target.addClass('maboroshiBox__modal');
      MaboroshiBox.initialized = true;
    },

    /**
     * クローズボタンを作成するメソッド
     * @method createCloseButton
     */
    createCloseButton: function () {
      // 作成済みなら処理中断
      if (MaboroshiBox.$closeButton) {
        return;
      }
      MaboroshiBox.$closeButton = $(this.options.closeHtml);
    },

    /**
     * イベントを紐付けるためのメソッド
     * @method bindEvent
     */
    bindEvent: function () {
      var self = this;
      // 指定クラス名の要素にopenメソッドをバインド
      self.$el.on('click', function (evt) {
        self.open(evt);
      });

      // $bgLayerとクローズボタンにcloseメソッドをバインド
      MaboroshiBox.$bgLayer.on('click', function () {
        self.close();
      });
      MaboroshiBox.$closeButton.on('click', function () {
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
      MaboroshiBox.$bgLayer.fadeIn('fast');
      this.$target
        .css('top', this.getTop())
        .append(MaboroshiBox.closeButton)
        .fadeIn('fast');
      return false;
    },

    /**
     * モーダルを閉じるためのメソッド
     * @method close
     */
    close: function () {
      this.$target.fadeOut('fast');
      MaboroshiBox.$bgLayer.fadeOut('slow');
    },

    /**
    * 天地中央にするための高さを求めるメソッド
    * @method getTop
    */
    getTop: function () {
      var winHeight     = $(window).height();
      var targetHeight  = this.$target.height();
      return (winHeight - targetHeight) / 2;
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
    closeHtml: '<span class="maboroshi-closeButton">閉じる</span>'
  };
})(jQuery, this);