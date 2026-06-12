'use client';

import { useEffect, useRef, useState } from 'react';
import { MotionValue, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 96;

const getFramePath = (index: number) => {
  const paddedIndex = index.toString().padStart(2, '0');
  return `${import.meta.env.BASE_URL}sequence/frame_${paddedIndex}_delay-0.041s.webp`;
};

type ScrollyCanvasProps = {
  children?: React.ReactNode | ((scrollProgress: MotionValue<number>) => React.ReactNode);
};

export default function ScrollyCanvas({ children }: ScrollyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);
  
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        if (Math.round(frameIndex.get()) === i) {
          drawImage(img);
        }
      };
      img.src = getFramePath(i);
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [frameIndex]);

  const drawImage = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img.naturalWidth || !img.naturalHeight) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pixelRatio = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;
    
    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    } else {
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const currentFrame = Math.round(latest);
    if (images[currentFrame] && images[currentFrame].complete) {
      drawImage(images[currentFrame]);
    }
  });

  useEffect(() => {
    const handleResize = () => {
      const currentFrame = Math.round(frameIndex.get());
      if (images[currentFrame] && images[currentFrame].complete) {
        drawImage(images[currentFrame]);
      }
    };
    
    if (images[0]?.complete) {
      drawImage(images[0]);
    } else if (images[0]) {
      images[0].onload = () => drawImage(images[0]);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images, frameIndex]);

  return (
    <div id="pocetna" ref={containerRef} className="relative h-[420vh] bg-[#060812]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060812]/35 via-transparent to-[#060812]/70" />
        <div className="relative z-10 h-full">
          {typeof children === 'function' ? children(scrollYProgress) : children}
        </div>
      </div>
    </div>
  );
}
