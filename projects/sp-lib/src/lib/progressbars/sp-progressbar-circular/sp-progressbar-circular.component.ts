import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';

/**
 * SpProgressbarCircularComponent component
 * @author Alessio Giacché
 * @version 1.0.0
 * @since 1.0.2
 */
@Component({
  selector: 'sp-progressbar-circular',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sp-progressbar-circular.component.html',
  styleUrl: './sp-progressbar-circular.component.scss'
})
export class SpProgressbarCircularComponent implements OnInit {
  // The size
  public size = input<number>(80);

  // The stroke
  public stroke = input<number>(8);

  // The percentage
  public percentage = input<number>(50);

  // The color
  public color = input<string>('#e91e63');

  // Indeterminate flag
  public indeterminate = input<boolean>(false);

  // The circumference
  public circumference: number = 2 * Math.PI * 45;

  /**
   * Constructor for SpProgressbarCircularComponent component
   */
  constructor() {}

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this.circumference = 2 * Math.PI * 45; // 45
  }
}
