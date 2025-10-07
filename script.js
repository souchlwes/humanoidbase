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
const root = new THREE.Bone();
const spine = new THREE.Bone();
const head = new THREE.Bone();
const armL = new THREE.Bone();
const armR = new THREE.Bone();
const legL = new THREE.Bone();
const legR = new THREE.Bone();

root.add(spine);
spine.add(head);
spine.add(armL);
spine.add(armR);
root.add(legL);
root.add(legR);

const skeleton = new THREE.Skeleton([root, spine, head, armL, armR, legL, legR]);

// Helper function
function createLimb(geometry, color, bone) {
  const material = new THREE.MeshStandardMaterial({ color, skinning: true });
  const mesh = new THREE.SkinnedMesh(geometry, material);
  mesh.add(bone);
  mesh.bind(new THREE.Skeleton([bone]));
  return mesh;
}

// Body parts
const torsoGeo = new THREE.CylinderGeometry(0.8, 0.8, 2, 16);
const torsoMesh = createLimb(torsoGeo, 0xcccccc, spine);
scene.add(torsoMesh);

const headGeo = new THREE.SphereGeometry(0.5, 16, 16);
const headMesh = createLimb(headGeo, 0xaaaaaa, head);
scene.add(headMesh);

const armGeo = new THREE.CylinderGeometry(0.3, 0.3, 1, 12);
const armMeshL = createLimb(armGeo, 0x999999, armL);
scene.add(armMeshL);

const armMeshR = createLimb(armGeo, 0x999999, armR);
scene.add(armMeshR);

const legGeo = new THREE.CylinderGeometry(0.4, 0.4, 1.5, 12);
const legMeshL = createLimb(legGeo, 0x999999, legL);
scene.add(legMeshL);

const legMeshR = createLimb(legGeo, 0x999999, legR);
scene.add(legMeshR);

// Animate
function animate() {
  requestAnimationFrame(animate);

  // Update bone positions
  spine.position.y = parseFloat(torsoSlider.value);
  armL.position.set(-1.2, parseFloat(armSlider.value), 0);
  armR.position.set(1.2, parseFloat(armSlider.value), 0);
  legL.position.set(-0.5, -parseFloat(legSlider.value), 0);
  legR.position.set(0.5, -parseFloat(legSlider.value), 0);
  head.position.y = 1;

  // Update mesh positions
  torsoMesh.position.y = spine.position.y / 2;
  headMesh.position.y = spine.position.y + head.position.y;
  armMeshL.position.set(armL.position.x, spine.position.y + armL.position.y, 0);
  armMeshR.position.set(armR.position.x, spine.position.y + armR.position.y, 0);
  legMeshL.position.set(legL.position.x, root.position.y + legL.position.y, 0);
  legMeshR.position.set(legR.position.x, root.position.y + legR.position.y, 0);

  // Movement
  armL.rotation.z = Math.sin(Date.now() * 0.002) * 0.5;
  armR.rotation.z = -Math.sin(Date.now() * 0.002) * 0.5;
  head.rotation.y = Math.sin(Date.now() * 0.001) * 0.3;

  renderer.render(scene, camera);
}
animate();
