const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(0.5, 32, 32);

const loader = new THREE.TextureLoader();

const skills = [ // Replace with objects containing skill name and image path
  { name: "Skill 1", image: "path/to/skill1.png" },
  { name: "Skill 2", image: "path/to/skill2.png" },
  { name: "Skill 3", image: "path/to/skill3.png" },
  // ...
];

const spheres = [];

let theta = 0;

const createSphere = (skill) => {
  const material = new THREE.MeshBasicMaterial({ map: loader.load(skill.image) });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.x = Math.cos(theta) * 3;
  sphere.position.z = Math.sin(theta) * 3;
  theta += 2 * Math.PI / skills.length;
  sphere.name = skill.name;

  sphere.on('click', function() {
    console.log(this.name);
  });

  spheres.push(sphere);
  scene.add(sphere);
};

skills.forEach(createSphere);

const light = new THREE.PointLight(0xffffff, 1);
scene.add(light);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  spheres.forEach(sphere => {
    sphere.rotation.y += 0.01;
  });

  renderer.render(scene, camera);
}

animate();
