import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { gsap, prefersReducedMotion } from '../lib/lifecycle';

export function initHeroScene(root: HTMLElement): () => void {
	const canvas = root.querySelector<HTMLCanvasElement>('[data-hero-canvas]');
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
	// Leave headroom above the antenna so playNextReaction() jumps never clip at the top edge.
	camera.position.set(0, 1.65, 5.3);
	const lookTarget = new THREE.Vector3(0, 1.38, 0);
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
	let headAimPivot: THREE.Group | null = null;
	let headPivot: THREE.Group | null = null;
	let antennaPivot: THREE.Group | null = null;
	let leftArmPivot: THREE.Group | null = null;
	let rightArmPivot: THREE.Group | null = null;

	// Re-parent a node under a pivot at its original transform so GSAP can
	// animate it around its own origin without touching the glb hierarchy.
	// Pass worldAligned=true when the node's local axes are rotated in the GLB
	// but animations should happen in world-aligned parent axes.
	function wrapInPivot(node: THREE.Object3D, worldAligned = false): THREE.Group {
		const parent = node.parent!;
		const g = new THREE.Group();
		g.position.copy(node.position);
		if (!worldAligned) {
			g.quaternion.copy(node.quaternion);
			g.scale.copy(node.scale);
			node.quaternion.identity();
			node.scale.set(1, 1, 1);
		}
		parent.add(g);
		g.add(node);
		node.position.set(0, 0, 0);
		return g;
	}

	const dracoLoader = new DRACOLoader();
	dracoLoader.setDecoderPath('/draco/');
	const gltfLoader = new GLTFLoader();
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
			if (head) {
				// World-aligned outer pivot for cursor tracking so playCheer() on headPivot stays independent.
				headAimPivot = new THREE.Group();
				headAimPivot.rotation.order = 'YXZ';
				headAimPivot.position.copy(head.position);
				head.parent!.add(headAimPivot);
				headAimPivot.add(head);
				head.position.set(0, 0, 0);
				headPivot = wrapInPivot(head);
			}
			const antenna = model.getObjectByName('Antenna');
			if (antenna) antennaPivot = wrapInPivot(antenna);
			const leftArm = model.getObjectByName('LeftArm');
			if (leftArm) leftArmPivot = wrapInPivot(leftArm, true);
			const rightArm = model.getObjectByName('RightArm');
			if (rightArm) rightArmPivot = wrapInPivot(rightArm, true);

			modelLoaded = true;

			if (!reducedMotion) {
				gsap.fromTo(
					camera.position,
					{ x: 0.7, y: 2.0, z: 5.5 },
					{
						x: 0,
						y: 1.65,
						z: 5.3,
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

	// Cursor look direction (-1..1) that the robot's head turns toward.
	let lookX = 0;
	let lookY = 0;
	let lookTargetX = 0;
	let lookTargetY = 0;

	const raycaster = new THREE.Raycaster();
	const pointer = new THREE.Vector2();

	function hitRobot(e: PointerEvent): boolean {
		if (!modelRoot) return false;
		const rect = canvas!.getBoundingClientRect();
		if (!rect.width || !rect.height) return false;
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
			playNextReaction();
		}
	}

	let nextReaction = 0;

	function playNextReaction() {
		if (reducedMotion || !modelLoaded) return;

		const targets = [
			bounce.position,
			bounce.scale,
			bounce.rotation,
			headPivot?.rotation,
			antennaPivot?.rotation,
			leftArmPivot?.rotation,
			rightArmPivot?.rotation,
		].filter(Boolean);
		gsap.killTweensOf(targets);

		// Normalize spin angle so interrupting a twirl takes the shortest path back to front.
		bounce.rotation.y = ((bounce.rotation.y + Math.PI) % (Math.PI * 2)) - Math.PI;
		if (bounce.rotation.y < -Math.PI) bounce.rotation.y += Math.PI * 2;

		const tl = gsap.timeline();

		const reactions: Array<() => void> = [
			// 0: Berputar — joyful double-spin with arms out and a cute ta-da head tilt
			() => {
				tl.to(bounce.scale, { x: 1.09, y: 0.89, z: 1.09, duration: 0.1, ease: 'power2.out' }, 0)
					.to(bounce.scale, { x: 0.96, y: 1.06, z: 0.96, duration: 0.15, ease: 'power2.out' }, 0.1)
					.to(bounce.rotation, { x: 0, z: 0, duration: 0.14 }, 0)
					.to(bounce.position, { y: 0.22, duration: 0.28, ease: 'power2.out' }, 0.08)
					.to(bounce.rotation, { y: Math.PI * 4, duration: 0.94, ease: 'power2.inOut' }, 0.08)
					.to(bounce.position, { y: 0, duration: 0.34, ease: 'bounce.out' }, 0.7)
					.to(bounce.scale, { x: 1, y: 1, z: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' }, 0.7)
					.set(bounce.rotation, { y: 0 }, 1.03);

				if (leftArmPivot) {
					tl.to(leftArmPivot.rotation, { z: -1.45, x: 0.1, duration: 0.2, ease: 'back.out(1.6)' }, 0.08)
						.to(leftArmPivot.rotation, { z: 0, x: 0, duration: 0.32, ease: 'power2.inOut' }, 0.78);
				}
				if (rightArmPivot) {
					tl.to(rightArmPivot.rotation, { z: 1.45, x: 0.1, duration: 0.2, ease: 'back.out(1.6)' }, 0.08)
						.to(rightArmPivot.rotation, { z: 0, x: 0, duration: 0.32, ease: 'power2.inOut' }, 0.78);
				}
				if (headPivot) {
					tl.to(headPivot.rotation, { z: 0, duration: 0.14 }, 0)
						.to(headPivot.rotation, { z: 0.18, duration: 0.16, ease: 'power2.out' }, 0.92)
						.to(headPivot.rotation, { z: 0, duration: 0.24, ease: 'power2.inOut' }, 1.08);
				}
				if (antennaPivot) {
					tl.to(
						antennaPivot.rotation,
						{ z: -0.48, duration: 0.1, yoyo: true, repeat: 5, ease: 'sine.inOut' },
						0.1,
					).to(antennaPivot.rotation, { z: 0, duration: 0.14, ease: 'power2.out' });
				}
			},

			// 1: Menyapa — cute tilt, tiny happy hop, and friendly wave
			() => {
				tl.to(bounce.rotation, { x: 0, y: 0, z: -0.08, duration: 0.2, ease: 'power2.out' }, 0)
					.to(bounce.scale, { x: 1.07, y: 0.91, z: 1.07, duration: 0.09, ease: 'power2.out' }, 0)
					.to(bounce.scale, { x: 0.97, y: 1.05, z: 0.97, duration: 0.14, ease: 'power2.out' }, 0.09)
					.to(bounce.position, { y: 0.1, duration: 0.16, ease: 'power2.out' }, 0.09)
					.to(bounce.position, { y: 0, duration: 0.26, ease: 'bounce.out' }, 0.25)
					.to(bounce.scale, { x: 1, y: 1, z: 1, duration: 0.25, ease: 'power2.out' }, 0.25)
					.to(bounce.rotation, { z: 0, duration: 0.32, ease: 'power2.inOut' }, 0.85);

				if (rightArmPivot) {
					tl.to(rightArmPivot.rotation, { z: 2.25, x: 0.15, duration: 0.22, ease: 'back.out(1.7)' }, 0.06)
						.to(rightArmPivot.rotation, { z: 1.75, duration: 0.13, yoyo: true, repeat: 4, ease: 'sine.inOut' }, 0.28)
						.to(rightArmPivot.rotation, { z: 0, x: 0, duration: 0.32, ease: 'power2.inOut' }, 0.96);
				}
				if (leftArmPivot) {
					tl.to(leftArmPivot.rotation, { z: -0.55, x: -0.15, duration: 0.22, ease: 'power2.out' }, 0.06)
						.to(leftArmPivot.rotation, { z: 0, x: 0, duration: 0.3, ease: 'power2.inOut' }, 0.85);
				}
				if (headPivot) {
					tl.to(headPivot.rotation, { z: 0.2, duration: 0.18, ease: 'power2.out' }, 0.06)
						.to(headPivot.rotation, { z: -0.14, duration: 0.24, ease: 'sine.inOut' }, 0.36)
						.to(headPivot.rotation, { z: 0, duration: 0.28, ease: 'power2.inOut' }, 0.85);
				}
				if (antennaPivot) {
					tl.to(
						antennaPivot.rotation,
						{ z: -0.5, duration: 0.1, yoyo: true, repeat: 5, ease: 'sine.inOut' },
						0.08,
					).to(antennaPivot.rotation, { z: 0, duration: 0.14, ease: 'power2.out' });
				}
			},

			// 2: Melompat — bouncy squash-and-stretch jump with both hands raised high in cheer
			() => {
				tl.to(bounce.rotation, { x: 0, y: 0, z: 0, duration: 0.14, ease: 'power2.out' }, 0)
					.to(bounce.scale, { x: 1.15, y: 0.82, z: 1.15, duration: 0.11, ease: 'power2.out' }, 0)
					.to(bounce.scale, { x: 0.93, y: 1.12, z: 0.93, duration: 0.16, ease: 'power2.out' }, 0.11)
					.to(bounce.position, { y: 0.3, duration: 0.25, ease: 'power2.out' }, 0.11)
					.to(bounce.position, { y: 0, duration: 0.44, ease: 'bounce.out' }, 0.36)
					.to(bounce.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: 'elastic.out(1, 0.45)' }, 0.36);

				if (leftArmPivot) {
					tl.to(leftArmPivot.rotation, { z: -2.2, x: 0.15, duration: 0.2, ease: 'back.out(1.8)' }, 0.1)
						.to(leftArmPivot.rotation, { z: 0, x: 0, duration: 0.34, ease: 'power2.inOut' }, 0.56);
				}
				if (rightArmPivot) {
					tl.to(rightArmPivot.rotation, { z: 2.2, x: 0.15, duration: 0.2, ease: 'back.out(1.8)' }, 0.1)
						.to(rightArmPivot.rotation, { z: 0, x: 0, duration: 0.34, ease: 'power2.inOut' }, 0.56);
				}
				if (headPivot) {
					tl.to(headPivot.rotation, { z: 0.22, duration: 0.14, ease: 'power2.out' }, 0.08)
						.to(headPivot.rotation, { z: -0.18, duration: 0.16, ease: 'sine.inOut' }, 0.24)
						.to(headPivot.rotation, { z: 0, duration: 0.24, ease: 'power2.out' }, 0.44);
				}
				if (antennaPivot) {
					tl.to(
						antennaPivot.rotation,
						{ z: -0.5, duration: 0.1, yoyo: true, repeat: 5, ease: 'sine.inOut' },
						0.08,
					).to(antennaPivot.rotation, { z: 0, duration: 0.14, ease: 'power2.out' });
				}
			},
		];

		reactions[nextReaction]();
		nextReaction = (nextReaction + 1) % reactions.length;
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

		if (!isDragging) {
			dragOffsetY *= 0.94;
		}

		lookX += (lookTargetX - lookX) * 0.08;
		lookY += (lookTargetY - lookY) * 0.08;

		pivot.rotation.y += (dragOffsetY - pivot.rotation.y) * 0.08;

		if (headAimPivot) {
			headAimPivot.rotation.y += (lookX * 0.5 - headAimPivot.rotation.y) * 0.08;
			headAimPivot.rotation.x += (-lookY * 0.2 - headAimPivot.rotation.x) * 0.08;
		}

		renderer.render(scene, camera);
	}

	if (!reducedMotion) {
		animate();
	}

	return () => {
		disposed = true;
		if (rafId) cancelAnimationFrame(rafId);
		io.disconnect();
		window.removeEventListener('resize', resize);
		canvas.removeEventListener('pointermove', onPointerMove);
		canvas.removeEventListener('pointerdown', onPointerDown);
		window.removeEventListener('pointerup', onPointerUp);
		gsap.killTweensOf([
			camera.position,
			bounce.position,
			bounce.scale,
			bounce.rotation,
			headPivot?.rotation,
			antennaPivot?.rotation,
			leftArmPivot?.rotation,
			rightArmPivot?.rotation,
		].filter(Boolean));
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
