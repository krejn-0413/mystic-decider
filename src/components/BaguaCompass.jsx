import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

const BAGUA_RING = [
  { name: '坤', direction: '西南', symbol: '☷', angle: -45, element: '土' },
  { name: '离', direction: '南', symbol: '☲', angle: 0, element: '火' },
  { name: '巽', direction: '东南', symbol: '☴', angle: 45, element: '木' },
  { name: '震', direction: '东', symbol: '☳', angle: 90, element: '木' },
  { name: '艮', direction: '东北', symbol: '☶', angle: 135, element: '土' },
  { name: '坎', direction: '北', symbol: '☵', angle: 180, element: '水' },
  { name: '乾', direction: '西北', symbol: '☰', angle: 225, element: '金' },
  { name: '兑', direction: '西', symbol: '☱', angle: 270, element: '金' },
];

function compassAngle(direction) {
  const dirMap = {
    '北': 180, '东北': 225, '东': 270, '东南': 315,
    '南': 0, '西南': 45, '西': 90, '西北': 135,
  };
  return dirMap[direction] ?? 0;
}

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = (angleDeg - 90) * Math.PI / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function BaguaCompass({ highlightedDirection, onDirectionClick, size = 240 }) {
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.45;
  const innerR = size * 0.28;
  const labelR = size * 0.38;
  const symbolR = size * 0.32;

  const highlightAngle = highlightedDirection ? compassAngle(highlightedDirection) : 0;

  return (
    <div className="relative inline-flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <radialGradient id="compass-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(201,168,76,0.08)" />
            <stop offset="70%" stopColor="rgba(201,168,76,0.03)" />
            <stop offset="100%" stopColor="rgba(201,168,76,0.12)" />
          </radialGradient>
        </defs>

        <circle cx={cx} cy={cy} r={outerR + 8} fill="url(#compass-grad)" stroke="rgba(201,168,76,0.2)" strokeWidth="1" />

        {BAGUA_RING.map((b) => {
          const p = polarToCartesian(cx, cy, outerR, b.angle);
          const isHighlight = b.direction === highlightedDirection;
          const pInner = polarToCartesian(cx, cy, innerR, b.angle);
          return (
            <g
              key={b.name}
              onClick={() => onDirectionClick?.(b.direction)}
              className="cursor-pointer"
            >
              <line
                x1={pInner.x} y1={pInner.y}
                x2={p.x} y2={p.y}
                stroke={isHighlight ? 'rgba(201,168,76,0.7)' : 'rgba(201,168,76,0.15)'}
                strokeWidth={isHighlight ? 2 : 1}
              />
            </g>
          );
        })}

        {BAGUA_RING.map((b) => {
          const isHighlight = b.direction === highlightedDirection;
          const p = polarToCartesian(cx, cy, labelR, b.angle);
          return (
            <text
              key={b.name}
              x={p.x} y={p.y}
              textAnchor="middle"
              dominantBaseline="central"
              fill={isHighlight ? '#c9a84c' : 'rgba(154,138,122,0.5)'}
              fontSize={isHighlight ? 11 : 9}
              fontFamily="serif"
              fontWeight={isHighlight ? 'bold' : 'normal'}
              onClick={() => onDirectionClick?.(b.direction)}
              className="cursor-pointer"
            >
              {b.direction}
            </text>
          );
        })}

        {BAGUA_RING.map((b) => {
          const isHighlight = b.direction === highlightedDirection;
          const p = polarToCartesian(cx, cy, symbolR, b.angle);
          return (
            <text
              key={b.name}
              x={p.x} y={p.y}
              textAnchor="middle"
              dominantBaseline="central"
              fill={isHighlight ? 'rgba(201,168,76,0.9)' : 'rgba(154,138,122,0.35)'}
              fontSize={isHighlight ? 16 : 12}
              fontFamily="serif"
              onClick={() => onDirectionClick?.(b.direction)}
              className="cursor-pointer"
            >
              {b.symbol}
            </text>
          );
        })}

        {BAGUA_RING.map((b) => {
          const isHighlight = b.direction === highlightedDirection;
          const p = polarToCartesian(cx, cy, innerR - 14, b.angle);
          return (
            <text
              key={`ele-${b.name}`}
              x={p.x} y={p.y}
              textAnchor="middle"
              dominantBaseline="central"
              fill={isHighlight ? 'rgba(201,168,76,0.6)' : 'rgba(154,138,122,0.25)'}
              fontSize={8}
              fontFamily="serif"
            >
              {b.element}
            </text>
          );
        })}

        <circle cx={cx} cy={cy} r={innerR} fill="rgba(201,168,76,0.05)" stroke="rgba(201,168,76,0.15)" strokeWidth="1" />
      </svg>

      <motion.div
        className="absolute"
        style={{
          left: cx - 16,
          top: cy - 16,
          transformOrigin: 'center',
        }}
        animate={{ rotate: highlightAngle }}
        transition={{ type: 'spring', stiffness: 60, damping: 12 }}
      >
        <Compass
          size={32}
          className="text-gold-400"
          style={{ filter: 'drop-shadow(0 0 10px rgba(201,168,76,0.4))' }}
        />
      </motion.div>

      {highlightedDirection && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-center"
        >
          <p className="text-gold-400 font-serif text-sm tracking-wider">{highlightedDirection}</p>
        </motion.div>
      )}
    </div>
  );
}
