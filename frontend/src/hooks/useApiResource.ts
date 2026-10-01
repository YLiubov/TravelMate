import { useEffect, useState } from 'react'
import { getJson } from '../services/api'

// Custom Hook: several pages can reuse the same loading/error/data request logic.
export function useApiResource<T>(path: string | null) {
  const [result, setResult] = useState<{
    path: string | null
    data: T | null
    isLoading: boolean
    error: string
  }>({ path, data: null, isLoading: Boolean(path), error: '' })

  useEffect(() => {
    // A null path means the page does not have an endpoint to request yet.
    if (!path) return

    const controller = new AbortController()

    // A Promise represents a request that finishes later: then = success, catch = error.
    getJson<T>(path, controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) {
          setResult({ path, data: result, isLoading: false, error: '' })
        }
      })
      .catch((requestError: unknown) => {
        if (!controller.signal.aborted) {
          setResult({
            path,
            data: null,
            isLoading: false,
            error: requestError instanceof Error ? requestError.message : 'Could not load data.',
          })
        }
      })

    return () => controller.abort()
  }, [path])

  const isCurrentRequest = result.path === path
  // Ternaries choose the value to return while a new endpoint is loading.
  return {
    data: isCurrentRequest ? result.data : null,
    isLoading: path ? !isCurrentRequest || result.isLoading : false,
    error: isCurrentRequest ? result.error : '',
  }
}
