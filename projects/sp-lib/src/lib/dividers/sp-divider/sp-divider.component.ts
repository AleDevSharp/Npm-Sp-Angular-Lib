import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

/**
 * SpDividerComponent component
 * @author Alessio Giacché
 * @version 1.0.0
 * @since 1.0.2
 */
@Component({
  selector: 'sp-divider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-divider.component.html',
  styleUrl: './sp-divider.component.scss'
})
export class SpDividerComponent {
  // The divider height
  public height = input<string>('1px');

  // The divider color
  public color = input<string>('#666');

  // The divider orientation
  public orientation = input<'horizontal' | 'vertical'>('horizontal');

  // The divider border style
  public borderStyle = input<'solid' | 'dashed' | 'dotted'>('solid');

  // The divider border width
  public borderWidth = input<string>('1px');

  // The divider border color
  public borderColor = input<string>('#666');

  // The divider margin top
  public marginTop = input<string>('0px');

  // The divider margin bottom
  public marginBottom = input<string>('0px');

  // The divider center label
  public label = input<string>('');

  // The divider center label color
  public labelColor = input<string>('#666');

  // Constructor for SDividerComponent component
  constructor() {}
}
