import * as v from 'valibot'

const TabSchema = v.object({
  title: v.optional(v.string()),
  url: v.pipe(v.string(), v.minLength(1)),
  closable: v.optional(v.boolean()),
})

export default TabSchema
