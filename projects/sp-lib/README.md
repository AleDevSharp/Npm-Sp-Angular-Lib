# SpLib

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.0.

## Introduction

The **sp-lib** is a library developed in Angular using TypeScript, offering a collection of **UI components**, such as buttons and other graphical elements, designed to be straightforward and simple to use.

Unlike more comprehensive and professional libraries such as **Angular Material** or **Bootstrap**, sp-lib takes a minimalist approach. The components are intentionally **simple** and focused on specific tasks, avoiding the complexity and overhead of feature-rich frameworks. This makes them perfect for developers who need lightweight, easy-to-integrate solutions rather than a full-blown UI framework.

While the components are intentionally kept minimal and fine-tuned for single purposes, they are customizable within reasonable limits. For instance, you can easily modify properties such as colors (using hexadecimal strings), dimensions, and other visual attributes through straightforward input parameters.

At the moment, sp-lib does not include a dedicated **showcase** or documentation site. However, you can explore the available components directly in the package by reviewing their inputs and outputs, experimenting with their properties, and customizing them to suit your needs. This hands-on approach allows you to quickly test and integrate the components into your Angular projects without the need for additional tools or dependencies.

The **primary goal** of sp-lib is to provide a library of self-contained, modular components that are not overly complex but offer just enough flexibility to meet common needs. This makes sp-lib ideal for projects that prioritize simplicity, maintainability, and ease of customization over the extensive feature sets offered by more sophisticated UI libraries.

Currently, the library is in its **1.0 beta** version, which includes only a limited number of components. However, new components will be added over time with future versions of the library, expanding its capabilities and options.

<br>

### What is Angular?

[Angular](https://angular.io/) is a front-end web application framework developed and maintained by Google. It uses TypeScript to deliver advanced tools for building robust, scalable, and dynamic applications. Learn more on the [official Angular website](https://angular.io/).

### What is NPM?

[NPM](https://www.npmjs.com/) (Node Package Manager) is the official package manager for Node.js. It allows developers to share libraries and tools as packages, which can be easily installed and used in other projects. Learn more on the [official NPM website](https://www.npmjs.com/).

<br>

## How to Use sp-lib

1. **Installing the library**

   To use **sp-lib** in your Angular project, install the library via NPM:

   ```bash
   npm install @aledevsharp/sp-lib

   ```

   If there are version conflict problems, and your project has a recent and stable version, the "**--force**"
   command should be enough to correctly install the library within your project

2. **Importing a component**

   Since the components in **sp-lib** are **standalone**, you can import them directly into your Angular components.
   Here's an example:

   ```bash
   import { SpBtnComponent } from '@aledevsharp/sp-lib';

    @Component({
      selector: 'app-root',
      standalone: true,
      imports: [
        CommonModule,
        SpBtnComponent
      ]
    })
    export class AppComponent {}

   ```

3. **Using the components**

   Once imported, you can use sp-lib **components** directly in your HTML templates. <br>For instance, to include
   the button component:

   ```bash
     <!--Standard btn example-->
     <sp-btn
        [text]="'Click Me!'"
        [color]="'#4caf50'"
        [height]="'40px'"
        [cursor]="'pointer'"
        [disabled]="false"
        (buttonClick)="this.handleButtonClick()">
     </sp-btn>
   ```

<br>

## License

The **sp-lib** is licensed under the MIT License.
