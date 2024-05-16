import { string, boolean, optional } from 'superstruct'
import Struct from '../utils/struct'

export default Struct.object({
  title: optional(string()),
  url: Struct.string(),
  closable: optional(boolean()),
})
