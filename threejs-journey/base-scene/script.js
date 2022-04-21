// Scene
const scene = new THREE.Scene();

// Red cube
// Геометрія куба
const geometry = new THREE.BoxGeometry(1, 1, 1);
// Його матеріал
const material = new THREE.MeshBasicMaterial({ color: '#ff0000' });
// Ініціалізація самого меша
const mesh = new THREE.Mesh(geometry, material)
// Додаємо меш з геометрією і його матеріали в нашу сцену
scene.add(mesh);

// Sizes (Співвідношення сторін)
const sizes = {
	width: 800,
	height: 600
}

// Camera 
/* В ній ми приймаємо 2 параметри: 
	1) Це ширина огляду по вертикалі(fov).
	2) Співвідношення сторін
	
*/
//
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// Зсуваємо камеру на нас
// ThreeJs осі виглядають так Y - вверх, Х - на право і Z - йде на нас.
camera.position.z = 3

scene.add(camera)

// Renderer 
// Canvas - тут ми присвоюємо наш канвас на html сторінці
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
	canvas: canvas
})

// Зміеюємо розмір вікна рендера вони будуть задані в canvas
renderer.setSize(sizes.width, sizes.height)

// Тепер рендеремо сцену і камеру і получаємо чорний екран бо немає освітлення
renderer.render(scene, camera)


