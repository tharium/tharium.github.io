import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

let scene, camera, renderer, particles, clock;

function init() {
    const canvas = document.getElementById('particle-background');

    //scene
    scene = new THREE.Scene();

    //camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;
    camera.position.y = 0;
    camera.position.x = 0;
    camera.rotation.x = 0.3;
    camera.lookAt(scene.position);

    //create the renderer and attach to canvas
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    //create particles
    const particleCount = 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10; // x
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // y
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: 0x000000,
        size: 0.01,
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    //clock
    clock = new THREE.Clock();

    //resize listener
    window.addEventListener('resize', onWindowResize, false);

    animate();
}

//handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    const positionsArray = particles.geometry.attributes.position.array;
    for (let i = 0; i < positionsArray.length; i += 3) {

        const scaledTime = time * 0.1;

        positionsArray[i + 1] = Math.sin(scaledTime + i * 0.1) * 2; // Y oscillation
        positionsArray[i] = Math.cos(scaledTime + i * 0.2) * 2; // X oscillation

    }

    particles.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

init();

