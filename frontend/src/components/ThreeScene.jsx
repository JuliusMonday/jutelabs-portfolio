import React, { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Html } from '@react-three/drei'
import * as THREE from 'three'

function Particles({ count = 800 }) {
  const mesh = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      arr[i3 + 0] = (Math.random() - 0.5) * 30
      arr[i3 + 1] = (Math.random() - 0.5) * 12
      arr[i3 + 2] = (Math.random() - 0.5) * 30
    }
    return arr
  }, [count])

  useFrame((state, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.y += delta * 0.02
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime / 6) * 0.02
    // small per-instance motion
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        positions[i * 3 + 0],
        positions[i * 3 + 1] + Math.sin(state.clock.elapsedTime / 2 + i) * 0.05,
        positions[i * 3 + 2]
      )
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.03, 6, 6]} />
      <meshStandardMaterial color="#9ba7ff" metalness={0.2} roughness={0.6} />
    </instancedMesh>
  )
}

function FloatingGeo() {
  const ref = useRef()
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.35
    ref.current.position.y = Math.sin(state.clock.elapsedTime / 2) * 0.12
  })
  return (
    <mesh ref={ref} position={[0, 0.2, 0]}>
      <icosahedronGeometry args={[1.1, 2]} />
      <meshStandardMaterial color="#6366f1" emissive="#1e3a8a" metalness={0.7} roughness={0.2} />
    </mesh>
  )
}

export default function ThreeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 55 }} className="canvas-wrap" shadows>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Suspense fallback={<Html center>Loading 3D…</Html>}>
        <Stars radius={50} depth={20} count={4000} factor={4} saturation={0} fade speed={1} />
        <Particles count={700} />
        <FloatingGeo />
      </Suspense>
    </Canvas>
  )
}
