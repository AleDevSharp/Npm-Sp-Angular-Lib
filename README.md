<h1 align="center">Sp-Lib</h1>

<p align="center">
  <img src="https://raw.githubusercontent.com/npm/logos/master/npm%20logo/npm-logo-red.png" alt="NPM Logo" width="120" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-2.0.0-blue?style=for-the-badge" alt="Version" />
  <img src="https://img.shields.io/badge/Angular-17%2B-red?style=for-the-badge&logo=angular" alt="Angular" />
  <img src="https://img.shields.io/badge/npm-%40aledevsharp%2Fsp--lib-brightgreen?style=for-the-badge&logo=npm" alt="NPM" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/TypeScript-✓-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
</p>

## 🚀 Introduction

**sp-lib** is a lightweight Angular library developed using TypeScript. It provides a collection of **standalone UI components**, such as buttons, progress bars, inputs, switches, and other graphical elements, designed for **simplicity and easy integration**.

Unlike full-featured UI frameworks such as Angular Material or Bootstrap, sp-lib focuses on **minimalism**. Each component serves a **single purpose** and avoids unnecessary complexity, making the library ideal for developers seeking **lightweight and easily customizable components**.

### 🎯 Key Features

- **Lightweight & Fast**: Minimal bundle size impact
- **Standalone Components**: No complex dependencies required
- **Fully Customizable**: Colors, dimensions, and behavior via inputs
- **TypeScript Support**: Full type safety and IntelliSense
- **Angular 17+ Ready**: Built with modern Angular features

---
## 📦 Installation

To use **sp-lib** in your Angular project, install the library via NPM:
```bash
npm install -f @aledevsharp/sp-lib
```

## 🏁 Getting Started
Navigate to the showcase project (if exploring the source):
```bash
cd projects/sp-showcase
```
Install dependencies:
```bash
npm install -f
```
Run the development server:
```bash
npm run start
```

## 🧼 Linting and Code Quality
To perform code quality control:
```bash
npm run lint
```
This command will analyze the code according to the rules defined in the project, helping to maintain a consistent and error-free style.

<br>

## Basic Usage
Since all components are standalone, you can import them directly into your Angular components:
```typescript
import { SpBtnComponent } from '@aledevsharp/sp-lib';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SpBtnComponent  // Import only what you need
  ],
  template: `
    <sp-btn
      [text]="'Click Me!'"
      [color]="'#4caf50'"
      [height]="'40px'"
      [cursor]="'pointer'"
      [disabled]="false"
      (buttonClick)="handleButtonClick()">
    </sp-btn>
  `
})
export class AppComponent {
  handleButtonClick() {
    console.log('Button clicked!');
  }
}
```

<br>


## 🔧 Customization
All components are highly customizable through input properties. Please, start the showcase to **explore all available components and see the different ways each one can be used and configured in real time**.

## 🎨 Available Components

| Component | Selector | Description |
|-----------|----------|-------------|
| Button | `sp-btn` or `sp-btn-txt` | A customizable button with various styles. |
| Input | `sp-input` | A customizable input field. |
| Select | `sp-select` | A customizable dropdown select. |
| Switch | `sp-switch` | A toggle switch. |
| Progress Bar | `sp-progress-bar` and other | A progress bar in standard, rounded, and circular variants. |
| Dividers | `sp-divider` | A page divider (horizontal or vertical). |

<br>

## 📋Compatibility

| Angular Version | Library Compatibility |
| --------------- | --------------------- |
| 17.x            | Fully supported       |
| 18.x            | Fully supported       |


The library is designed for recent stable Angular versions. Older versions may work, but compatibility is not guaranteed. 
When installing via NPM, if you encounter version conflicts, it is recommended to use the `--force` flag to ensure a successful installation.

<br>

## 🤝 Contributing
We welcome contributions! Please feel free to submit issues, feature requests, or pull requests.

### Development workflow
1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License.
