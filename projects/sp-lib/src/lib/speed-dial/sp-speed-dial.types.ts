// --------------------------------------------------------------
// Project: SpLib
// File name: sp-speed-dial.types.ts
// File description: Type definitions and interfaces for the SpSpeedDial component.
// Author: Alessio Giacché
// Date created: 11-11-2026
// License: MIT
// --------------------------------------------------------------

/**
 * SpSpeedDialDirection
 * Defines the expansion direction for the speed dial action buttons.
 *
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
export type SpSpeedDialDirection = 'up' | 'down' | 'left' | 'right';

/**
 * SpSpeedDialType
 * Defines the layout structure of speed dial items (linear list or radial fan-out).
 *
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
export type SpSpeedDialType = 'linear' | 'semi-circle' | 'quarter-circle';

/**
 * SpSpeedDialTrigger
 * Defines the interaction method that opens the speed dial actions.
 *
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
export type SpSpeedDialTrigger = 'click' | 'hover';

/**
 * SpSpeedDialSize
 * Defines size presets for the primary FAB and secondary action buttons.
 *
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
export type SpSpeedDialSize = 'sm' | 'md' | 'lg';

/**
 * SpSpeedDialColor
 * Semantic palette colors available for the Speed Dial FAB and its action items.
 *
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
export type SpSpeedDialColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

/**
 * SpSpeedDialItem
 * Represents an individual action item rendered within the Speed Dial menu.
 *
 * @version 1.0.0
 * @since 2.0.0
 * @author Alessio Giacché
 */
export interface SpSpeedDialItem {
  // The unique identifier for this action item
  id?: string;

  // The icon displayed inside the action button (SVG path, icon name, or character)
  icon?: string;

  // The human-readable label displayed alongside the action button
  label?: string;

  // The accessible aria-label attribute for screen readers
  ariaLabel?: string;

  // The semantic color variant for this specific action item button
  color?: SpSpeedDialColor;

  // The disabled status preventing clicks on this action
  disabled?: boolean;

  // The optional callback function executed when this action item is clicked
  command?: (item: SpSpeedDialItem) => void;

  // The browser tooltip title attribute
  title?: string;
}
