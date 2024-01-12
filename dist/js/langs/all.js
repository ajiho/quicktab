(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  Quicktab.LANGS['ru_RU'] = Quicktab.LANGS['ru'] = {
    formatTimeoutMessage() {
      return 'Время ожидания';
    },
    formatContextmenuClose() {
      return "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0438\u0439";
    },
    formatContextmenuCloseOthers() {
      return "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u0434\u0440\u0443\u0433\u0438\u0435";
    },
    formatContextmenuClosePrev() {
      return "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u0441\u043B\u0435\u0432\u0430";
    },
    formatContextmenuCloseNext() {
      return "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043F\u0440\u0430\u0432\u0443\u044E \u0441\u0442\u043E\u0440\u043E\u043D\u0443";
    },
    formatContextmenuCloseAll() {
      return "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u0432\u0441\u0435";
    },
    formatContextmenuFullscreen() {
      return "\u041F\u043E\u043B\u043D\u044B\u0439 \u044D\u043A\u0440\u0430\u043D";
    },
    formatContextmenuRefresh() {
      return "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C";
    },
    formatContextmenuCenterActive() {
      return "\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u0442\u0435\u043A\u0443\u0449\u0435\u043C\u0443";
    },
    formatContextmenuNewBlank() {
      return "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043D\u043E\u0432\u043E\u0435 \u043E\u043A\u043D\u043E";
    }
  };
  Object.assign(Quicktab.DEFAULTS, Quicktab.LANGS['ru_RU']);

  Quicktab.LANGS['en-US'] = Quicktab.LANGS['en'] = {
    formatTimeoutMessage() {
      return 'request timeout';
    },
    formatContextmenuClose() {
      return "Close current";
    },
    formatContextmenuCloseOthers() {
      return "Close Other";
    },
    formatContextmenuClosePrev() {
      return "Close left side";
    },
    formatContextmenuCloseNext() {
      return "Close right side";
    },
    formatContextmenuCloseAll() {
      return "Close all";
    },
    formatContextmenuFullscreen() {
      return "full screen";
    },
    formatContextmenuRefresh() {
      return "Refresh";
    },
    formatContextmenuCenterActive() {
      return "Go back to the current";
    },
    formatContextmenuNewBlank() {
      return "Open a new window";
    }
  };
  Object.assign(Quicktab.DEFAULTS, Quicktab.LANGS['en-US']);

}));
