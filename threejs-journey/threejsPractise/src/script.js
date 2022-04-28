import './style.css';
import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();

/**
 * Objects - Тут ми розглядааэмо як об'єднати наші меші в группу і потім цю групу рухати в сцені
 */
// const group = new THREE.Group()
// group.scale.y = 2
// group.rotation.y = 0.2
// scene.add(group)

// const cube1 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0xff0000 })
// )
// cube1.position.x = - 1.5
// group.add(cube1)

// const cube2 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0xff0000 })
// )
// cube2.position.x = 0
// group.add(cube2)

// const cube3 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0xff0000 })
// )
// cube3.position.x = 1.5
// group.add(cube3)

// Red cube
// Геометрія куба
const geometry = new THREE.BoxGeometry(1, 1, 1);
// Його матеріал
const material = new THREE.MeshBasicMaterial({ color: '#ff0000' });
// Ініціалізація самого меша
const mesh = new THREE.Mesh(geometry, material);

// Scale, Position, Rotation - це як констагти які ми вказуємо для нашого меша
// Position
/* Якщо я хочу змінити позиціонування меша в нашому випадку куба я використовую метод позиціонуванння
Потрібно врахувати що наші осі не такі як в блендері в threejs (z - до або від себе, x - в право або на ліво, y - в верх або в низ)
використання цих параметрів можливе в будь-якому місці але тільки не після рендеру
position - Vector3
*/
// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1
// Короткий запис
// mesh.position.set(0.7, -0.6, 1);

// Scale
// mesh.scale.x = 2;
// mesh.scale.y = 0.5;
// mesh.scale.z = 0.5;
// Короткий запис
// mesh.scale.set(2, 0.5, 0.5);

// Rotation
// При повороті меша наш поворот змінює напрям осей разом з мешем
// Що б виправити це ми можемо переназначити їх і що б це працювало потрібно це робити до змін
// mesh.rotation.reorder('YXZ');
// mesh.rotation.x = 0;
// mesh.rotation.y = 3.14159; Що б не писати число П руками ми користуємось методом
// mesh.rotation.y = Math.PI;
// Це число П і воно буде дорівнювати ідельному повороту меша, тобто щоб розвернути меш на 360 нам потрібно П * 0.5 = 360

// mesh.rotation.z = 0;

// Тут ми получаємо значення вектора відносно центра сцени
// console.log(mesh.position.length());
// Якщо нам потрібно обрізати зайву довжину вектора ми можемо скористатись таким записом
// mesh.position.normalize()

// Додаємо меш з геометрією і його матеріали в нашу сцену
scene.add(mesh);

// Axes Helper - візуалізація наших осей
// const axesHelper = new THREE.AxesHelper();
// Якщо передати число воно збільшить даний об'єкт в сцені
// Цей візуалізатор являється об'єктом в сцені тому його потрібно додати
// scene.add(axesHelper);

// Sizes (Співвідношення сторін)
const sizes = {
	width: 800,
	height: 600,
};

// Camera
/* В ній ми приймаємо 2 параметри: 
	1) Це ширина огляду по вертикалі(fov).
	2) Співвідношення сторін
	
*/
// Perspective Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// Зсуваємо камеру на нас
// ThreeJs осі виглядають так Y - вверх, Х - на право і Z - йде на нас.
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 2;

// Щоб дізнатись відстань між моделькою(мешем) ми пишемо так
// console.log(mesh.position.distanceTo(camera.position));

scene.add(camera);
// ЩОб камера не дивилась на центр сцени ми може моказати що б вона дивилась на щось на приклад на меш
// camera.lookAt(new THREE.Vector3(0, -1, 0));
// camera.lookAt(mesh.position);

// Renderer
// Canvas - тут ми присвоюємо наш канвас на html сторінці
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});

// Зміеюємо розмір вікна рендера вони будуть задані в canvas
renderer.setSize(sizes.width, sizes.height);

// Анімація
// ---------Спосіб 1
// Time
// let time = Date.now()
// // Animations - Дана функція викликається кожен фрейм
// const tick = () => {

// 	// Time - Тут і час вище потрібно використовувати в парі.
// 	// Для того щоб на різних герцовках швидкість анімації була одинакова використовуємо дельту
// 	const currentTime = Date.now()
// 	const deltaTime = currentTime - time
// 	time = currentTime

// 	// Update objects
// 	mesh.rotation.y += 0.002 * deltaTime
// 	// Тепер рендеремо сцену і камеру і получаємо чорний екран бо немає освітлення
// 	renderer.render(scene, camera);

// 	window.requestAnimationFrame(tick)
// }
// tick()
// ------- Спосіб 2
// Animations - Дана функція викликається кожен фрейм
// Clock
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update objects
	// mesh.rotation.y = elapsedTime;
	// Поворот кубика в 2 рази скоріше
	// mesh.rotation.y = elapsedTime * Math.PI * 2;
	// Робимо зациклення руху
	// mesh.position.y = Math.sin(elapsedTime)
	// mesh.position.x = Math.cos(elapsedTime)
	// camera.position.y = Math.sin(elapsedTime);
	// camera.position.x = Math.cos(elapsedTime);
	camera.lookAt(mesh.position);

	// Тепер рендеремо сцену і камеру і получаємо чорний екран бо немає освітлення
	renderer.render(scene, camera);

	window.requestAnimationFrame(tick);
};

tick();
