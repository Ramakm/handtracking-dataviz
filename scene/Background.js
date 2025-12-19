import * as THREE from 'three';

export class Background {
    constructor(scene) {
        this.scene = scene;
        this.init();
    }

    init() {
        this.createParticles();
        this.createGrid();
    }

    createParticles() {
        const geometry = new THREE.BufferGeometry();
        const count = 2000;
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 100;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            size: 0.1,
            color: 0x00f2ea, // Cyan/Teal
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createGrid() {
        const gridHelper = new THREE.GridHelper(200, 100, 0x1a1a1a, 0x0a0a0a);
        gridHelper.position.y = -10;
        this.scene.add(gridHelper);

        // Add a second top grid for "cyber" feel
        const topGrid = new THREE.GridHelper(200, 100, 0x1a1a1a, 0x0a0a0a);
        topGrid.position.y = 10;
        this.scene.add(topGrid);
    }

    animate(time) {
        if (this.particles) {
            this.particles.rotation.y = time * 0.05;
            this.particles.rotation.x = time * 0.02;
        }
    }
}
