import { motion } from 'framer-motion';

function YaoLine({ yang, moving, index }) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ delay: index * 0.12, duration: 0.4, ease: 'easeOut' }}
      className={`flex items-center justify-center ${moving ? 'moving' : ''}`}
      style={{ width: 160, height: 22 }}
    >
      {yang ? (
        <div className={`hexagram-line yang ${moving ? 'moving' : ''}`} style={{ width: '100%' }} />
      ) : (
        <div className="hexagram-line yin" style={{ width: '100%' }} />
      )}
    </motion.div>
  );
}

export default function HexagramDisplay({ yao, changingYao, size = 'normal' }) {
  const width = size === 'large' ? 200 : size === 'small' ? 100 : 160;
  const reversedYao = [...yao].reverse();

  return (
    <div className="flex flex-col items-center gap-0.5 py-2">
      {reversedYao.map((y, i) => (
        <YaoLine
          key={i}
          yang={y === 1}
          moving={changingYao ? changingYao[yao.length - 1 - i] : false}
          index={i}
        />
      ))}
    </div>
  );
}

export function HexagramSymbol({ unicode, size = 'large' }) {
  const s = size === 'large' ? '72px' : size === 'small' ? '36px' : '48px';
  return (
    <div className="flex items-center justify-center" style={{ fontSize: s, lineHeight: 1 }}>
      {unicode}
    </div>
  );
}
