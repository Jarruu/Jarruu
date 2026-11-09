import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { gsap, prefersReducedMotion } from '../lib/lifecycle';

export function initHeroScene(root: HTMLElement): () => void {
	const canvas = root.querySelector<HTMLCanvasElement>('[data-hero-canvas]');
	const statusEl = root.querySelector<HTMLElement>('[data-hero-status]');
	const percentEl = root.querySelector<HTMLElement>('[data-hero-percent]');
	const fallbackEl = root.querySelector<HTMLElement>('[data-hero-fallback]');

	if (!canvas) return () => {};

	let renderer: THREE.WebGLRenderer;
	try {
		renderer = new THREE.WebGLRenderer({
			canvas,
			alpha: true,
			antialias: true,
			powerPreference: 'high-performance',
		});
	} catch {
		if (statusEl) statusEl.hidden = true;
		if (fallbackEl) fallbackEl.hidden = false;
		return () => {};
	}

	const reducedMotion = prefersReducedMotion();
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1.1;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	const scene = new THREE.Scene();
	const pmrem = new THREE.PMREMGenerator(renderer);
	const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
	scene.environment = envTexture;

	const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
	camera.position.set(0, 1.55, 4.0);
	const lookTarget = new THREE.Vector3(0, 1.15, 0);
	camera.lookAt(lookTarget);

	const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
	keyLight.position.set(3.5, 5.2, 4.0);
	keyLight.castShadow = true;
	keyLight.shadow.mapSize.set(1024, 1024);
	keyLight.shadow.bias = -0.0005;
	scene.add(keyLight);

	const shadowPlane = new THREE.Mesh(
		new THREE.PlaneGeometry(10, 10),
		new THREE.ShadowMaterial({ opacity: 0.18 }),
	);
	shadowPlane.rotation.x = -Math.PI / 2;
	shadowPlane.position.y = 0;
	shadowPlane.receiveShadow = true;
	scene.add(shadowPlane);

	const pivot = new THREE.Group();
	scene.add(pivot);
	const bounce = new THREE.Group();
	pivot.add(bounce);

	let modelRoot: THREE.Object3D | null = null;
	let headPivot: THREE.Group | null = null;
	let antennaPivot: THREE.Group | null = null;
	let leftArmPivot: THREE.Group | null = null;
	let rightArmPivot: THREE.Group | null = null;

	// Re-parent a node under a pivot at its original transform so GSAP can
	// animate it around its own origin without touching the glb hierarchy.
	function wrapInPivot(node: THREE.Object3D): THREE.Group {
		const parent = node.parent!;
		const g = new THREE.Group();
		g.position.copy(node.position);
		g.quaternion.copy(node.quaternion);
		g.scale.copy(node.scale);
		parent.add(g);
		g.add(node);
		node.position.set(0, 0, 0);
		node.quaternion.identity();
		node.scale.set(1, 1, 1);
		return g;
	}

	const manager = new THREE.LoadingManager();
	manager.onProgress = (_url, loaded, total) => {
		if (percentEl && total > 0) {
			percentEl.textContent = `${Math.min(100, Math.round((loaded / total) * 100))}%`;
		}
	};

	const dracoLoader = new DRACOLoader(manager);
	dracoLoader.setDecoderPath('/draco/');
	const gltfLoader = new GLTFLoader(manager);
	gltfLoader.setDRACOLoader(dracoLoader);

	let disposed = false;
	let modelLoaded = false;

	gltfLoader.load(
		'/ai_robot.glb',
		(gltf) => {
			if (disposed) return;
			const model = gltf.scene;
			const box = new THREE.Box3().setFromObject(model);
			const center = box.getCenter(new THREE.Vector3());
			const size = box.getSize(new THREE.Vector3());
			const scale = 2.3 / size.y;

			model.scale.setScalar(scale);
			// Center on X/Z, rest its feet on the shadow plane.
			model.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);

			model.traverse((obj) => {
				if ((obj as THREE.Mesh).isMesh) {
					const mesh = obj as THREE.Mesh;
					mesh.castShadow = true;
					mesh.receiveShadow = true;
				}
			});

			bounce.add(model);
			modelRoot = model;

			const head = model.getObjectByName('Head');
			if (head) headPivot = wrapInPivot(head);
			const antenna = model.getObjectByName('Antenna');
			if (antenna) antennaPivot = wrapInPivot(antenna);
			const leftArm = model.getObjectByName('LeftArm');
			if (leftArm) leftArmPivot = wrapInPivot(leftArm);
			const rightArm = model.getObjectByName('RightArm');
			if (rightArm) rightArmPivot = wrapInPivot(rightArm);

			modelLoaded = true;
			if (statusEl) statusEl.hidden = true;

			if (!reducedMotion) {
				gsap.fromTo(
					camera.position,
					{ x: 0.6, y: 1.85, z: 4.15 },
					{
						x: 0,
						y: 1.55,
						z: 4.0,
						duration: 1.35,
						ease: 'power3.out',
						onUpdate: () => camera.lookAt(lookTarget),
					},
				);
			} else {
				renderer.render(scene, camera);
			}
		},
		undefined,
		() => {
			if (statusEl) statusEl.hidden = true;
			if (fallbackEl) fallbackEl.hidden = false;
		},
	);

	function resize() {
		const rect = canvas!.getBoundingClientRect();
		const width = Math.max(1, rect.width);
		const height = Math.max(1, rect.height);
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		renderer.setSize(width, height, false);
		if (reducedMotion && modelLoaded) {
			renderer.render(scene, camera);
		}
	}

	resize();
	window.addEventListener('resize', resize);

	let dragOffsetY = 0;
	let isDragging = false;
	let dragStartX = 0;
	let pointerDownX = 0;
	let pointerDownY = 0;

	// Cursor look direction (-1..1) that the whole body turns toward.
	let lookX = 0;
	let lookY = 0;
	let lookTargetX = 0;
	let lookTargetY = 0;

	const raycaster = new THREE.Raycaster();
	const pointer = new THREE.Vector2();

	function hitRobot(e: PointerEvent): boolean {
		if (!modelRoot) return false;
		const rect = canvas!.getBoundingClientRect();
		pointer.set(
			((e.clientX - rect.left) / rect.width) * 2 - 1,
			-((e.clientY - rect.top) / rect.height) * 2 + 1,
		);
		raycaster.setFromCamera(pointer, camera);
		return raycaster.intersectObject(modelRoot, true).length > 0;
	}

	function onPointerMove(e: PointerEvent) {
		if (!reducedMotion) {
			const rect = canvas!.getBoundingClientRect();
			lookTargetX = THREE.MathUtils.clamp(((e.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
			lookTargetY = THREE.MathUtils.clamp(-((e.clientY - rect.top) / rect.height) * 2 + 1, -1, 1);
		}

		if (isDragging) {
			const deltaX = e.clientX - dragStartX;
			dragStartX = e.clientX;
			dragOffsetY = THREE.MathUtils.clamp(dragOffsetY + deltaX * 0.008, -0.75, 0.75);
			return;
		}

		canvas!.style.cursor = hitRobot(e) ? 'pointer' : 'grab';
	}

	function onPointerDown(e: PointerEvent) {
		pointerDownX = e.clientX;
		pointerDownY = e.clientY;
		if (e.pointerType === 'touch') return;
		isDragging = true;
		dragStartX = e.clientX;
		canvas!.style.cursor = 'grabbing';
	}

	function onPointerUp(e: PointerEvent) {
		const wasDragging = isDragging;
		isDragging = false;
		canvas!.style.cursor = hitRobot(e) ? 'pointer' : 'grab';
		const moved = Math.hypot(e.clientX - pointerDownX, e.clientY - pointerDownY);
		if ((!wasDragging || moved < 5) && hitRobot(e)) {
			playCheer();
		}
	}

	function playCheer() {
		if (reducedMotion || !modelLoaded) return;
		gsap.killTweensOf([
			bounce.position,
			bounce.scale,
			headPivot?.rotation,
			antennaPivot?.rotation,
			leftArmPivot?.rotation,
			rightArmPivot?.rotation,
		].filter(Boolean));
		const tl = gsap.timeline();
		tl.to(bounce.scale, { x: 1.12, y: 0.86, z: 1.12, duration: 0.12, ease: 'power2.out' })
			.to(bounce.scale, { x: 0.95, y: 1.1, z: 0.95, duration: 0.16, ease: 'power2.out' }, '<')
			.to(bounce.position, { y: 0.32, duration: 0.24, ease: 'power2.out' }, '<')
			.to(bounce.position, { y: 0, duration: 0.45, ease: 'bounce.out' })
			.to(bounce.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: 'elastic.out(1, 0.45)' }, '<');

		if (headPivot) {
			tl.to(headPivot.rotation, { z: 0.22, duration: 0.12, ease: 'power2.out' }, 0)
				.to(headPivot.rotation, { z: -0.16, duration: 0.14 }, 0.12)
				.to(headPivot.rotation, { z: 0, duration: 0.24, ease: 'power2.out' }, 0.26);
		}
		if (antennaPivot) {
			tl.to(
				antennaPivot.rotation,
				{ z: -0.45, duration: 0.12, yoyo: true, repeat: 3, ease: 'sine.inOut' },
				0.05,
			);
		}
		if (leftArmPivot) {
			tl.to(leftArmPivot.rotation, { z: 0.7, duration: 0.14, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0);
		}
		if (rightArmPivot) {
			tl.to(rightArmPivot.rotation, { z: -0.7, duration: 0.14, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0);
		}
	}

	canvas.addEventListener('pointermove', onPointerMove);
	canvas.addEventListener('pointerdown', onPointerDown);
	window.addEventListener('pointerup', onPointerUp);

	const io = new IntersectionObserver(
		(entries) => {
			inView = entries[0]?.isIntersecting ?? true;
		},
		{ threshold: 0.05 },
	);
	io.observe(root);

	let inView = true;
	let rafId = 0;

	function animate() {
		rafId = requestAnimationFrame(animate);
		if (!inView || document.hidden) return;
		if (reducedMotion && modelLoaded) {
			renderer.render(scene, camera);
			return;
		}

		if (!isDragging) {
			dragOffsetY *= 0.94;
		}

		lookX += (lookTargetX - lookX) * 0.08;
		lookY += (lookTargetY - lookY) * 0.08;

		pivot.rotation.y += (dragOffsetY + lookX * 0.5 - pivot.rotation.y) * 0.08;
		pivot.rotation.x += (-lookY * 0.16 - pivot.rotation.x) * 0.08;

		renderer.render(scene, camera);
	}

	animate();

	return () => {
		disposed = true;
		cancelAnimationFrame(rafId);
		io.disconnect();
		window.removeEventListener('resize', resize);
		canvas.removeEventListener('pointermove', onPointerMove);
		canvas.removeEventListener('pointerdown', onPointerDown);
		window.removeEventListener('pointerup', onPointerUp);
		gsap.killTweensOf([bounce.position, bounce.scale]);
		dracoLoader.dispose();
		envTexture.dispose();
		pmrem.dispose();
		scene.traverse((obj) => {
			if ((obj as THREE.Mesh).isMesh) {
				const mesh = obj as THREE.Mesh;
				mesh.geometry?.dispose();
				if (Array.isArray(mesh.material)) {
					mesh.material.forEach((m) => m.dispose());
				} else {
					mesh.material?.dispose();
				}
			}
		});
		renderer.dispose();
	};
}
