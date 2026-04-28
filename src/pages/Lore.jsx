import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, ChevronDown, X, Search, ChevronLeft, ChevronRight,
  Layers
} from 'lucide-react';
import hexagrams from '../data/hexagrams';
import HexagramDisplay, { HexagramSymbol } from '../components/HexagramDisplay';

const sections = [
  {
    id: 'intro',
    title: '六爻占卜简介',
    content: `六爻，又称"周易六爻"或"纳甲筮法"，是中国传统占卜术的一种，源于《周易》。

其核心原理是：
• 太极生两仪（阴阳）
• 两仪生四象（老阳、少阴、少阳、老阴）
• 四象生八卦（乾兑离震巽坎艮坤）
• 八卦两两相重，得六十四卦

每卦由六条爻线组成，从下往上依次为初爻到上爻。阳爻（—）和阴爻（- -）的不同组合，构成了六十四种不同的卦象，对应人生万物的各种情境。`
  },
  {
    id: 'method',
    title: '起卦方法',
    content: `一、铜钱摇卦法（最常用）
用三枚相同的铜钱，双手合扣，心中默念所问之事，摇动后抛下。
• 三枚皆正面（三个阴面）：老阴（6），变爻
• 两正一反：少阳（7），不变
• 一正两反：少阴（8），不变
• 三枚皆反面（三个阳面）：老阳（9），变爻
重复六次，从下往上记录，得一完整卦象。

二、时间起卦法
以当前年月日时等数字转化为卦象，快捷方便。

三、手动选卦法
直接逐爻选择阴阳，适合有明确想法时使用。`
  },
  {
    id: 'change',
    title: '变卦与动爻',
    content: `动爻是卦中发生变化的爻位，是解读卦象的关键。

• 老阳（9）和老阴（6）为"动爻"，会向相反方向变化
• 少阳（7）和少阴（8）为"静爻"，保持不变

本卦：最初摇得的卦象，代表当前状态
变卦：动爻变化后形成的新卦，代表未来趋势

动爻的意义：
• 初爻动：事情的开端
• 二爻动：事情的发展
• 三爻动：事情的关键转折
• 四爻动：事情的外部环境
• 五爻动：事情的核心人物
• 上爻动：事情的最终结果`
  },
  {
    id: 'trigram',
    title: '八卦基础',
    content: `八卦是六十四卦的基础，每卦由三个爻组成：

☰ 乾（天）— 刚健、创造、领导
☷ 坤（地）— 柔顺、包容、滋养
☳ 震（雷）— 震动、行动、觉醒
☵ 坎（水）— 险陷、流动、智慧
☶ 艮（山）— 静止、安稳、知止
☲ 离（火）— 光明、美丽、依附
☴ 巽（风）— 顺入、渗透、谦逊
☱ 兑（泽）— 喜悦、交流、言说

六十四卦中，上卦（外卦）代表外部环境，下卦（内卦）代表内部状态。`
  },
];

const TRIGRAM_FILTERS = [
  { key: 'all', label: '全部', symbol: '☯' },
  { key: '乾', label: '乾', symbol: '☰' },
  { key: '兑', label: '兑', symbol: '☱' },
  { key: '离', label: '离', symbol: '☲' },
  { key: '震', label: '震', symbol: '☳' },
  { key: '巽', label: '巽', symbol: '☴' },
  { key: '坎', label: '坎', symbol: '☵' },
  { key: '艮', label: '艮', symbol: '☶' },
  { key: '坤', label: '坤', symbol: '☷' },
];

export default function Lore() {
  const [expandedSection, setExpandedSection] = useState('intro');
  const [selectedHex, setSelectedHex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [trigramFilter, setTrigramFilter] = useState('all');

  const filteredHexagrams = useMemo(() => {
    return hexagrams.filter(h => {
      const matchesSearch = searchQuery === '' ||
        h.name.includes(searchQuery) ||
        h.pinyin.includes(searchQuery.toLowerCase()) ||
        h.meaning.includes(searchQuery) ||
        h.keywords.some(k => k.includes(searchQuery)) ||
        h.description.includes(searchQuery);
      const matchesTrigram = trigramFilter === 'all' ||
        h.upperTrigram === trigramFilter ||
        h.lowerTrigram === trigramFilter;
      return matchesSearch && matchesTrigram;
    });
  }, [searchQuery, trigramFilter]);

  const currentIndex = selectedHex
    ? filteredHexagrams.findIndex(h => h.id === selectedHex.id)
    : -1;

  const navigateHex = (direction) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < filteredHexagrams.length) {
      setSelectedHex(filteredHexagrams[newIndex]);
    }
  };

  return (
    <div className="flex flex-col pt-6 gap-5 pb-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <h2 className="font-serif text-xl text-gold-400 tracking-wider">六爻科普</h2>
        <p className="text-ink-500 text-xs mt-1">了解古老智慧的奥秘</p>
      </motion.div>

      {/* 科普章节 */}
      <div className="space-y-2">
        {sections.map(section => (
          <div key={section.id} className="card-mystic overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-2">
                <BookOpen size={14} className="text-gold-400" />
                <span className="font-serif text-sm text-ink-200">{section.title}</span>
              </div>
              <ChevronDown
                size={14}
                className={`text-ink-400 transition-transform ${
                  expandedSection === section.id ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {expandedSection === section.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4">
                    <p className="text-ink-400 text-xs leading-relaxed whitespace-pre-line font-serif">
                      {section.content}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* 六十四卦导航 */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-serif text-sm text-gold-400 tracking-wider">
            六十四卦导航
            <span className="text-ink-500 text-[10px] ml-2 font-sans">
              {filteredHexagrams.length} / 64
            </span>
          </h3>
          <div className="flex items-center gap-2">
            <Layers size={12} className="text-ink-500" />
          </div>
        </div>

        {/* 搜索框 */}
        <div className="relative mb-3">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="搜索卦名、拼音、意义、关键词..."
            className="w-full bg-ink-700/50 border border-ink-600 rounded-lg pl-9 pr-3 py-2.5
                       text-ink-200 text-xs placeholder:text-ink-500
                       focus:outline-none focus:border-gold-400/40 transition-colors"
          />
        </div>

        {/* 八卦分类过滤 */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {TRIGRAM_FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setTrigramFilter(f.key)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-serif transition-all ${
                trigramFilter === f.key
                  ? 'bg-gold-400/15 text-gold-400 border border-gold-400/40'
                  : 'bg-ink-700/30 text-ink-400 border border-ink-700/50 hover:border-ink-600/60 hover:text-ink-300'
              }`}
            >
              <span className="mr-1">{f.symbol}</span>
              {f.label}
            </button>
          ))}
        </div>

        {/* 卦列表 - 网格 */}
        {filteredHexagrams.length > 0 ? (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-2">
            {filteredHexagrams.map((h, idx) => (
              <motion.button
                key={h.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (idx % 20) * 0.02 }}
                onClick={() => setSelectedHex(h)}
                className="card-mystic p-2 text-center hover:border-gold-400/30 transition-all cursor-pointer group"
              >
                <div className="text-lg group-hover:scale-110 transition-transform">{h.unicode}</div>
                <div className="text-[10px] text-ink-400 font-serif mt-0.5">{h.name}</div>
                <div className="text-[8px] text-ink-600 mt-0.5">
                  {h.upperTrigram}☯{h.lowerTrigram}
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="card-mystic p-6 text-center">
            <p className="text-ink-500 text-xs font-serif">
              未找到匹配"{searchQuery}"的卦象
            </p>
          </div>
        )}
      </div>

      {/* 卦象详情弹窗 */}
      <AnimatePresence>
        {selectedHex && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSelectedHex(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="card-mystic p-5 max-w-sm w-full max-h-[85vh] overflow-y-auto scrollbar-thin"
            >
              {/* 弹窗头部 */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <HexagramSymbol unicode={selectedHex.unicode} size="large" />
                  <div>
                    <h4 className="font-serif text-lg text-gold-400">{selectedHex.name}</h4>
                    <p className="text-ink-400 text-xs">
                      {selectedHex.pinyin} · 第{selectedHex.id}卦
                    </p>
                    <p className="text-ink-500 text-[10px] mt-0.5">
                      上{selectedHex.upperTrigram} · 下{selectedHex.lowerTrigram}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedHex(null)}
                  className="text-ink-400 hover:text-ink-200 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* 爻线 */}
              <HexagramDisplay yao={selectedHex.yao} size="small" />

              {/* 导航按钮 */}
              <div className="flex items-center justify-between gap-2 mt-3 mb-3">
                <button
                  onClick={() => navigateHex(-1)}
                  disabled={currentIndex <= 0}
                  className="flex items-center gap-1 text-xs text-ink-400 hover:text-gold-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={14} />
                  <span className="font-serif">
                    {currentIndex > 0 ? filteredHexagrams[currentIndex - 1].name : '—'}
                  </span>
                </button>
                <span className="text-[10px] text-ink-500">
                  {currentIndex + 1} / {filteredHexagrams.length}
                </span>
                <button
                  onClick={() => navigateHex(1)}
                  disabled={currentIndex >= filteredHexagrams.length - 1}
                  className="flex items-center gap-1 text-xs text-ink-400 hover:text-gold-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span className="font-serif">
                    {currentIndex < filteredHexagrams.length - 1 ? filteredHexagrams[currentIndex + 1].name : '—'}
                  </span>
                  <ChevronRight size={14} />
                </button>
              </div>

              {/* 详情内容 */}
              <div className="space-y-3">
                <p className="text-ink-200 text-xs leading-relaxed font-serif">{selectedHex.meaning}</p>
                <p className="text-ink-400 text-xs leading-relaxed">{selectedHex.description}</p>

                {/* 卦辞 */}
                <div className="pt-2 border-t border-ink-700/50">
                  <p className="text-xs text-gold-400/80 font-serif mb-1">卦辞</p>
                  <p className="text-ink-200 text-xs leading-relaxed">{selectedHex.judgment}</p>
                </div>

                {/* 爻辞 */}
                {selectedHex.lines && (
                  <div className="pt-2 border-t border-ink-700/50">
                    <p className="text-xs text-gold-400/80 font-serif mb-1.5">爻辞</p>
                    <div className="space-y-1">
                      {selectedHex.lines.map(line => (
                        <div key={line.position} className="flex gap-2 text-xs">
                          <span className="text-ink-500 shrink-0 w-4">
                            {['初', '二', '三', '四', '五', '上'][line.position - 1]}
                          </span>
                          <span className="text-ink-300">{line.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 关键词 */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedHex.keywords.map(k => (
                    <span
                      key={k}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-gold-400/10 text-gold-400/70 border border-gold-400/20"
                    >
                      {k}
                    </span>
                  ))}
                </div>

                {/* 现代解读 */}
                {selectedHex.modern && (
                  <div className="pt-2 border-t border-ink-700/50 space-y-2">
                    <p className="text-xs text-gold-400/80 font-serif mb-1">现代解读</p>
                    {selectedHex.modern.career && (
                      <div>
                        <p className="text-[10px] text-ink-500 mb-0.5">事业</p>
                        <p className="text-ink-300 text-xs leading-relaxed">{selectedHex.modern.career}</p>
                      </div>
                    )}
                    {selectedHex.modern.relationship && (
                      <div>
                        <p className="text-[10px] text-ink-500 mb-0.5">感情</p>
                        <p className="text-ink-300 text-xs leading-relaxed">{selectedHex.modern.relationship}</p>
                      </div>
                    )}
                    {selectedHex.modern.health && (
                      <div>
                        <p className="text-[10px] text-ink-500 mb-0.5">健康</p>
                        <p className="text-ink-300 text-xs leading-relaxed">{selectedHex.modern.health}</p>
                      </div>
                    )}
                    {selectedHex.modern.advice && (
                      <div>
                        <p className="text-[10px] text-ink-500 mb-0.5">建议</p>
                        <p className="text-ink-300 text-xs leading-relaxed">{selectedHex.modern.advice}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 奇门遁甲简述 */}
      <div className="card-mystic p-4">
        <h3 className="font-serif text-sm text-gold-400 mb-2 tracking-wider">奇门遁甲简述</h3>
        <p className="text-ink-400 text-xs leading-relaxed font-serif">
          奇门遁甲是中国古代最高层次的预测学之一，与六爻同源而异流。
          它以时间、空间、方位为要素，结合天时（天盘）、地利（地盘）、人和（人盘）进行综合判断。
          
          三层盘式：
          • 天盘九星：天蓬、天芮、天冲、天辅、天禽、天心、天柱、天任、天英
          • 人盘八门：休、生、伤、杜、景、死、惊、开
          • 地盘九宫：一坎二坤三震四巽五中六乾七兑八艮九离

          奇门遁甲强调"趋吉避凶"，通过选择最佳的时间和方位，达到事半功倍的效果。
          与六爻侧重于"问事"不同，奇门更侧重于"择时择方"，二者相辅相成。
        </p>
      </div>
    </div>
  );
}
