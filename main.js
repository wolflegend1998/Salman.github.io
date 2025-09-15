import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// 1. Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
scene.background = new THREE.Color(0x111111); // Dark grey/black background
scene.fog = new THREE.Fog(0x111111, 1, 50); // Color, near, far

// 2. Add some geometry (a plane for the ground)
const geometry = new THREE.PlaneGeometry(20, 20);
const material = new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// 3. Add lights
const ambientLight = new THREE.AmbientLight(0x4a4f66, 0.5); // A cool, blueish ambient light
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xf5d998, 1); // A warm, yellowish sun
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const loader = new GLTFLoader();

loader.load(
    'path/to/your/model.glb',
    function (gltf) {
        scene.add(gltf.scene);
    },
    // Optional: Progress callback
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // Optional: Error callback
    function (error) {
        console.log('An error happened', error);
    }
);

// 4. Position the camera
camera.position.z = 5;
camera.position.y = 5;
camera.lookAt(0, 0, 0);

// 5. The render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// 6. Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
