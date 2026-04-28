import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Home, Sparkles, BookOpen, Bookmark, Check, X, Maximize2 } from 'lucide-react';
import HexagramDisplay, { HexagramSymbol } from '../components/HexagramDisplay';
import BaguaCompass from '../components/BaguaCompass';
import ShareButton from '../components/ShareButton';
import { updateHistoryNote } from '../utils/history';

const YAO_POSITIONS = ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'];

function YaoLineMini({ yang, moving }) {
  return (
    <div className="flex items-center justify-center" style={{ width: 80, height: 14 }}>
      {yang ? (
        <div className={`hexagram-line yang ${moving ? 'moving' : ''}`} style={{ width: '100%', height: 3 }} />
      ) : (
        <div className="hexagram-line yin" style={{ width: '100%', height: 3 }} />
      )}
    </div>
  );
}

function HexagramColumn({ hexagram, title, changingYao }) {
  if (!hexagram) return null;
  const reversedYao = [...hexagram.yao].reverse();
  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      <HexagramSymbol unicode={hexagram.unicode} size="small" />
      <p className="text-gold-400 font-serif text-sm tracking-wider">{hexagram.name}</p>
      <div className="flex flex-col items-center gap-px">
        {reversedYao.map((y, i) => {
          const idx = hexagram.yao.length - 1 - i;
          return <YaoLineMini key={i} yang={y === 1} moving={changingYao?.[idx]} />;
        })}
      </div>
      <p className="text-ink-500 text-[10px] text-center leading-relaxed">{hexagram.meaning}</p>
      <p className="text-ink-500 text-[10px] font-mono">{title}</p>
    </div>
  );
}

function HexagramEnlargeModal({ hexagram, onClose }) {
  if (!hexagram) return null;
  const reversedYao = [...hexagram.yao].reverse();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="card-mystic p-8 text-center max-w-sm w-full"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-ink-500 hover:text-ink-300">
          <X size={18} />
        </button>
        <HexagramSymbol unicode={hexagram.unicode} size="xlarge" />
        <h2 className="font-serif text-3xl text-gold-400 mt-3 tracking-wider">{hexagram.name}</h2>
        <p className="text-ink-400 text-sm mt-1">{hexagram.pinyin}</p>
        <p className="text-ink-300 text-sm leading-relaxed mt-2">{hexagram.meaning}</p>
        <div className="mt-4 flex flex-col items-center gap-1.5">
          {reversedYao.map((y, i) => (
            <div key={i} style={{ width: 160, height: 20 }}>
              {y === 1 ? (
                <div className="hexagram-line yang" style={{ width: '100%', height: 5 }} />
              ) : (
                <div className="hexagram-line yin" style={{ width: '100%', height: 5 }} />
              )}
            </div>
          ))}
        </div>
        <p className="text-ink-500 text-xs font-serif mt-3">《{hexagram.judgment}》</p>
      </motion.div>
    </motion.div>
  );
}

function InfoSection({ label, children, icon }) {
  return (
    <div className="rounded-lg bg-ink-800/30 border border-ink-700/30 p-3">
      <p className="text-[9px] text-ink-500 font-serif mb-1.5 flex items-center gap-1">
        {icon && <span>{icon}</span>}
        <span>{label}</span>
      </p>
      <div className="text-ink-200 text-xs leading-relaxed">{children}</div>
    </div>
  );
}

export default function LostResult() {
  const location = useLocation();
  const result = location.state?.result;
  const [showNormal, setShowNormal] = useState(false);
  const [note, setNote] = useState(result?.note || '');
  const [saved, setSaved] = useState(false);
  const [enlargeHex, setEnlargeHex] = useState(null);

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center pt-20 gap-4">
        <p className="text-ink-400 font-serif">暂无卦象数据</p>
        <Link to="/lost-item" className="btn-mystic">去寻物</Link>
      </div>
    );
  }

  const hex = result.originalHexagram;
  const changed = result.changedHexagram;
  const reading = result.lostItemReading;

  if (!hex || !hex.unicode || !hex.yao) {
    return (
      <div className="flex flex-col items-center justify-center pt-20 gap-4">
        <p className="text-ink-400 font-serif">卦象数据异常，请重新起卦</p>
        <Link to="/lost-item" className="btn-mystic">重新寻物</Link>
      </div>
    );
  }

  const saveNote = () => {
    if (result.id) {
      updateHistoryNote(result.id, note);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const dir = reading?.primaryDirection;

  return (
    <div className="flex flex-col pt-4 gap-5">
      <div className="flex items-center justify-between">
        <Link to="/lost-item" className="text-ink-400 hover:text-ink-200 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <Link to="/" className="text-ink-400 hover:text-ink-200 transition-colors">
          <Home size={20} />
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="card-mystic p-5 text-center relative"
      >
        <button
          onClick={() => setEnlargeHex(hex)}
          className="absolute top-3 right-3 text-ink-500 hover:text-gold-400 transition-colors"
        >
          <Maximize2 size={16} />
        </button>
        <p className="text-ink-400 text-xs mb-2 italic">「{result.question || `寻物：${reading?.itemTypeLabel || ''}`}」</p>
        <div className="cursor-pointer" onClick={() => setEnlargeHex(hex)}>
          <HexagramSymbol unicode={hex.unicode} size="large" />
        </div>
        <h2 className="font-serif text-2xl text-gold-400 mt-2 tracking-wider">{hex.name}</h2>
        <p className="text-ink-400 text-xs mt-1">{hex.pinyin} · {hex.meaning}</p>
        <div className="mt-3">
          <HexagramDisplay yao={hex.yao} changingYao={result.changingYao} />
        </div>
      </motion.div>

      {reading && !showNormal && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="card-mystic p-5"
          style={{
            borderColor: 'rgba(201,168,76,0.35)',
            boxShadow: '0 0 30px rgba(201,168,76,0.08), inset 0 0 30px rgba(201,168,76,0.03)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🔍</span>
            <h3 className="font-serif text-sm text-gold-400 tracking-wider">寻物专属解读</h3>
            <span className="h-px flex-1 bg-gradient-to-r from-gold-400/30 to-transparent" />
          </div>

          <div className="flex flex-col items-center mb-4">
            <BaguaCompass
              highlightedDirection={dir?.direction}
              size={200}
            />
          </div>

          <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-ink-800/30 border border-ink-700/30">
            <div className="flex flex-col items-center gap-0.5 shrink-0">
              <span className="text-lg">{reading.yongShenIcon}</span>
              <span className="text-[10px] text-gold-400 font-serif">{reading.yongShen}</span>
              <span className="text-[18px]">{dir?.symbol}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-ink-200 text-xs leading-relaxed">
                物品类型：<span className="text-gold-400/90">{reading.itemTypeLabel}</span>
              </p>
              <p className="text-ink-300 text-[11px] leading-relaxed mt-1">
                用神为<strong className="text-gold-400/80">{reading.yongShen}</strong>，
                内卦<span className="text-ink-200">{reading.lowerTrigramName}</span>（{dir?.element}）
                指向<strong className="text-gold-400/80">{dir?.direction}</strong>
              </p>
              {reading.timeSinceLost && (
                <p className="text-ink-500 text-[10px] mt-1">{reading.timeSinceLost}</p>
              )}
            </div>
          </div>

          {reading.relativePosition && (
            <div className="space-y-2 mb-4">
              <InfoSection label="方位与距离" icon="📍">
                <p>{reading.relativePosition.fullDescription}</p>
              </InfoSection>

              <InfoSection label="搜索范围" icon="📏">
                <p>距离约 <strong className="text-gold-400/80">{reading.relativePosition.distance}</strong>，
                {reading.relativePosition.distanceDesc}</p>
                <p className="text-ink-400 mt-1">{reading.relativePosition.coveringHint}</p>
              </InfoSection>

              <InfoSection label="时间线索" icon="⏰">
                <p>丢失时段：{reading.relativePosition.timingHint.label} · {reading.relativePosition.timingHint.hint}</p>
                <p className="text-ink-400 mt-1">物品类型提示：{reading.relativePosition.itemHint}</p>
              </InfoSection>

              <InfoSection label="环境分析" icon="🌿">
                <p>{reading.relativePosition.environmentDesc}</p>
              </InfoSection>
            </div>
          )}

          <div className="rounded-lg bg-gold-400/5 border border-gold-400/20 p-3 mb-3">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-sm">{reading.difficulty.icon}</span>
              <span className="text-[11px] font-serif text-gold-400">找回可能性</span>
            </div>
            <p className="text-ink-200 text-sm leading-relaxed">{reading.difficulty.text}</p>
          </div>

          <InfoSection label="行动建议" icon="🎯">
            <p>{reading.searchSuggestion}</p>
            <p className="text-ink-400 mt-1">{reading.secondarySuggestion}</p>
          </InfoSection>

          {reading.relativePosition?.searchSequence && (
            <div className="mt-2 rounded-lg bg-gold-400/5 border border-gold-400/20 p-3">
              <p className="text-[9px] text-ink-500 font-serif mb-1.5">🔍 搜索路线建议</p>
              <p className="text-ink-200 text-xs leading-relaxed">{reading.relativePosition.searchSequence}</p>
            </div>
          )}

          <div className="mt-2">
            <InfoSection label="爻动解读" icon="⚡">
              <p>{reading.movingHint}</p>
            </InfoSection>
          </div>

          <div className="mt-2">
            <InfoSection label="综合建议" icon="💡">
              <p>{reading.difficulty.advice}</p>
            </InfoSection>
          </div>
        </motion.div>
      )}

      {!reading && (
        <div className="card-mystic p-4">
          <h3 className="text-sm font-serif text-gold-400 tracking-wider mb-3 flex items-center gap-2">
            <span>卦象对比</span>
            <span className="h-px flex-1 bg-gradient-to-r from-gold-400/30 to-transparent" />
          </h3>
          <div className={`flex ${changed ? 'gap-3' : 'justify-center'}`}>
            <HexagramColumn hexagram={hex} title="本卦" changingYao={result.changingYao} />
            {changed && (
              <>
                <div className="w-px bg-ink-700/30 self-stretch" />
                <HexagramColumn hexagram={changed} title="变卦" />
              </>
            )}
          </div>
        </div>
      )}

      {showNormal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card-mystic p-4"
        >
          <h3 className="text-sm font-serif text-gold-400 tracking-wider mb-3 flex items-center gap-2">
            <span>卦辞解读</span>
            <span className="h-px flex-1 bg-gradient-to-r from-gold-400/30 to-transparent" />
          </h3>
          <p className="text-ink-200 text-base font-serif leading-relaxed text-center">{hex.judgment}</p>
          <p className="text-ink-300 text-sm leading-relaxed mt-3">{hex.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {hex.keywords?.map(k => (
              <span key={k} className="text-[10px] px-2 py-0.5 rounded-full bg-gold-400/10 text-gold-400/80 border border-gold-400/20">
                {k}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {showNormal && (
        <div className="card-mystic p-4">
          <h3 className="text-sm font-serif text-gold-400 tracking-wider mb-3 flex items-center gap-2">
            <span>现代实用决策建议</span>
            <span className="h-px flex-1 bg-gradient-to-r from-gold-400/30 to-transparent" />
          </h3>
          <div className="space-y-2.5">
            {Object.entries(hex.modern || {}).map(([key, val]) => (
              <div key={key} className="p-3 rounded-lg bg-ink-800/30">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-1 h-1 rounded-full ${
                    key === 'career' ? 'bg-blue-400' :
                    key === 'relationship' ? 'bg-red-400' :
                    key === 'health' ? 'bg-jade-400' : 'bg-gold-400'
                  }`} />
                  <span className="text-[11px] font-serif text-ink-400">
                    {key === 'career' ? '💼 事业决策' :
                     key === 'relationship' ? '❤️ 感情决策' :
                     key === 'health' ? '🌿 健康决策' : '📜 综合决策'}
                  </span>
                </div>
                <p className="text-ink-200 text-sm leading-relaxed">{val}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => setShowNormal(!showNormal)}
          className="btn-mystic flex-1 flex items-center justify-center gap-2 py-2.5 text-xs"
        >
          <BookOpen size={14} />
          <span>{showNormal ? '返回寻物解读' : '切换到普通决策解读'}</span>
        </button>
        <ShareButton hexagram={hex} reading={reading} question={result.question} />
      </div>

      <div className="card-mystic p-4">
        <p className="text-ink-400 text-xs font-serif mb-2 flex items-center gap-1.5">
          <Bookmark size={12} />
          <span>个人笔记</span>
        </p>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="记录你的感悟和问题..."
          className="w-full bg-transparent border border-ink-700/50 rounded-lg p-3 text-sm text-ink-200 placeholder-ink-500/50 resize-none h-20 focus:outline-none focus:border-gold-400/30 transition-colors"
        />
        <button
          onClick={saveNote}
          className="btn-mystic text-xs mt-2 py-2 px-4 flex items-center gap-1.5"
        >
          {saved ? <Check size={14} /> : <Bookmark size={14} />}
          <span>{saved ? '已保存' : '保存笔记'}</span>
        </button>
      </div>

      <p className="text-ink-500 text-[10px] text-center font-serif leading-relaxed">
        依据传统六爻卦宫、爻位、五行规则，仅供文化娱乐参考
      </p>

      <Link to="/lost-item" className="w-full">
        <button className="btn-mystic w-full flex items-center justify-center gap-2">
          <Sparkles size={16} />
          <span>再次寻物</span>
        </button>
      </Link>

      <AnimatePresence>
        {enlargeHex && (
          <HexagramEnlargeModal hexagram={enlargeHex} onClose={() => setEnlargeHex(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
