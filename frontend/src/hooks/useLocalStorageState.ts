import { useState } from 'react'

// A small reusable Hook for state that should survive a page reload.
export function useLocalStorageState<T extends string>(
  key: string,
  initialValue: T,
  allowedValues: readonly T[],
) {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = window.localStorage.getItem(key)
      // find loops through allowed options so unexpected saved values are ignored.
      // `??` uses the default only when no allowed saved value was found.
      return allowedValues.find((allowedValue) => allowedValue === storedValue) ?? initialValue
    } catch (error) {
      console.error(`Could not read "${key}" from localStorage.`, error)
      return initialValue
    }
  })

  function updateValue(nextValue: T) {
    setValue(nextValue)
    try {
      window.localStorage.setItem(key, nextValue)
    } catch (error) {
      console.error(`Could not save "${key}" to localStorage.`, error)
    }
  }

  return [value, updateValue] as const
}
