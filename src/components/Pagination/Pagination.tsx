// /** @jsx jsx */
// import React, { FC } from 'react'
//import styled from '@emotion/styled'

// interface PaginationProps {
//   page: number
//   pageCount: number
// }

// const Pagination: FC<PaginationProps> = ({
//   page,
//   pageCount,
//   pageSkip,
//   showFirst,
//   showLast,
//   showEllipses,
//   firstText,
//   lastText,
//   prevText,
//   nextText,
//   maintainSkipWidth,
//   onClick,
// }) => {
//   /** call props.onClick with next page */
//   const handleNext = (e: React.MouseEvent<HTMLLIElement>) => {
//     const pageNumber = page + 1
//     if (pageNumber > pageCount) {
//       return
//     }
//     onClick(pageNumber, e)
//   }

//   /** call props.onClick with previous page */
//   const handlePrev = (e: React.MouseEvent<HTMLLIElement>) => {
//     const pageNumber = page - 1
//     if (pageNumber < 1) {
//       return
//     }
//     onClick(pageNumber, e)
//   }

//   /** call props.onClick with selected page */
//   const handleSkip = (
//     pageNumber: number,
//     e: React.MouseEvent<HTMLLIElement>,
//   ) => {
//     if (page === pageNumber) {
//       return
//     }
//     onClick(pageNumber, e)
//   }

//   /** call props.onClick with first page */
//   const handleFirst = (e: React.MouseEvent<HTMLLIElement>) => {
//     onClick(1, e)
//   }

//   /** call props.onClick with last page */
//   const handleLast = (e: React.MouseEvent<HTMLLIElement>) => {
//     onClick(pageCount, e)
//   }

//   /** render page one control */
//   const First = () => {
//     if (!showFirst) {
//       return null
//     }
//     return (
//       <PageControl
//         disabled={page <= 1}
//         onClick={handleFirst}
//         palette={palette}
//         className={'first'}
//       >
//         {firstText}
//       </PageControl>
//     )
//   }

//   /** render back control */
//   const Prev = () => {
//     return (
//       <PageControl
//         disabled={page <= 1}
//         onClick={handlePrev}
//         palette={palette}
//         className={'prev'}
//       >
//         {prevText}
//       </PageControl>
//     )
//   }

//   /** render triple dot for left side */
//   const LeftEllipses = () => {
//     if (!showEllipses) {
//       return null
//     }
//     if (pageSkip * 2 >= pageCount) {
//       return null
//     }
//     if (page <= pageSkip + 1) {
//       return null
//     }

//     return [
//       <PageControl
//         key="skip-right"
//         onClick={(e) => handleSkip(1, e)}
//         palette={palette}
//         className={'page'}
//       >
//         1
//       </PageControl>,
//       <PageControl
//         style={{ width: 32 }}
//         key="left-ellipses"
//         noBorder={true}
//         palette={palette}
//         className={'leftEllipses'}
//       >
//         <IconIOS.White name="more" size={30} />
//       </PageControl>,
//     ]
//   }

//   /** render triple dot for right side */
//   const RightEllipses = () => {
//     if (!showEllipses) {
//       return null
//     }
//     if (pageSkip * 2 >= pageCount) {
//       return null
//     }
//     if (page >= pageCount - pageSkip) {
//       return null
//     }

//     return [
//       <PageControl
//         style={{ width: 32 }}
//         key="right-ellipses"
//         noBorder={true}
//         palette={palette}
//         className={'rightEllipses'}
//       >
//         <IconIOS.White name="more" size={30} />
//       </PageControl>,
//       <PageControl
//         key="skip-right"
//         onClick={(e) => handleSkip(pageCount, e)}
//         palette={palette}
//         className={'page'}
//       >
//         {pageCount}
//       </PageControl>,
//     ]
//   }

//   /** decide what page numbers to render */
//   const buildPages = () => {
//     if (pageSkip <= 0) {
//       return null
//     }

//     const frontSkip = maintainSkipWidth
//       ? pageCount - page < pageSkip
//         ? pageSkip - (pageCount - page) + pageSkip
//         : pageSkip
//       : pageSkip

//     const backSkip = maintainSkipWidth
//       ? page <= pageSkip
//         ? pageSkip + (pageSkip - page + 1)
//         : pageSkip
//       : pageSkip

//     const front = new Array(frontSkip).fill(page).reduce((arr, next, index) => {
//       next = next - index - 1
//       if (next < 1) {
//         return arr
//       }
//       return [next, ...arr]
//     }, [])

//     const back = new Array(backSkip).fill(page).reduce((arr, next, index) => {
//       next = next + index + 1
//       if (next > pageCount) {
//         return arr
//       }
//       return [...arr, next]
//     }, [])

//     return [...front, page, ...back].map((pageNumber) =>
//       pageNumber && pageNumber <= pageCount ? (
//         <PageControl
//           key={pageNumber}
//           selected={page === pageNumber}
//           onClick={(e) => handleSkip(pageNumber, e)}
//           palette={palette}
//           className={`page ${page === pageNumber ? 'activePage' : ''}`}
//         >
//           {pageNumber}
//         </PageControl>
//       ) : null,
//     )
//   }

//   /** render next page control */
//   const Next = () => {
//     return (
//       <PageControl
//         disabled={page >= pageCount}
//         onClick={handleNext}
//         palette={palette}
//         className={'next'}
//       >
//         {nextText}
//       </PageControl>
//     )
//   }

//   /** render last page control */
//   const Last = () => {
//     if (!showLast) {
//       return null
//     }
//     return (
//       <PageControl
//         disabled={page >= pageCount}
//         onClick={handleLast}
//         palette={palette}
//         className={'last'}
//       >
//         {lastText}
//       </PageControl>
//     )
//   }

//   return (
//     <List className={'pagination'}>
//       <Prev />
//       <First />
//       {LeftEllipses()}
//       {buildPages()}
//       {RightEllipses()}
//       <Last />
//       <Next />
//     </List>
//   )
// }

// Pagination.defaultProps = {
//   firstText: 'First',
//   lastText: 'Last',
//   nextText: <IconIOS name={'arrow-forward'} color={'rgba(255,255,255,.8)'} />,
//   page: 1,
//   pageCount: 1,
//   pageSkip: 1,
//   palette: undefined,
//   prevText: <IconIOS name={'arrow-back'} color={'rgba(255,255,255,.8)'} />,
//   showEllipses: false,
//   showFirst: false,
//   showLast: false,
// }

// // Types ----
// interface IProps {
//   /** current page */
//   page: number
//   /** amount of pages to control */
//   pageCount: number
//   /** predefined theming for pagination components */
//   palette: 'outline' | 'fill'
//   /** called with selected page and event */
//   onClick: (page?: number, e?: React.MouseEvent<HTMLLIElement>) => void
//   /** amount of pages displayed */
//   pageSkip?: number
//   /** should first page num always be rendered */
//   showFirst?: boolean
//   /** should last page num always be rendered */
//   showLast?: boolean
//   /** should ellipses be rendered for long amounts */
//   showEllipses?: boolean
//   /** text for first control */
//   firstText?: ReactNode
//   /** text for last control */
//   lastText?: ReactNode
//   /** text for next control */
//   nextText?: ReactNode
//   /** text for previous control */
//   prevText?: ReactNode
//   /** maintain the amount of pages on both sides */
//   maintainSkipWidth?: boolean
// }

// // Styled Components --

// const List = styled.ul`
//   display: flex;
//   list-style: none;
//   margin: 0;
//   padding: 0;
//   user-select: none;
// `
// const PageControl = styled.li<{
//   noBorder?: boolean
//   disabled?: boolean
//   selected?: boolean
//   palette?: 'outline' | 'fill'
// }>`
//   ${({ disabled, noBorder, selected, theme, palette }) => `
//     transition: color 0.2s, background-color 0.2s;
//     color: ${theme.palette.common.white};
//     border-radius: 4px;
//     height: 32px;
//     text-align: center;
//     line-height: 30px;
//     margin-right: ${theme.spacing.base}px;
//     cursor: ${noBorder ? 'default' : 'pointer'};
//     min-width: ${noBorder ? '24px' : '32px'};
//     border: ${noBorder ? 'none' : '1px solid #444'};
//     background-color: ${noBorder ? 'none' : theme.palette.grey[800]};
//     font-family: Lato-Light, sans-serif;
//     ${disabled &&
//       `
//       opacity: .7;
//       cursor: not-allowed;
//       & * {
//         opacity: .7
//       }
//     `};
//     ${selected &&
//       `
//       border-color: ${theme.palette.primary.main};
//       color: ${theme.palette.primary.main};
//     `};
//     &:hover {
//       background: ${noBorder ? 'inherit' : theme.palette.grey.A700};
//     }
//     ${palette === 'fill' &&
//       `
//       color: ${theme.palette.common.white};
//       background-color: ${theme.palette.secondary.light};
//       ${selected &&
//         `
//         border-color: ${theme.palette.primary.main};
//         background-color: ${theme.palette.primary.main};
//       `};
//       &:hover {
//         opacity: 0.8;
//         background: ${theme.palette.primary.main};
//       }
//     `}
//   `}
// `

// const Ellipses = styled.li`
//   margin: 0;
//   padding: 7px;
//   white-space: nowrap;
//   cursor: pointer;
//   font-size: 16px;
//   font-family: Lato-Light, sans-serif;
// `

// export default Pagination

import React, { FC } from 'react'

const Pagination: FC = () => {
  return <div></div>
}

export default Pagination
