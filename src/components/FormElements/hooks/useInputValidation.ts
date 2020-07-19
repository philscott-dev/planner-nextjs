import React, { useState, useContext, useEffect } from 'react'
import { LoadingStatus } from './useLoadingStatus'
import { ValidationContext } from '../Form'

export function useInputValidation(name: string, defaultValue: any) {
  const [value, setValue] = useState(defaultValue || '')
  const [isTouched, setTouched] = useState(false)
  const { updateEntry, isDirty, loadingStatus, error, errors } = useContext(
    ValidationContext,
  )

  // NEW: if defaultValue changes, update things
  useEffect(() => {
    if (defaultValue != undefined) {
      setValue(defaultValue)
    }
  }, [defaultValue])

  //send to context for validation
  useEffect(() => {
    if (isDirty || isTouched) {
      updateEntry(name, value)
    }
  }, [isTouched, isDirty, updateEntry, name, value])

  // reset after successful submit
  useEffect(() => {
    if (loadingStatus === LoadingStatus.Success) {
      setValue('')
      setTouched(false)
    }
  }, [error, loadingStatus])

  const onChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setValue(e.target.value)
  }

  const onBlur = () => {
    if (!isTouched) {
      setTouched(true)
    }
  }

  const onKeyUp = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLSelectElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.keyCode === 13) {
      e.currentTarget.blur()
    }
  }

  return { onChange, onBlur, onKeyUp, value, error: errors[name] }
}
