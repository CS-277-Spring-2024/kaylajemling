import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader.js";
// import bookTitles from '/bookTitles.js';

let object;
const manager = new THREE.LoadingManager(loadModel );

const textureLoader = new THREE.TextureLoader(manager); 
const rugTexture = textureLoader.load('/imports/rug.png') 
rugTexture.wrapS = THREE.MirroredRepeatWrapping; // horizontal wrapping
rugTexture.wrapT = THREE.MirroredRepeatWrapping; // vertical wrapping
rugTexture.repeat.set(10, 10); // how many times to repeat

const wallpaperTexture = textureLoader.load('/imports/wallpaper.jpeg') 
wallpaperTexture.wrapS = THREE.MirroredRepeatWrapping; // horizontal wrapping
wallpaperTexture.wrapT = THREE.MirroredRepeatWrapping; // vertical wrapping
wallpaperTexture.repeat.set(5, 3); // how many times to repeat

const wallTexture = textureLoader.load('/imports/wall.avif') 
wallTexture.wrapS = THREE.MirroredRepeatWrapping; // horizontal wrapping
wallTexture.wrapT = THREE.MirroredRepeatWrapping; // vertical wrapping
wallTexture.repeat.set(5, 3); // how many times to repeat


const bookMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
//bookMaterial.map = shelfTexture
bookMaterial.side = THREE.DoubleSide;


const readerTexture = textureLoader.load('/imports/shelf.jpg') 
readerTexture.wrapS = THREE.MirroredRepeatWrapping; // horizontal wrapping
readerTexture.wrapT = THREE.MirroredRepeatWrapping; // vertical wrapping
const readerMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
readerMaterial.side = THREE.DoubleSide;
readerMaterial.map = readerTexture;

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
scene.add(new THREE.AmbientLight(0x666666, 2));
const dirLight = new THREE.DirectionalLight(0xaaaaaa);
dirLight.position.set(5, 12, 8);
dirLight.castShadow = true;
dirLight.intensity = 8;
dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 200;
dirLight.shadow.camera.right = 10;
dirLight.shadow.camera.left = -10;
dirLight.shadow.camera.top = 10;
dirLight.shadow.camera.bottom = -10;
dirLight.shadow.mapSize.width = 512;
dirLight.shadow.mapSize.height = 512;
dirLight.shadow.radius = 20;
dirLight.shadow.bias = -0.1;

scene.add(dirLight);

const carpetGeometry = new THREE.CylinderGeometry(10, 15, 1, 10, 200);
const carpetMaterial = new THREE.MeshToonMaterial({ color: 0xb58499});  
const carpet = new THREE.Mesh(carpetGeometry, carpetMaterial);
carpet.position.x=5;
carpet.position.y=-1.5;
carpet.position.z=-10;
carpet.castShadow = true;
scene.add(carpet);

const deskGeometry = new THREE.BoxGeometry(12, 6, 6);
const deskMaterial = new THREE.MeshToonMaterial({ color: 0xb06425});  
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

const group2 = new THREE.Group()
group2.name = 'bookies'

function createShelf(x, y, z) {
  const shelfGeometry = new THREE.BoxGeometry(4, 12, 10);
  const shelfMaterial = new THREE.MeshToonMaterial({ color: 0xb06425 });  
  const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
  shelf.position.set(x,y,z);
  shelf.castShadow = true;
  group.add(shelf)
}

function createReader(x, y, z) {
  const readerMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
  readerMaterial.map = readerTexture
  readerMaterial.side = THREE.DoubleSide;
  const readerGeometry = new THREE.PlaneGeometry(10, 12);
  const reader = new THREE.Mesh(readerGeometry, readerMaterial);
  reader.position.set(x,y,z);
  reader.rotation.set(0, Math.PI/2, 0);
  reader.castShadow = true;
  group2.add(reader)
}

for (let i=0; i < 4; i++) {
  let x = -31;
  let y = 4;
  let z = -20+i*13;
  createShelf(x,y,z);
  const shelfGeometry = new THREE.PlaneGeometry();
  const shelfMesh = new THREE.Mesh(shelfGeometry, bookMaterial);
  shelfMesh.position.set(x,y,z);
  // shelfMesh.rotation.set(0, Math.PI / -2, 0);
  shelfMesh.receiveShadow = true;
  shelfMesh.name = `shelf${i + 1}`;
  console.log(shelfMesh.name);
  scene.add(shelfMesh);
  createReader(x,y,z);
  const readerGeometry = new THREE.PlaneGeometry(4, 12);
  const readerMesh = new THREE.Mesh(readerGeometry, readerMaterial);
  readerMesh.receiveShadow = true;
}

for (let i=0; i < 4; i++) {
  let x = -37;
  let y = 4;
  let z = -20+i*13;
  createShelf(x,y,z);
  createReader(x+8.02,y,z);
}

scene.add(group);
scene.add(group2);

// // chair
const objLoader = new OBJLoader(manager);
const objLoader2 = new OBJLoader(manager);

function loadModel() {

  object.traverse( function ( child ) {

    if ( child.isMesh ) child.material.map = texture;

  } );

  render();

}

const beauty = textureLoader.load('/imports/beauty.png');
const beautyMaterial = new THREE.SpriteMaterial ({map:beauty})
beautyMaterial.colorSpace = THREE.SRGBColorSpace;

const sprite1 = new THREE.Sprite(beautyMaterial);
sprite1.scale.set(20, 20, 1)
sprite1.position.set(30, 10, 15)
scene.add( sprite1 );

const mtlLoader = new MTLLoader();
const materials = textureLoader.load('/imports/chair/model.mtl' );
materials.colorSpace = THREE.SRGBColorSpace;

mtlLoader.load('/imports/chair/model.mtl' , function(materials) {
  materials.preload();

  // Initialize OBJLoader
  objLoader.setMaterials(materials); // Set the loaded materials to OBJLoader
  objLoader.load('/imports/chair/chair.obj', function(object) {
      object.scale.set(0.07, 0.07, 0.07); // Scale to half size in all dimensions
      scene.add(object);
      object.rotation.set (0, Math.PI, 0);
      object.position.set(5, -1.5, -20); // Adjust position if needed
  });
});

const mtlLoader2 = new MTLLoader();
const lampMaterials = textureLoader.load('/womp/lamp/model.mtl');
lampMaterials.colorSpace = THREE.SRGBColorSpace;

mtlLoader2.load('/womp/lamp/model.mtl', function(lampMaterials) {
  lampMaterials.preload();

  // Initialize OBJLoader
  objLoader2.setMaterials(lampMaterials); // Set the loaded materials to OBJLoader
  objLoader2.load('/womp/lamp/lamp.obj', function(object) {
      object.scale.set(0.03, 0.03, 0.03); // Scale to half size in all dimensions
      scene.add(object);
      object.position.set(13, -1.5, -20); // Adjust position if needed
  });
});

//resize handler
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);


// create a ground plane
const groundGeometry = new THREE.PlaneGeometry(80, 60);
// const groundMaterial = new THREE.MeshLambertMaterial({
//   color: 0x00ff88,
// });
const groundMesh = new THREE.Mesh(groundGeometry, rugMaterial);
groundMesh.position.set(0, -2, 0);
groundMesh.rotation.set(Math.PI / -2, 0, 0);
groundMesh.receiveShadow = true;
scene.add(groundMesh);

//walls
const wallGeometry = new THREE.PlaneGeometry(60, 30);
const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
wallMesh.position.set(-40, 13, 0);
wallMesh.rotation.set(0, Math.PI / -2, 0);
wallMesh.receiveShadow = true;
scene.add(wallMesh);
const sideWallGeometry = new THREE.PlaneGeometry(30, 80);
const sideWallMesh = new THREE.Mesh(sideWallGeometry, wallMaterial);
sideWallMesh.position.set(0, 13, 30);
sideWallMesh.rotation.set(0, 0, Math.PI / -2);
sideWallMesh.receiveShadow = true;
scene.add(sideWallMesh);

const shelfMapping = [];

for (let i = 0; i < 4; i++) {
  const shelf = []; // Initialize an empty array for each shelf
  for (let j = 30 * i; j < 30 * (i + 1); j++) {
      shelf.push(j); // Push indices into the shelf array
  }
  shelfMapping.push(shelf); // Push shelf object into shelfMapping array
}

console.log(shelfMapping);

const controller = new OrbitControls(camera, renderer.domElement);
controller.enableDamping = false;
controller.dampingFactor = 0.01;
controller.minDistance = 0;
controller.maxDistance = 100;
controller.minPolarAngle = 2 / 4;
controller.maxPolarAngle = (2 * Math.PI) / 4;

const bookshelves = [];

document.addEventListener('click', onClickBookshelf);

bookshelves.forEach(bookshelf => {
  bookshelf.addEventListener('click', onClickBookshelf);
});

function onClickBookshelf(event) {
  const clickedBookshelf = event.target; // Get the clicked bookshelf object
  const mouse = new THREE.Vector2();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera( mouse, camera );
  const intersects = raycaster.intersectObject(group2);

  if (intersects.length > 0) {
    // For simplicity, let's assume the first intersected object is the bookshelf
    const clickedBookshelf = intersects[0].object;

  // Step 3: Load Next Image or Riddle
  loadNextImage();
}

function loadNextImage(){
  console.log ('Thats right! The answer is Black Beauty, by Anna Sewell. Zoom out to see the next riddle.')
  const watership = textureLoader.load('/imports/watership.png');
  const watershipMaterial = new THREE.SpriteMaterial ({map:watership})
  watershipMaterial.colorSpace = THREE.SRGBColorSpace;

  const sprite2 = new THREE.Sprite(watershipMaterial);
  sprite2.scale.set(20, 20, 1)
  sprite2.position.set(30, 10, 15)
  scene.add( sprite2 );
}

// render the scene
function render(){
  raycaster.setFromCamera( mouse, camera );
  const intersects = raycaster.intersectObjects(scene.children, true);	
				if ( intersects.length > 0 ) {
				  intersects.forEach(intersect => {
        });
				}
  renderer.render(scene, camera);
}


function animate() {
  requestAnimationFrame(animate);
  render();
  controller.update();
  // labelRenderer.render(scene, camera);
}
animate();
}


// window.addEventListener('resize', function() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   labelRenderer.setSize(this.window.innerWidth, this.window.innerHeight);
// });

// // renderer.render(scene, camera)

// const onMouseMove = (event) => {
// 	// calculate pointer position in normalized device coordinates
// 	// (-1 to +1) for both components
// 	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
// 	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
//   raycaster.setFromCamera( mouse, camera );
//   const intersects = raycaster.intersectObject(group2);

//   if (intersects.length > 0) {
//     // Get the index of the intersected shelf (or point on shelf)
//     const intersectedShelfIndex = intersects[0].object.userData.shelfIndex;

//     // Retrieve book titles for the intersected shelf
//     const shelfIndices = Object.values(shelfMapping[intersectedShelfIndex])[0];
//     const bookTitlesForShelf = shelfIndices.map(index => bookTitles[index]);

//     // Log book titles to the console for testing
//     console.log("Book titles:", bookTitlesForShelf);
// }
// }