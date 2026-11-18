// --------------------------------------------------------------
// Project: SpLib
// File name: sp-divider.component.ts
// File description: Clean divider component supporting horizontal/vertical orientations and center labels.
// Author: Alessio Giacché
// Date created: 18-11-2025
// License: MIT
// --------------------------------------------------------------

// Import
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * SpDividerComponent
 * @version 2.0.0
 * @since 1.0.2
 * @author Alessio Giacché
 */
@Component({
  selector: 'sp-divider',
  host: { '[class.sp-divider-host-vertical]': 'orientation() === "vertical" && !label()' },
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-divider.component.html',
  styleUrl: './sp-divider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpDividerComponent {
  // The divider height or thickness
  public height = input<string>('1px');

  // The divider line color
  public color = input<string>('');

  // The divider orientation
  public orientation = input<'horizontal' | 'vertical'>('horizontal');

  // The divider border style pattern
  public borderStyle = input<'solid' | 'dashed' | 'dotted'>('solid');

  // The divider border thickness width
  public borderWidth = input<string>('1px');

  // The divider border color
  public borderColor = input<string>('');

  // The divider margin top spacing
  public marginTop = input<string>('0px');

  // The divider margin bottom spacing
  public marginBottom = input<string>('0px');

  // The optional center label text
  public label = input<string>('');

  // The optional label text color
  public labelColor = input<string>('');

  /**
   * Constructor for SpDividerComponent component
   */
  constructor() {}
}
