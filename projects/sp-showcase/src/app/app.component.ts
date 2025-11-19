import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Official AppComponent component
 * @author Alessio Giacché
 * @version 1.0.0
 * @since 1.0.0
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // Application title
  public title = 'sp-showcase';
}
