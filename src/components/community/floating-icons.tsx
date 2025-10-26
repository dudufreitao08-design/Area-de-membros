'use client';

import React, { useState, useEffect } from 'react';
import { Users, Wifi, MessageCircle } from 'lucide-react';

interface IconStyle {
  top: string;
  left: string;
  animation: string;
}

const generateIconStyles = (count: number): IconStyle[][] => {
  return Array.from({ length: count }, () => [
    {
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 80}%`,
      animation: `float ${(Math.random() + 3) * 2}s ease-in-out infinite`,
    },
    {
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 80}%`,
      animation: `float ${(Math.random() + 3) * 2}s ease-in-out infinite alternate`,
    },
    {
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 80}%`,
      animation: `float ${(Math.random() + 3) * 2}s ease-in-out infinite`,
    },
  ]);
};

export function FloatingIcons() {
  const [iconStyles, setIconStyles] = useState<IconStyle[][]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This runs only on the client, after hydration
    setIconStyles(generateIconStyles(5));
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render nothing on the server to prevent mismatch
    return null;
  }

  return (
    <div className="absolute inset-0 z-0 opacity-10">
      {iconStyles.map((styles, i) => (
        <React.Fragment key={`icon-group-${i}`}>
          <Users
            className="absolute text-blue-400/50"
            size={(i + 1) * 30}
            style={styles[0]}
          />
          <MessageCircle
            className="absolute text-blue-400/50"
            size={(i + 1) * 25}
            style={styles[1]}
          />
          <Wifi
            className="absolute text-accent/50"
            size={(i + 1) * 20}
            style={styles[2]}
          />
        </React.Fragment>
      ))}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
