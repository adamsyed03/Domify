'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { MotionValue, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 18;
const START_FRAME = 24;
const FRAME_STEP = 1;

const getFramePath = (index: number) => {
  const paddedIndex = (START_FRAME + index * FRAME_STEP).toString().padStart(2, '0');
  return `${import.meta.env.BASE_URL}sequence/frame_${paddedIndex}_delay-0.041s.webp`;
};

type ScrollyCanvasProps = {
  children?: React.ReactNode | ((scrollProgress: MotionValue<number>) => React.ReactNode);
};

export default function ScrollyCanvas({ children }: ScrollyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasSizeRef = useRef({ width: 0, height: 0, pixelRatio: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  const syncCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return canvasSizeRef.current;

    const pixelRatio = Math.min(Math.max(window.devicePixelRatio || 1, 1), 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    const current = canvasSizeRef.current;

    if (current.width !== width || current.height !== height || current.pixelRatio !== pixelRatio) {
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvasSizeRef.current = { width, height, pixelRatio };
    }

    return canvasSizeRef.current;
  }, []);

  const drawImage = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img.naturalWidth || !img.naturalHeight) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height, pixelRatio } = syncCanvasSize();
    if (!width || !height) return;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

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
  }, [syncCanvasSize]);

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
  }, [drawImage, frameIndex]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const currentFrame = Math.round(latest);
    if (images[currentFrame] && images[currentFrame].complete) {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(() => {
        drawImage(images[currentFrame]);
      });
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
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [drawImage, images, frameIndex]);

  return (
    <div id="pocetna" ref={containerRef} className="relative h-[145vh] bg-[#07111f]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#07111f]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,17,31,0.35)_0%,rgba(7,17,31,0.22)_42%,rgba(7,17,31,0.82)_76%,#07111f_100%)]" />
        <div className="relative z-10 h-full">
          {typeof children === 'function' ? children(scrollYProgress) : children}
        </div>
      </div>
    </div>
  );
}
