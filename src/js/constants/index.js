import Options from './options'
import DataKeys from './datakeys'
import Classes from './classes'
import Html from './html'
import Lang from './lang'
import extend from 'just-extend'
const NAMESPACE = 'Quicktab'
const VERSION = '0.0.1'
const SELECTOR_DATA_TOGGLE = '[data-qt-toggle="quicktab"]'

// 默认选项
const DEFAULTS = extend(true, {}, Options.Default, Lang)

const LANGS = {
  zh: Lang,
  'zh-CN': Lang,
}

export default {
  VERSION,
  DEFAULTS,
  OPTIONS: Options,
  DATAKEYS: DataKeys,
  CLASSES: Classes,
  HTML: Html,
  SELECTOR_DATA_TOGGLE,
  LANGS,
  NAMESPACE,
}
