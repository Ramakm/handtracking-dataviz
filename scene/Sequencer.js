import { gsap } from 'gsap';

export class Sequencer {
    constructor(camera, sceneUtils) {
        this.camera = camera;
        this.timeline = gsap.timeline({ repeat: -1, repeatDelay: 1 });
        this.init();
    }

    init() {
        this.setupTimeline();
    }

    setupTimeline() {
        // Elements
        const text1 = document.getElementById('text-sequence-1');
        const text2 = document.getElementById('text-sequence-2');
        const text3 = document.getElementById('text-sequence-3');
        const hero = document.getElementById('hero-frame');

        // Initial State
        this.camera.position.set(0, 0, 40);
        this.camera.lookAt(0, 0, 0);

        // Sequence 1: Intro Zoom & Text 1
        this.timeline
            .to(this.camera.position, {
                z: 25,
                duration: 4,
                ease: "power2.inOut"
            })
            .to(text1, { opacity: 1, duration: 1, y: -20 }, "<") // Fade in
            .to(text1, { opacity: 0, duration: 1, y: -40 }, ">2") // Fade out

            // Sequence 2: Pan & Text 2
            .to(this.camera.position, {
                x: 10,
                y: 5,
                z: 15,
                duration: 5,
                ease: "power1.inOut"
            })
            .to(this.camera.rotation, {
                y: 0.2,
                duration: 5,
                ease: "power1.inOut"
            }, "<")
            .to(text2, { opacity: 1, duration: 1, scale: 1.1 }, "-=3")
            .to(text2, { opacity: 0, duration: 1, scale: 0.9 }, ">2")

            // Sequence 3: Detail & Text 3
            .to(this.camera.position, {
                x: -5,
                y: -5,
                z: 10,
                duration: 5,
                ease: "power2.inOut"
            })
            .to(this.camera.rotation, {
                y: -0.2,
                x: 0.1,
                duration: 5,
                ease: "power2.inOut"
            }, "<")
            .to(text3, { opacity: 1, duration: 1 }, "-=3")
            .to(text3, { opacity: 0, duration: 1 }, ">2")

            // Sequence 4: Hero Shot
            .to(this.camera.position, {
                x: 0,
                y: 0,
                z: 35,
                duration: 4,
                ease: "power3.out"
            })
            .to(this.camera.rotation, {
                x: 0,
                y: 0,
                z: 0,
                duration: 4,
                ease: "power3.out"
            }, "<")
            .to(hero, { opacity: 1, duration: 2, scale: 1.05 }, "-=2")
            // Hold hero for a bit
            .to({}, { duration: 4 })
            .to(hero, { opacity: 0, duration: 1 });
    }
}
