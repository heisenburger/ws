// Draws obj and rotates obj depending on user's scroll
// Serena Chen April 2016

var scroll = 0;
var scrollDiff = 0;
var prevScrollTop = 0;

var create = function(klass, args) {
  var F = function(klass, args) {
    return klass.apply(this, args);
  };
  F.prototype = klass.prototype;
  return new F(klass, args);
};

var polyhedron = {
  // type: 'IcosahedronGeometry',
  // args: [10, 1]
  type: 'OctahedronGeometry',
  args: [10, 1]
};

function init() {
  container = document.getElementById('camera-frame');

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 500;

  scene = new THREE.Scene();

  // add

  if (window.group !== undefined) {
    scene.remove(group);
  }

  geometry = create(THREE[polyhedron.type], polyhedron.args);
  geometry.computeBoundingSphere();

  var scaleFactor = 160 / geometry.boundingSphere.radius;
  geometry.scale(scaleFactor, scaleFactor, scaleFactor);

  var originalGeometry = geometry.clone();

  group = new THREE.Group();
  scene.add(group);

  var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
    color: 0xeee9d2,
    wireframe: true,
    opacity: 0.5
  }));
  group.add(mesh);

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setClearColor(0xfdfdfd);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  group.rotation.x = -0.002 * scroll;
  // add drift
  group.rotation.y += 0.002;
  group.rotation.z += 0.0002;
  renderer.render(scene, camera);
}

window.addEventListener('scroll', function(e) {
  scroll = e.target.scrollingElement.scrollTop;
});

// start scene
init();
animate();