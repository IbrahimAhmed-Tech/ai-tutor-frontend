import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useEffect, useRef } from "react";

export function AvatarModel({ mouthOpenInfluence }) {
    const gltf = useLoader(GLTFLoader, "/avatar.glb");
    const avatarRef = useRef();

    useEffect(() => {
        if (!gltf || !gltf.scene) return;

        gltf.scene.traverse((object) => {
            if (object.name === "Wolf3D_Head") {
                avatarRef.current = object;
            }
        });
    }, [gltf]);

    useFrame(() => {
        if (avatarRef.current && avatarRef.current.morphTargetDictionary) {
            const dict = avatarRef.current.morphTargetDictionary;
            const influences = avatarRef.current.morphTargetInfluences;

            const idx = dict["mouthOpen"];
            if (typeof idx === "number") {
                influences[idx] = mouthOpenInfluence.current;
            }
        }
    });

    return (
        <primitive
            object={gltf.scene}
            scale={4.9}
            position={[0, -7.0, 0]}
            rotation={[-0.09, 0, 0]}
        />
    );
}
