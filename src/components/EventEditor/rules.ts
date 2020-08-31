import { Rules } from 'lib/FormElements/types'
import { isDate, isValid, parseISO, isAfter, isBefore } from 'date-fns'

export const rules: Rules = {
  startTime: [
    {
      error: 'Start Date is required',
      fn: (value, ...args) => {
        return !!value
      },
    },
    {
      error: 'Please enter a valid date',
      fn: (value, ...args) => {
        console.log(value)
        return isDate(value) && isValid(value)
      },
    },
  ],
  endTime: [
    {
      error: 'End Date is required',
      fn: (value, ...args) => {
        return !!value
      },
    },
    {
      error: 'Please enter a valid date',
      fn: (value, ...args) => {
        return isDate(value) && isValid(value)
      },
    },
    {
      error: 'End Date must come after Start Date',
      fn: (value, ...args) => {
        return !!value
      },
    },
  ],
  summary: [
    {
      error: 'Summary is required',
      fn: (value, ...args) => {
        return !!value
      },
    },
  ],
}
