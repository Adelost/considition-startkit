import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class BasicScene {
  constructor(canvas) {
    this.setupScene(canvas);
    this.setupLights();
  }

  add(object) {
    this.scene.add(object);
  }

  setupScene(canvas) {
    this.scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setX(200);
    camera.position.setY(200);
    camera.position.setZ(200);
    renderer.render(this.scene, camera);
    this.scene.background = 0xffffff;
    const controls = new OrbitControls(camera, renderer.domElement);
    const animate = () => {
      controls.update();
      requestAnimationFrame(animate);
      renderer.render(this.scene, camera);
    };
    animate();
  }

  setupLights() {
    const pointLight = new THREE.Light(0xaaaaaa);
    pointLight.position.set(500, 500, 500);
    // scene.add(pointLight);
    this.scene.add(new THREE.HemisphereLight(0xffff80, 0xffff80, 1, 0));
    let dirLight = new THREE.DirectionalLight(0xffffff, 1, 0);
    dirLight.position.set(500, 600, 700);
    dirLight.target.position.set(0, 0, 0);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 512; // default
    dirLight.shadow.mapSize.height = 512; // default
    dirLight.shadow.camera.near = 0.5; // default
    dirLight.shadow.camera.far = 1000; // default
    this.scene.add(dirLight);
    dirLight = new THREE.DirectionalLight(0xffffff, 1, 0);
    dirLight.position.set(-600, 600, 200);
    dirLight.target.position.set(0, 0, 0);

    // dirLight.castShadow = true;
    // dirLight.shadow.mapSize.width = 512; // default
    // dirLight.shadow.mapSize.height = 512; // default
    // dirLight.shadow.camera.near = 0.5; // default
    // dirLight.shadow.camera.far = 500; // default
    //     const ambientLight = new THREE.AmbientLight(0xAAAAAA);
    // this.scene.add(ambientLight);
    this.scene.add(dirLight);
  }
}
