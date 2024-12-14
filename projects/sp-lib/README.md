# SpLib

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0.

---

## Introduction

**sp-lib** is a library developed in Angular using TypeScript. It provides a collection of UI components, such as buttons and other graphical elements, that can be easily integrated into your Angular projects.

### What is Angular?

[Angular](https://angular.io/) is a front-end web application framework developed and maintained by Google. It uses TypeScript to deliver advanced tools for building robust, scalable, and dynamic applications. Learn more on the [official Angular website](https://angular.io/).

### What is NPM?

[NPM](https://www.npmjs.com/) (Node Package Manager) is the official package manager for Node.js. It allows developers to share libraries and tools as packages, which can be easily installed and used in other projects. Learn more on the [official NPM website](https://www.npmjs.com/).

---

## Publication

The **sp-lib** library is published on [NPM](https://www.npmjs.com/) and is currently available at version **1.0.1**. You can install and use it directly in your Angular projects.

---

## How to Use sp-lib

1. **Installing the library**

   To use **sp-lib** in your Angular project, install the library via NPM:

   ```bash
   npm install @aledevsharp/sp-lib
   
2. **Importing a component**

   Since the components in sp-lib are standalone, you can import them directly into your Angular components. Here's an example:

   ```bash
   import { SpBtnComponent } from '@aledevsharp/sp-lib';

    @Component({
      selector: 'app-root',
      standalone: true,
      imports: [
        CommonModule,
        SpBtnComponent
      ],
      template: `
        <sp-btn></sp-btn>
      `
    })
    export class AppComponent {}

3. **Using the components**

   Once imported, you can use sp-lib components directly in your HTML templates. For instance, to include the button component:

   ```bash
   <sp-btn></sp-btn>

## About and links
For more information, see the official npm library page
[sp-lib](https://www.npmjs.com/package/@aledevsharp/sp-lib)

## License
sp-lib is licensed under the MIT License. See the LICENSE inside the main project for details.

