# planner-nextjs

## Electron
My main goal is to get this app packaged up into an Electron app.

## DB Support
For the time being you can only Import and Export JSON files. Obviously this is not ideal - I'm really just focusing on the front-end for now though. DB support will also come with auth.

## Plugability
I really want to be able to ingest existing calendars, and add support for major calendar formats. I'd also like to ingest arbitrary datasources. Pointing this app at a variety of REST APIs and being able to map what they return to PlannerEvent and PlannerEventGroup Types is the dream.

## "Year" View
My custom hook was pretty flexible when adding Month view, and when showing 365 days in the Year view, but a 365 day view is pretty worthless and super laggy. I've got the view created and intervals set, but need to rework my hook a little bit.

## Filters
You need to be able to filter by label/color

## Custom Labels
The ability to store your own custom labels and colors and use support for using a color picker to set colors.

## Themes
Pretty self explanatory.

## DatePicker Dots
Showing a corresponding dot of the same color, in the picker dropdown, if there are events present on that day/month/year.

## Month Separator
The Week and Month views should show a vertical line on the grid, between dates of different months. Ex: Jun 30th to Jul 1st

