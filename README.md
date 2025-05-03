# Kinematics Calculator
A simple, open-access web application for quickly solving kinematics equations. This tool allows physics students to calculate initial velocity, final velocity, acceleration, time, and displacement by providing at least three known values. It features instant calculations, error handling for invalid inputs, and a clean, responsive interface.
---
## Table of Contents
* [Features](#features)
* [Demo](#demo)
* [Installation](#installation)
* [Usage](#usage)
* [Project Structure](#project-structure)
* [Technologies](#technologies)
* [License](#license)
---
## Features
* **Instant Calculations**: Compute any two missing kinematic variables when three are provided.
* **Error Handling**: Validates inputs and shows descriptive error messages for inconsistent or impossible values.
* **Responsive Design**: Works on both desktop and mobile browsers.
* **Open-Source**: Completely free and licensed under the MIT license.
---
## Demo
Visit the live application at: [https://kinematics.richardsblogs.com](https://kinematics.richardsblogs.com)
---
## Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/richie-rich90454/kinematics_calculator.git
   cd kinematics-calculator
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the server**
   ```bash
   npm start
   ```
4. **Open in browser**
   Navigate to `http://localhost:6004`.
---
## Usage
1. Enter at least **three** known values among:
   * Initial velocity (vi)
   * Final velocity (vf)
   * Acceleration (a)
   * Time (t)
   * Displacement (x)
2. Click **Calculate**.
3. The missing variables will be displayed below.
4. Click **Clear** to reset all fields.
---
## Project Structure (only the main parts)
```
kinematics-calculator/
├── index.html       # Main HTML page
├── script.js        # Kinematics logic and UI interactions
├── LICENSE          # License details
├── OFL-EBGaramond.txt # Font license
└── server.js        # Fastify server configuration
```
---
## Technologies
* HTML and CSS for structure and styling
* Vanilla JavaScript for calculations and DOM manipulation
* [Fastify](https://www.fastify.io/) for serving static files
* EB Garamond font under SIL OFL 1.1
---
## License
* **Code**: MIT License. See [LICENSE](LICENSE).
* **Font**: EB Garamond under SIL Open Font License. See [OFL-EBGaramond.txt](OFL-EBGaramond.txt).
---