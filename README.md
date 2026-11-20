<div align="center">
  <img src="projects/sp-showcase/public/sp-lib-mark.png" alt="SpLib Logo" width="110" height="110" />

  # SpLib

  <p><strong>Modern standalone Angular UI components and directives with Signals, CSS custom properties, and Angular Forms integration.</strong></p>

  <p>
    <a href="https://www.npmjs.com/package/@aledevsharp/sp-lib"><img src="https://img.shields.io/npm/v/@aledevsharp/sp-lib?color=crimson&logo=npm" alt="npm version" /></a>
    <a href="https://angular.dev"><img src="https://img.shields.io/badge/Angular-^19.0.0-DD0031?logo=angular&logoColor=white" alt="Angular 19" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-~5.6.2-3178C6?logo=typescript&logoColor=white" alt="TypeScript 5.6" /></a>
    <a href="https://splib-ui.netlify.app/showcase"><img src="https://img.shields.io/badge/Showcase-Live%20Demo-00C7B7?logo=netlify&logoColor=white" alt="Live Demo" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License" /></a>
  </p>

  <p>
    <a href="https://splib-ui.netlify.app/showcase"><strong>Explore Live Showcase & Documentation &rarr;</strong></a> &nbsp;|&nbsp;
    <a href="https://www.npmjs.com/package/@aledevsharp/sp-lib"><strong>npm Package &rarr;</strong></a> &nbsp;|&nbsp;
    <a href="https://github.com/AleDevSharp/Npm-Sp-Angular-Lib/issues"><strong>Report Issue &rarr;</strong></a>
  </p>
</div>

---

## ✨ Features

- ⚡ **Standalone First**: 100% standalone components and directives — no cumbersome NgModule declarations needed.
- 🚦 **Signals & Modern Reactive**: Built from the ground up to work smoothly with Angular Signals and fine-grained reactivity.
- 📋 **Angular Forms Integration**: Form components natively implement `ControlValueAccessor` for seamless use with Reactive Forms and Template-Driven forms.
- 🎨 **Adaptive Theming**: Out-of-the-box CSS custom properties with effortless dark theme support.
- 🌐 **Interactive Showcase**: Fully featured showcase app with live interactive examples and dual-language documentation (English / Italian).

---

## 📦 Compatibility

| Environment | Supported version |
| :--- | :--- |
| **Angular** (`@angular/core`, `@angular/common`, `@angular/forms`) | `^19.0.0` |
| **TypeScript** | `~5.6.2` |
| **Node.js** | `>= 20.x` (Recommended: `22.x`) |

---

## 🚀 Installation

Install the package from npm:

```bash
npm install @aledevsharp/sp-lib
```

---

## 💡 Quick Start

Import only the components you need into your standalone component:

```typescript
import { Component, signal } from '@angular/core';
import { SpBtnComponent, SpInputComponent, SpSwitchComponent } from '@aledevsharp/sp-lib';

@Component({
  selector: 'app-quick-start',
  standalone: true,
  imports: [SpBtnComponent, SpInputComponent, SpSwitchComponent],
  template: `
    <sp-input label="Display name" [(value)]="name"></sp-input>
    <sp-switch label="Enable notifications" [(value)]="notifications"></sp-switch>
    <sp-btn text="Reset" variant="outline" (buttonClick)="reset()"></sp-btn>
    
    <p>Current user: {{ name() }} (Notifications: {{ notifications() ? 'on' : 'off' }})</p>
  `
})
export class QuickStartComponent {
  public readonly name = signal('Angular Developer');
  public readonly notifications = signal(true);

  public reset(): void {
    this.name.set('Angular Developer');
    this.notifications.set(true);
  }
}
```

---

## 📝 Angular Forms Integration

Form controls (`sp-input`, `sp-select`, `sp-switch`, `sp-segmented-control`, `sp-toggle-list`) implement `ControlValueAccessor` and can be used directly with `ReactiveFormsModule`:

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpInputComponent } from '@aledevsharp/sp-lib';

@Component({
  selector: 'app-form-example',
  standalone: true,
  imports: [ReactiveFormsModule, SpInputComponent],
  template: `
    <sp-input
      label="Email Address"
      type="email"
      [formControl]="emailControl"
      [hasError]="emailControl.touched && emailControl.invalid"
      errorMessage="Please provide a valid email address.">
    </sp-input>
  `
})
export class FormExampleComponent {
  public readonly emailControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email]
  });
}
```

---

## 📚 Component Catalog

All components and directives can be imported directly from `@aledevsharp/sp-lib`:

| Category | Components / Directives | Description |
| :--- | :--- | :--- |
| **Buttons** | `sp-btn`, `sp-btn-txt` | Standard, variant, icon and text action buttons with ripple effect |
| **Form Controls** | `sp-input`, `sp-select`, `sp-switch` | Accessible form controls supporting two-way signals and Angular Forms |
| **Selection Controls** | `sp-segmented-control`, `sp-toggle-list` | Segmented pill selectors and multi/single option selection lists |
| **Progress & Loaders** | `sp-progressbar`, `sp-progressbar-rounded`, `sp-progressbar-circular`, `sp-spinner` | Linear, rounded, circular progress indicators and loading spinners |
| **Containers & Layout** | `sp-card`, `sp-card-header`, `sp-card-content`, `sp-card-media`, `sp-card-actions`, `sp-card-footer`, `sp-divider` | Flexible card surfaces and content dividers |
| **Overlays & Dialogs** | `sp-modal`, `sp-drawer`, `[spTooltip]`, `sp-tooltip`, `sp-speed-dial` | Backdrop modals, sliding drawers, tooltips and floating speed dial actions |
| **Navigation & Disclosure** | `sp-accordion`, `sp-accordion-item`, `sp-tabs`, `sp-tab` | Collapsible accordions and tabbed navigation panels |
| **Media & Animation** | `sp-carousel`, `sp-carousel-slide`, `sp-marquee`, `[spMarqueeItem]`, `sp-counter` | Touch/keyboard carousels, infinite marquee tickers and animated number counters |
| **Visual Indicators** | `sp-avatar`, `sp-avatar-group`, `sp-badge`, `sp-chip`, `sp-skeleton`, `[spRipple]` | User avatars, status badges, removable chips, placeholder skeletons and ripple effect |

Visit the [Live Showcase](https://splib-ui.netlify.app/showcase) for comprehensive API tables, interactive demos, and copy-paste code snippets.

---

## 🎨 Styling & Theming

Components include their own compiled styles and can be customized via CSS custom properties. You can easily support light and dark modes in your global stylesheet (`styles.scss`):

```scss
:root {
  --sp-text-primary: #182235;
  --sp-text-secondary: #526079;
  --sp-border-color: #cad3e0;
}

[data-theme='dark'] {
  --sp-text-primary: #f8fafc;
  --sp-text-secondary: #cbd5e1;
  --sp-bg-canvas: #090d16;
  --sp-bg-surface: #131b2e;
  --sp-border-color: #334155;
}
```

---

## 📂 Repository Layout

This monorepo contains both the library itself and the showcase application:

| Path | Purpose |
| :--- | :--- |
| `projects/sp-lib` | Source code, unit tests, and packaging configuration for the `@aledevsharp/sp-lib` library |
| `projects/sp-showcase` | Source code for the interactive documentation and live showcase application |
| `dist/sp-lib` | Compiled npm distribution package (produced by `npm run build:lib`) |
| `dist/sp-showcase` | Compiled production showcase bundle (produced by `npm run build:showcase`) |

---

## 🛠️ Run the showcase from source
<a id="run-the-showcase-from-source"></a>

To test components, experiment with changes, or run the documentation locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AleDevSharp/Npm-Sp-Angular-Lib.git
   cd Npm-Sp-Angular-Lib
   ```

2. **Install dependencies:**
   ```bash
   npm ci
   ```

3. **Start the local dev server:**
   ```bash
   npm start
   ```

4. Open your browser at `http://localhost:4200`. The showcase imports library source files directly with hot reloading enabled.

---

## ⚙️ Development & Testing Scripts

| Command | Purpose |
| :--- | :--- |
| `npm start` | Serve the showcase locally at `http://localhost:4200` |
| `npm run build` | Build both the library and showcase for production |
| `npm run build:lib` | Compile the library into `dist/sp-lib` using `ng-packagr` |
| `npm run build:showcase` | Compile the showcase into `dist/sp-showcase` |
| `npm run watch` | Rebuild the library automatically on file changes |
| `npm test` | Run Karma/Jasmine unit tests for the library |
| `npm run lint` | Run ESLint checks across both library and showcase |
| `npm run lint:fix` | Automatically fix ESLint warnings and errors |

---

## 🤝 Contributing

Contributions, bug reports, and suggestions are welcome!
Feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/AleDevSharp/Npm-Sp-Angular-Lib).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) © [Alessio Giacché](https://github.com/AleDevSharp).
