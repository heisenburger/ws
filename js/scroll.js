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

// polyhedron
var polyhedron = {
  // type: 'IcosahedronGeometry',
  // args: [10, 1]
  type: 'OctahedronGeometry',
  args: [10, 0]
};

// start scene
init();
animate();

// ----
function init() {
  container = document.getElementById('camera-frame');

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 500;

  scene = new THREE.Scene();

  // add stuff

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

  // renderer

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setClearColor(0xfdfdfd);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // controls
  // controls = new THREE.OrbitControls( camera, renderer.domElement );

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
  group.rotation.x = 0.002 * scroll;
  // add drift
  group.rotation.y += 0.001;
  group.rotation.z += 0.0001;
  // group.rotation.x += 0.02*scrollDiff;
  // group.rotation.y += 0.002*scrollDiff;
  renderer.render(scene, camera);
}

// SCROLL STUFF
// ------------

// window.addEventListener('scroll', this.onScroll.bind(this));
window.addEventListener('scroll', function(e) {
  // scrollDiff = e.target.scrollingElement.scrollTop - prevScrollTop;
  // prevScrollTop = e.target.scrollingElement.scrollTop;
  scroll = e.target.scrollingElement.scrollTop;

});