import { number, string, array, boolean, func, optional } from 'superstruct'
import tabOptionStruct from './tab-option-struct'
import Struct from '../utils/struct'

const toolbarItemStruct = Struct.falseOrObject({
  icon: string(),
  order: number(),
})

const contextmenuItemStruct = Struct.falseOrObject({
  text: optional(string()),
  order: optional(number()),
  separator: optional(boolean()),
})

export default Struct.object({
  minHeight: optional(string()),
  height: optional(string()),
  width: optional(string()),
  lang: optional(string()),
  cacheType: Struct.enums(['local', 'session']),
  responsive: Struct.falseOrObject({
    breakpoint: Struct.positive(),
    hideToolbarItem: Struct.uniqueArray(
      Struct.enums(['prev', 'refresh', 'next', 'dropdown', 'fullscreen']),
    ),
  }),
  defaultTabs: array(tabOptionStruct),
  toolbar: Struct.object({
    hide: boolean(),
    position: Struct.enums(['top', 'bottom']),
    prev: toolbarItemStruct,
    refresh: toolbarItemStruct,
    tabWrapper: Struct.object({
      order: number(),
    }),
    next: toolbarItemStruct,
    dropdown: Struct.falseOrObject({
      icon: string(),
      order: number(),
      searchInput: Struct.falseOrObject({
        placeholder: string(),
        prefixIcon: string()
      }),
      openedTabs: Struct.falseOrObject({
        text: string(),
        itemIcon: string()
      }),
      recentlyClosedTabs: Struct.falseOrObject({
        text: string(),
        showIcon: string(),
        hideIcon: string(),
      }),
      timeFormat: Struct.falseOrObject({
        year: string(),
        months: string(),
        days: string(),
        hours: string(),
        minutes: string(),
        seconds: string(),
      }),
      searchNoResultsText: string()
    }),
    fullscreen: toolbarItemStruct,
  }),
  tab: Struct.object({
    remember: boolean(),
    contextmenu: Struct.falseOrObject({
      close: contextmenuItemStruct,
      closeOthers: contextmenuItemStruct,
      closePrev: contextmenuItemStruct,
      closeNext: contextmenuItemStruct,
      closeAll: contextmenuItemStruct,
      fullscreen: contextmenuItemStruct,
      refresh: contextmenuItemStruct,
      centerActive: contextmenuItemStruct,
      newBlank: contextmenuItemStruct,
    }),
    mouseWheelSwitch: Struct.falseOrObject({
      onlyScroll: boolean(),
      centerActive: boolean(),
    }),
    maxNum: Struct.integer(),
    closeBtn: Struct.falseOrObject({
      showOnHover: boolean(),
      icon: string(),
    }),
    resizeCenterActive: boolean(),
    clickCenterActive: boolean(),
    doubleClickRefresh: boolean(),
    dragSort: boolean(),
    timeout: Struct.falseOrObject({
      filter: func(),
      text: string(),
      second: Struct.positiveInteger(),
      template: string(),
    }),
    loading: Struct.falseOrObject({
      filter: func(),
      template: string(),
    }),
  }),
  onTabActivated: func(),
  onTabAddActivated: func(),
  onTabLoaded: func(),
  onTabTimeout: func(),
  onTabFinally: func(),
  onTabAll: func(),
  onTabLoadingTransitionend: func(),
  onTabClick: func(),
  onTabDoubleClick: func(),
  onTabClose: func(),
  onInit: func(),
})
