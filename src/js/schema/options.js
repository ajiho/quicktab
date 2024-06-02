//参数验证
import * as v from 'valibot'
import Utils from '../utils'
import TabSchema from './tab'

const func = v.custom((value) => typeof value === 'function')

const ToolbarItemSchema = v.object({
  enable: v.boolean(),
  icon: v.string(),
  order: v.number(),
})

const ContextmenuItemSchema = v.object({
  enable: v.boolean(),
  text: v.optional(v.string()),
  order: v.optional(v.number()),
  separator: v.optional(v.boolean()),
})

const OptionsSchema = v.object({
  id: v.pipe(v.string(), v.minLength(1)),
  minHeight: v.optional(v.string()),
  height: v.optional(v.string()),
  width: v.optional(v.string()),
  lang: v.optional(v.string()),
  //缓存类型
  cacheType: v.picklist(['local', 'session']),

  responsive: v.object({
    enable: v.boolean(),
    //必须是正整数
    breakpoint: v.pipe(v.number(), v.minValue(0)),
    hide: v.pipe(
      v.array(
        v.picklist(['prev', 'refresh', 'next', 'dropdown', 'fullscreen']),
      ),
      v.check((input) => {
        const uniqueElements = new Set(input)
        return uniqueElements.size === input.length
      }, 'Array elements must be unique'),
    ),
  }),

  defaultTabs: v.pipe(
    v.array(TabSchema),
    v.check((input) => {
      return !Utils.hasDuplicateValues(input, 'url')
    }, '单个Tab选项url不能重复'),
  ),
  toolbar: v.object({
    hide: v.boolean(),
    position: v.picklist(['top', 'bottom']),
    prev: ToolbarItemSchema,
    refresh: ToolbarItemSchema,
    tabWrapper: v.object({
      order: v.number(),
    }),
    next: ToolbarItemSchema,
    dropdown: v.object({
      enable: v.boolean(),
      icon: v.string(),
      order: v.number(),
      searchInput: v.object({
        placeholder: v.string(),
        prefixIcon: v.string(),
      }),
      openedTabs: v.object({
        text: v.string(),
        closeIcon: v.string(),
      }),
      recentlyClosedTabs: v.object({
        text: v.string(),
        showIcon: v.string(),
        hideIcon: v.string(),
      }),
      timeFormat: v.object({
        year: v.string(),
        months: v.string(),
        days: v.string(),
        hours: v.string(),
        minutes: v.string(),
        seconds: v.string(),
      }),
      emptyText: v.string(),
    }),
    fullscreen: ToolbarItemSchema,
  }),
  tab: v.object({
    remember: v.boolean(),
    contextmenu: v.object({
      enable: v.boolean(),
      close: ContextmenuItemSchema,
      closeOthers: ContextmenuItemSchema,
      closePrev: ContextmenuItemSchema,
      closeNext: ContextmenuItemSchema,
      closeAll: ContextmenuItemSchema,
      fullscreen: ContextmenuItemSchema,
      refresh: ContextmenuItemSchema,
      centerActive: ContextmenuItemSchema,
      newBlank: ContextmenuItemSchema,
    }),
    mouseWheelSwitch: v.object({
      enable: v.boolean(),
      onlyScroll: v.boolean(),
    }),
    maxNum: v.number(),
    closeBtn: v.object({
      enable: v.boolean(),
      showOnHover: v.boolean(),
      icon: v.string(),
    }),
    resizeCenterActive: v.boolean(),
    clickCenterActive: v.boolean(),
    doubleClick: v.object({
      enable: v.boolean(),
      refresh: v.boolean(),
    }),
    dragSort: v.boolean(),
    timeout: v.object({
      enable: v.boolean(),
      filter: func,
      text: v.string(),
      second: v.number(),
      template: v.string(),
    }),
    loading: v.object({
      enable: v.boolean(),
      filter: func,
      template: v.string(),
    }),
  }),
  onTabActivated: func,
  onTabAddActivated: func,
  onTabLoaded: func,
  onTabTimeout: func,
  onTabFinally: func,
  onTabAll: func,
  onTabLoadingTransitionend: func,
  onTabClick: func,
  onTabDoubleClick: func,
  onTabClose: func,
  onTabCloseAll: func,
  onInit: func,
})

export default OptionsSchema
