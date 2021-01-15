function block() {
    let model;
    let mixer = null;
    let i = 0, can = 1;
    let clock = new THREE.Clock();
    const canvas = document.querySelector('#bl');
    const renderer = new THREE.WebGLRenderer({ // Рендерит на холст все что укажут
      canvas,
    });

    const fov = 75; // Поле зрения 75 градусов(глубина) / Размер сцены, которая видна на дисплее в любой момент времени
    const aspect = 2;  // Соотношение сторон холста (значение для canvas по умолчанию)
    const near = 0.1; // Пространство перед камерой
    const far = 500; // Все за пределами этих значений не будет показано
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 3; // Чуть отодвинуть камеру чтобы увидеть объект
    camera.position.y = 0;
    camera.rotation.x = 0;

    const scene = new THREE.Scene(); // Создаем сцену

    scene.background = new THREE.Color(0xFFFFFF);
    const color = 0xFFFFFF;
    const intensity = 1.7;
    const penumbra = 1; // 0 - края острые, 1 - размытые
    const light = new THREE.SpotLight(color, intensity); // Прожектор, свет только внутри конуса
    light.position.set(0, 0, 100);
    light.target.position.set(0, 0, 0);
    scene.add(light);
    scene.add(light.target);

    function loadScene() {
        var load = new THREE.GLTFLoader();

        load.load('content/3d/block.gltf',
            function(gltf) {
                model = gltf.scene;
                mixer = new THREE.AnimationMixer(model);

                scene.add(model);

                animate();
            },
            function(xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function(error) {
                console.log('An error happened');
            });
    }
    loadScene();

    function animate() {
        let dt = clock.getDelta();
        mixer.update(dt);
        renderer.render(scene, camera);
    }

    $('#bl').mousemove(function(event) {
        model.getObjectByName("Plane").scale.set(0,0,0);
        let pos = $(this).offset();
        let elem_left = pos.left.toFixed(0);
    	let elem_top = pos.top.toFixed(0);
    	blockX = event.pageX - elem_left;
    	blockY = event.pageY - elem_top;

        model.rotation.y = blockX / 400;
        model.rotation.x = blockY / 200;
        //model.position.x = (blockX - screen.width / 2) / screen.width - 100;
        model.updateMatrix();
        animate();

    });

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth; // Ширина окна браузера
        const height = canvas.clientHeight; // Высота окна браузера
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false); // Изменение внутреннего размера холста(буфер рисования холста)
        }
        return needResize;
    }

    function render(time) { // time - время с момента загрузки нашей страницы
        // Избегаем пиксельности и исправляем проблему с растяжением(правильное разрешения для любого размера окна!)
        requestAnimationFrame(render);
        if (resizeRendererToDisplaySize(renderer)) { // Функция проверки на размер холста(размер браузерного окна)
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight; // Устанавливаем правильное соотношение сторон
            camera.updateProjectionMatrix();
        }
    }
    render();
}
block();
