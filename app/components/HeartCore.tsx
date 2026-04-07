'use client'

import {
	Float,
	MeshDistortMaterial,
	OrbitControls,
	Sphere,
} from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function Scene78() {
	const mainNode = useRef<THREE.Mesh>(null!)

	const particles = useMemo<THREE.Vector3[]>(() => {
		const seededRandom = (seed: number) => {
			const x = Math.sin(seed) * 10000
			return x - Math.floor(x)
		}
		const temp: THREE.Vector3[] = []
		for (let i = 0; i < 78; i++) {
			const t = seededRandom(i) * Math.PI * 2
			const u = seededRandom(i + 78) * Math.PI * 2
			const r = 4 + seededRandom(i + 156) * 2
			temp.push(
				new THREE.Vector3(
					r * Math.sin(t) * Math.cos(u),
					r * Math.sin(t) * Math.sin(u),
					r * Math.cos(t),
				),
			)
		}
		return temp
	}, [])

	useFrame(state => {
		const time = state.clock.getElapsedTime()
		if (mainNode.current) {
			mainNode.current.rotation.y = time * 0.5
			mainNode.current.position.y = Math.sin(time) * 0.2
			if (mainNode.current.material) {
				const material = mainNode.current.material as THREE.MeshStandardMaterial
				material.emissiveIntensity = 2 + Math.sin(time * 2) * 0.5
			}
		}
	})

	return (
		<>
			<ambientLight intensity={0.2} />
			<pointLight position={[10, 10, 10]} color='#fb923c' intensity={5} />

			<Float speed={3} rotationIntensity={1.5} floatIntensity={2}>
				<Sphere ref={mainNode} args={[1.5, 64, 64]}>
					<MeshDistortMaterial
						color='#ea580c'
						emissive='#fb923c'
						emissiveIntensity={2.5}
						speed={4}
						distort={0.5}
						radius={1}
						roughness={0.1}
						metalness={1}
					/>
				</Sphere>
			</Float>

			{particles.map((pos, i) => (
				<mesh key={i} position={pos}>
					<sphereGeometry args={[0.06, 16, 16]} />
					<meshStandardMaterial
						color='#ffedd5'
						emissive='#fb923c'
						emissiveIntensity={2}
					/>
				</mesh>
			))}

			<EffectComposer enableNormalPass={false}>
				<Bloom
					luminanceThreshold={0.2}
					mipmapBlur
					intensity={1.5}
					radius={0.3}
				/>
			</EffectComposer>

			<OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
		</>
	)
}

export default function HeartCore() {
	return (
		<div className='h-125 w-full cursor-grab active:cursor-grabbing'>
			<Canvas
				gl={{
					antialias: false,
					toneMapping: THREE.NoToneMapping,
					alpha: true,
				}}
				camera={{ position: [0, 0, 10], fov: 45 }}
			>
				<Scene78 />
			</Canvas>
		</div>
	)
}
