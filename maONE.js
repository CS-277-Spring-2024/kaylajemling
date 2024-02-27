import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";

const textureLoader = new THREE.TextureLoader(); 
const rugTexture = textureLoader.load('/assets/textures/imports/rug.png') 
rugTexture.wrapS = THREE.MirroredRepeatWrapping; // horizontal wrapping
rugTexture.wrapT = THREE.MirroredRepeatWrapping; // vertical wrapping
rugTexture.repeat.set(10, 10); // how many times to repeat

const wallpaperTexture = textureLoader.load('/assets/textures/imports/wallpaper.jpeg') 
wallpaperTexture.wrapS = THREE.MirroredRepeatWrapping; // horizontal wrapping
wallpaperTexture.wrapT = THREE.MirroredRepeatWrapping; // vertical wrapping
wallpaperTexture.repeat.set(5, 3); // how many times to repeat

const wallTexture = textureLoader.load('/assets/textures/imports/wall.avif') 
wallTexture.wrapS = THREE.MirroredRepeatWrapping; // horizontal wrapping
wallTexture.wrapT = THREE.MirroredRepeatWrapping; // vertical wrapping
wallTexture.repeat.set(5, 3); // how many times to repeat

const shelfTexture = textureLoader.load('/assets/textures/imports/shelf.jpg') 
shelfTexture.wrapS = THREE.MirroredRepeatWrapping; // horizontal wrapping
shelfTexture.wrapT = THREE.MirroredRepeatWrapping; // vertical wrapping
const bookMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
bookMaterial.map = shelfTexture
bookMaterial.side = THREE.DoubleSide;

const rugMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
rugMaterial.map = rugTexture
rugMaterial.side = THREE.DoubleSide;
const wallpaperMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
wallpaperMaterial.map = wallpaperTexture
wallpaperMaterial.side = THREE.DoubleSide;
const wallMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
wallMaterial.map = wallTexture
wallMaterial.side = THREE.DoubleSide;

// create a scene
const scene = new THREE.Scene();
scene.backgroundColor = 0xffffff;

// setup camera
const camera = new THREE.PerspectiveCamera(
  50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.x = 15;
  camera.position.z = 8;
  camera.position.y = 2;

// setup the renderer and attach to canvas
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

// add lights
// scene.add(new THREE.AmbientLight(0x666666, 0.5));
const dirLight = new THREE.DirectionalLight(0xaaaaaa);
dirLight.position.set(5, 12, 8);
dirLight.castShadow = true;
dirLight.intensity = 0.9;
dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 200;
dirLight.shadow.camera.right = 10;
dirLight.shadow.camera.left = -10;
dirLight.shadow.camera.top = 10;
dirLight.shadow.camera.bottom = -10;
dirLight.shadow.mapSize.width = 512;
dirLight.shadow.mapSize.height = 512;
dirLight.shadow.radius = 4;
dirLight.shadow.bias = -0.0005;

scene.add(dirLight);

const carpetGeometry = new THREE.CylinderGeometry(10, 15, 1, 10, 200);
const carpetMaterial = new THREE.MeshToonMaterial({ color: 0xb56495});  
const carpet = new THREE.Mesh(carpetGeometry, carpetMaterial);
carpet.position.x=5;
carpet.position.y=-1.5;
carpet.position.z=-10;
carpet.castShadow = true;
scene.add(carpet);

const deskGeometry = new THREE.BoxGeometry(12, 6, 6);
const deskMaterial = new THREE.MeshToonMaterial({ color: 0xb44425});  
const desk = new THREE.Mesh(deskGeometry, deskMaterial);
desk.position.x=20;
desk.position.y=1;
desk.position.z=20;
desk.castShadow = true;
scene.add(desk);

const librarianGeometry = new THREE.SphereGeometry (3,0,4);
const librarianMaterial = new THREE.MeshToonMaterial({ color: 0xb20000 });  
const librarian = new THREE.Mesh(librarianGeometry, librarianMaterial);
librarian.position.x=20;
librarian.position.y=2;
librarian.position.z=27;
librarian.castShadow = true;
scene.add(librarian);

const group = new THREE.Group()
group.name = 'bookshelfs'

function createShelf(x, y, z) {
  const shelfGeometry = new THREE.BoxGeometry(4, 12, 10);
  const shelfMaterial = new THREE.MeshToonMaterial({ color: 0xb54425 });  
  const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
  shelf.position.set(x,y,z);
  shelf.castShadow = true;
  group.add(shelf)
}

for (let i=0; i < 4; i++) {
  let x = -31;
  let y = 4;
  let z = -20+i*13;
  createShelf(x,y,z);
  const shelfGeometry = new THREE.PlaneBufferGeometry;
  const shelfMesh = new THREE.Mesh(shelfGeometry, bookMaterial);
  shelfMesh.position.set(x,y,z);
  // shelfMesh.rotation.set(0, Math.PI / -2, 0);
  shelfMesh.receiveShadow = true;
  scene.add(shelfMesh);
}
for (let i=0; i < 4; i++) {
  let x = -37;
  let y = 4;
  let z = -20+i*13;
  createShelf(x,y,z);
}

scene.add(group);


// create a ground plane
const groundGeometry = new THREE.PlaneBufferGeometry(80, 60);
// const groundMaterial = new THREE.MeshLambertMaterial({
//   color: 0x00ff88,
// });
const groundMesh = new THREE.Mesh(groundGeometry, rugMaterial);
groundMesh.position.set(0, -2, 0);
groundMesh.rotation.set(Math.PI / -2, 0, 0);
groundMesh.receiveShadow = true;
scene.add(groundMesh);

//walls
const wallGeometry = new THREE.PlaneBufferGeometry(60, 30);
const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
wallMesh.position.set(-40, 13, 0);
wallMesh.rotation.set(0, Math.PI / -2, 0);
wallMesh.receiveShadow = true;
scene.add(wallMesh);
const sideWallGeometry = new THREE.PlaneBufferGeometry(30, 80);
const sideWallMesh = new THREE.Mesh(sideWallGeometry, wallMaterial);
sideWallMesh.position.set(0, 13, 30);
sideWallMesh.rotation.set(0, 0, Math.PI / -2);
sideWallMesh.receiveShadow = true;
scene.add(sideWallMesh);

// add orbitcontrols to pan around the scene using the mouse
const controller = new OrbitControls(camera, renderer.domElement);
controller.enableDamping = true;
controller.dampingFactor = 0.01;
controller.minDistance = 0;
controller.maxDistance = 100;
controller.minPolarAngle = 2 / 4;
controller.maxPolarAngle = (2 * Math.PI) / 4;

// import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'
// const controls = new FirstPersonControls(camera, renderer.
// domElement)
// const clock = new THREE.Clock()
// function animate() {
// requestAnimationFrame(animate)
// renderer.render(scene, camera)
// controls.update(clock.getDelta())
// }

// render the scene
renderer.render(scene, camera);
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controller.update();
}
animate();

// renderer.render(scene, camera)