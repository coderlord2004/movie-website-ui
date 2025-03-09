import React, { useEffect, useRef } from "react";
import Globe from "globe.gl";

const Earth3D = () => {
  const globeRef = useRef(null);

  useEffect(() => {
    const globe = Globe()(globeRef.current)
      .globeImageUrl(
        "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      )
      // Hình ảnh Trái Đất
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png") // Hiệu ứng địa hình
      .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png") // Hình nền vũ trụ
      .showAtmosphere(true) // Hiệu ứng bầu khí quyển
      .atmosphereColor("red")
      .atmosphereAltitude(0.2);

    globe.controls().autoRotate = true; // Quay tự động
    globe.controls().autoRotateSpeed = 0.5; // Tốc độ quay
  }, []);

  return (
    <div ref={globeRef} style={{ width: "100%", height: "100%" }} />
  );
};

export default Earth3D;
