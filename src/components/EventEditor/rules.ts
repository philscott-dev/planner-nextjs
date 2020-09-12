import { Rules } from 'lib/FormElements/types'
import { isDate, isValid, parseISO, isAfter, isEqual } from 'date-fns'

export const rules: Rules = {
  summary: [
    {
      error: 'Summary is required',
      fn: (value, ...args) => {
        return !!value
      },
    },
  ],
  startTime: [
    {
      error: 'Start Date is required',
      fn: (value) => {
        return !!value
      },
    },
    {
      error: 'Please enter a valid date',
      fn: (value) => {
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
      fn: (value) => {
        return isDate(value) && isValid(value)
      },
    },
    {
      error: 'Must come after Start Date',
      fn: (value, entries) => {
        if (entries?.startTime) {
          return (
            isAfter(value, entries.startTime) ||
            isEqual(value, entries.startTime)
          )
        }
        return true
      },
    },
  ],
  user: [
    {
      error: 'Please select a user',
      fn: (value) => !!value,
    },
  ],
  color: [
    {
      error: 'Please select a color',
      fn: (value) => !!value,
    },
  ],
  // description: [
  //   {
  //     error: 'Please provide a description',
  //     fn: (value) => !!value,
  //   },
  // ],
}
