// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 6;

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Sliders
const torsoSlider = document.getElementById("torsoSlider");
const armSlider = document.getElementById("armSlider");
const legSlider = document.getElementById("legSlider");

// Bones
const bones = [];
const root = new THREE.Bone();
root.position.y = -1;
bones.push(root);

const spine = new THREE.Bone();
spine.position.y = parseFloat(torsoSlider.value);
root.add(spine);
bones.push(spine);

const head = new THREE.Bone();
head.position.y = 1;
spine.add(head);
bones.push(head);

const armL = new THREE.Bone();
armL.position.set(-1.2, parseFloat(armSlider.value), 0);
spine.add(armL);
bones.push(armL);

const armR = new THREE.Bone();
armR.position.set(1.2, parseFloat(armSlider.value), 0);
spine.add(armR);
bones.push(armR);

const legL = new THREE.Bone();
legL.position.set(-0.5, -parseFloat(legSlider.value), 0);
root.add(legL);
bones.push(legL);

const legR = new THREE.Bone();
legR.position.set(0.5, -parseFloat(legSlider.value), 0);
root.add(legR);
bones.push(legR);

// Geometry
const geometry = new THREE.CylinderGeometry(0.8, 0.8, 4, 8);
const material = new THREE.MeshStandardMaterial({ color: 0xcccccc, skinning: true });
const mesh = new THREE.SkinnedMesh(geometry, material);
const skeleton = new THREE.Skeleton(bones);
mesh.add(root);
mesh.bind(skeleton);
scene.add(mesh);

// Animate
function animate() {
  requestAnimationFrame(animate);

  // Live proportion updates
  spine.position.y = parseFloat(torsoSlider.value);
  armL.position.y = parseFloat(armSlider.value);
  armR.position.y = parseFloat(armSlider.value);
  legL.position.y = -parseFloat(legSlider.value);
  legR.position.y = -parseFloat(legSlider.value);

  // Movement
  armL.rotation.z = Math.sin(Date.now() * 0.002) * 0.5;
  armR.rotation.z = -Math.sin(Date.now() * 0.002) * 0.5;
  head.rotation.y = Math.sin(Date.now() * 0.001) * 0.3;

  renderer.render(scene, camera);
}
animate();
