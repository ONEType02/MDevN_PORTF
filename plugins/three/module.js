function main() {
    let action = [];
    let model;
    let mixer = null;
    let i = 0, can = 1;
    let clock = new THREE.Clock();
    const canvas = document.querySelector('#bg');
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

    let dd = document.querySelector('.dd').getBoundingClientRect().top;
    const color = 0xFFFFFF;
    scene.background = new THREE.Color(0xFFFFFF);
    const intensity = dd / screen.height + 0.1;
    const penumbra = 1; // 0 - края острые, 1 - размытые
    const light = new THREE.SpotLight(color, intensity); // Прожектор, свет только внутри конуса
    light.position.set(0, 0, 100);
    light.target.position.set(0, 0, 0);
    scene.add(light);
    scene.add(light.target);

    function loadScene() {
        var loader = new THREE.GLTFLoader();

        loader.load('content/3d/sphere.gltf',
            function(gltf) {
                model = gltf.scene;

                mixer = new THREE.AnimationMixer(model);

                action[0] = mixer.clipAction(gltf.animations['0']);
                action[1] = mixer.clipAction(gltf.animations['1']);
                action[2] = mixer.clipAction(gltf.animations['2']);
                action[3] = mixer.clipAction(gltf.animations['3']);
                action[4] = mixer.clipAction(gltf.animations['4']);

                action[0].play();
                action[1].play();
                action[2].play();
                action[3].play();
                action[4].play();

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

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth; // Ширина окна браузера
        const height = canvas.clientHeight; // Высота окна браузера
        const needResize = canvas.width !== width || canvas.height !== height;
        if(needResize) {
            renderer.setSize(width, height, false); // Изменение внутреннего размера холста(буфер рисования холста)
        }
        return needResize;
    }

    function animate() {
        let dt = clock.getDelta();
        mixer.update(dt);
        renderer.render(scene, camera);
    }

    let fake = 1;
    function two() {
        if(index === 2 && fake) {
            animate();
            setTimeout(() => {
                two();
            }, 0);
        }
    }


    $(window).scroll(function(e) {
        if(index === 3) {
            model.getObjectByName("Plane").scale.set(0,0,0);
            scene.background = new THREE.Color(0x151515);
            light.intensity = 1.5;
            renderer.render(scene, camera);
            fake = 1;
            return 1;
        }
        if(index === 2) {
            i = 1;
            return 1;
        }

        dd = document.querySelector('.dd').getBoundingClientRect().top;
        let header = document.querySelector('.head').getBoundingClientRect().top;
        let calculate = dd / screen.height + 0.1;
        light.intensity = calculate;

        if(calculate < 0.2) {
            model.getObjectByName("Plane").scale.set(0,0,0);
            scene.background = new THREE.Color(0x151515);
            light.intensity = 1.5;

            model.scale.set(0.5, 0.5, 0.5);
        } else {
            model.getObjectByName("Plane").scale.set(20,20,20);
            scene.background = new THREE.Color(0xFFFFFF);

            model.scale.set(1, 1, 1);
        }

        fake = 1;
        if(index != 3) model.position.x = header / screen.height + 0.1;
        else model.position.x = -1.8;

        light.updateMatrix();

        if(screen.width <= 575) {
            renderer.render(scene, camera);
            return 1;
        }

        model.updateMatrix();

        animate();
    });

    window.addEventListener('wheel', function(e) {
        if(index === 2) {
            if(!i) {
                action[0].reset();
                action[1].reset();
                action[2].reset();
                action[3].reset();
                action[4].reset();
                two();
                i = 1;
                setTimeout(() => {
                    fake = 0;
                    i = 0;
                }, 2304);
            }
        }
        if(index === 3) {
            model.getObjectByName("Plane").scale.set(0,0,0);
            scene.background = new THREE.Color(0x151515);
            light.intensity = 1.5;
            renderer.render(scene, camera);
            fake = 1;
        }
    });

    $('.dd').mousemove(function(e) {
        if(index === 2) {
            if(!i) {
                action[0].reset();
                action[1].reset();
                action[2].reset();
                action[3].reset();
                action[4].reset();
                two();
                i = 1;
                setTimeout(() => {
                    fake = 0;
                    i = 0;
                }, 2304);
            }
        }
        if(index === 3) {
            model.getObjectByName("Plane").scale.set(0,0,0);
            scene.background = new THREE.Color(0x151515);
            light.intensity = 1.5;
            renderer.render(scene, camera);
            fake = 1;
        }
    });

    $('.head').mousemove(function(e) {
        scene.background = new THREE.Color(0xFFFFFF);
        light.intensity = dd / screen.height + 0.1;
        renderer.render(scene, camera);
    });

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
main();
