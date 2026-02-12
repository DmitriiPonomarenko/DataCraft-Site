import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function MinecraftBlock({ className = '', size = 80 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.set(0, 0, 2.5);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const materials = [
      new THREE.MeshLambertMaterial({ color: 0x5b8c5a }), // right - green
      new THREE.MeshLambertMaterial({ color: 0x5b8c5a }),
      new THREE.MeshLambertMaterial({ color: 0x6b8e6b }), // top
      new THREE.MeshLambertMaterial({ color: 0x4a7c4a }), // bottom
      new THREE.MeshLambertMaterial({ color: 0x5b8c5a }),
      new THREE.MeshLambertMaterial({ color: 0x5b8c5a }),
    ];
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(2, 2, 2);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    let frameId;
    function animate() {
      frameId = requestAnimationFrame(animate);
      cube.rotation.y += 0.008;
      cube.rotation.x += 0.004;
      renderer.render(scene, camera);
    }
    animate();

    const handleResize = () => {
      const w = container.offsetWidth || size;
      const h = container.offsetHeight || size;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      geometry.dispose();
      materials.forEach((m) => m.dispose());
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [size]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      aria-hidden="true"
    />
  );
}
