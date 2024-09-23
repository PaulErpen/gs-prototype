import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';
import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const main = () => {
    const canvas = document.getElementById('canvas');
    const renderer = new WebGLRenderer({antialias: true, canvas});

    const threeScene = new Scene();

    // GaussianSplats3D.DropInViewer
    const viewer = new GaussianSplats3D.DropInViewer({
        'gpuAcceleratedSort': true
    });
    viewer.addSplatScenes([{
            'path': 'bonsai.ply',
            'rotation': [0, -0.857, -0.514495, 6.123233995736766e-17],
            'position': [0, -2, -1.2]
        }
    ]);
    threeScene.add(viewer);

    // BoxGeometry
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({color: 0x00ff00});
    const cube = new Mesh(geometry, material);
    threeScene.add(cube);

    const camera = new PerspectiveCamera(75, 2, 0.1, 5);
    camera.position.z = 2;

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(threeScene, camera);
    };

    alert("HELLO");
};

main();