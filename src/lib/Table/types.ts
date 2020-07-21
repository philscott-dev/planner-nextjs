export type Data = { [key: string]: any }
export type ExtraTableData = {
  [key: string]: {
    heading?: () => JSX.Element
    cell?: (row: Data, index: number, data: Data[]) => JSX.Element
  }
}
