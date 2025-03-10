'use client';

import { cn } from '@/SelfPresent/lib/utils';
import createGlobe, { COBEOptions } from 'cobe';
import { useCallback, useEffect, useRef } from 'react';
import { useSpring } from 'react-spring';

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 }
  ]
};

export default function Globe({
  className,
  config = GLOBE_CONFIG
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001
    }
  }));

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? 'grabbing' : 'grab';
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      api.start({ r: delta / 200 });
    }
  };

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (!pointerInteracting.current) phiRef.current += 0.005;
      state.phi = phiRef.current + r.get();
      state.width = widthRef.current * 2;
      state.height = widthRef.current * 2;
    },
    [r]
  );

  const onResize = useCallback(() => {
    if (canvasRef.current) {
      widthRef.current = canvasRef.current.offsetWidth;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = '1';
      }
    });

    return () => {
      window.removeEventListener('resize', onResize);
      globe.destroy();
    };
  }, [config, onRender, onResize]);

  return (
    <div
      className={cn(
        'absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]',
        className
      )}
    >
      <canvas
        className={cn(
          'h-full w-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]'
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
