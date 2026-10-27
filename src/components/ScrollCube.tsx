/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";

// Any element with data-cube="rx,ry,rz,scale,x" becomes a keyframe. Angles are
// in degrees, x is a horizontal offset in world units. The cube eases between
// keyframes depending on how far the page has been scrolled.
type Stop = { top: number; rot: [number, number, number]; scale: number; x: number };

const DEG = Math.PI / 180;
const LIGHT = new THREE.Color("#BF0404");
const DARK = new THREE.Color("#ffffff");

function readStops(): Stop[] {
  const scrollY = window.scrollY;
  return Array.from(document.querySelectorAll<HTMLElement>("[data-cube]"))
    .map((el) => {
      const [rx = 0, ry = 0, rz = 0, scale = 1, x = 0] = (el.dataset.cube ?? "").split(",").map(Number);
      return {
        top: el.getBoundingClientRect().top + scrollY,
        rot: [rx * DEG, ry * DEG, rz * DEG] as [number, number, number],
        scale,
        x,
      };
    })
    .sort((a, b) => a.top - b.top);
}

const smooth = (t: number) => t * t * (3 - 2 * t);

function Cube({ stopsRef }: { stopsRef: React.RefObject<Stop[]> }) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const color = useMemo(() => LIGHT.clone(), []);
  const current = useRef({ rx: 0, ry: 0, rz: 0, s: 1, x: 0 });

  useFrame((_, delta) => {
    const stops = stopsRef.current;
    if (!group.current || !stops || stops.length === 0) return;

    // A keyframe is reached when its section top hits the top of the screen.
    const y = window.scrollY;
    let target = stops[0];
    let next = stops[0];
    let t = 0;
    for (let i = 0; i < stops.length; i++) {
      if (y >= stops[i].top) {
        target = stops[i];
        next = stops[i + 1] ?? stops[i];
        const span = next.top - target.top;
        t = span > 0 ? smooth(Math.min(1, (y - target.top) / span)) : 0;
      }
    }

    const lerp = THREE.MathUtils.lerp;
    const goal = {
      rx: lerp(target.rot[0], next.rot[0], t),
      ry: lerp(target.rot[1], next.rot[1], t),
      rz: lerp(target.rot[2], next.rot[2], t),
      s: lerp(target.scale, next.scale, t),
      x: lerp(target.x, next.x, t),
    };

    const c = current.current;
    const k = 1 - Math.exp(-delta * 6);
    // A jump bigger than a full turn means the page just looped; snap.
    if (Math.abs(goal.ry - c.ry) > Math.PI * 1.5) Object.assign(c, goal);
    c.rx += (goal.rx - c.rx) * k;
    c.ry += (goal.ry - c.ry) * k;
    c.rz += (goal.rz - c.rz) * k;
    c.s += (goal.s - c.s) * k;
    c.x += (goal.x - c.x) * k;

    group.current.rotation.set(c.rx, c.ry, c.rz);
    group.current.scale.setScalar(c.s);
    group.current.position.x = c.x;
    if (inner.current) inner.current.rotation.set(-c.rx * 2, -c.ry * 2, 0);

    const dark = document.documentElement.classList.contains("random-scroll-dark");
    color.lerp(dark ? DARK : LIGHT, k);
  });

  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color={color} transparent opacity={0.04} depthWrite={false} />
        <Edges scale={1} threshold={15} color={color} />
      </mesh>
      <mesh ref={inner} scale={0.42}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} depthWrite={false} />
        <Edges color={color} />
      </mesh>
    </group>
  );
}

function ScrollCube() {
  const stopsRef = useRef<Stop[]>([]);

  useEffect(() => {
    const update = () => {
      stopsRef.current = readStops();
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 7], fov: 35 }} gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
        <Cube stopsRef={stopsRef} />
      </Canvas>
    </div>
  );
}

export default ScrollCube;
