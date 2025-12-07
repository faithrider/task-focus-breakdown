# Task Focus Breakdown

Live site: [https://task-focus-breakdown.vercel.app/](https://task-focus-breakdown.vercel.app/)

Demo video: [demo video!](https://mailuc-my.sharepoint.com/:v:/g/personal/riderfm_mail_uc_edu/EdvyJfdxXQFHtAJTL7hOI90B-w0eBxUK9YYXdRifWZbziQ?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&e=4geCSb)

## Overview

Task Focus Breakdown is a simple interface for dividing large tasks into smaller, workable steps and focusing on one step at a time. The goal is to reduce the cognitive load that comes from seeing an entire project at once and to support users who struggle with task switching and overwhelm. The interface emphasizes clarity, minimal interaction cost, and a straightforward flow from planning to focused work.

## User interviews and findings

Interviews with users who experience attention difficulties or executive dysfunction highlighted several consistent points:
- Interfaces with many features or visual elements increase distraction and cause avoidance.
- Breaking large tasks into smaller components is helpful but often mentally tiring to do alone.
- Users frequently lose focus by shifting between tasks without finishing the one they intended to work on.
- Timers are useful when optional and lightweight.
- Visual customization was considered unnecessary compared to a clear, calm layout.
- A dedicated view that isolates only the current action was identified as the most helpful idea.
- These findings guided the structure of the prototype.

## Key features
- Task breakdown tree for creating steps and substeps
- Focus mode that hides all nonessential elements
- Optional simple timer
- Automatic progress calculation based on completed steps
- Local data persistence
- Minimal layout with limited controls

## Prototype modes and abilities

**Builder mode**
- Create a task and add steps
- Edit, remove, or nest steps'
- Mark steps as complete
- Select a step to work on
- View automatic progress updates

**Focus mode**
- Only shows the current step, a timer, and an exit option
- Removes navigation and other elements
- Designed to reduce visual noise and task switching
- Provides a stable environment for completing one step

## Screenshots
This is of the front page where you input the overarching task you're attempting to tackle (clean your room, write a paper, etc.).
![front page](https://github.com/faithrider/task-focus-breakdown/blob/main/img/screenshots/front-page.png)

This the the main screen to input all the subtasks, with light and dark mode options.
![task list light mode](https://github.com/faithrider/task-focus-breakdown/blob/main/img/screenshots/task-list-light-mode.png)
![task list dark mode](https://github.com/faithrider/task-focus-breakdown/blob/main/img/screenshots/task-list-dark-mode.png)

Here is focus mode, where you can spotlight an individual subtask. The default is a classic Pomodoro 25min on, 5min off work cycle for the timer, but it is fully customizable by the minute.
![focus mode work](https://github.com/faithrider/task-focus-breakdown/blob/main/img/screenshots/focus-mode-work.png)

Once it cycles to the break mode, the background changes so that it's visually distinct from further away.
![focus mode break](https://github.com/faithrider/task-focus-breakdown/blob/main/img/screenshots/focus-mode-break.png)

## Work Sketches
![all screens sketch](https://github.com/faithrider/task-focus-breakdown/blob/main/img/sketches/All-screens-sketch.png)

![focus mode sketch](https://github.com/faithrider/task-focus-breakdown/blob/main/img/sketches/Focus-mode-sketch.png)

![task list sketch](https://github.com/faithrider/task-focus-breakdown/blob/main/img/sketches/Task-list-sketch.png)

## Potential future improvements
- Additional preset timer modes
- Mobile layout adjustments
- Optional reminders
- Cloud sync
- Accessibility refinements
- Support for multiple parallel projects
- More polished transitions
