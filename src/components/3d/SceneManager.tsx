import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollState } from '../../context/ScrollContext'

const CAMERA_POSITIONS: [number, number, number][] = [
  [8, 6, 8],
  [6, 4, 6],
  [7, 8, 7],
  [9, 5, 9],
  [8, 6, 8],
  [10, 8, 10],
]

function lerpVec3(a: THREE.Vector3, b: THREE.Vector3, t: number) {
  return new THREE.Vector3().lerpVectors(a, b, t)
}

function CameraController({ progress }: { progress: number }) {
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3())

  useFrame(() => {
    const phase = progress * 6
    const idx = Math.min(5, Math.floor(phase))
    const frac = phase - idx
    const nextIdx = Math.min(5, idx + 1)

    const p0 = new THREE.Vector3(...CAMERA_POSITIONS[idx])
    const p1 = new THREE.Vector3(...CAMERA_POSITIONS[nextIdx])
    const pos = lerpVec3(p0, p1, frac)
    targetPos.current.copy(pos)

    camera.position.lerp(targetPos.current, 0.03)
    camera.lookAt(0, 0, 0)
  })

  return null
}

function BuildingGroup({ count = 20, spread = 8, heightRange = [0.5, 3], color = '#4a90d9' }: { count?: number; spread?: number; heightRange?: [number, number]; color?: string }) {
  const buildings = useMemo(() => {
    const arr = []
    for (let i = 0; i < count; i++) {
      const w = 0.3 + Math.random() * 0.4
      const d = 0.3 + Math.random() * 0.4
      const h = heightRange[0] + Math.random() * (heightRange[1] - heightRange[0])
      const x = (Math.random() - 0.5) * spread
      const z = (Math.random() - 0.5) * spread
      arr.push({ w, d, h, x, z })
    }
    return arr
  }, [count, spread, heightRange])

  return (
    <group>
      {buildings.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2, b.z]}>
          <boxGeometry args={[b.w, b.h, b.d]} />
          <meshStandardMaterial color={color} metalness={0.3} roughness={0.7} />
        </mesh>
      ))}
    </group>
  )
}

function GroundPlane({ size = 20, color = '#1a1a2e' }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function GridFloor({ size = 20, divisions = 20 }) {
  return (
    <gridHelper args={[size, divisions, '#333', '#222']} position={[0, 0, 0]} />
  )
}

function TopographyWireframe({ size = 12 }: { size?: number }) {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(size, size, 24, 24)
    const pos = g.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      pos.setZ(i, Math.sin(x * 0.8) * 0.3 + Math.cos(y * 0.6) * 0.2)
    }
    g.computeVertexNormals()
    return g
  }, [size])

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <primitive object={geo} />
      <meshStandardMaterial wireframe color="#4a90d9" transparent opacity={0.6} />
    </mesh>
  )
}

function BlueprintGrid() {
  return (
    <group>
      <GridFloor size={14} divisions={14} />
      <BuildingGroup count={12} spread={6} heightRange={[0.1, 0.3]} color="#4a90d9" />
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshBasicMaterial color="#0a1628" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

function ConstructionScene() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
  })

  return (
    <group ref={group}>
      <BuildingGroup count={8} spread={7} heightRange={[0.3, 1]} color="#888" />
      <mesh position={[3, 1.5, 3]}>
        <boxGeometry args={[0.06, 3, 0.06]} />
        <meshStandardMaterial color="#e8a838" />
      </mesh>
      <GridFloor size={16} divisions={16} />
    </group>
  )
}

function AmenitiesScene() {
  return (
    <group>
      <BuildingGroup count={15} spread={6} heightRange={[1, 3.5]} color="#4a90d9" />
      <BuildingGroup count={5} spread={4} heightRange={[0.3, 0.6]} color="#e8a838" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2.5, 0.05, 2]}>
        <circleGeometry args={[1.5, 32]} />
        <meshStandardMaterial color="#2a6f8f" transparent opacity={0.7} roughness={0.1} metalness={0.3} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2, 0.05, -1.5]}>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial color="#2a6f8f" transparent opacity={0.7} roughness={0.1} metalness={0.3} />
      </mesh>
    </group>
  )
}

function CompleteScene() {
  return (
    <group>
      <BuildingGroup count={25} spread={8} heightRange={[0.8, 4]} color="#4a90d9" />
      <BuildingGroup count={8} spread={6} heightRange={[0.3, 0.7]} color="#e8a838" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3, 0.05, 3]}>
        <circleGeometry args={[2, 32]} />
        <meshStandardMaterial color="#2a6f8f" transparent opacity={0.6} roughness={0.1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3, 0.05, -2]}>
        <circleGeometry args={[1.5, 32]} />
        <meshStandardMaterial color="#2a6f8f" transparent opacity={0.6} roughness={0.1} />
      </mesh>
      {Array.from({ length: 30 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2
        const r = 3 + Math.random() * 4
        return (
          <mesh key={i} position={[Math.cos(angle) * r, 0.15, Math.sin(angle) * r]}>
            <coneGeometry args={[0.12, 0.3, 6]} />
            <meshStandardMaterial color="#3a7a3a" />
          </mesh>
        )
      })}
    </group>
  )
}

function PhaseScene({ phase }: { phase: number }) {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (group.current && phase <= 2) {
      group.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  switch (phase) {
    case 0:
      return (
        <group ref={group}>
          <BuildingGroup count={15} spread={5} heightRange={[0.5, 2.5]} color="#4a90d9" />
          <GroundPlane />
        </group>
      )
    case 1:
      return (
        <group ref={group}>
          <TopographyWireframe />
          <GroundPlane color="#0a0a1a" />
        </group>
      )
    case 2:
      return (
        <group ref={group}>
          <BlueprintGrid />
        </group>
      )
    case 3:
      return <ConstructionScene />
    case 4:
      return <AmenitiesScene />
    case 5:
      return <CompleteScene />
    default:
      return null
  }
}

function FloatingParticles() {
  const count = 200
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    return pos
  }, [])

  const points = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#4a90d9" transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

function SceneContent({ progress }: { progress: number }) {
  const phase = Math.min(5, Math.floor(progress * 6))

  return (
    <>
      <color attach="background" args={['#0a0a0a']} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-5, 5, -5]} intensity={0.3} />
      <CameraController progress={progress} />
      <PhaseScene phase={phase} />
      <FloatingParticles />
    </>
  )
}

export default function SceneManager() {
  const { progress } = useScrollState()

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [8, 6, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneContent progress={progress} />
      </Canvas>
    </div>
  )
}
