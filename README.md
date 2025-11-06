# Ngx-drawer

## Demo
<p align="center">
  <a href="https://christophhu.github.io/ngx-drawer"><img src="https://github.com/ChristophHu/ChristophHu/blob/main/assets/img/ngx-drawer.png" width="500" alt="image" /></a>
</p>

## Description
This repository contains an Angular 20 demo that showcases the `ngx-drawer` library. `ngx-drawer` provides a flexible side drawer for Angular apps, supporting left/right positions and over/side modes. It’s easy to customize—sizes, colors, and behavior—to match your application’s design.

## Frameworks and Languages
<p align="left">
  <img alt="Static Badge" src="https://img.shields.io/badge/20.3.0-000000?style=for-the-badge&logo=angular&logoColor=white&label=Angular&labelColor=000000">
  <img alt="Static Badge" src="https://img.shields.io/badge/4.1.16-000000?style=for-the-badge&logo=tailwindcss&logoColor=white&label=TailwindCSS&labelColor=06B6D4&color=000000">
  <img alt="Static Badge" src="https://img.shields.io/badge/5.9.2-000000?style=for-the-badge&logo=typescript&logoColor=white&label=Typescript&labelColor=007ACC&color=000000">
</p>


## Installation
To run this project, you need to have Node.js installed on your machine. Clone the repository and run the following commands:

```bash
npm install @christophhu/ngx-drawer
```

## Usage
Import the DrawerComponent in the app.ts.

```typescript
import { DrawerComponent } from '@christophhu/ngx-drawer';

@NgModule({
    imports: [
        DrawerComponent,
        ...
    ]
...
})
```

```html
<ngx-drawer [mode]="'side'" [opened]="true" [position]="'left'" [name]="'settingsDrawer'" #settingsDrawer></ngx-drawer>
```

```sass
ngx-drawer
  position: relative
  display: flex
  flex-direction: column
  flex: none
  z-index: 110
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .35)

  &.drawer-animations-enabled
    transition-duration: 300ms
    transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1)
    transition-property: visibility, margin-left, margin-right, transform, width, max-width, min-width

    .drawer-content
      transition-duration: 300ms
      transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1)
      transition-property: width, max-width, min-width

  &.drawer-mode-over
    position: absolute
    top: 0
    bottom: 0

    &.drawer-fixed
      position: fixed

  &.drawer-position-left

    &.drawer-mode-side
      margin-left: -#{$drawer-width}rem

      &.drawer-opened
        margin-left: 0

    &.drawer-mode-over
      left: 0
      transform: translate3d(-100%, 0, 0)

      &.drawer-opened
        transform: translate3d(0, 0, 0)

    .drawer-content
      left: 0

  &.drawer-position-right

    &.drawer-mode-side
      margin-right: -#{$drawer-width}rem

      &.drawer-opened
        margin-right: 0

    &.drawer-mode-over
      right: 0
      transform: translate3d(100%, 0, 0)

      &.drawer-opened
        transform: translate3d(0, 0, 0)

    .drawer-content
      right: 0

  .drawer-content
    position: absolute
    display: flex
    flex: 1 1 auto
    top: 0
    bottom: 0
    width: 100%
    height: 100%
    overflow: hidden

.drawer-overlay
  position: absolute
  top: 0
  bottom: 0
  left: 0
  right: 0
  z-index: 100
  opacity: 1
  background-color: rgba(0, 0, 0, 0.6)

  &.drawer-overlay-fixed
    position: fixed

  &.drawer-overlay-transparent
    background-color: transparent
```

The content of the drawer can be customized.

## License
This project is licensed under the MIT License.

The MIT License (MIT)
Copyright © 2025 <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
