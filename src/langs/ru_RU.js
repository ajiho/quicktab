Quicktab.LANGS['ru_RU'] = Quicktab.LANGS['ru'] = {
  formatTimeoutMessage() {
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
}

Object.assign(Quicktab.DEFAULTS, Quicktab.LANGS['ru_RU'])
