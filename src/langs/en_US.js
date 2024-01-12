Quicktab.LANGS['en-US'] = Quicktab.LANGS['en'] = {
  formatTimeoutMessage() {
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
}

Object.assign(Quicktab.DEFAULTS, Quicktab.LANGS['en-US'])
