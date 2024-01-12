import FullOption from './full-option'
import FullOptionStruct from './full-option-struct'
import TabOptionStruct from './tab-option-struct'
import TabOption from './tab-option'
import DataKeys from './datakeys'
import Classes from './classes'
import Html from './html'
import Lang from './lang'
import Utils from '../utils'

const VERSION = '0.0.1'
const SELECTOR_DATA_TOGGLE = '[data-qt-toggle="quicktab"]'

//禁用掉一些选项
const Presets = {
  toolbar: {
    refresh: false,
    dropdown: false,
    fullscreen: false,
  },
  tab: {
    remember: false,
    contextmenu: false,
    mouseWheelSwitch: false,
    timeout: false,
    loading: false,
  },
}

// 默认选项
const DEFAULTS = Utils.extend(true, {}, FullOption, Lang, Presets)

//默认的语言包是中文
const LANGS = {
  zh: Lang,
  'zh-CN': Lang,
}

export default {
  VERSION,
  DEFAULTS,
  FULLOPTION: FullOption,
  FULLOPTIONSTRUCT: FullOptionStruct,
  TABOPTIONSTRUCT: TabOptionStruct,
  DATAKEYS: DataKeys,
  TABDEFAULTS: TabOption,
  CLASSES: Classes,
  HTML: Html,
  SELECTOR_DATA_TOGGLE,
  LANGS,
}
