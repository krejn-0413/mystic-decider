import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Sparkles, Bookmark, Check, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import HexagramDisplay, { HexagramSymbol } from '../components/HexagramDisplay';
import { updateHistoryNote } from '../utils/history';
import { getShiYing, getYaoGlossary, getPositionMeaning, GLOSSARY } from '../utils/liuyao';

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

function YaoCard({ line, yaoValue, isMoving, isShi, isYing, position }) {
  const [expanded, setExpanded] = useState(false);
  const glossary = getYaoGlossary(isShi, isYing, isMoving);
  const posMeaning = getPositionMeaning(position);

  return (
    <motion.div
      layout
      className={`card-mystic p-3 transition-all ${isMoving ? 'ring-1 ring-gold-400/30' : ''}`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 text-left"
      >
        <div className="flex flex-col items-center justify-center w-8 h-8 rounded-lg bg-ink-700/30">
          <span className="text-[10px] text-ink-400 font-mono">{position}</span>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-serif text-ink-200">{YAO_POSITIONS[position - 1]}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
              yaoValue === 1 ? 'text-ink-200 bg-ink-700/50' : 'text-ink-400 bg-ink-700/20'
            }`}>
              {yaoValue === 1 ? '─' : '- -'}
            </span>
            {isMoving && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-400/15 text-red-400">
                ⚡动爻
              </span>
            )}
            {isShi && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-gold-400/15 text-gold-400">
                世
              </span>
            )}
            {isYing && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-jade-400/15 text-jade-400">
                应
              </span>
            )}
          </div>
        </div>

        {expanded ? <ChevronUp size={14} className="text-ink-500" /> : <ChevronDown size={14} className="text-ink-500" />}
      </button>

      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="mt-3 pt-3 border-t border-ink-700/30 space-y-3"
        >
          <p className="text-ink-300 text-sm leading-relaxed">{line.text}</p>

          <div className="text-ink-400 text-xs leading-relaxed">
            <span className="text-ink-500 font-serif">{posMeaning.title}：</span>
            {posMeaning.desc}
          </div>

          {glossary.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {glossary.map(g => (
                <span key={g.label} className={`text-[10px] px-2 py-0.5 rounded ${g.bg} ${g.color}`}>
                  {g.label} · {g.desc}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function Result() {
  const location = useLocation();
  const result = location.state?.result;
  const [note, setNote] = useState(result?.note || '');
  const [saved, setSaved] = useState(false);
  const [glossaryExpanded, setGlossaryExpanded] = useState(false);

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center pt-20 gap-4">
        <p className="text-ink-400 font-serif">暂无卦象数据</p>
        <Link to="/cast" className="btn-mystic">去起卦</Link>
      </div>
    );
  }

  const hex = result.originalHexagram;
  const changed = result.changedHexagram;
  const shiYing = getShiYing(hex?.id || 1);

  const saveNote = () => {
    if (result.id) {
      updateHistoryNote(result.id, note);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  if (!hex) {
    return (
      <div className="flex flex-col items-center justify-center pt-20 gap-4">
        <p className="text-ink-400 font-serif">卦象数据异常</p>
        <Link to="/cast" className="btn-mystic">重新起卦</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col pt-4 gap-5">
      <div className="flex items-center justify-between">
        <Link to="/cast" className="text-ink-400 hover:text-ink-200 transition-colors">
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
        className="card-mystic p-5 text-center"
      >
        {result.question && (
          <p className="text-ink-400 text-xs mb-3 italic">「{result.question}」</p>
        )}
        <div className="relative flex items-center justify-center py-5">
          <motion.div
            className="absolute w-28 h-28 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(244,196,48,0.12), transparent 70%)',
            }}
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <div className="absolute w-[92px] h-[92px] rounded-full border border-gold-400/10" />
          <div className="absolute w-[78px] h-[78px] rounded-full border border-gold-400/20" style={{ borderStyle: 'dashed' }} />
          <div className="absolute w-[64px] h-[64px] rounded-full border border-gold-400/15" />
          <div className="relative z-10 drop-shadow-[0_0_12px_rgba(244,196,48,0.3)]">
            <HexagramSymbol unicode={hex.unicode} size="large" />
          </div>
        </div>
        <h2 className="font-serif text-2xl text-gold-400 mt-1 tracking-wider">{hex.name}</h2>
        <p className="text-ink-400 text-xs mt-1">{hex.pinyin} · {hex.meaning}</p>
        <div className="mt-3">
          <HexagramDisplay yao={hex.yao} changingYao={result.changingYao} />
        </div>
      </motion.div>

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
        {result.hasChanging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-3 pt-3 border-t border-ink-700/30"
          >
            <p className="text-ink-400 text-[10px] text-center leading-relaxed">
              ⚡ {result.changingYao.map((c, i) => c ? `${YAO_POSITIONS[i]}（${result.rounds?.[i]?.typeName || ''}）` : null).filter(Boolean).join('、')} 发生变化
            </p>
            <p className="text-ink-500 text-[10px] text-center mt-1">
              本卦为当前状态 · 变卦为发展趋势
            </p>
          </motion.div>
        )}
      </div>

      <div className="card-mystic p-4">
        <h3 className="text-sm font-serif text-gold-400 tracking-wider mb-3 flex items-center gap-2">
          <span>六爻详解</span>
          <span className="h-px flex-1 bg-gradient-to-r from-gold-400/30 to-transparent" />
          <button
            onClick={() => setGlossaryExpanded(!glossaryExpanded)}
            className="text-[10px] text-ink-500 hover:text-ink-300 flex items-center gap-1"
          >
            <BookOpen size={12} />
            <span>术语</span>
          </button>
        </h3>

        {glossaryExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="mb-3 p-3 rounded-lg bg-ink-800/30 space-y-2"
          >
            <p className="text-[10px] text-ink-500 font-serif mb-1">六爻基础术语</p>
            {GLOSSARY.map(g => (
              <div key={g.term} className="flex items-start gap-2">
                <span className="text-xs">{g.icon}</span>
                <div>
                  <span className="text-[11px] text-gold-400/80 font-serif">{g.term}</span>
                  <p className="text-[10px] text-ink-400 leading-relaxed">{g.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        <div className="space-y-1.5">
          {hex.lines.map(line => {
            const pos = line.position;
            return (
              <YaoCard
                key={pos}
                line={line}
                yaoValue={hex.yao[pos - 1]}
                isMoving={result.changingYao?.[pos - 1]}
                isShi={shiYing.shi === pos}
                isYing={shiYing.ying === pos}
                position={pos}
              />
            );
          })}
        </div>
      </div>

      <div className="card-mystic p-4">
        <h3 className="text-sm font-serif text-gold-400 tracking-wider mb-3 flex items-center gap-2">
          <span>卦辞解读</span>
          <span className="h-px flex-1 bg-gradient-to-r from-gold-400/30 to-transparent" />
        </h3>
        <p className="text-ink-200 text-base font-serif leading-relaxed text-center">{hex.judgment}</p>
        <p className="text-ink-300 text-sm leading-relaxed mt-3">{hex.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {hex.keywords.map(k => (
            <span key={k} className="text-[10px] px-2 py-0.5 rounded-full bg-gold-400/10 text-gold-400/80 border border-gold-400/20">
              {k}
            </span>
          ))}
        </div>
      </div>

      <div className="card-mystic p-4">
        <h3 className="text-sm font-serif text-gold-400 tracking-wider mb-3 flex items-center gap-2">
          <span>现代实用决策建议</span>
          <span className="h-px flex-1 bg-gradient-to-r from-gold-400/30 to-transparent" />
        </h3>
        <div className="space-y-2.5">
          {Object.entries(hex.modern).map(([key, val]) => (
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

      <div className="card-mystic p-4">
        <p className="text-ink-400 text-xs font-serif mb-2">个人笔记</p>
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

      <Link to="/cast" className="w-full">
        <button className="btn-mystic w-full flex items-center justify-center gap-2">
          <Sparkles size={16} />
          <span>再次起卦</span>
        </button>
      </Link>
    </div>
  );
}
