import { string, boolean, optional } from 'superstruct'
import Struct from '../utils/struct'

export default Struct.object({
  title: optional(string()),
  url: optional(string()),
  closable: optional(boolean()),
  disabled: optional(boolean()),
})
