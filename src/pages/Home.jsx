import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, BookOpen, Search, Compass } from 'lucide-react';
import { getDailyHexagram } from '../data/hexagrams';
import HexagramDisplay, { HexagramSymbol } from '../components/HexagramDisplay';

export default function Home() {
  const [daily, setDaily] = useState(null);
  const today = new Date();

  useEffect(() => {
    setDaily(getDailyHexagram());
  }, []);

  return (
    <div className="flex flex-col items-center pt-8 md:pt-4 gap-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center"
      >
        <div className="text-5xl mb-4 animate-float">☯</div>
        <h1 className="font-serif text-3xl md:text-4xl text-gold-400 text-shadow-glow tracking-wider">
          易卜
        </h1>
        <p className="text-ink-400 text-sm mt-2 tracking-wider font-serif">
          六爻奇门决策助手
        </p>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent mx-auto mt-4" />
        <p className="text-ink-500 text-xs mt-4 max-w-xs mx-auto leading-relaxed">
          古法六爻，融于指尖。探天地之玄机，明人事之吉凶。
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex flex-col items-center gap-3 w-full"
      >
        <Link to="/cast" className="w-full max-w-xs">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-mystic w-full flex items-center justify-center gap-3 text-lg px-10 py-4"
          >
            <Sparkles size={22} />
            <span className="font-serif tracking-wider">立即起卦</span>
          </motion.button>
        </Link>
        <Link to="/lost-item" className="w-full max-w-xs">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-mystic w-full flex items-center justify-center gap-3 py-3"
            style={{
              borderColor: 'rgba(201,168,76,0.4)',
              background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.02))',
            }}
          >
            <span className="text-lg">🔍</span>
            <span className="font-serif tracking-wider">寻物占</span>
          </motion.button>
        </Link>
        <Link to="/qimen" className="w-full max-w-xs">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-mystic w-full flex items-center justify-center gap-3 py-3"
            style={{
              borderColor: 'rgba(91,140,111,0.4)',
              background: 'linear-gradient(135deg, rgba(91,140,111,0.08), rgba(91,140,111,0.02))',
            }}
          >
            <Compass size={20} />
            <span className="font-serif tracking-wider">时家奇门排盘</span>
          </motion.button>
        </Link>
      </motion.div>

      {daily && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={14} className="text-gold-400" />
            <span className="text-ink-400 text-xs font-serif tracking-wider">每日一卦</span>
            <div className="flex-1 h-px bg-gradient-to-r from-gold-400/30 to-transparent" />
          </div>
          <div className="card-mystic p-5">
            <div className="flex items-center gap-4">
              <HexagramSymbol unicode={daily.unicode} size="large" />
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-xl text-ink-100">{daily.name}</span>
                  <span className="text-ink-400 text-xs">{daily.pinyin}</span>
                </div>
                <p className="text-ink-400 text-xs mt-1 leading-relaxed">
                  {daily.meaning}
                </p>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {daily.keywords.slice(0, 3).map(k => (
                    <span key={k} className="text-[10px] px-2 py-0.5 rounded-full bg-gold-400/10 text-gold-400/70 border border-gold-400/20">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-ink-700/50">
              <HexagramDisplay yao={daily.yao} size="small" />
            </div>
            <div className="mt-3 pt-3 border-t border-ink-700/50">
              <p className="text-ink-500 text-[10px] font-serif mb-1.5">今日启示</p>
              <p className="text-ink-300 text-sm leading-relaxed italic">"{daily.judgment}"</p>
              <p className="text-ink-500 text-[10px] text-right mt-1 font-mono">
                以今日之数 · 得{today.getMonth() + 1}月{today.getDate()}日之卦
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="grid grid-cols-2 gap-3 w-full mt-2"
      >
        <Link to="/lore">
          <div className="card-mystic p-4 text-center hover:border-gold-400/30 transition-all cursor-pointer">
            <BookOpen size={18} className="text-gold-400 mx-auto mb-1" />
            <p className="text-ink-400 text-xs font-serif">六爻科普</p>
          </div>
        </Link>
        <Link to="/history">
          <div className="card-mystic p-4 text-center hover:border-gold-400/30 transition-all cursor-pointer">
            <TrendingUp size={18} className="text-gold-400 mx-auto mb-1" />
            <p className="text-ink-400 text-xs font-serif">历史记录</p>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
