import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

// Check JS is Connected
console.log('JS Connected');

// Get the canvas
const canvas = document.getElementById('particle-background');

// Set up renderer, scene, and camera
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

// Create particles
const particleCount = 500;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 100;
}
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.2 });
const particles = new THREE.Points(geometry, material);
scene.add(particles);

// Resize handler
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

// Animate and add cursor interaction
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
    particles.rotation.x += 0.001;
    particles.rotation.y += 0.001;

    particles.position.x += (mouseX * 10 - particles.position.x) * 0.05;
    particles.position.y += (mouseY * 10 - particles.position.y) * 0.05;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

document.getElementById('welcome-btn').addEventListener('click', function() {
    document.getElementById('welcome-message').style.display = 'none';
    document.getElementById('portfolio-container').style.display = 'grid';
});