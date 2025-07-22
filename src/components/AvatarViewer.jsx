import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import officeBg from '../assets/bgOffice.png';
import { AvatarModel } from "./AvatarModel"; // Make sure to use updated version above

export default function AvatarViewer({ mouthOpenInfluence }) {
  return (
    <div
      className="w-full h-full mx-auto rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.4)]"
      style={{
        backgroundImage: `url(${officeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Canvas camera={{ position: [0, 1.5, 3] }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <AvatarModel mouthOpenInfluence={mouthOpenInfluence} />
        </Suspense>
        <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
