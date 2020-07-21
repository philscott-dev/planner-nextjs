import { useEffect, useState } from 'react'
import { Data, ExtraTableData } from './types'

interface UniqueKeysOptions {
  data: Data[]
  extraData?: ExtraTableData
  exclude?: string[]
  include?: string[]
}

export default function useUniqueKeys({
  data,
  extraData,
  include,
  exclude,
}: UniqueKeysOptions): string[] {
  const [keys, setKeys] = useState<string[]>([])
  useEffect(() => {
    // if an include array is provided, we dont have to do any other logic
    // just use the keys in the order provided.
    if (include) {
      setKeys(include)
    } else if (!data) {
      setKeys([])
    } else {
      // generate the array of keys from all objects
      let arr = Object.keys(
        data.reduce((result, obj) => Object.assign(result, obj), []),
      )

      // add keys from the extra data prop
      if (extraData) {
        arr = [...arr, ...Object.keys(extraData)]
      }

      // remove unwanted keys from the exclude array
      if (exclude) {
        arr = arr.filter((key) => !exclude.includes(key))
      }
      setKeys(arr)
    }
  }, [data, extraData, include, exclude])
  return keys
}
