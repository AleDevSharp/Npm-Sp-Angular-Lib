// --------------------------------------------------------------
// Project: SpLib
// File name: select-page.component.ts
// File description: Showcase documentation page for SpSelectComponent dropdown with options.
// Author: Alessio Giacché
// Date created: 19-11-2025
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SpBtnTxtComponent, SpSelectComponent, SpSelectOption } from '../../../../../sp-lib/src/public-api';
import { TranslatePipe } from '../../i18n/translate.pipe';

/**
 * SelectPageComponent
 * @version 2.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'app-select-page',
  standalone: true,
  imports: [TranslatePipe, CommonModule, FormsModule, SpSelectComponent, SpBtnTxtComponent],
  templateUrl: './select-page.component.html',
  styleUrl: './select-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectPageComponent {
  // Selected country signal value
  public readonly selectedCountry = signal<string>('it');

  // The selected framework for the required selection demo
  private readonly _requiredFramework = signal<string>('');

  // The readonly selected framework exposed to the template
  public readonly requiredFramework = this._requiredFramework.asReadonly();

  // Country options list
  public readonly countryOptions: SpSelectOption[] = [
    { label: 'Italia', value: 'it' },
    { label: 'Francia', value: 'fr' },
    { label: 'Germania', value: 'de' },
    { label: 'Spagna', value: 'es' },
    { label: 'Regno Unito (Disabilitato)', value: 'uk', disabled: true }
  ];

  // Framework options list
  public readonly frameworkOptions: SpSelectOption[] = [
    { label: 'Angular', value: 'angular' },
    { label: 'React', value: 'react' },
    { label: 'Vue.js', value: 'vue' },
    { label: 'Svelte', value: 'svelte' }
  ];

  /**
   * Updates the required demo selection.
   * @param value The selected framework value
   * @returns void
   */
  public onRequiredFrameworkChange(value: string): void {
    this._requiredFramework.set(value);
  }

  /**
   * Restores the empty selection to demonstrate the required error again.
   * @returns void
   */
  public resetRequiredFramework(): void {
    this._requiredFramework.set('');
  }

  /**
   * Constructor for SelectPageComponent component
   */
  constructor() {}
}
