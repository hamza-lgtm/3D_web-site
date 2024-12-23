import "./styles.css";
import { useRef, Suspense } from "react";
import {
  Text3D,
  OrbitControls,
  Center,

  useMatcapTexture
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { Mesh } from "three";

function Logo() {
  const [matcapTexture] = useMatcapTexture("1D3FCC_051B5F_81A0F2_5579E9");
  const ref = useRef<Mesh>(null);
  const { width: w, height: h } = useThree((state) => state.viewport);
  const maxSize = Math.min(w, h) / 6; // Limit the maximum size

  return (
    <>
      <Center scale={[0.9, 1, 1]}>
        <Physics gravity={[0, -10, 0]}>
          <Text3D
            position={[0, 0, -10]}
            scale={[-1, 1, 1]}
            ref={ref}
            size={maxSize}
            font="/gt.json"
            curveSegments={24}
            bevelSegments={1}
            bevelEnabled
            bevelSize={0.08}
            bevelThickness={0.03}
            height={1}
            lineHeight={0.9}
            letterSpacing={0.3}
          >
            {`Sniper\n  AI`}
            <meshMatcapMaterial color="white" matcap={matcapTexture} />
          </Text3D>
        </Physics>
      </Center>
    </>
  );
}

const Logo3D = () => {
  return (
    <div className="scene" style={{ background: 'transparent' }}>
      <Canvas 
        camera={{ position: [0, 0, -10], fov: 60 }}
        gl={{
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true,
        }}
        style={{ background: 'transparent' }}
      >
        <OrbitControls
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={1.5}
          enablePan={true}
          zoomSpeed={0.5}
          dampingFactor={0.1}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 2.1}
        />

        <Suspense fallback={"Loading"}>
          <Logo />
        </Suspense>
        <ambientLight intensity={0.6} color="#dee2ff" />
      </Canvas>
    </div>
  );
};

export default Logo3D;