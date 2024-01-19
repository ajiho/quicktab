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
  formatSearchInputPlaceholder() {
    return `Поиск по вкладкам`
  },
  formatOpenedTabs() {
    return `Открыть вкладку`
  },
  formatRecentlyClosedTabs() {
    return `Недавно закрытые вкладки`
  },
  formatSearchNoResults() {
    return `Ничего не вышло.`
  },
  formatTimeYear() {
    return `Год назад`
  },
  formatTimeMonths() {
    return `Месяц назад`
  },
  formatTimeDays() {
    return `дня назад`
  },
  formatTimeHours() {
    return `часа назад`
  },
  formatTimeMinutes() {
    return `минуты назад`
  },
  formatTimeSeconds() {
    return `секунды назад`
  },
}

Object.assign(Quicktab.DEFAULTS, Quicktab.LANGS['ru_RU'])
