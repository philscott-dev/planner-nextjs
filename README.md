# planner-nextjs

## Electron
My main goal is to get this app packaged up into an Electron app, this way I can enforce a cross-desktop experience and feature set support. 

## DB Support
For the time being you can only Import and Export JSON files, and persist state in LocalStorage between refreshes and closing the browser.

## Plugability
I really want to be able to ingest existing calendars, and add support for major calendar formats. I'd also like to ingest arbitrary datasources. Pointing this app at a variety of REST APIs and being able to map what they return to PlannerEvent and PlannerEventGroup Types is the dream.

## "Day" View
Partially working. Toggled off for now while I work out overlapping half-hours.

## Filters
You need to be able to filter by label and/or color

## Custom Labels
The ability to store your own custom labels and colors and use support for using a color picker to set colors.

## DatePicker Dots
Showing a corresponding dot of the same color, in the picker dropdown, if there are events present on that day/month/year.

## Month & Year Pickers
Swap out the date picker for a year/month picker, based on view - Should be easy but the current datepicker works well enough.

## Month Separator
The Week and Month views should show a vertical line on the grid, between dates of different months. Ex: Jun 30th to Jul 1st

## "Now" Indicator
Display the current time/day as a highlighted column or vertical line.
