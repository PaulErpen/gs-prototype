import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';
import { BoxGeometry, Clock, EquirectangularReflectionMapping, Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneGeometry, Renderer, Scene, SRGBColorSpace, TextureLoader, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.scss';

let n_frames = 0;
let countedDelta = 0;
const clock = new Clock();

const updateFPS = () => {
    if (countedDelta < 1) {
        countedDelta = countedDelta + clock.getDelta();
        n_frames = n_frames + 1;
    } else {
        document.getElementById('fps').innerText = n_frames.toString();
        countedDelta = clock.getDelta() - Math.abs(1 - countedDelta);
        n_frames = 1;
    }
}

const loadBackgroundTexture = (scene: Scene) => {
    const loader = new TextureLoader();
    const texture = loader.load(
        'sky_water_landscape.jpg',
        () => {
            texture.mapping = EquirectangularReflectionMapping;
            texture.colorSpace = SRGBColorSpace;
            scene.background = texture;
        });
}

const main = () => {
    const canvas = document.getElementById('canvas');
    const renderer = new WebGLRenderer({ antialias: true, canvas });

    const camera = new PerspectiveCamera(75, 2, 0.1, 500);
    camera.position.z = 2;

    const threeScene = new Scene();

    loadBackgroundTexture(threeScene);

    // GaussianSplats3D.DropInViewer
    const viewer = new GaussianSplats3D.DropInViewer();
    viewer.addSplatScenes([{
        'path': 'bonsai.ply',
        'rotation': [1.0, 0.0, 0.0, 0.0],
        'position': [0, -2.0, 0]
    }]);
    threeScene.add(viewer);

    // BoxGeometry
    const geometry = new PlaneGeometry(15.0, 15.0, 15.0);
    geometry.translate(0, 0, -2.0);
    geometry.rotateX(-Math.PI / 2);
    const material = new MeshBasicMaterial({ color: 0x6a7d3d });
    const cube = new Mesh(geometry, material);
    threeScene.add(cube);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    const animate = () => {
        requestAnimationFrame(animate);

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        controls.update();
        renderer.render(threeScene, camera);

        updateFPS();
    };
    requestAnimationFrame(animate);
};

const resizeRendererToDisplaySize = (renderer: Renderer) => {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

document.addEventListener("DOMContentLoaded", main);