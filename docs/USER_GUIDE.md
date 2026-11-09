# Weekwell user guide

This guide covers the timetable controls and explains how your schedule is saved.

## The weekly view

The main grid shows Monday through Sunday. The vertical labels mark the displayed time range, currently 8:00 am through 4:00 pm. The current day is highlighted when it appears in the selected week.

Use the left and right arrow buttons to move one week at a time. The **Today** button returns the grid to the week containing today's date. The small **Today** navigation item in the desktop sidebar does the same thing.

On small screens, scroll the grid horizontally to reach later days.

## Add an activity

1. Select **Add a class** or **Add to your week**.
2. Enter a title.
3. Choose the weekday and a card color.
4. Set a start and end time.
5. Optionally enter a room, building, or other location.
6. Select **Add to week**.

The end time must be later than the start time. Activities that extend outside the displayed hours are positioned from their actual times; scroll/adjust the displayed range in the source if you need another daily schedule.

## Edit or remove an activity

Select an existing activity card. Change any details and select **Save changes**, or select **Delete** to remove it. The app saves the change in the current browser profile.

## Export

Select the export icon in the top bar. Weekwell downloads a CSV file named `my-timetable.csv` with columns for day, start, end, activity, and location. The export contains the saved weekly activity list; it does not depend on which week is currently selected.

## Saved data

Your schedule is stored locally in this browser under the `weekwell-events-v1` key. It is not synced across browsers or devices. Deleting the browser's site data removes it. If you want a backup, export the CSV periodically.

To start over with the original sample schedule, remove the `weekwell-events-v1` entry from the browser's local storage for the Weekwell site, then reload the page.

## Keyboard use

Use Tab to move between controls. Activity cards can receive keyboard focus; press Enter or Space to open an activity for editing. The activity editor uses standard browser inputs and can be closed with its close or cancel controls.
