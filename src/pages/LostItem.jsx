import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Home, Sparkles, Search, Clock, MapPin, Compass } from 'lucide-react';
import { castCoinDivination } from '../utils/divination';
import { saveToHistory } from '../utils/history';
import { getItemTypeLabel, generateLostItemReading } from '../utils/lostItem';
import { generateQimenBoard, generateLostItemReading as generateQimenLostReading } from '../utils/qimenEngine';

const ITEM_TYPES = [
  { value: 'wallet', label: '钱包', icon: '👛' },
  { value: 'phone', label: '手机', icon: '📱' },
  { value: 'keys', label: '钥匙', icon: '🔑' },
  { value: 'documents', label: '文件', icon: '📄' },
  { value: 'accessories', label: '饰品', icon: '💍' },
  { value: 'other', label: '其他', icon: '📦' },
];

function toBeijingDatetimeString() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const bj = new Date(utc + 8 * 3600000);
  return bj.toISOString().slice(0, 16);
}

export default function LostItem() {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [itemType, setItemType] = useState('wallet');
  const [lostTime, setLostTime] = useState(toBeijingDatetimeString());
  const [location, setLocation] = useState('');
  const [isCasting, setIsCasting] = useState(false);
  const [error, setError] = useState('');
  const [useQimen, setUseQimen] = useState(false);

  const handleCast = () => {
    if (!description.trim()) {
      setError('请描述丢失的物品');
      return;
    }
    setError('');

    if (useQimen) {
      navigate('/qimen', {
        state: {
          qimenLostMode: true,
          itemDescription: description.trim(),
          lostTime: lostTime,
          location: location.trim(),
        },
      });
      return;
    }

    setIsCasting(true);

    const result = castCoinDivination();
    const lostItemInfo = {
      description: description.trim(),
      itemType,
      lostTime,
      location: location.trim(),
    };
    const reading = generateLostItemReading(result, lostItemInfo);

    const fullResult = {
      ...result,
      type: 'lost-item',
      question: `寻物：${description.trim()}`,
      lostItemInfo,
      lostItemReading: reading,
    };

    const saved = saveToHistory(fullResult);
    fullResult.id = saved.id;

    setTimeout(() => {
      navigate('/lost-result', { state: { result: fullResult } });
    }, 600);
  };

  return (
    <div className="flex flex-col pt-4 gap-5">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-ink-400 hover:text-ink-200 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <p className="text-ink-500 text-xs font-serif">寻物占 · {useQimen ? '奇门寻物' : '六爻寻物'}</p>
        <button
          onClick={() => setUseQimen(!useQimen)}
          className={[
            'flex items-center gap-1 text-[10px] px-2 py-1 rounded-full border transition-all',
            useQimen
              ? 'border-jade-400/40 text-jade-400 bg-jade-400/10'
              : 'border-gold-400/30 text-gold-400 bg-gold-400/10',
          ].join(' ')}
        >
          <Compass size={10} />
          <span className="font-serif">{useQimen ? '奇门' : '六爻'}</span>
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <h2 className="font-serif text-xl text-gold-400 tracking-wider">🔍 寻物占</h2>
        <p className="text-ink-500 text-xs mt-1">六爻寻物 · 以卦象推方位</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card-mystic p-5 flex flex-col gap-4"
      >
        <div>
          <label className="text-ink-400 text-xs font-serif flex items-center gap-1.5 mb-1.5">
            <Search size={12} />
            <span>物品描述</span>
            <span className="text-red-400/60">*</span>
          </label>
          <textarea
            value={description}
            onChange={e => { setDescription(e.target.value); setError(''); }}
            placeholder="请描述丢失的物品，如颜色、品牌、特征..."
            rows={3}
            className="w-full bg-ink-800/50 border border-ink-700/50 rounded-lg p-3 text-sm text-ink-200 placeholder-ink-500/50 resize-none focus:outline-none focus:border-gold-400/30 transition-colors"
          />
          {error && <p className="text-red-400 text-[10px] mt-1">{error}</p>}
        </div>

        <div>
          <label className="text-ink-400 text-xs font-serif flex items-center gap-1.5 mb-1.5">
            <span>物品类型</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {ITEM_TYPES.map(t => (
              <button
                key={t.value}
                type="button"
                onClick={() => setItemType(t.value)}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  itemType === t.value
                    ? 'border-gold-400/40 bg-gold-400/10 text-gold-400'
                    : 'border-ink-700/30 bg-ink-800/30 text-ink-400 hover:border-ink-600/50'
                }`}
              >
                <span className="text-base">{t.icon}</span>
                <p className="text-[10px] font-serif mt-0.5">{t.label}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-ink-400 text-xs font-serif flex items-center gap-1.5 mb-1.5">
            <Clock size={12} />
            <span>丢失时间</span>
          </label>
          <input
            type="datetime-local"
            value={lostTime}
            onChange={e => setLostTime(e.target.value)}
            className="w-full bg-ink-800/50 border border-ink-700/50 rounded-lg p-2.5 text-sm text-ink-200 focus:outline-none focus:border-gold-400/30 transition-colors"
          />
        </div>

        <div>
          <label className="text-ink-400 text-xs font-serif flex items-center gap-1.5 mb-1.5">
            <MapPin size={12} />
            <span>丢失大致地点</span>
            <span className="text-ink-500 text-[9px]">（可选）</span>
          </label>
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="如：家里客厅、办公室、地铁站..."
            className="w-full bg-ink-800/50 border border-ink-700/50 rounded-lg p-2.5 text-sm text-ink-200 placeholder-ink-500/50 focus:outline-none focus:border-gold-400/30 transition-colors"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center gap-3"
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleCast}
          disabled={isCasting}
          className="btn-mystic flex items-center gap-2 px-8 py-3 disabled:opacity-50"
        >
          {isCasting ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="inline-block"
              >
                ☯
              </motion.span>
              <span className="font-serif">起卦中...</span>
            </>
          ) : (
            <>
              <Sparkles size={18} />
              <span className="font-serif">开始起卦</span>
            </>
          )}
        </motion.button>
        <p className="text-ink-500 text-[10px] font-serif text-center">
          将以铜钱摇卦法起六爻，结合卦象推断方位
        </p>
      </motion.div>
    </div>
  );
}
