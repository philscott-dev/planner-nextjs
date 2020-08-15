import { useEffect, useState } from 'react'

export default function usePlannerQuery() {
  const [query, setQuery] = useState('')
  useEffect(() => {}, [])
  return query
}
