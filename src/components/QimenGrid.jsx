import { useRef } from 'react';
import { ELEMENT_COLORS, JIU_GONG_LAYOUT } from '../utils/qimenEngine';

var PALACE_COORDS = {
  4: { x: 12, y: 12 },
  9: { x: 117, y: 12 },
  2: { x: 222, y: 12 },
  3: { x: 12, y: 117 },
  5: { x: 117, y: 117 },
  7: { x: 222, y: 117 },
  8: { x: 12, y: 222 },
  1: { x: 117, y: 222 },
  6: { x: 222, y: 222 },
};

var DIRECTION_ROTATION = {
  '正北': 0, '东北': 45, '正东': 90, '东南': 135,
  '正南': 180, '西南': 225, '正西': 270, '西北': 315,
};

function PalaceCell({ palaceNum, board, highlightPalace, onClick }) {
  var p = board.palaces[palaceNum];
  var isHighlight = highlightPalace === palaceNum;
  var isZhiFu = p.isZhiFu;
  var isZhiShi = p.isZhiShi;
  var coord = PALACE_COORDS[palaceNum];
  var cellSize = 100;
  var ec = ELEMENT_COLORS[p.element] || ELEMENT_COLORS['土'];
  var rx = 6;

  return (
    <g
      onClick={function () { onClick(p); }}
      style={{ cursor: 'pointer' }}
      className="qimen-cell"
    >
      {isHighlight && (
        <rect
          x={coord.x - 2}
          y={coord.y - 2}
          width={cellSize + 4}
          height={cellSize + 4}
          rx={rx + 1}
          fill="none"
          stroke="rgba(201,168,76,0.5)"
          strokeWidth="2.5"
          className="animate-pulse-glow"
        />
      )}
      <rect
        x={coord.x}
        y={coord.y}
        width={cellSize}
        height={cellSize}
        rx={rx}
        fill={isHighlight ? 'rgba(201,168,76,0.06)' : 'rgba(26,21,16,0.92)'}
        stroke={isHighlight ? 'rgba(201,168,76,0.4)' : (isZhiFu || isZhiShi ? 'rgba(196,78,82,0.25)' : ec.border)}
        strokeWidth="0.8"
      />
      <defs>
        <linearGradient id={'bg-' + palaceNum} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={ec.bg} />
          <stop offset="100%" stopColor="rgba(26,21,16,0.95)" />
        </linearGradient>
      </defs>
      <rect
        x={coord.x}
        y={coord.y}
        width={cellSize}
        height={cellSize}
        rx={rx}
        fill={'url(#bg-' + palaceNum + ')'}
        opacity="0.6"
      />

      {(isZhiFu || isZhiShi) && (
        <g transform={'translate(' + (coord.x + cellSize - 12) + ',' + (coord.y + 10) + ')'}>
          <rect x="-8" y="-8" width="16" height="16" rx="3" fill="rgba(196,78,82,0.8)" />
          <text
            x="0" y="4"
            textAnchor="middle"
            fill="white"
            fontSize="9"
            fontWeight="bold"
            fontFamily="serif"
          >
            {isZhiFu ? '符' : '使'}
          </text>
        </g>
      )}

      {palaceNum === 5 ? (
        <text
          x={coord.x + cellSize / 2}
          y={coord.y + cellSize / 2 + 3}
          textAnchor="middle"
          fill="rgba(160,120,80,0.5)"
          fontSize="14"
          fontFamily="serif"
        >
          {p.diPanStem}
        </text>
      ) : (
        <g>
          <text
            x={coord.x + 8}
            y={coord.y + 16}
            fill="rgba(160,120,80,0.4)"
            fontSize="9"
            fontFamily="monospace"
          >
            {palaceNum}
          </text>
          <text
            x={coord.x + cellSize / 2}
            y={coord.y + 16}
            textAnchor="middle"
            fill={ec.text}
            fontSize="10"
            fontFamily="serif"
          >
            {p.trigram} {p.name}
          </text>
          <text
            x={coord.x + cellSize / 2}
            y={coord.y + 36}
            textAnchor="middle"
            fill="rgba(180,170,150,0.7)"
            fontSize="10"
            fontFamily="serif"
          >
            {p.baShen}
          </text>
          <text
            x={coord.x + cellSize / 2}
            y={coord.y + 52}
            textAnchor="middle"
            fill={ec.text}
            fontSize="11"
            fontWeight="500"
            fontFamily="serif"
          >
            {p.tianPanXing}
          </text>
          <text
            x={coord.x + cellSize / 2}
            y={coord.y + 68}
            textAnchor="middle"
            fill="rgba(180,170,150,0.55)"
            fontSize="10"
            fontFamily="serif"
          >
            {p.baMen}
          </text>
          <text
            x={coord.x + cellSize / 2}
            y={coord.y + 84}
            textAnchor="middle"
            fill="rgba(201,168,76,0.35)"
            fontSize="8"
            fontFamily="monospace"
          >
            {p.tianPanGan || ''}
          </text>
          <text
            x={coord.x + cellSize / 2}
            y={coord.y + 97}
            textAnchor="middle"
            fill="rgba(160,120,80,0.4)"
            fontSize="8"
            fontFamily="monospace"
          >
            {p.diPanStem}
          </text>
        </g>
      )}
    </g>
  );
}

function DirectionIndicator({ direction }) {
  var rotation = DIRECTION_ROTATION[direction] || 0;
  var cx = 165;
  var cy = 340;
  var r = 18;

  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 4} fill="rgba(42,34,27,0.6)" stroke="rgba(201,168,76,0.15)" strokeWidth="0.5" />
      <text x={cx} y={cy - r - 6} textAnchor="middle" fill="rgba(180,170,150,0.4)" fontSize="8" fontFamily="serif">
        方 位 指 示
      </text>
      <g transform={'translate(' + cx + ',' + cy + ') rotate(' + rotation + ')'}>
        <polygon points="0,-14 -5,6 0,2 5,6" fill="rgba(201,168,76,0.7)" />
        <circle cx="0" cy="0" r="3" fill="rgba(201,168,76,0.4)" />
      </g>
      <text x={cx} y={cy + 22} textAnchor="middle" fill="rgba(201,168,76,0.6)" fontSize="11" fontFamily="serif">
        {direction}
      </text>
    </g>
  );
}

export default function QimenGrid({ board, highlightPalace, onPalaceClick, showDirection }) {
  var svgRef = useRef(null);

  var handleClick = function (palaceData) {
    if (onPalaceClick) onPalaceClick(palaceData);
  };

  var highlightDir = null;
  if (showDirection && highlightPalace && board.palaces[highlightPalace]) {
    highlightDir = board.palaces[highlightPalace].direction;
  }

  return (
    <div className="relative flex flex-col items-center">
      <svg
        ref={svgRef}
        viewBox="0 0 330 380"
        className="w-full max-w-[360px] h-auto qimen-grid-svg"
        style={{ filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.4))' }}
      >
        <defs>
          <linearGradient id="gridBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(42,34,27,0.3)" />
            <stop offset="100%" stopColor="rgba(26,21,16,0.5)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x="0" y="0" width="330" height="380" fill="url(#gridBg)" rx="8" />

        {JIU_GONG_LAYOUT.flat().map(function (palaceNum) {
          return (
            <PalaceCell
              key={palaceNum}
              palaceNum={palaceNum}
              board={board}
              highlightPalace={highlightPalace}
              onClick={handleClick}
            />
          );
        })}

        {highlightDir && (
          <DirectionIndicator direction={highlightDir} />
        )}
      </svg>
    </div>
  );
}
