(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  Quicktab.LANGS['en-US'] = Quicktab.LANGS['en'] = {
    formatLoadingMessage() {
      return 'request timeout'
    },

    formatContextmenuClose() {
      return `Close current`
    },

    formatContextmenuCloseOthers() {
      return `Close Other`
    },
    formatContextmenuClosePrev() {
      return `Close left side`
    },
    formatContextmenuCloseNext() {
      return `Close right side`
    },
    formatContextmenuCloseAll() {
      return `Close all`
    },
    formatContextmenuFullscreen() {
      return `full screen`
    },
    formatContextmenuRefresh() {
      return `Refresh`
    },
    formatContextmenuCenterActive() {
      return `Go back to the current`
    },
    formatContextmenuNewBlank() {
      return `Open a new window`
    },
  };

  Object.assign(Quicktab.DEFAULTS, Quicktab.LANGS['en-US']);

  Quicktab.LANGS['ru_RU'] = Quicktab.LANGS['ru'] = {
    formatLoadingMessage() {
      return 'Время ожидания'
    },

    formatContextmenuClose() {
      return `Закрыть текущий`
    },

    formatContextmenuCloseOthers() {
      return `Закрыть другие`
    },
    formatContextmenuClosePrev() {
      return `Закрыть слева`
    },
    formatContextmenuCloseNext() {
      return `Закрыть правую сторону`
    },
    formatContextmenuCloseAll() {
      return `Закрыть все`
    },
    formatContextmenuFullscreen() {
      return `Полный экран`
    },
    formatContextmenuRefresh() {
      return `Обновить`
    },
    formatContextmenuCenterActive() {
      return `Вернуться к текущему`
    },
    formatContextmenuNewBlank() {
      return `Открыть новое окно`
    },
  };

  Object.assign(Quicktab.DEFAULTS, Quicktab.LANGS['ru_RU']);

}));
