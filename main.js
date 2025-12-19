import './style.css';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { Background } from './scene/Background.js';
import { Network } from './scene/Network.js';
import { Sequencer } from './scene/Sequencer.js';

class App {
    constructor() {
        this.canvas = document.querySelector('#app');
        this.clock = new THREE.Clock();

        // Scene Setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color('#050505');
        this.scene.fog = new THREE.FogExp2(0x050505, 0.015);

        // Camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 30);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.toneMapping = THREE.ReinhardToneMapping;

        // Post Processing
        this.setupPostProcessing();

        // Components
        this.background = new Background(this.scene);
        this.network = new Network(this.scene);
        this.sequencer = new Sequencer(this.camera);

        // Event Listeners
        window.addEventListener('resize', this.onResize.bind(this));

        // Start Loop
        this.init();
        this.animate();
    }

    setupPostProcessing() {
        this.composer = new EffectComposer(this.renderer);

        const renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.5, // strength
            0.4, // radius
            0.85 // threshold
        );
        this.composer.addPass(bloomPass);
    }

    init() {
        this.setupLights();
    }

    setupLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x00f2ea, 2, 100);
        pointLight.position.set(10, 10, 10);
        this.scene.add(pointLight);

        const blueLight = new THREE.PointLight(0x0055ff, 2, 100);
        blueLight.position.set(-10, -5, 5);
        this.scene.add(blueLight);
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.composer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        const elapsedTime = this.clock.getElapsedTime();

        // Update components
        this.background.animate(elapsedTime);
        this.network.animate();

        // Render via composer
        this.composer.render();
    }
}

new App();
