import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Clock, Edit3, Sparkles, RotateCcw, ChevronRight } from 'lucide-react';
import { castCoinDivination, castTimeDivination, castManualDivination } from '../utils/divination';
import { saveToHistory } from '../utils/history';

const methods = [
  { id: 'coin', icon: Coins, label: '铜钱摇卦', desc: '三枚古钱，六次投掷，得天地玄机' },
  { id: 'time', icon: Clock, label: '时间起卦', desc: '以当前北京时间，化万物为数' },
  { id: 'manual', icon: Edit3, label: '手动输入', desc: '逐爻点选，自定阴阳' },
];

const YAO_POSITIONS = ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'];

function Coin({ face, isAnimating, delay = 0 }) {
  return (
    <motion.div
      className="relative w-[68px] h-[68px] rounded-full flex items-center justify-center select-none"
      style={{
        background: 'radial-gradient(circle at 35% 35%, #e8c44a, #a67c00)',
        border: '2.5px solid #b8860b',
        color: '#2a1a0a',
        boxShadow: '0 4px 20px rgba(184,134,11,0.4), inset 0 2px 6px rgba(255,215,0,0.3)',
      }}
      animate={isAnimating ? {
        rotateX: [0, 360, 720, 1080, 1440, 1800],
        rotateY: [0, 180, 360, 540, 720, 900],
        y: [0, -60, -30, -70, -20, 0],
        scale: [1, 1.12, 1.02, 1.08, 0.95, 1],
      } : {
        rotateX: 0,
        rotateY: 0,
        y: 0,
        scale: 1,
      }}
      transition={isAnimating ? {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: delay * 0.08,
      } : {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        duration: 0.4,
      }}
    >
      <div
        className="absolute w-[18px] h-[18px] rounded-full"
        style={{
          background: 'radial-gradient(circle, #8b6914, #5a4510)',
          border: '1px solid #6b4f0a',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
        }}
      />
      {isAnimating ? (
        <span className="text-xl opacity-50 z-10" style={{ textShadow: '0 0 4px rgba(255,215,0,0.3)' }}>✦</span>
      ) : (
        <span className="text-base tracking-wider z-10 font-bold">{face}</span>
      )}
    </motion.div>
  );
}

function YaoLineBuilding({ yang, moving, label, delay = 0 }) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      className="flex items-center gap-2"
    >
      <span className="text-[10px] text-ink-500 w-8 text-right font-mono">{label}</span>
      <div className="relative flex-1" style={{ maxWidth: 140 }}>
        {yang ? (
          <div className={`hexagram-line yang ${moving ? 'moving' : ''}`} style={{ width: '100%' }} />
        ) : (
          <div className="hexagram-line yin" style={{ width: '100%' }} />
        )}
      </div>
      {moving && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-[10px] text-gold-400 w-4">⚡</motion.span>}
    </motion.div>
  );
}



export default function Cast() {
  const navigate = useNavigate();
  const [method, setMethod] = useState('coin');
  const [questionText, setQuestionText] = useState('');
  const [coinPhase, setCoinPhase] = useState('idle');
  const [currentRound, setCurrentRound] = useState(0);
  const [roundAnimState, setRoundAnimState] = useState('idle');
  const [allRounds, setAllRounds] = useState(null);
  const [completeResult, setCompleteResult] = useState(null);
  const [manualYao, setManualYao] = useState([null, null, null, null, null, null]);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const clearTimers = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetCoin = () => {
    clearTimers();
    setCoinPhase('idle');
    setCurrentRound(0);
    setRoundAnimState('idle');
    setAllRounds(null);
    setCompleteResult(null);
  };

  const startToss = () => {
    clearTimers();
    const result = castCoinDivination();
    const resultWithQuestion = { ...result, question: questionText.trim() || '' };
    setAllRounds(result.rounds);
    setCompleteResult(resultWithQuestion);
    setCoinPhase('tossing');

    const doRound = (r) => {
      setCurrentRound(r);
      setRoundAnimState('spinning');

      timerRef.current = setTimeout(() => {
        setRoundAnimState('revealed');

        timerRef.current = setTimeout(() => {
          if (r < 5) {
            doRound(r + 1);
          } else {
            setCoinPhase('complete');
            const saved = saveToHistory(resultWithQuestion);
            setCompleteResult(prev => ({ ...prev, id: saved.id }));
          }
        }, 1200);
      }, 1000);
    };

    doRound(0);
  };

  const viewResult = () => {
    if (completeResult) {
      navigate('/result', { state: { result: completeResult } });
    }
  };

  const handleTimeCast = () => {
    const result = castTimeDivination();
    const saved = saveToHistory(result);
    navigate('/result', { state: { result: { ...result, id: saved.id } } });
  };

  const handleManualCast = () => {
    if (manualYao.some(y => y === null)) return;
    const result = castManualDivination(manualYao);
    const saved = saveToHistory(result);
    navigate('/result', { state: { result: { ...result, id: saved.id } } });
  };

  const toggleManualYao = (index) => {
    const next = [...manualYao];
    if (next[index] === null) next[index] = 1;
    else if (next[index] === 1) next[index] = 0;
    else next[index] = null;
    setManualYao(next);
  };

  const revealedCount = roundAnimState === 'spinning' ? currentRound : currentRound + 1;
  const currentRoundData = allRounds?.[currentRound];

  return (
    <div className="flex flex-col pt-6 gap-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <h2 className="font-serif text-xl text-gold-400 tracking-wider">起卦</h2>
        <p className="text-ink-500 text-xs mt-1">选择起卦方式，探问天机</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-2 max-w-[400px] mx-auto">
        {methods.map(m => {
          const Icon = m.icon;
          const active = method === m.id;
          return (
            <motion.button
              key={m.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setMethod(m.id); resetCoin(); }}
              className={`card-mystic p-3 text-center cursor-pointer transition-all ${
                active ? 'border-gold-400/40 ring-1 ring-gold-400/20' : ''
              }`}
            >
              <Icon size={18} className={`mx-auto mb-1 ${active ? 'text-gold-400' : 'text-ink-400'}`} />
              <p className={`text-xs font-serif ${active ? 'text-gold-400' : 'text-ink-400'}`}>{m.label}</p>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {method === 'coin' && (
          <motion.div
            key="coin"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="card-mystic p-5 flex flex-col items-center gap-5"
          >
            <div className="w-full">
              <input
                type="text"
                value={questionText}
                onChange={e => setQuestionText(e.target.value)}
                placeholder="输入你想问的问题（可选）..."
                disabled={coinPhase !== 'idle'}
                className="w-full bg-transparent border border-ink-700/50 rounded-lg p-3 text-sm text-ink-200 placeholder-ink-500/50 text-center font-serif focus:outline-none focus:border-gold-400/30 transition-all disabled:opacity-40"
              />
            </div>

            {coinPhase === 'idle' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-5"
              >
                <div className="flex gap-4 opacity-40">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="w-[68px] h-[68px] rounded-full flex items-center justify-center text-xl"
                      style={{
                        background: 'radial-gradient(circle at 35% 35%, #e8c44a, #a67c00)',
                        border: '2.5px solid #b8860b',
                        color: '#2a1a0a',
                        boxShadow: '0 4px 20px rgba(184,134,11,0.4), inset 0 2px 6px rgba(255,215,0,0.3)',
                      }}
                    >
                      <div
                        className="absolute w-[18px] h-[18px] rounded-full"
                        style={{
                          background: 'radial-gradient(circle, #8b6914, #5a4510)',
                          border: '1px solid #6b4f0a',
                        }}
                      />
                      <span className="text-xs opacity-60 z-10">☰</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={startToss}
                  className="btn-mystic flex items-center gap-2 px-6 py-3"
                >
                  <Sparkles size={18} />
                  <span className="font-serif">开始摇卦</span>
                </button>
              </motion.div>
            )}

            {coinPhase === 'tossing' && (
              <div className="w-full flex flex-col items-center gap-5">
                <div className="flex items-center justify-center gap-4">
                  {[0, 1, 2].map(i => (
                    <Coin
                      key={i}
                      face={roundAnimState === 'revealed' ? currentRoundData?.faces[i] || '?' : '?'}
                      isAnimating={roundAnimState === 'spinning'}
                      delay={i}
                    />
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {roundAnimState === 'spinning' && (
                    <motion.div
                      key="spinning"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <p className="text-ink-400 text-xs font-serif">
                        第 {currentRound + 1} / 6 次 · 摇卦中...
                      </p>
                      <div className="flex gap-1 justify-center mt-1">
                        {[0, 1, 2, 3, 4, 5].map(i => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              i < revealedCount ? 'bg-gold-400' : i === currentRound ? 'bg-gold-400/40 animate-pulse' : 'bg-ink-700'
                            }`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {roundAnimState === 'revealed' && (
                    <motion.div
                      key="revealed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <motion.p
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        className={`text-base font-serif font-bold ${
                          currentRoundData?.isMoving ? 'text-gold-400' : 'text-ink-200'
                        }`}
                      >
                        {currentRoundData?.isMoving && <span className="mr-1">⚡</span>}
                        {YAO_POSITIONS[currentRound]} · {currentRoundData?.typeName}
                        {currentRoundData?.isMoving && <span className="ml-1">⚡</span>}
                      </motion.p>
                      <p className="text-ink-500 text-[10px] mt-1">
                        {currentRoundData?.faces.join(' ')} · {currentRoundData?.sum}数
                      </p>
                      <div className="flex gap-1 justify-center mt-2">
                        {[0, 1, 2, 3, 4, 5].map(i => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              i <= currentRound ? 'bg-gold-400' : 'bg-ink-700'
                            }`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="w-full border-t border-ink-700/30 pt-4">
                  <div className="flex flex-col items-center gap-1.5">
                    {Array.from({ length: revealedCount }, (_, i) => {
                      const round = allRounds[i];
                      return (
                        <YaoLineBuilding
                          key={i}
                          yang={round.yinYang === 1}
                          moving={round.isMoving}
                          label={YAO_POSITIONS[i]}
                          delay={0}
                        />
                      );
                    })}
                    {revealedCount < 6 && (
                      <div className="text-ink-600 text-[10px] font-serif mt-1">
                        ─── 自下而上 · 积爻成卦 ───
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {coinPhase === 'complete' && completeResult && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full flex flex-col items-center gap-5"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="text-center"
                >
                  <p className="text-gold-400 font-serif text-lg tracking-wider">
                    {completeResult.originalHexagram?.unicode} {completeResult.originalHexagram?.name}
                  </p>
                  <p className="text-ink-400 text-xs mt-1">
                    {completeResult.originalHexagram?.pinyin} · {completeResult.originalHexagram?.meaning}
                  </p>
                  {completeResult.question && (
                    <p className="text-ink-500 text-xs mt-2 italic">
                      「{completeResult.question}」
                    </p>
                  )}
                </motion.div>

                <div className="flex flex-col items-center gap-1 py-2">
                  {Array.from({ length: 6 }, (_, i) => {
                    const round = allRounds[i];
                    return (
                      <YaoLineBuilding
                        key={i}
                        yang={round.yinYang === 1}
                        moving={round.isMoving}
                        label={YAO_POSITIONS[5 - i]}
                        delay={(5 - i) * 0.08}
                      />
                    );
                  })}
                </div>

                {completeResult.hasChanging && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                  >
                    <p className="text-gold-400/80 text-xs font-serif mb-1">⚡ 动爻提示 ⚡</p>
                    <p className="text-ink-400 text-xs">
                      {completeResult.changingYao.map((c, i) =>
                        c ? `${YAO_POSITIONS[i]}（${allRounds[i].typeName}）` : null
                      ).filter(Boolean).join('、') || ''} 发生变化
                    </p>
                    {completeResult.changedHexagram && (
                      <p className="text-ink-400 text-xs mt-1">
                        变卦：{completeResult.changedHexagram.unicode} {completeResult.changedHexagram.name}
                      </p>
                    )}
                  </motion.div>
                )}

                <div className="flex gap-3 w-full">
                  <button
                    onClick={viewResult}
                    className="btn-mystic flex-1 flex items-center justify-center gap-2 py-3"
                  >
                    <span>查看详细解读</span>
                    <ChevronRight size={16} />
                  </button>
                  <button
                    onClick={resetCoin}
                    className="btn-mystic flex items-center justify-center gap-2 py-3 px-4"
                    style={{ flex: '0 0 auto' }}
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {method === 'time' && (
          <motion.div
            key="time"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="card-mystic p-6 flex flex-col items-center gap-5"
          >
            <Clock size={40} className="text-gold-400/60" />
            <p className="text-ink-400 text-sm text-center font-serif">
              以当前北京时间自动转化为数字起卦
            </p>
            <button onClick={handleTimeCast} className="btn-mystic flex items-center gap-2">
              <Sparkles size={16} />
              <span>读取时间起卦</span>
            </button>
          </motion.div>
        )}

        {method === 'manual' && (
          <motion.div
            key="manual"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="card-mystic p-6 flex flex-col items-center gap-5"
          >
            <Edit3 size={40} className="text-gold-400/60" />
            <p className="text-ink-400 text-sm text-center font-serif">
              从下往上，点击每一爻切换阴阳
            </p>

            <div className="flex flex-col items-center gap-1.5">
              {[...manualYao].reverse().map((y, i) => {
                const realIndex = manualYao.length - 1 - i;
                return (
                  <motion.button
                    key={realIndex}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleManualYao(realIndex)}
                    className={`w-32 h-7 rounded transition-all ${
                      y === null
                        ? 'border border-dashed border-ink-500/50'
                        : y === 1
                        ? 'bg-ink-100'
                        : 'bg-ink-100/30'
                    }`}
                    style={y === 0 ? {
                      background: 'linear-gradient(90deg, transparent 38%, #eee9dd 38%, #eee9dd 62%, transparent 62%)'
                    } : {}}
                  />
                );
              })}
            </div>

            <button
              onClick={handleManualCast}
              disabled={manualYao.some(y => y === null)}
              className="btn-mystic flex items-center gap-2 disabled:opacity-50"
            >
              <Sparkles size={16} />
              <span>确认起卦</span>
            </button>

            <p className="text-ink-500 text-xs">
              {manualYao.filter(y => y !== null).length}/6 爻已选
            </p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
