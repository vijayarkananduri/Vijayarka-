import { useEffect, useRef, useState } from 'react';
import { HeroArtwork } from './Artwork';

/** A small, art-directed page sculpture. The SVG remains visible until WebGL succeeds. */
export function HeroSculpture() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compactViewport = window.matchMedia('(max-width: 760px)');
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reducedMotion.matches || compactViewport.matches || saveData) return;

    try {
      if (!canvas.getContext('webgl2')) return;
    } catch {
      return;
    }

    let cancelled = false;
    let teardown: (() => void) | undefined;

    void import('three').then((THREE) => {
      if (cancelled) return;

      try {
        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: (window.devicePixelRatio || 1) <= 1.5,
          powerPreference: 'low-power',
          stencil: false,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.05;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-3, 3, 2, -2, 0.1, 30);
        camera.position.set(0, 0, 9);

        scene.add(new THREE.AmbientLight(0xffead0, 1.65));
        const keyLight = new THREE.DirectionalLight(0xfff0d9, 2.25);
        keyLight.position.set(-3, 4, 6);
        scene.add(keyLight);
        const edgeLight = new THREE.DirectionalLight(0xb96b43, 1.2);
        edgeLight.position.set(4, -2, 3);
        scene.add(edgeLight);

        const sculpture = new THREE.Group();
        scene.add(sculpture);

        const width = 3.75;
        const height = 2.58;
        const paperGeometry = new THREE.PlaneGeometry(width, height, 44, 30);
        const vertices = paperGeometry.attributes.position;
        for (let i = 0; i < vertices.count; i += 1) {
          const x = vertices.getX(i);
          const y = vertices.getY(i);
          const across = x / (width / 2);
          const fold = 0.18 * (1 - across * across);
          const softWave = 0.035 * Math.sin((y / height + 0.5) * Math.PI * 2) * (1 - Math.abs(across) * 0.25);
          vertices.setZ(i, fold + softWave);
        }
        paperGeometry.computeVertexNormals();
        const paper = new THREE.Mesh(
          paperGeometry,
          new THREE.MeshPhysicalMaterial({
            color: 0xe9ddc7,
            roughness: 0.68,
            metalness: 0.015,
            clearcoat: 0.12,
            clearcoatRoughness: 0.72,
            transparent: true,
            opacity: 0.14,
            depthWrite: false,
            side: THREE.DoubleSide,
          }),
        );
        sculpture.add(paper);

        const curve = (points: Array<[number, number, number]>, color: number, radius: number, metalness = 0.08) => {
          const path = new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
          const geometry = new THREE.TubeGeometry(path, 56, radius, 7, false);
          const material = new THREE.MeshStandardMaterial({ color, roughness: 0.48, metalness });
          const line = new THREE.Mesh(geometry, material);
          sculpture.add(line);
          return line;
        };

        // A single brass orbit gives the folded sheet depth without turning the hero into a particle scene.
        const orbit = new THREE.Mesh(
          new THREE.TorusGeometry(2.13, 0.012, 7, 128),
          new THREE.MeshStandardMaterial({ color: 0x9d6242, roughness: 0.4, metalness: 0.52 }),
        );
        orbit.rotation.set(0.76, -0.38, -0.24);
        orbit.position.z = -0.3;
        sculpture.add(orbit);

        // Sparse ink strokes sit just above the paper surface, like an editor's mark rather than UI decoration.
        curve([[-1.35, -0.43, 0.14], [-0.82, -0.26, 0.21], [-0.28, -0.43, 0.24], [0.2, -0.19, 0.24], [0.78, -0.28, 0.2], [1.34, 0.13, 0.13]], 0xa65332, 0.018, 0.12);
        curve([[-1.15, 0.36, 0.14], [-0.72, 0.23, 0.2], [-0.31, 0.29, 0.23]], 0x766650, 0.009, 0.02);
        curve([[0.27, 0.48, 0.22], [0.73, 0.38, 0.2], [1.15, 0.49, 0.15]], 0x766650, 0.009, 0.02);
        curve([[0, -1.13, 0.11], [0, -0.62, 0.19], [0, 0, 0.18], [0, 0.63, 0.19], [0, 1.13, 0.11]], 0xb78058, 0.012, 0.3);

        sculpture.rotation.set(-0.12, -0.1, 0.04);
        sculpture.scale.setScalar(1.02);

        const resize = () => {
          const rect = host.getBoundingClientRect();
          if (!rect.width || !rect.height) return;
          const halfHeight = 2.15;
          const halfWidth = halfHeight * (rect.width / rect.height);
          camera.left = -halfWidth;
          camera.right = halfWidth;
          camera.top = halfHeight;
          camera.bottom = -halfHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(rect.width, rect.height, false);
        };
        resize();

        let frame = 0;
        let lastPaint = 0;
        let inView = true;
        let targetX = -0.12;
        let targetY = -0.1;
        const draw = (now: number) => {
          frame = 0;
          if (cancelled || !inView || document.hidden) return;
          if (now - lastPaint >= 32) {
            const t = now * 0.001;
            sculpture.position.y = Math.sin(t * 0.52) * 0.055;
            sculpture.rotation.x += (targetX - sculpture.rotation.x) * 0.035;
            sculpture.rotation.y += (targetY + Math.sin(t * 0.22) * 0.035 - sculpture.rotation.y) * 0.025;
            renderer.render(scene, camera);
            lastPaint = now;
            setReady(true);
          }
          frame = window.requestAnimationFrame(draw);
        };
        const start = () => { if (!frame && inView && !document.hidden) frame = window.requestAnimationFrame(draw); };
        const pause = () => { if (frame) window.cancelAnimationFrame(frame); frame = 0; };
        const observer = 'IntersectionObserver' in window
          ? new IntersectionObserver((entries) => {
              inView = entries[0]?.isIntersecting ?? true;
              if (inView) start(); else pause();
            }, { rootMargin: '120px' })
          : undefined;
        observer?.observe(host);

        const hero = host.closest('.home-hero');
        const onPointerMove = (event: Event) => {
          const pointer = event as PointerEvent;
          if (pointer.pointerType !== 'mouse' || !hero) return;
          const rect = hero.getBoundingClientRect();
          targetY = -0.1 + ((pointer.clientX - rect.left) / rect.width - 0.5) * 0.18;
          targetX = -0.12 - ((pointer.clientY - rect.top) / rect.height - 0.5) * 0.12;
          start();
        };
        hero?.addEventListener('pointermove', onPointerMove, { passive: true });
        const onVisibility = () => { if (document.hidden) pause(); else start(); };
        document.addEventListener('visibilitychange', onVisibility);
        const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(resize) : undefined;
        resizeObserver?.observe(host);
        if (!resizeObserver) window.addEventListener('resize', resize, { passive: true });
        start();

        teardown = () => {
          pause();
          observer?.disconnect();
          resizeObserver?.disconnect();
          if (!resizeObserver) window.removeEventListener('resize', resize);
          hero?.removeEventListener('pointermove', onPointerMove);
          document.removeEventListener('visibilitychange', onVisibility);
          paperGeometry.dispose();
          sculpture.traverse((object) => {
            if (object instanceof THREE.Mesh) {
              object.geometry.dispose();
              const materials = Array.isArray(object.material) ? object.material : [object.material];
              materials.forEach((material) => material.dispose());
            }
          });
          renderer.dispose();
        };
      } catch {
        // If the browser cannot create a renderer, the authored SVG remains the complete fallback.
      }
    }).catch(() => {
      // Dynamic import can fail on restrictive browsers; keep the SVG fallback visible.
    });

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, []);

  return <div ref={hostRef} className={`hero-sculpture ${ready ? 'is-ready' : ''}`}>
    <HeroArtwork />
    <canvas ref={canvasRef} className="hero-sculpture-canvas" aria-hidden="true" />
  </div>;
}
