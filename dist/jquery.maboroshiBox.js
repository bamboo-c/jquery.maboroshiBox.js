/*!
 *  jQury.maboroshiBox.js
 *  MIT-style license.
 *  2014 maboroshi, inc.
 */

(function($, window, undefined) {
  'use strict';
  // コンストラクタ定義
  var MaboroshiBox = function () {
  };

  // メソッド定義
  MaboroshiBox.prototype = {
  };

  // maboroshiBox定義
  $.fn.maboroshiBox = function (options) {
    // デフォルトオプションをユーザー定義で上書き
    options = $.extend({}, $.fn.maboroshiBox.defaults, options);

    return this.each(function (i, el) {
    });
  };

  // デフォルトオプション定義
  $.fn.maboroshiBox.defaults = {
  };
})(jQuery, this);