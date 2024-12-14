import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

// Check JS is Connected
console.log('JS Connected');

let scene, camera, renderer, particles, clock;

function init() {
    // Get the canvas element from the DOM
    const canvas = document.getElementById('particle-background');

    // Create the scene
    scene = new THREE.Scene();

    // Create a camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;
    camera.position.y = 0;
    camera.position.x = 0;
    camera.rotation.x = 0.3;
    camera.lookAt(scene.position);

    // Create the renderer and attach it to the canvas
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create particles
    const particleCount = 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10; // x
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // y
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Generate colors for particles
    const colors = [];
    for (let i = 0; i < particleCount; i++) {
        if(i % 3 == 0){
            const color = new THREE.Color(147, 245, 219);
            colors.push(color.r, color.g, color.b);
        }else{
            colors.push(255, 255, 255);
        }
    }
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        vertexColors: true,
        size: 0.01,
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Clock for animation timing
    clock = new THREE.Clock();

    // Add resize listener
    window.addEventListener('resize', onWindowResize, false);

    animate();
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animate particles
function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    const positionsArray = particles.geometry.attributes.position.array;
    for (let i = 0; i < positionsArray.length; i += 3) {

        const scaledTime = time * 0.1;

        positionsArray[i + 1] = Math.sin(scaledTime + i * 0.1) * 2; // Y oscillation
        positionsArray[i] = Math.cos(scaledTime + i * 0.2) * 2; // X oscillation


        // const radius = i * 0.2; // Gradual outward movement
        // const angle = time + i * 0.2;
        // const x = positionsArray[i];
        // positionsArray[i * 3 + 0] = Math.cos(angle) * radius; // X position
        // positionsArray[i * 3 + 1] = Math.sin(time + i * 0.1) * 2; // Y oscillation
        // positionsArray[i * 3 + 2] = Math.sin(angle) * radius; // Z position
    }

    particles.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

// Run the script
init();

document.getElementById('welcome-btn').addEventListener('click', function() {
    document.getElementById('welcome-message').style.display = 'none';
    document.getElementById('portfolio-container').style.display = 'grid';
});

const button = document.querySelector('.button');
    button.addEventListener('click', () => {
        button.classList.toggle('active');
    });