'use client';

import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/cn';

interface ThinkingNetworkProps {
  className?: string;
}

interface Node {
  id: number;
  x: number;
  y: number;
  layer: number;
}

interface Edge {
  from: Node;
  to: Node;
  delay: number;
}

export function ThinkingNetwork({ className }: ThinkingNetworkProps) {
  const { nodes, edges } = useMemo(() => buildNetwork(), []);
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((n) => (n + 1) % nodes.length);
    }, 220);
    return () => clearInterval(interval);
  }, [nodes.length]);

  return (
    <div
      className={cn(
        'relative mx-auto aspect-[16/9] w-full max-w-2xl overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-canvas-raised via-canvas to-canvas-sunken/60',
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(600px 300px at 50% 50%, rgba(42,157,143,0.18), transparent 60%)'
        }}
      />
      <svg
        viewBox="0 0 320 180"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Neural network analysis animation"
      >
        <defs>
          <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#2a9d8f" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.55" />
          </linearGradient>
          <radialGradient id="node">
            <stop offset="0%" stopColor="#2a9d8f" />
            <stop offset="100%" stopColor="#1e3a5f" />
          </radialGradient>
        </defs>

        {edges.map((edge, idx) => (
          <line
            key={`e-${idx}`}
            x1={edge.from.x}
            y1={edge.from.y}
            x2={edge.to.x}
            y2={edge.to.y}
            stroke="url(#edge)"
            strokeWidth={0.6}
            strokeDasharray="3 4"
            strokeDashoffset={120}
            className="animate-dash"
            style={{ animationDelay: `${edge.delay}ms`, animationDuration: '1.8s' }}
          />
        ))}

        {nodes.map((node, idx) => {
          const isActive = idx === activeNode;
          return (
            <g key={`n-${node.id}`} className="animate-drift" style={{ animationDelay: `${idx * 90}ms` }}>
              <circle
                cx={node.x}
                cy={node.y}
                r={isActive ? 4.4 : 2.8}
                fill="url(#node)"
                opacity={isActive ? 1 : 0.75}
                className="transition-all duration-300"
              />
              {isActive && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={7}
                  fill="none"
                  stroke="#2a9d8f"
                  strokeOpacity={0.45}
                  strokeWidth={0.8}
                  className="animate-node-pulse"
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function buildNetwork(): { nodes: Node[]; edges: Edge[] } {
  const layers = [
    { count: 4, x: 40 },
    { count: 6, x: 120 },
    { count: 6, x: 200 },
    { count: 3, x: 280 }
  ];

  const nodes: Node[] = [];
  let id = 0;
  layers.forEach((layer, layerIdx) => {
    const gap = 160 / (layer.count + 1);
    for (let i = 0; i < layer.count; i++) {
      nodes.push({
        id: id++,
        x: layer.x,
        y: 10 + gap * (i + 1),
        layer: layerIdx
      });
    }
  });

  const edges: Edge[] = [];
  for (let l = 0; l < layers.length - 1; l++) {
    const from = nodes.filter((n) => n.layer === l);
    const to = nodes.filter((n) => n.layer === l + 1);
    from.forEach((a) => {
      to.forEach((b, j) => {
        edges.push({ from: a, to: b, delay: (a.id * 60 + j * 30) % 1800 });
      });
    });
  }

  return { nodes, edges };
}
