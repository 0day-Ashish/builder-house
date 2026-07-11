"use client";

import React, { useEffect, useRef } from "react";

interface Shape {
  gridX: number;
  gridY: number;
  vx: number;
  vy: number;
  offsets: [number, number][];
  baseOpacity: number;
  pulseSpeed: number;
  pulsePhase: number;
  color: string; // RGB Cool Grey
}

export default function PixelGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const cellSize = 12; // Grid cell size in pixels
    const dotSize = 3; // Size of each pixel dot

    let width = 0;
    let height = 0;
    let gridCols = 0;
    let gridRows = 0;
    let shapes: Shape[] = [];

    // Define pixel templates that form organic cell-like blob shapes (amoebas)
    const shapeTemplates: [number, number][][] = [
      // 1. Amoeba Blob A: Rounded irregular cell
      [
        [-1, -1], [0, -1], [1, -1],
        [-2, 0], [-1, 0], [0, 0], [1, 0],
        [-1, 1], [0, 1], [1, 1]
      ],
      // 2. Amoeba Blob B: Cell with a tail protrusion
      [
        [0, -2], [1, -2],
        [-1, -1], [0, -1], [1, -1],
        [-1, 0], [0, 0], [1, 0], [2, 0],
        [0, 1], [1, 1]
      ],
      // 3. Amoeba Blob C: Irregular diagonal cell
      [
        [-2, -2], [-1, -2],
        [-1, -1], [0, -1],
        [0, 0], [1, 0], [2, 0],
        [1, 1], [2, 1]
      ],
      // 4. Amoeba Blob D: Compact organic node
      [
        [0, -1], [1, -1],
        [-1, 0], [0, 0], [1, 0],
        [0, 1], [1, 1]
      ],
      // 5. Amoeba Blob E: Curved ribbon cell
      [
        [-2, -1], [-1, -1],
        [-1, 0], [0, 0], [1, 0],
        [1, 1], [2, 1], [3, 1]
      ]
    ];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      gridCols = Math.ceil(width / cellSize);
      gridRows = Math.ceil(height / cellSize);

      initShapes();
    };

    const initShapes = () => {
      shapes = [];
      const area = gridCols * gridRows;
      
      // Generate organic amoeba shapes drifting in random directions
      const numShapes = Math.max(16, Math.floor(area / 75)); 
      for (let i = 0; i < numShapes; i++) {
        const template = shapeTemplates[Math.floor(Math.random() * shapeTemplates.length)];
        const gridX = Math.random() * gridCols;
        const gridY = Math.random() * gridRows;
        
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.02 + 0.01;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        const greyShade = Math.floor(Math.random() * 115) + 140; // 140 to 255 cool greys
        const color = `${greyShade}, ${greyShade}, ${Math.min(255, greyShade + 5)}`;

        shapes.push({
          gridX,
          gridY,
          vx,
          vy,
          offsets: template,
          baseOpacity: Math.random() * 0.22 + 0.08,
          pulseSpeed: Math.random() * 0.015 + 0.005,
          pulsePhase: Math.random() * Math.PI * 2,
          color
        });
      }
    };

    window.addEventListener("resize", resize);
    resize();

    // Main animation loop
    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Draw background static dot grid
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      for (let col = 0; col < gridCols; col++) {
        for (let row = 0; row < gridRows; row++) {
          ctx.fillRect(col * cellSize, row * cellSize, dotSize, dotSize);
        }
      }

      // Render drifting organic amoeba shapes
      shapes.forEach((shape) => {
        // 1. Update position in grid space
        shape.gridX += shape.vx;
        shape.gridY += shape.vy;

        // Wrap around grid boundaries
        const padding = 6;
        if (shape.gridX < -padding) shape.gridX = gridCols + padding;
        if (shape.gridX > gridCols + padding) shape.gridX = -padding;
        if (shape.gridY < -padding) shape.gridY = gridRows + padding;
        if (shape.gridY > gridRows + padding) shape.gridY = -padding;

        // 2. Pulse opacity
        shape.pulsePhase += shape.pulseSpeed;
        const pulse = Math.sin(shape.pulsePhase) * 0.5 + 0.5; // 0 to 1
        const opacity = shape.baseOpacity + pulse * 0.25;

        // 3. Draw shape snapped to the global pixel grid for a sharp layout
        const snapX = Math.floor(shape.gridX);
        const snapY = Math.floor(shape.gridY);

        ctx.fillStyle = `rgba(${shape.color}, ${Math.min(1.0, opacity)})`;
        
        shape.offsets.forEach(([offsetX, offsetY]) => {
          const px = (snapX + offsetX) * cellSize;
          const py = (snapY + offsetY) * cellSize;

          if (px >= 0 && px < width && py >= 0 && py < height) {
            ctx.fillRect(px, py, dotSize, dotSize);
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-transparent"
    />
  );
}
