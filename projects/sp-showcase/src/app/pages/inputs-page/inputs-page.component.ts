// --------------------------------------------------------------
// Project: SpLib
// File name: inputs-page.component.ts
// File description: Showcase documentation page for SpInputComponent with reactive forms and styling variants.
// Author: Alessio Giacché
// Date created: 18-11-2025
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { SpInputComponent } from '../../../../../sp-lib/src/public-api';
import { TranslatePipe } from '../../i18n/translate.pipe';

/**
 * InputsPageComponent
 * @version 2.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
@Component({
  selector: 'app-inputs-page',
  standalone: true,
  imports: [TranslatePipe, CommonModule, FormsModule, ReactiveFormsModule, SpInputComponent],
  templateUrl: './inputs-page.component.html',
  styleUrl: './inputs-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputsPageComponent {
  // Two-way binding value for username demonstration
  public readonly usernameValue = signal<string>('alessio_dev');

  // Value emitted from changeInput output
  public readonly liveValue = signal<string>('');

  // The email control validating both empty and malformed addresses
  public readonly emailControl = new FormControl('email_non_valida', {
    nonNullable: true,
    validators: [Validators.required, Validators.email]
  });

  // Password visibility toggle flag
  public readonly showPassword = signal<boolean>(false);

  /**
   * Constructor for InputsPageComponent component
   */
  constructor() {}

  /**
   * Handles change input event.
   * @param val The updated input value
   * @returns void
   */
  public onLiveChange(val: string): void {
    this.liveValue.set(val);
  }

  /**
   * Toggles password field type between password and text.
   * @returns void
   */
  public togglePassword(): void {
    this.showPassword.set(!this.showPassword());
  }
}
