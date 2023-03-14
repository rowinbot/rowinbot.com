import { Canvas, useFrame } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight, Text3D } from '@react-three/drei'
import { Suspense, useLayoutEffect, useRef, useState } from 'react'
import type { Mesh } from 'three'
import { Object3D, MathUtils } from 'three'
import { easing } from 'maath'

interface AppTextProps {
  text: string
}
export function AppText(props: AppTextProps) {
  const [isMouseHoveringCanvas, setMouseHoveringCanvas] = useState(false)

  return (
    <div className="h-[40rem] w-full">
      <Suspense
        fallback={
          <h1 className="text-5xl text-white">
            I need to improve this loader but...
          </h1>
        }
      >
        <Canvas
          onMouseEnter={() => setMouseHoveringCanvas(true)}
          onMouseLeave={() => setMouseHoveringCanvas(false)}
          camera={{ position: [25.5, 12, 100], zoom: 15 }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, -10, 10]} />

          <AccumulativeShadows
            frames={100}
            alphaTest={0.85}
            opacity={0.8}
            color="red"
            scale={20}
            position={[0, -0.005, 0]}
          >
            <RandomizedLight
              amount={8}
              radius={6}
              ambient={0.5}
              intensity={1}
              position={[-1.5, 2.5, -2.5]}
              bias={0.001}
            />
          </AccumulativeShadows>

          <Suspense>
            <InsideCanvas
              isMouseHoveringCanvas={isMouseHoveringCanvas}
              text={props.text}
            />
          </Suspense>
        </Canvas>
      </Suspense>
    </div>
  )
}

interface InsideCanvasProps {
  text: string
  isMouseHoveringCanvas: boolean
}
export function InsideCanvas({
  isMouseHoveringCanvas,
  ...props
}: InsideCanvasProps) {
  const ref = useRef<Mesh>(null)
  const [dummy] = useState(() => new Object3D())

  useFrame(({ mouse }, dt) => {
    if (!ref.current) return

    if (isMouseHoveringCanvas) {
      dummy.lookAt(
        MathUtils.clamp(mouse.x, -0.05, 0.05),
        MathUtils.clamp(mouse.y, -0.05, 0.05),
        1
      )
    }

    easing.dampQ(ref.current.quaternion, dummy.quaternion, 0.15, dt)
  })

  useLayoutEffect(() => {
    if (!isMouseHoveringCanvas) {
      dummy.lookAt(0, 0, 0)
    }
  }, [dummy, isMouseHoveringCanvas])

  return (
    <>
      <axesHelper scale={2} position={[0, 0, 0]} />

      <mesh ref={ref} position={[-6.5, 1, 0]}>
        <Text3D
          curveSegments={50}
          bevelEnabled
          bevelSize={0.04}
          bevelThickness={0.2}
          height={0.2}
          lineHeight={0.7}
          letterSpacing={0}
          font="/fonts/Inter Black_Regular.json"
        >
          {props.text}

          <meshNormalMaterial />
        </Text3D>
        <meshBasicMaterial color="hotpink" />
      </mesh>

      <mesh position={[6, -1, 0]}>
        <boxGeometry />
        <meshBasicMaterial color="hotpink" />
      </mesh>
    </>
  )
}
