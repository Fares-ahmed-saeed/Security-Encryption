// Three.js background setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
    canvas: document.getElementById('bg'),
    antialias: true,
    alpha: true 
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Create Grid Floor
const gridGeometry = new THREE.PlaneGeometry(100, 100, 50, 50);
const gridMaterial = new THREE.MeshPhongMaterial({
    color: 0x64ffda,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
    shininess: 100
});
const grid = new THREE.Mesh(gridGeometry, gridMaterial);
grid.rotation.x = -Math.PI / 2;
grid.position.y = -5;
scene.add(grid);

// Create floating geometric shapes
const shapes = [];
const geometries = [
    new THREE.OctahedronGeometry(1),
    new THREE.TetrahedronGeometry(1),
    new THREE.IcosahedronGeometry(1)
];

for(let i = 0; i < 15; i++) {
    const material = new THREE.MeshPhongMaterial({
        color: 0x64ffda,
        transparent: true,
        opacity: 0.6,
        wireframe: true,
        shininess: 100
    });

    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const shape = new THREE.Mesh(geometry, material);
    
    const radius = Math.random() * 15 + 5;
    const theta = (i / 15) * Math.PI * 2;
    shape.position.set(
        Math.cos(theta) * radius,
        Math.random() * 8 - 2,
        Math.sin(theta) * radius
    );
    
    shape.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
    );
    
    shape.scale.set(
        Math.random() * 0.8 + 0.8,
        Math.random() * 0.8 + 0.8,
        Math.random() * 0.8 + 0.8
    );
    
    shapes.push(shape);
    scene.add(shape);
}

// Add lights
const ambientLight = new THREE.AmbientLight(0x64ffda, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x64ffda, 0.7);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Add point lights
const pointLights = [];
const lightColors = [0x64ffda, 0x00ffff, 0x00fff0];

for(let i = 0; i < 3; i++) {
    const light = new THREE.PointLight(lightColors[i], 0.8);
    light.position.set(
        Math.cos((i / 3) * Math.PI * 2) * 15,
        5,
        Math.sin((i / 3) * Math.PI * 2) * 15
    );
    scene.add(light);
    pointLights.push(light);
}

camera.position.set(0, 2, 12);
camera.lookAt(0, 0, 0);

// Mouse tracking variables
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// Animation
function animate() {
    requestAnimationFrame(animate);
    
    targetX = mouseX * 0.003;
    targetY = mouseY * 0.003;
    
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (-targetY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    shapes.forEach((shape, index) => {
        shape.rotation.x += 0.003;
        shape.rotation.y += 0.004;
        
        const time = Date.now() * 0.001;
        shape.position.y += Math.sin(time + index) * 0.003;
        
        shape.position.x += (targetX * 0.2) * Math.sin(time + index);
        shape.position.z += (targetY * 0.2) * Math.cos(time + index);
    });
    
    grid.material.opacity = 0.2 + Math.sin(Date.now() * 0.0005) * 0.1;
    
    pointLights.forEach((light, index) => {
        const time = Date.now() * 0.001;
        const radius = 12 + Math.sin(time * 0.5) * 4;
        light.position.x = Math.sin(time + index * 2.1) * radius;
        light.position.z = Math.cos(time + index * 2.1) * radius;
        light.intensity = 0.5 + Math.sin(time + index) * 0.3;
    });
    
    renderer.render(scene, camera);
}

// Enhanced mouse movement handling
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

// Handle window resize
window.addEventListener('resize', () => {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate(); 