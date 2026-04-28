import { useState, useMemo, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Home, Clock, Sparkles, Save,
  RotateCcw, Search, Info, ChevronRight
} from 'lucide-react';
import QimenGrid from '../components/QimenGrid';
import PalaceDetailModal from '../components/PalaceDetailModal';
import QimenInterpretation from '../components/QimenInterpretation';
import QimenGuide from '../components/QimenGuide';
import {
  generateQimenBoard,
  generateLostItemReading,
} from '../utils/qimenEngine';
import { saveToHistory } from '../utils/history';

function toBeijingDatetimeString() {
  var now = new Date();
  var utc = now.getTime() + now.getTimezoneOffset() * 60000;
  var bj = new Date(utc + 8 * 3600000);
  return bj.toISOString().slice(0, 16);
}

function parseDatetime(str) {
  var d = new Date(str);
  if (isNaN(d.getTime())) return new Date();
  return d;
}

export default function QimenPage() {
  var location = useLocation();
  var navigate = useNavigate();
  var routeState = location.state;

  var [datetime, setDatetime] = useState(
    (routeState && routeState.lostTime) ? routeState.lostTime : toBeijingDatetimeString()
  );
  var [board, setBoard] = useState(null);
  var [mode, setMode] = useState(
    (routeState && routeState.qimenLostMode) ? 'lost-item' : 'normal'
  );
  var [itemDescription, setItemDescription] = useState(
    (routeState && routeState.itemDescription) || ''
  );
  var [lostLocation, setLostLocation] = useState(
    (routeState && routeState.location) || ''
  );
  var [saved, setSaved] = useState(false);
  var [selectedPalace, setSelectedPalace] = useState(null);
  var [showGuide, setShowGuide] = useState(false);

  useEffect(function () {
    if (routeState && routeState.qimenLostMode) {
      var date = parseDatetime(
        routeState.lostTime || toBeijingDatetimeString()
      );
      var b = generateQimenBoard(date);
      setBoard(b);
    }
  }, []);

  var handleGenerate = function () {
    var date = parseDatetime(datetime);
    var b = generateQimenBoard(date);
    setBoard(b);
    setSaved(false);
    setSelectedPalace(null);
  };

  var handleSave = function () {
    if (!board) return;
    var record = {
      type: 'qimen',
      timestamp: Date.now(),
      date: datetime,
      fourPillars: board.fourPillars,
      dunInfo: board.dunInfo,
      qimenData: {
        zhiFuXing: board.zhiFuXing,
        zhiShiMen: board.zhiShiMen,
        xunShou: board.xunShou,
        palaces: board.palaces,
      },
    };
    if (mode === 'lost-item' && itemDescription.trim()) {
      record.lostItemReading = generateLostItemReading(board, itemDescription.trim(), lostLocation.trim());
      record.itemDescription = itemDescription.trim();
      record.lostLocation = lostLocation.trim();
    }
    var savedRec = saveToHistory(record);
    if (savedRec) setSaved(true);
  };

  var lostReading = useMemo(function () {
    if (!board || mode !== 'lost-item' || !itemDescription.trim()) return null;
    return generateLostItemReading(board, itemDescription.trim(), lostLocation.trim());
  }, [board, mode, itemDescription, lostLocation]);

  var palacesArray = useMemo(function () {
    if (!board || !board.palaces) return [];
    return Object.keys(board.palaces).map(function (k) {
      return board.palaces[k];
    });
  }, [board]);

  return (
    <div className="flex flex-col pt-4 gap-5 pb-8">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-ink-400 hover:text-ink-200 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <p className="text-ink-500 text-xs font-serif">🌀 时家奇门排盘</p>
        <Link to="/" className="text-ink-400 hover:text-ink-200 transition-colors">
          <Home size={20} />
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <h2 className="font-serif text-xl text-gold-400 tracking-wider">🌀 时家奇门</h2>
        <p className="text-ink-500 text-xs mt-1">三式之首 · 天地人神四盘同观</p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.98 }}
        onClick={function () { setShowGuide(true); }}
        className="w-full card-mystic p-3 flex items-center justify-center gap-2 cursor-pointer hover:border-gold-400/30 transition-all"
        style={{ borderColor: 'rgba(244,196,48,0.2)' }}
      >
        <span className="text-base">📖</span>
        <span className="font-serif text-xs text-gold-400 tracking-wider">如何看盘 &amp; 解读指南</span>
        <ChevronRight size={14} className="text-gold-400/60" />
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-mystic p-4 flex flex-col gap-3"
      >
        <div className="flex items-center justify-between">
          <label className="text-ink-400 text-xs font-serif flex items-center gap-1.5">
            <Clock size={12} />
            <span>选择时间</span>
          </label>
          <div className="flex gap-1">
            <button
              onClick={function () { setMode('normal'); }}
              className={[
                'px-2.5 py-1 rounded text-[10px] font-serif transition-all',
                mode === 'normal'
                  ? 'bg-gold-400/15 text-gold-400 border border-gold-400/30'
                  : 'text-ink-500 border border-transparent hover:text-ink-300',
              ].join(' ')}
            >
              常规
            </button>
            <button
              onClick={function () { setMode('lost-item'); }}
              className={[
                'px-2.5 py-1 rounded text-[10px] font-serif transition-all',
                mode === 'lost-item'
                  ? 'bg-gold-400/15 text-gold-400 border border-gold-400/30'
                  : 'text-ink-500 border border-transparent hover:text-ink-300',
              ].join(' ')}
            >
              寻物
            </button>
          </div>
        </div>

        <input
          type="datetime-local"
          value={datetime}
          onChange={function (e) { setDatetime(e.target.value); }}
          className="w-full bg-ink-800/50 border border-ink-700/50 rounded-lg p-2.5 text-sm text-ink-200 focus:outline-none focus:border-gold-400/30 transition-colors"
        />

        {mode === 'lost-item' && (
          <div className="space-y-2">
            <div>
              <label className="text-ink-400 text-xs font-serif flex items-center gap-1 mb-1.5">
                <Search size={12} />
                <span>丢失物品描述</span>
              </label>
              <textarea
                value={itemDescription}
                onChange={function (e) { setItemDescription(e.target.value); }}
                placeholder="请描述丢失的物品..."
                rows={2}
                className="w-full bg-ink-800/50 border border-ink-700/50 rounded-lg p-2.5 text-sm text-ink-200 placeholder-ink-500/50 resize-none focus:outline-none focus:border-gold-400/30 transition-colors"
              />
            </div>
            <div>
              <label className="text-ink-400 text-xs font-serif flex items-center gap-1 mb-1.5">
                <Info size={12} />
                <span>可能丢失地点（可选）</span>
              </label>
              <input
                type="text"
                value={lostLocation}
                onChange={function (e) { setLostLocation(e.target.value); }}
                placeholder="例如：家中、办公室、户外..."
                className="w-full bg-ink-800/50 border border-ink-700/50 rounded-lg p-2.5 text-sm text-ink-200 placeholder-ink-500/50 focus:outline-none focus:border-gold-400/30 transition-colors"
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-center">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleGenerate}
            className="btn-mystic flex items-center gap-2 px-6 py-2.5 text-sm"
          >
            <Sparkles size={16} />
            <span className="font-serif">起局</span>
          </motion.button>
        </div>
      </motion.div>

      {board && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="card-mystic p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-sm text-gold-400 tracking-wider">排盘结果</h3>
              <div className="flex items-center gap-2">
                {!saved ? (
                  <button
                    onClick={handleSave}
                    className="text-ink-500 hover:text-gold-400 transition-colors"
                    title="保存到历史"
                  >
                    <Save size={14} />
                  </button>
                ) : (
                  <span className="text-[10px] text-jade-400">已保存</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3 text-xs bg-ink-800/30 rounded-lg p-3">
              <div>
                <span className="text-ink-500">四柱：</span>
                <span className="text-ink-200 font-serif">
                  {board.fourPillars.year} {board.fourPillars.month} {board.fourPillars.day} {board.fourPillars.hour}
                </span>
              </div>
              <div>
                <span className="text-ink-500">时辰：</span>
                <span className="text-ink-200 font-serif">{board.fourPillars.shiChenName}时</span>
              </div>
              <div>
                <span className="text-ink-500">遁局：</span>
                <span className={board.dunInfo.isYangDun ? 'text-red-400' : 'text-blue-400'}>
                  {board.dunInfo.dunType}{board.dunInfo.juNumber}局
                </span>
              </div>
              <div>
                <span className="text-ink-500">节气：</span>
                <span className="text-ink-200 font-serif">{board.dunInfo.currentTerm.name}</span>
              </div>
              <div>
                <span className="text-ink-500">值符：</span>
                <span className="text-red-400 font-serif">{board.zhiFuXing}</span>
              </div>
              <div>
                <span className="text-ink-500">值使：</span>
                <span className="text-red-400 font-serif">{board.zhiShiMen}</span>
              </div>
              <div className="col-span-2">
                <span className="text-ink-500">旬首：</span>
                <span className="text-ink-200 font-serif">{board.xunShou}</span>
              </div>
            </div>

            <QimenGrid
              board={board}
              highlightPalace={selectedPalace ? selectedPalace.palaceIndex : null}
              onPalaceClick={function (p) { setSelectedPalace(p); }}
              showDirection={mode === 'lost-item'}
            />

            <div className="mt-2 flex items-center justify-center gap-3 text-[10px] text-ink-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500/50" /> 值符/值使
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-gold-400/50" /> 高亮方位
              </span>
              <span>点击宫位查看详情</span>
            </div>
          </div>

          <QimenInterpretation
            palaces={palacesArray}
            fourPillars={board.fourPillars}
            isLostMode={mode === 'lost-item'}
            lostItem={lostReading}
            zhiFu={board.zhiFuXing}
            zhiShi={board.zhiShiMen}
            jvShu={board.dunInfo.juNumber}
            yinYang={board.dunInfo.isYangDun ? '阳遁' : '阴遁'}
          />

          <div className="flex items-center justify-center gap-3 flex-wrap">
            {mode === 'lost-item' && (
              <button
                onClick={function () { navigate('/lost-item'); }}
                className="btn-mystic flex items-center gap-2 px-4 py-2 text-xs"
                style={{ borderColor: 'rgba(91,140,175,0.3)' }}
              >
                <ArrowLeft size={14} />
                <span className="font-serif">返回六爻</span>
              </button>
            )}
            <button
              onClick={handleGenerate}
              className="btn-mystic flex items-center gap-2 px-4 py-2 text-xs"
            >
              <RotateCcw size={14} />
              <span className="font-serif">重新起局</span>
            </button>
            {!saved && (
              <button
                onClick={handleSave}
                className="btn-mystic flex items-center gap-2 px-4 py-2 text-xs"
                style={{ borderColor: 'rgba(91,140,111,0.3)' }}
              >
                <Save size={14} />
                <span className="font-serif">保存到历史</span>
              </button>
            )}
          </div>
        </motion.div>
      )}

      {!board && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card-mystic p-4 text-center"
        >
          <p className="text-ink-500 text-xs font-serif leading-relaxed">
            时家奇门以时间为依据排盘
          </p>
          <p className="text-ink-500 text-[10px] font-serif mt-1">
            选择时间后点击"起局"生成完整奇门遁甲盘
          </p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card-mystic p-4"
      >
        <div className="flex items-center gap-2 mb-2">
          <Info size={12} className="text-gold-400 shrink-0" />
          <h3 className="font-serif text-xs text-gold-400 tracking-wider">时家奇门简介</h3>
        </div>
        <p className="text-ink-500 text-[10px] leading-relaxed font-serif">
          奇门遁甲，中国古老术数之一，与太乙、六壬并称"三式"。时家奇门以时柱为依据，
          通过排定九宫、九星、八门、八神，分析天地人神四盘关系，判断事物吉凶方位。
        </p>
        <div className="mt-2 pt-2 border-t border-ink-700/30">
          <p className="text-ink-500 text-[10px] leading-relaxed font-serif">
            本局采用拆补法计算：以节气定阴阳遁，以日干支定局数，以时干支定值符值使。
            本工具采用纯本地计算，不涉及任何网络请求，数据仅供文化参考。
          </p>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedPalace && (
          <PalaceDetailModal
            palace={selectedPalace}
            isLostMode={mode === 'lost-item'}
            onClose={function () { setSelectedPalace(null); }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showGuide && (
          <QimenGuide onClose={function () { setShowGuide(false); }} />
        )}
      </AnimatePresence>
    </div>
  );
}
