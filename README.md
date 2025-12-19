# HandTracking DataViz

## Overview
A Bento box dashboard that visualizes live hand tracking data in real time. The application captures hand movements via webcam, processes the coordinates, and renders interactive charts and 3D visualizations.

## Prerequisites
1. Install Node.js (>=18) and npm.
2. Ensure a webcam is connected and accessible.
3. Clone the repository and navigate to the project folder.

## Setup & Installation
```bash
git clone <repo-url>
cd handtracking-dataviz
npm install
```

## Running the Application
```bash
npm run dev
```
Open `http://localhost:5173` in your browser. Grant webcam permissions when prompted.

## How It Works
1. **Capture** – The browser accesses the webcam using the MediaDevices API.
2. **Track** – Hand landmarks are extracted with MediaPipe Hands.
3. **Process** – Coordinates are normalized and sent to the visualization layer.
4. **Visualize** – D3.js renders line charts while Three.js displays a 3D hand model.
5. **Interact** – Use mouse or touch to rotate the 3D view and hover over chart points for details.

## Customization
- Edit `src/config.js` to change the color palette.
- Modify `src/components/Chart.jsx` to add new data series.
- Adjust the Three.js scene in `src/scene/HandModel.js` for different lighting.

## Troubleshooting
- **Webcam not detected** – Verify browser permissions and that no other application is using the camera.
- **Performance drops** – Reduce the `maxNumHands` parameter in `src/utils/handTracker.js`.

## License
This project is licensed under the MIT License.

## Connect with Me
[![GitHub](https://img.shields.io/badge/GitHub-Ramakm-181717?logo=github&style=flat)](https://github.com/Ramakm)  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ramakrushnamohapatra-0A66C2?logo=linkedin&style=flat)](https://linkedin.com/in/ramakrushnamohapatra)  
[![Twitter](https://img.shields.io/badge/Twitter-techwith_ram-1DA1F2?logo=twitter&style=flat)](https://twitter.com/techwith_ram)
