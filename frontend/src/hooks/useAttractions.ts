import { useEffect, useState } from 'react'
import { getJson } from '../services/api'
import type { Attraction, AttractionDetails } from '../types'

// Custom Hook that turns the attraction list plus its detail requests into one reusable result.
export function useAttractions() {
  const [result, setResult] = useState<{
    attractions: AttractionDetails[]
    isLoading: boolean
    error: string
  }>({ attractions: [], isLoading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()

    // First request the collection endpoint, then request each attraction's translated details.
    getJson<Attraction[]>('/api/attractions', controller.signal)
      .then((items) =>
        Promise.all(
          // map is array iteration; Promise.all waits until every detail request finishes.
          items.map((item) =>
            getJson<AttractionDetails>(`/api/attractions/${item.id}`, controller.signal),
          ),
        ),
      )
      .then((items) => {
        if (!controller.signal.aborted) {
          setResult({ attractions: items, isLoading: false, error: '' })
        }
      })
      .catch((requestError: unknown) => {
        // `if` is a condition: ignore an error after unmounting, so old requests cannot update the page.
        if (!controller.signal.aborted) {
          setResult({
            attractions: [],
            isLoading: false,
            error: requestError instanceof Error ? requestError.message : 'Could not load places.',
          })
        }
      })

    return () => controller.abort()
  }, [])

  return result
}
