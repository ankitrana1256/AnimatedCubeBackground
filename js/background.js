const scene = new THREE.Scene();

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(sizes.width, sizes.height);
renderer.physicallyCorrectLights = true;

// var controls = new THREE.OrbitControls(camera, renderer.domElement);

const canvas = document.querySelector('.canvas');
canvas.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const hemispherelight = new THREE.HemisphereLight(0xffffbb, 0x080820, 2);
scene.add(hemispherelight);

var no_of_cubes = 300;
var cube = [];

for (let i = 0; i < no_of_cubes; i++) {
    function addcube() {
        cube[i] = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshPhongMaterial({ color: Math.random() * 0xffffff })
        );
        cube[i].position.x = (Math.random() - 0.5) * 20;
        cube[i].position.y = (Math.random() - 0.5) * 20;
        cube[i].position.z = (Math.random() - 0.5) * 20;
        scene.add(cube[i]);
    };
    addcube();
}
const clock = new THREE.Clock();
var oldtime = 0;

function animate(newtime) {
    for (let k = 0; k < no_of_cubes; k++) {
        cube[k].rotation.x += newtime;
        cube[k].rotation.y += newtime;
        cube[k].rotation.z += newtime;
    }
}

const tick = () => {

    var elpsedtime = clock.getElapsedTime();
    var newtime = elpsedtime - oldtime;
    oldtime = elpsedtime;

    // Render
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
    animate(newtime);
}
tick();