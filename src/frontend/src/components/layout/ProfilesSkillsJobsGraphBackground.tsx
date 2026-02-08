import { useScrollActivity } from '@/hooks/useScrollActivity';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useEffect, useRef, useState } from 'react';

type NodeType = 'profile' | 'skill' | 'job';

interface GraphNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: NodeType;
  label: string;
}

interface GraphEdge {
  from: number;
  to: number;
}

export function ProfilesSkillsJobsGraphBackground() {
  const isScrolling = useScrollActivity();
  const prefersReducedMotion = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      const deltaTime = now - lastScrollTime.current;
      const deltaY = window.scrollY - lastScrollY.current;
      
      if (deltaTime > 0) {
        const velocity = Math.abs(deltaY / deltaTime);
        setScrollVelocity(velocity);
      }
      
      lastScrollY.current = window.scrollY;
      lastScrollTime.current = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size and clear immediately to prevent flash
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Clear to transparent immediately after resize
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Neon green for graph (distinct from sea-foam UI accents)
    const neonGreen = { r: 57, g: 255, b: 20 }; // Bright neon green

    // Create graph nodes with three distinct types
    const nodes: GraphNode[] = [];
    const nodeCount = prefersReducedMotion ? 15 : 30;
    
    const profileLabels = ['Designer', 'Engineer', 'Manager', 'Analyst', 'Developer', 'Architect'];
    const skillLabels = ['React', 'Python', 'Leadership', 'Design', 'Analytics', 'Cloud'];
    const jobLabels = ['Senior Dev', 'PM Role', 'UX Lead', 'Data Sci', 'DevOps', 'Frontend'];

    for (let i = 0; i < nodeCount; i++) {
      const typeIndex = i % 3;
      let type: NodeType;
      let label: string;
      
      if (typeIndex === 0) {
        type = 'profile';
        label = profileLabels[i % profileLabels.length];
      } else if (typeIndex === 1) {
        type = 'skill';
        label = skillLabels[i % skillLabels.length];
      } else {
        type = 'job';
        label = jobLabels[i % jobLabels.length];
      }

      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        type,
        label,
      });
    }

    // Create edges between related nodes
    const edges: GraphEdge[] = [];
    for (let i = 0; i < nodes.length; i++) {
      // Connect each node to 2-3 nearby nodes of different types
      const connectionsCount = Math.floor(Math.random() * 2) + 2;
      const candidates = nodes
        .map((_, idx) => idx)
        .filter(idx => idx !== i && nodes[idx].type !== nodes[i].type)
        .sort((a, b) => {
          const distA = Math.hypot(nodes[a].x - nodes[i].x, nodes[a].y - nodes[i].y);
          const distB = Math.hypot(nodes[b].x - nodes[i].x, nodes[b].y - nodes[i].y);
          return distA - distB;
        })
        .slice(0, connectionsCount);

      candidates.forEach(to => {
        if (!edges.some(e => (e.from === i && e.to === to) || (e.from === to && e.to === i))) {
          edges.push({ from: i, to });
        }
      });
    }

    let animationFrameId: number;

    const animate = () => {
      // Clear canvas with full transparency (no opaque background fill)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update node positions
      if (!prefersReducedMotion) {
        nodes.forEach(node => {
          node.x += node.vx;
          node.y += node.vy;

          // Bounce off edges
          if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
          if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

          // Keep within bounds
          node.x = Math.max(0, Math.min(canvas.width, node.x));
          node.y = Math.max(0, Math.min(canvas.height, node.y));
        });
      }

      // Calculate glow intensity based on scroll activity
      const baseAlpha = 0.15;
      const scrollBoost = Math.min(scrollVelocity * 0.5, 0.3);
      const glowAlpha = isScrolling ? baseAlpha + scrollBoost : baseAlpha;

      // Draw edges with glow
      edges.forEach(edge => {
        const from = nodes[edge.from];
        const to = nodes[edge.to];

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = `rgba(${neonGreen.r}, ${neonGreen.g}, ${neonGreen.b}, ${glowAlpha * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw nodes with distinct shapes and glow
      nodes.forEach(node => {
        ctx.save();
        ctx.translate(node.x, node.y);

        // Glow effect
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 15);
        gradient.addColorStop(0, `rgba(${neonGreen.r}, ${neonGreen.g}, ${neonGreen.b}, ${glowAlpha})`);
        gradient.addColorStop(1, `rgba(${neonGreen.r}, ${neonGreen.g}, ${neonGreen.b}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(-15, -15, 30, 30);

        // Draw shape based on type
        ctx.fillStyle = `rgba(${neonGreen.r}, ${neonGreen.g}, ${neonGreen.b}, ${glowAlpha + 0.4})`;
        ctx.strokeStyle = `rgba(${neonGreen.r}, ${neonGreen.g}, ${neonGreen.b}, ${glowAlpha + 0.6})`;
        ctx.lineWidth = 2;

        if (node.type === 'profile') {
          // Circle for profiles
          ctx.beginPath();
          ctx.arc(0, 0, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else if (node.type === 'skill') {
          // Square for skills
          ctx.fillRect(-5, -5, 10, 10);
          ctx.strokeRect(-5, -5, 10, 10);
        } else {
          // Triangle for jobs
          ctx.beginPath();
          ctx.moveTo(0, -6);
          ctx.lineTo(5, 4);
          ctx.lineTo(-5, 4);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isScrolling, scrollVelocity, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none bg-transparent"
      style={{ zIndex: 0, backgroundColor: 'transparent' }}
      aria-hidden="true"
    />
  );
}
