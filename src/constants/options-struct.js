import { number, string, array, boolean, func, optional } from 'superstruct'
import tabOptionStruct from './tab-option-struct'
import Struct from '../utils/struct'

const toolbarItemStruct = Struct.object({
  enable: boolean(),
  icon: string(),
  order: number(),
})

const contextmenuItemStruct = Struct.object({
  enable: boolean(),
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
  responsive: Struct.object({
    enable: boolean(),
    breakpoint: Struct.positive(),
    hide: Struct.uniqueArray(
      Struct.enums(['prev', 'refresh', 'next', 'dropdown', 'fullscreen']),
    ),
  }),

  defaultTabs: Struct.arrayOfObjectsWithUniqueKey(tabOptionStruct, 'url'),
  toolbar: Struct.object({
    hide: boolean(),
    position: Struct.enums(['top', 'bottom']),
    prev: toolbarItemStruct,
    refresh: toolbarItemStruct,
    tabWrapper: Struct.object({
      order: number(),
    }),
    next: toolbarItemStruct,
    dropdown: Struct.object({
      enable: boolean(),
      icon: string(),
      order: number(),
      searchInput: Struct.object({
        placeholder: string(),
        prefixIcon: string(),
      }),
      openedTabs: Struct.object({
        text: string(),
        closeIcon: string(),
      }),
      recentlyClosedTabs: Struct.object({
        text: string(),
        showIcon: string(),
        hideIcon: string(),
      }),
      timeFormat: Struct.object({
        year: string(),
        months: string(),
        days: string(),
        hours: string(),
        minutes: string(),
        seconds: string(),
      }),
      emptyText: string(),
    }),
    fullscreen: toolbarItemStruct,
  }),
  tab: Struct.object({
    remember: boolean(),
    contextmenu: Struct.object({
      enable: boolean(),
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
    mouseWheelSwitch: Struct.object({
      enable: boolean(),
      onlyScroll: boolean(),
    }),
    maxNum: Struct.integer(),
    closeBtn: Struct.object({
      enable: boolean(),
      showOnHover: boolean(),
      icon: string(),
    }),
    resizeCenterActive: boolean(),
    clickCenterActive: boolean(),
    doubleClick: Struct.object({
      enable: boolean(),
      refresh: boolean(),
    }),
    dragSort: boolean(),
    timeout: Struct.object({
      enable: boolean(),
      filter: func(),
      text: string(),
      second: Struct.positiveInteger(),
      template: string(),
    }),
    loading: Struct.object({
      enable: boolean(),
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
