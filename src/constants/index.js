import Options from './options'
import OptionsStruct from './options-struct'
import TabOptionStruct from './tab-option-struct'
import TabOption from './tab-option'
import DataKeys from './datakeys'
import Classes from './classes'
import Html from './html'
import Lang from './lang'
import Utils from '../utils'

const NAMESPACE = 'Quicktab'
const VERSION = '0.0.1'
const SELECTOR_DATA_TOGGLE = '[data-qt-toggle="quicktab"]'

// 默认选项
const DEFAULTS = Utils.extend(true, {}, Options, Lang)

const LANGS = {
  zh: Lang,
  'zh-CN': Lang,
}

export default {
  VERSION,
  DEFAULTS,
  OPTIONS: Options,
  OPTIONSSTRUCT: OptionsStruct,
  TABOPTIONSTRUCT: TabOptionStruct,
  DATAKEYS: DataKeys,
  TABDEFAULTS: TabOption,
  CLASSES: Classes,
  HTML: Html,
  SELECTOR_DATA_TOGGLE,
  LANGS,
  NAMESPACE,
}
