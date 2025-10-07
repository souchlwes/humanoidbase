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

// Create body parts
const torso = new THREE.Mesh(
  new THREE.CylinderGeometry(0.8, 0.8, 2, 16),
  new THREE.MeshStandardMaterial({ color: 0xcccccc })
);
scene.add(torso);

const head = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshStandardMaterial({ color: 0xaaaaaa })
);
scene.add(head);

const armL = new THREE.Mesh(
  new THREE.CylinderGeometry(0.3, 0.3, 1, 12),
  new THREE.MeshStandardMaterial({ color: 0x999999 })
);
scene.add(armL);

const armR = armL.clone();
scene.add(armR);

const legL = new THREE.Mesh(
  new THREE.CylinderGeometry(0.4, 0.4, 1.5, 12),
  new THREE.MeshStandardMaterial({ color: 0x999999 })
);
scene.add(legL);

const legR = legL.clone();
scene.add(legR);

// Animate
function animate() {
  requestAnimationFrame(animate);

  // Get slider values
  const torsoHeight = parseFloat(torsoSlider.value);
  const armLength = parseFloat(armSlider.value);
  const legLength = parseFloat(legSlider.value);

  // Update torso
  torso.scale.y = torsoHeight / 2;
  torso.position.y = torsoHeight / 2;

  // Update head
  head.position.y = torso.position.y + torso.geometry.parameters.height * torso.scale.y / 2 + 0.6;

  // Update arms
  armL.scale.y = armLength;
  armL.position.set(-1.2, torso.position.y + 0.5, 0);
  armR.scale.y = armLength;
  armR.position.set(1.2, torso.position.y + 0.5, 0);

  // Update legs
  legL.scale.y = legLength;
  legL.position.set(-0.5, torso.position.y - torso.geometry.parameters.height * torso.scale.y / 2 - legLength / 2, 0);
  legR.scale.y = legLength;
  legR.position.set(0.5, torso.position.y - torso.geometry.parameters.height * torso.scale.y / 2 - legLength / 2, 0);

  // Movement
  armL.rotation.z = Math.sin(Date.now() * 0.002) * 0.5;
  armR.rotation.z = -Math.sin(Date.now() * 0.002) * 0.5;
  head.rotation.y = Math.sin(Date.now() * 0.001) * 0.3;

  renderer.render(scene, camera);
}
animate();
