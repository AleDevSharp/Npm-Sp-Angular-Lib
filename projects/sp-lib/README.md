<img src="https://raw.githubusercontent.com/AleDevSharp/Npm-Sp-Angular-Lib/master/projects/sp-showcase/public/sp-lib-mark.png" alt="SpLib logo" width="96" height="96" />

# @aledevsharp/sp-lib

Angular UI components by [AleDevSharp](https://github.com/AleDevSharp).

SpLib provides standalone Angular UI components and directives for forms, content, layout, overlays and animated feedback.

The [GitHub repository](https://github.com/AleDevSharp/Npm-Sp-Angular-Lib) includes both the library source and an interactive Angular showcase with component examples and API documentation in English and Italian.

- [Source code](https://github.com/AleDevSharp/Npm-Sp-Angular-Lib/tree/HEAD/projects/sp-lib)
- [Showcase source and examples](https://github.com/AleDevSharp/Npm-Sp-Angular-Lib/tree/HEAD/projects/sp-showcase)
- [Run the showcase locally](https://github.com/AleDevSharp/Npm-Sp-Angular-Lib#run-the-showcase-from-source)
- [Report an issue](https://github.com/AleDevSharp/Npm-Sp-Angular-Lib/issues)

## Installation and compatibility

```bash
npm install @aledevsharp/sp-lib
```

Requires Angular **19**: the package declares `@angular/core`, `@angular/common` and `@angular/forms` peer dependencies at **`^19.0.0`**. Keep these dependencies aligned in the consuming application.

## Standalone usage

Import only the components and directives used by your template. No SpLib NgModule registration is required.

```typescript
import { Component, signal } from '@angular/core';
import { SpBtnComponent, SpInputComponent, SpSwitchComponent } from '@aledevsharp/sp-lib';

@Component({
  selector: 'app-settings-example',
  standalone: true,
  imports: [SpBtnComponent, SpInputComponent, SpSwitchComponent],
  template: `
    <sp-input label="Display name" [(value)]="name"></sp-input>
    <sp-switch label="Notifications" [(value)]="notifications"></sp-switch>
    <sp-btn text="Reset" variant="outline" (buttonClick)="reset()"></sp-btn>
    <p>{{ name() }} — Notifications: {{ notifications() ? 'on' : 'off' }}</p>
  `
})
export class SettingsExampleComponent {
  // The editable display name
  public readonly name = signal('Angular');

  // The notification preference
  public readonly notifications = signal(true);

  /** Restores the initial values. @returns void */
  public reset(): void {
    this.name.set('Angular');
    this.notifications.set(true);
  }
}
```

Both `SpBtnComponent` and `SpBtnTxtComponent` emit `(buttonClick)`. Available presets and color inputs are documented in each component's showcase API table.

## Angular Forms

Input, Select, Switch, Segmented Control and Toggle List implement `ControlValueAccessor`. Choose one value-management approach per control:

- `[(value)]` for direct two-way binding; no Forms module is needed.
- `[(ngModel)]` with `FormsModule` imported by the consuming component.
- `[formControl]` or `formControlName` with `ReactiveFormsModule`.

For example, a Reactive Forms input:

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpInputComponent } from '@aledevsharp/sp-lib';

@Component({
  selector: 'app-email-example',
  standalone: true,
  imports: [ReactiveFormsModule, SpInputComponent],
  template: `
    <sp-input
      label="Email"
      type="email"
      [formControl]="email"
      [hasError]="email.touched && email.invalid"
      errorMessage="Enter a valid email address.">
    </sp-input>
  `
})
export class EmailExampleComponent {
  // The email form control and its validators
  public readonly email = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email]
  });
}
```

Form validation and the displayed error state are separate: the example explicitly binds `hasError` to the control state. Manage disabled state through the form control when using Reactive Forms.

## Component catalog

All components, directives and their exported types are imported from `@aledevsharp/sp-lib`.

| Family | Public selectors / directives |
| --- | --- |
| Buttons | `sp-btn`, `sp-btn-txt` |
| Form controls | `sp-input`, `sp-select`, `sp-switch` |
| Selection controls | `sp-segmented-control`, `sp-toggle-list` |
| Progress | `sp-progressbar`, `sp-progressbar-rounded`, `sp-progressbar-circular`, `sp-spinner` |
| Dividers | `sp-divider` |
| Cards | `sp-card`, `sp-card-header`, `sp-card-content`, `sp-card-media`, `sp-card-actions`, `sp-card-footer` |
| Avatars | `sp-avatar`, `sp-avatar-group` |
| Badges and chips | `sp-badge`, `sp-chip` |
| Tooltips | `[spTooltip]`, `sp-tooltip` |
| Accordion | `sp-accordion`, `sp-accordion-item` |
| Tabs | `sp-tabs`, `sp-tab` |
| Loading placeholders | `sp-skeleton` |
| Number animation | `sp-counter` |
| Ripple | `[spRipple]` |
| Quick actions | `sp-speed-dial` |
| Scrolling content | `sp-marquee`, `[spMarqueeItem]` |
| Dialogs and panels | `sp-modal`, `sp-drawer` |
| Image and content carousel | `sp-carousel`, `sp-carousel-slide` |

The [public API source](https://github.com/AleDevSharp/Npm-Sp-Angular-Lib/blob/HEAD/projects/sp-lib/src/public-api.ts) lists the exported classes and types. Component-specific examples and defaults are documented in the showcase.

## Styling

Components ship compiled styles. Appearance can be customized through their documented inputs and CSS custom properties. For example, place global theme overrides in the consuming application's `styles.scss`:

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

Apply `data-theme="dark"` to an ancestor such as `<html>` when using these dark theme rules. Theme selection is controlled by the application; the library does not automatically synchronize it with system preferences or persist it. Individual components may use additional tokens or explicit color inputs.

No additional global stylesheet import is required for component styles. The package does not expose a global CSS/SCSS entry point; customize the documented CSS properties in your application's own stylesheet. The showcase's page layouts, fonts and application theme are separate from the component styles.

## Showcase and documentation

Explore the [showcase source](https://github.com/AleDevSharp/Npm-Sp-Angular-Lib/tree/HEAD/projects/sp-showcase) for interactive examples, HTML and TypeScript snippets, layout styles and component API tables. The showcase supports English and Italian; some image demos use external resources.

To run it locally, follow the setup instructions in the [repository README](https://github.com/AleDevSharp/Npm-Sp-Angular-Lib#run-the-showcase-from-source). The showcase uses the library sources in that repository; no sibling library folder or npm installation of SpLib is required. That README also documents building the library and showcase, running tests and contributing.

The GitHub source may contain changes that are not yet published on npm. When consulting source examples, compare them with your installed package version.

## Issues and contributions

Report bugs and request features through [GitHub Issues](https://github.com/AleDevSharp/Npm-Sp-Angular-Lib/issues). Contributions are welcome; see the [contribution guidelines](https://github.com/AleDevSharp/Npm-Sp-Angular-Lib#contributing).

## License

[MIT](https://github.com/AleDevSharp/Npm-Sp-Angular-Lib/blob/HEAD/LICENSE) © Alessio Giacché.
