import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronRight } from 'lucide-react';

var JIU_GONG_DATA = [
  { number: 4, name: '巽宫', trigram: '☴', direction: '东南', wuxing: '木', color: '绿/青', family: '长女', symbol: '风·入·传播', memo: '巽为风，利传播沟通', season: '春夏之交' },
  { number: 9, name: '离宫', trigram: '☲', direction: '正南', wuxing: '火', color: '红/紫', family: '中女', symbol: '火·丽·光明', memo: '离为火，主文明显示', season: '夏' },
  { number: 2, name: '坤宫', trigram: '☷', direction: '西南', wuxing: '土', color: '黄/棕', family: '母', symbol: '地·顺·包容', memo: '坤为地，厚德载物', season: '夏秋之交' },
  { number: 3, name: '震宫', trigram: '☳', direction: '正东', wuxing: '木', color: '绿/青', family: '长男', symbol: '雷·动·奋起', memo: '震为雷，主动革新', season: '春' },
  { number: 5, name: '中宫', trigram: '☯', direction: '中央', wuxing: '土', color: '黄', family: '—', symbol: '太极·中和', memo: '中宫统摄八方', season: '四季' },
  { number: 7, name: '兑宫', trigram: '☱', direction: '正西', wuxing: '金', color: '白', family: '少女', symbol: '泽·悦·口舌', memo: '兑为泽，主喜悦交流', season: '秋' },
  { number: 8, name: '艮宫', trigram: '☶', direction: '东北', wuxing: '土', color: '黄/棕', family: '少男', symbol: '山·止·稳固', memo: '艮为山，主静止不动', season: '冬春之交' },
  { number: 1, name: '坎宫', trigram: '☵', direction: '正北', wuxing: '水', color: '黑/蓝', family: '中男', symbol: '水·险·智慧', memo: '坎为水，主智藏险', season: '冬' },
  { number: 6, name: '乾宫', trigram: '☰', direction: '西北', wuxing: '金', color: '白/金', family: '父', symbol: '天·健·领导', memo: '乾为天，自强不息', season: '秋冬之交' },
];

var JIU_GONG_LAYOUT = [[4, 9, 2], [3, 5, 7], [8, 1, 6]];

var STEP_DATA = [
  {
    step: 1, title: '看时间与局数',
    icon: '⏰',
    content: '首先查看排盘上方的四柱信息（年柱 月柱 日柱 时柱）和遁局信息。这是整个盘的"时空坐标"——知道当前处于哪个节气、阳遁还是阴遁、第几局，才能正确解读。',
    details: [
      '阳遁（☀️）：春夏之局，气机上升，宜积极进取',
      '阴遁（🌙）：秋冬之局，气机收敛，宜守成内省',
      '局数越小越接近节气交接点，局势未稳',
      '局数越大越远离节气，局势已定',
    ],
  },
  {
    step: 2, title: '找到"用神"或"日干"所在宫',
    icon: '🎯',
    content: '日干代表"你自己"或"求测之人"，时干代表"所问之事"。找到这两个天干所在的宫位，就找到了分析的起点。如果是寻物，还要看物品对应的用神（如文书看巽宫、钱财看兑宫）。',
    details: [
      '日干落宫 → 代表你当前的状态和处境',
      '时干落宫 → 代表你所问之事的趋势',
      '日干与时干相生 → 事易成',
      '日干与时干相克 → 事有阻碍',
    ],
  },
  {
    step: 3, title: '分析星、门、神组合',
    icon: '⭐',
    content: '每个宫位都有天盘九星（天时）、人盘八门（人事）、神盘八神（神助）。这个组合决定了该宫的吉凶程度。重点关注值符星和值使门所在的位置——它们是全局的关键。',
    details: [
      '九星决定事情的性质——天蓬凶险、天辅文雅',
      '八门决定行动的吉凶——开休生为三吉门',
      '八神决定外部助力——值符庇护、白虎凶险',
      '组合评分：5分以下为凶，5-7分为平，7分以上为吉',
    ],
  },
  {
    step: 4, title: '看值符、值使的位置',
    icon: '👑',
    content: '值符（值符星）和值使（值使门）是奇门盘的核心，代表"主帅"和"执行者"。值符所在宫代表整体大势，值使所在宫代表具体行动方向。这两个宫位通常比其他宫位更有分量。',
    details: [
      '值符落宫 → 全局大势所趋，宜顺势而为',
      '值使落宫 → 行动的具体方向，宜在此方位行动',
      '值符值使同宫 → 天时地利人和，大吉之象',
      '值符被克 → 大势不利，宜守不宜攻',
    ],
  },
  {
    step: 5, title: '分析三吉门与凶门分布',
    icon: '🚪',
    content: '八门中开、休、生为三吉门，死、惊、伤为三凶门，杜、景为中平。看吉凶门落在哪个方位，选择吉门方向行事可事半功倍。特别关注开门（事业）、休门（休息）、生门（财运）的位置。',
    details: [
      '开门（西北）→ 事业开创，大吉',
      '休门（正北）→ 休养调整，中吉',
      '生门（东北）→ 财运生机，大吉',
      '死门（西南）→ 凶，忌行动',
      '惊门（正西）→ 凶，防意外',
      '伤门（正东）→ 凶，防争斗',
    ],
  },
  {
    step: 6, title: '综合五行生克与内/外盘',
    icon: '⚖️',
    content: '最后将所有信息综合起来：看用神宫与日干宫的生克关系、各宫五行之间的相生相克、内外盘（阳遁内盘为1234外盘为6789，阴遁相反）。内盘主快、近、内；外盘主慢、远、外。',
    details: [
      '用神宫生/比日干宫 → 事情有利',
      '日干宫克用神宫 → 你能掌控局面',
      '用神宫克日干宫 → 事情有压力',
      '内盘主近期（1-3个月），外盘主远期（3个月后）',
    ],
  },
];

var LOST_ITEM_GUIDE = [
  { palace: 1, name: '坎宫', direction: '正北', feature: '低处、水边、阴暗角落、地下室、洗手间附近', items: '液体相关、电子产品、黑色物品', icon: '💧' },
  { palace: 2, name: '坤宫', direction: '西南', feature: '地面、厨房、储物间、衣物堆中、矮柜', items: '衣物、布艺品、陶器、化妆品', icon: '🌏' },
  { palace: 3, name: '震宫', direction: '正东', feature: '门口附近、书架、电动车/车内、音响旁', items: '书籍、文件、钥匙、工具', icon: '⚡' },
  { palace: 4, name: '巽宫', direction: '东南', feature: '通风处、窗户旁、高处柜子、文件堆中', items: '文件、证件、信件、小电器', icon: '🌪️' },
  { palace: 5, name: '中宫', direction: '中央', feature: '房屋中央、客厅中间、经常走动的地方', items: '常用物品、遥控器、手机', icon: '🎯' },
  { palace: 6, name: '乾宫', direction: '西北', feature: '高处、衣柜顶、保险柜、书房高档家具', items: '贵重物品、首饰、手表、电子产品', icon: '💎' },
  { palace: 7, name: '兑宫', direction: '正西', feature: '金属容器中、乐器旁、杂物堆、金属柜', items: '金属物品、饰品、乐器配件', icon: '🔔' },
  { palace: 8, name: '艮宫', direction: '东北', feature: '角落、矮柜下、鞋柜、床底、仓库', items: '鞋子、包袋、杂物、收藏品', icon: '⛰️' },
  { palace: 9, name: '离宫', direction: '正南', feature: '明亮处、炉灶旁、电器附近、书桌表面', items: '电器、充电器、眼镜、文具', icon: '🔥' },
];

var TIPS_DATA = [
  { icon: '💡', title: '结合实际', content: '奇门遁甲是分析工具，最终决策需要结合实际情况。奇门盘指引方向，实际行动决定结果。' },
  { icon: '📅', title: '及时性', content: '时家奇门反映的是特定时刻的时空能量状态。超过30分钟后盘中能量可能已经变化，重要决策建议重新起局。' },
  { icon: '🧠', title: '理性看待', content: '奇门遁甲是中国传统文化智慧的结晶，供文化参考与思考，并非绝对预测。最重要的是保持理性判断。' },
  { icon: '🔄', title: '多盘互参', content: '重要事情可以起多个不同时间的盘对比分析，趋势一致则结论更可靠。单一盘中信息有限。' },
  { icon: '📝', title: '记录复盘', content: '建议将每次起局的结果和实际发生的事情记录下来，长期积累能帮助你更深入地理解奇门盘象。' },
];

var SAMPLE_BOARDS = [
  {
    id: 'sample-1',
    title: '示例盘一：求职面试',
    desc: '2026年4月28日午时，问求职是否能成',
    fourPillars: { year: '丙午', month: '壬辰', day: '壬申', hour: '丙午' },
    dunType: '阳遁7局',
    analysis: [
      '日干壬落兑宫，天柱星+惊门+白虎，说明面试竞争激烈、压力较大。但壬+庚为"太白擒蛇"，反有意外之喜。',
      '时干丙落震宫，天冲星+伤门+腾蛇，面試过程会有一些意外波折，但天冲星主动，最终能通过。',
      '值符天蓬落坎宫，值使休门落巽宫，全局能量集中于北方和东南方，建议面试前在正北方向稍作停留。',
      '生门落艮宫（东北），此方位有利财运和事业发展，面试后往东北方向离开为吉。',
      '结论：面试虽有竞争但能通过，工作机会与沟通表达相关（兑宫象意）。值得一试。',
    ],
  },
  {
    id: 'sample-2',
    title: '示例盘二：寻钥匙',
    desc: '出门前找不到钥匙，问方位和找回时间',
    fourPillars: { year: '丙午', month: '癸巳', day: '甲申', hour: '戊辰' },
    dunType: '阳遁5局',
    analysis: [
      '钥匙属金属物品，用神看乾宫（西北）或兑宫（正西）。盘中兑宫天芮星+惊门+九地，九地主静止不动，暗示钥匙就在家中某处固定位置没被动过。',
      '兑宫方位为正西，结合九地（低处、静止）和惊门（杂物），建议检查客厅或卧室西侧的低矮家具、抽屉、杂物堆。',
      '天芮星临宫，可能被东西覆盖或压在物品下方。仔细翻找被文件或衣物盖住的地方。',
      '值使死门落艮宫（东北），结合用神兑宫（正西），形成对角线关系，建议在房间的西北-东南方向仔细搜索。',
      '结论：钥匙就在家中，正西方向、低处、被东西盖住。仔细翻找半天内可找到。',
    ],
  },
];

var PALACE_ELEMENT_COLORS = {
  水: 'text-blue-400',
  火: 'text-red-400',
  木: 'text-green-400',
  金: 'text-yellow-300',
  土: 'text-amber-400',
};

var PALACE_BG_COLORS = {
  水: 'bg-blue-400/10 border-blue-400/20',
  火: 'bg-red-400/10 border-red-400/20',
  木: 'bg-green-400/10 border-green-400/20',
  金: 'bg-yellow-300/10 border-yellow-300/20',
  土: 'bg-amber-400/10 border-amber-400/20',
};

function PalaceMiniGrid({ activePalace, onPalaceClick }) {
  return (
    <div className="grid grid-cols-3 gap-1 w-full max-w-[240px] mx-auto">
      {JIU_GONG_LAYOUT.flat().map(function (num, idx) {
        var data = JIU_GONG_DATA.find(function (d) { return d.number === num; });
        var isActive = activePalace === num;
        var colorKey = data ? data.wuxing : '土';
        var activeBorder = isActive ? 'ring-2 ring-gold-400/50' : 'border-ink-700/20';
        return (
          <motion.button
            key={idx}
            whileTap={{ scale: 0.95 }}
            onClick={function () { onPalaceClick && onPalaceClick(num); }}
            className={[
              'aspect-square rounded flex flex-col items-center justify-center border transition-all cursor-pointer',
              PALACE_BG_COLORS[colorKey] || 'bg-ink-800/30 border-ink-700/20',
              activeBorder,
            ].join(' ')}
            style={{ padding: 2 }}
          >
            <span className={['text-[13px] leading-none font-serif', PALACE_ELEMENT_COLORS[colorKey] || 'text-ink-300'].join(' ')}>
              {data ? data.trigram : ''}
            </span>
            <span className="text-[8px] leading-none text-ink-400 mt-0.5">{data ? data.name : ''}</span>
            <span className="text-[7px] leading-none text-ink-500">{data ? data.direction : ''}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

function PalaceDetail({ palaceNum, onBack }) {
  var data = JIU_GONG_DATA.find(function (d) { return d.number === palaceNum; });
  if (!data) return null;
  var colorKey = data.wuxing;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-mystic p-4 mt-2"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={['text-lg', PALACE_ELEMENT_COLORS[colorKey] || 'text-ink-300'].join(' ')}>{data.trigram}</span>
          <span className="font-serif text-sm text-gold-400">{data.name}</span>
          <span className={['text-[10px] px-2 py-0.5 rounded-full border', PALACE_BG_COLORS[colorKey] || ''].join(' ')}>
            {data.wuxing}
          </span>
        </div>
        <button onClick={onBack} className="text-ink-500 hover:text-ink-300 text-xs">✕</button>
      </div>
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="bg-ink-800/30 rounded p-2">
          <span className="text-ink-500">方位：</span>
          <span className="text-ink-200">{data.direction}</span>
        </div>
        <div className="bg-ink-800/30 rounded p-2">
          <span className="text-ink-500">颜色：</span>
          <span className="text-ink-200">{data.color}</span>
        </div>
        <div className="bg-ink-800/30 rounded p-2">
          <span className="text-ink-500">家庭成员：</span>
          <span className="text-ink-200">{data.family}</span>
        </div>
        <div className="bg-ink-800/30 rounded p-2">
          <span className="text-ink-500">季节：</span>
          <span className="text-ink-200">{data.season}</span>
        </div>
      </div>
      <div className="mt-2 text-xs text-ink-400 bg-ink-800/20 rounded p-2 leading-relaxed">
        <span className="text-ink-500">象意：</span>{data.symbol}
      </div>
      <div className="mt-1 text-[10px] text-gold-400/60 italic">
        📝 {data.memo}
      </div>
    </motion.div>
  );
}

function SectionCard({ title, subtitle, icon, children, defaultOpen }) {
  var [isOpen, setIsOpen] = useState(defaultOpen !== false);
  return (
    <div className="card-mystic overflow-hidden">
      <button
        onClick={function () { setIsOpen(!isOpen); }}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-ink-800/30 transition-colors"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {icon && <span className="text-lg shrink-0">{icon}</span>}
          <div className="min-w-0">
            <h3 className="font-serif text-sm text-gold-400 tracking-wider">{title}</h3>
            {subtitle && <p className="text-[10px] text-ink-500 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown size={14} className="text-ink-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-ink-700/20 pt-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SampleBoardCard({ sample, isActive, onToggle }) {
  return (
    <div className="card-mystic overflow-hidden" style={{ borderColor: 'rgba(244,196,48,0.2)' }}>
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-ink-800/30 transition-colors"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-lg shrink-0">📋</span>
          <div className="min-w-0">
            <h4 className="font-serif text-xs text-gold-400 tracking-wider">{sample.title}</h4>
            <p className="text-[10px] text-ink-500 mt-0.5">{sample.desc}</p>
          </div>
        </div>
        <motion.div animate={{ rotate: isActive ? 180 : 0 }} className="shrink-0">
          <ChevronDown size={14} className="text-ink-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-ink-700/20 pt-3 space-y-3">
              <div className="flex flex-wrap gap-2 text-[10px]">
                <span className="bg-ink-800/40 text-ink-300 px-2 py-0.5 rounded">
                  四柱：{sample.fourPillars.year} {sample.fourPillars.month} {sample.fourPillars.day} {sample.fourPillars.hour}
                </span>
                <span className="bg-ink-800/40 text-ink-300 px-2 py-0.5 rounded">
                  {sample.dunType}
                </span>
              </div>
              <div className="space-y-2">
                {sample.analysis.map(function (point, i) {
                  return (
                    <div key={i} className="flex gap-2 text-[11px] text-ink-300 leading-relaxed">
                      <span className="text-gold-400 shrink-0 mt-0.5">{i + 1}.</span>
                      <span>{point}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function QimenGuide({ onClose }) {
  var [activeTab, setActiveTab] = useState('jiugong');
  var [selectedPalace, setSelectedPalace] = useState(null);
  var [sampleOpen, setSampleOpen] = useState(null);

  var tabs = [
    { id: 'jiugong', label: '九宫基础', icon: '🏛️' },
    { id: 'steps', label: '看盘步骤', icon: '👣' },
    { id: 'lost', label: '寻物方法', icon: '🔍' },
    { id: 'tips', label: '注意事项', icon: '💡' },
    { id: 'demo', label: '示例演示', icon: '🎬' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: 'rgba(18,14,10,0.97)' }}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-ink-700/30" style={{ background: 'rgba(18,14,10,0.98)' }}>
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-ink-400 hover:text-ink-200 transition-colors text-xs"
          >
            <ChevronRight size={14} className="rotate-180" />
            <span className="font-serif">返回排盘</span>
          </button>
          <h2 className="font-serif text-sm text-gold-400 tracking-wider">📖 如何看盘 & 解读指南</h2>
          <button onClick={onClose} className="text-ink-500 hover:text-ink-200">
            <X size={18} />
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex overflow-x-auto gap-1 px-3 pb-2 scrollbar-hide">
          {tabs.map(function (tab) {
            var isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={function () { setActiveTab(tab.id); setSelectedPalace(null); }}
                className={[
                  'shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-serif transition-all',
                  isActive
                    ? 'bg-gold-400/15 text-gold-400 border border-gold-400/30'
                    : 'text-ink-500 border border-transparent hover:text-ink-300 hover:bg-ink-800/30',
                ].join(' ')}
              >
                {tab.icon} {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
        {/* Tab 1: 九宫基础 */}
        {activeTab === 'jiugong' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="text-center">
              <p className="text-ink-400 text-xs font-serif">
                奇门遁甲将空间分为九宫，每宫对应不同方位、五行与象意
              </p>
            </div>

            <PalaceMiniGrid
              activePalace={selectedPalace}
              onPalaceClick={function (num) {
                setSelectedPalace(selectedPalace === num ? null : num);
              }}
            />

            {selectedPalace && (
              <PalaceDetail
                palaceNum={selectedPalace}
                onBack={function () { setSelectedPalace(null); }}
              />
            )}

            {!selectedPalace && (
              <div className="card-mystic p-3 text-center">
                <p className="text-ink-500 text-[10px] font-serif">👆 点击上方任意宫位查看详细解读</p>
              </div>
            )}

            {/* 九宫记忆口诀 */}
            <SectionCard title="九宫记忆口诀" icon="📝" subtitle="快速记住九宫分布">
              <div className="space-y-2 text-xs text-ink-300 leading-relaxed font-serif">
                <p className="text-gold-400/80 text-center tracking-wider">九宫八卦掌诀</p>
                <div className="grid grid-cols-3 gap-1 text-center max-w-[240px] mx-auto">
                  <span className="bg-ink-800/30 p-1 rounded">4 巽</span>
                  <span className="bg-ink-800/30 p-1 rounded">9 离</span>
                  <span className="bg-ink-800/30 p-1 rounded">2 坤</span>
                  <span className="bg-ink-800/30 p-1 rounded">3 震</span>
                  <span className="bg-gold-400/10 p-1 rounded">5 中</span>
                  <span className="bg-ink-800/30 p-1 rounded">7 兑</span>
                  <span className="bg-ink-800/30 p-1 rounded">8 艮</span>
                  <span className="bg-ink-800/30 p-1 rounded">1 坎</span>
                  <span className="bg-ink-800/30 p-1 rounded">6 乾</span>
                </div>
                <p className="text-ink-500 mt-2">
                  口诀：<span className="text-gold-400">戴九履一，左三右七，二四为肩，六八为足，五居中央</span>
                </p>
                <p className="text-ink-500">
                  解读：上方（南）是9离宫，下方（北）是1坎宫；左边（东）是3震宫，右边（西）是7兑宫；左上角（东南）是4巽宫，右上角（西南）是2坤宫；左下角（东北）是8艮宫，右下角（西北）是6乾宫。
                </p>
              </div>
            </SectionCard>

            {/* 五行生克 */}
            <SectionCard title="五行生克速查" icon="⚡" subtitle="金木水火土的生克关系">
              <div className="text-xs text-ink-300 space-y-2">
                <div className="bg-ink-800/30 rounded p-3">
                  <p className="text-gold-400/80 mb-1">相生（→ 滋养促进）</p>
                  <p className="text-ink-400">木→火→土→金→水→木（循环）</p>
                  <p className="text-ink-500 text-[10px] mt-1">木生火、火生土、土生金、金生水、水生木</p>
                </div>
                <div className="bg-ink-800/30 rounded p-3">
                  <p className="text-gold-400/80 mb-1">相克（→ 制约抑制）</p>
                  <p className="text-ink-400">木→土→水→火→金→木（循环）</p>
                  <p className="text-ink-500 text-[10px] mt-1">木克土、土克水、水克火、火克金、金克木</p>
                </div>
                <div className="bg-ink-800/20 rounded p-2 text-ink-500 text-[10px]">
                  在奇门盘中，用神宫生比日干宫为吉，用神宫克日干宫为凶。
                </div>
              </div>
            </SectionCard>
          </motion.div>
        )}

        {/* Tab 2: 看盘步骤 */}
        {activeTab === 'steps' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <p className="text-ink-400 text-xs text-center font-serif">
              按以下六步，系统性地解读一个完整的奇门盘
            </p>

            {/* Timeline / Steps */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[18px] top-0 bottom-0 w-px bg-gradient-to-b from-gold-400/30 via-ink-700/30 to-transparent" />

              <div className="space-y-3">
                {STEP_DATA.map(function (item, idx) {
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className="relative pl-10"
                    >
                      {/* Dot */}
                      <div className="absolute left-[11px] top-1 w-[14px] h-[14px] rounded-full bg-gold-400/20 border border-gold-400/40 flex items-center justify-center">
                        <span className="text-[8px] text-gold-400">{item.step}</span>
                      </div>

                      <div className="card-mystic p-3.5">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-base">{item.icon}</span>
                          <h4 className="font-serif text-xs text-gold-400 tracking-wider">{item.title}</h4>
                        </div>
                        <p className="text-[11px] text-ink-300 leading-relaxed">{item.content}</p>
                        <div className="mt-2 space-y-1">
                          {item.details.map(function (d, di) {
                            return (
                              <div key={di} className="flex gap-1.5 text-[10px] text-ink-400">
                                <span className="text-gold-400/60 mt-0.5">▸</span>
                                <span>{d}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 3: 寻物方法 */}
        {activeTab === 'lost' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="card-mystic p-4 text-center">
              <p className="text-ink-300 text-xs leading-relaxed font-serif">
                寻物用神落宫决定方位和位置特征。找到物品对应的宫位，结合宫位信息判断找回方向。
              </p>
            </div>

            <SectionCard title="寻物看盘三步法" icon="🔍" subtitle="快速定位失物">
              <div className="space-y-3 text-xs">
                <div className="bg-ink-800/30 rounded p-3">
                  <p className="text-gold-400 text-[11px] mb-1 font-serif">第一步：确定用神宫</p>
                  <p className="text-ink-400 leading-relaxed">
                    物品属性决定用神宫。金（钥匙、首饰、手表）→乾兑宫；木（书籍、文件）→震巽宫；
                    水（液体相关）→坎宫；火（电器）→离宫；土（陶瓷、杂物）→坤艮宫。
                  </p>
                </div>
                <div className="bg-ink-800/30 rounded p-3">
                  <p className="text-gold-400 text-[11px] mb-1 font-serif">第二步：看宫位组合</p>
                  <p className="text-ink-400 leading-relaxed">
                    用神落宫中的九星、八门、八神提供细节信息。九地主静止不动、天空中高处；
                    玄武主被覆盖或隐藏；白虎可能有损坏；太阴主阴暗角落。
                  </p>
                </div>
                <div className="bg-ink-800/30 rounded p-3">
                  <p className="text-gold-400 text-[11px] mb-1 font-serif">第三步：综合判断</p>
                  <p className="text-ink-400 leading-relaxed">
                    结合用神宫方位 + 星门神组合 + 内/外盘（内盘近，在家中/办公室；外盘远，可能在室外或远处）。
                    日干与用神宫相生则易找回，相克则困难。
                  </p>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="九宫寻物方位详表" icon="🗺️" subtitle="每宫对应方位和物品特征">
              <div className="space-y-2">
                {LOST_ITEM_GUIDE.map(function (item) {
                  return (
                    <motion.div
                      key={item.palace}
                      whileTap={{ scale: 0.98 }}
                      className={[
                        'rounded-lg p-3 border transition-all',
                        selectedPalace === item.palace
                          ? 'border-gold-400/30 bg-gold-400/5'
                          : 'border-ink-700/20 bg-ink-800/20',
                      ].join(' ')}
                      onClick={function () {
                        setSelectedPalace(selectedPalace === item.palace ? null : item.palace);
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base">{item.icon}</span>
                        <span className="font-serif text-[11px] text-gold-400">{item.name}</span>
                        <span className="text-[10px] text-ink-500">{item.direction}</span>
                      </div>
                      <div className="text-[10px] text-ink-400 leading-relaxed">
                        <p><span className="text-ink-500">特征：</span>{item.feature}</p>
                        <p><span className="text-ink-500">常见物品：</span>{item.items}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </SectionCard>

            <SectionCard title="常见组合示例" icon="🎯" subtitle="用神落宫 + 星门神的解读">
              <div className="space-y-2 text-xs text-ink-300">
                <div className="bg-ink-800/30 rounded p-2.5">
                  <p><span className="text-gold-400">艮宫 + 天任 + 生门：</span> 东北方高处柜子或储物间，生门吉，物品完好</p>
                </div>
                <div className="bg-ink-800/30 rounded p-2.5">
                  <p><span className="text-gold-400">坤宫 + 天芮 + 死门：</span> 西南方低处旧物堆中，天芮+死门不吉，物品可能被压在重物下</p>
                </div>
                <div className="bg-ink-800/30 rounded p-2.5">
                  <p><span className="text-gold-400">巽宫 + 天辅 + 杜门：</span> 东南方文件堆或通风处，杜门主塞，被文件盖住了</p>
                </div>
                <div className="bg-ink-800/30 rounded p-2.5">
                  <p><span className="text-gold-400">兑宫 + 天柱 + 惊门 + 玄武：</span> 正西杂物堆中，玄武主隐藏，仔细翻找能发现</p>
                </div>
                <div className="bg-ink-800/30 rounded p-2.5">
                  <p><span className="text-gold-400">离宫 + 天英 + 景门：</span> 正南明亮处、桌面上或电器附近，容易发现</p>
                </div>
              </div>
            </SectionCard>
          </motion.div>
        )}

        {/* Tab 4: 注意事项 */}
        {activeTab === 'tips' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="text-center">
              <p className="text-ink-400 text-xs font-serif">
                正确看待奇门遁甲，理性使用这门古老智慧
              </p>
            </div>

            <div className="space-y-3">
              {TIPS_DATA.map(function (tip, idx) {
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="card-mystic p-4"
                  >
                    <div className="flex gap-3">
                      <span className="text-xl shrink-0 mt-0.5">{tip.icon}</span>
                      <div>
                        <h4 className="font-serif text-xs text-gold-400 mb-1 tracking-wider">{tip.title}</h4>
                        <p className="text-[11px] text-ink-400 leading-relaxed">{tip.content}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div
              className="card-mystic p-4 text-center mt-4"
              style={{ borderColor: 'rgba(244,196,48,0.15)' }}
            >
              <p className="text-ink-500 text-[10px] font-serif leading-relaxed">
                ⚠️ 奇门遁甲是中国传统数术文化的重要组成部分，蕴含古人对时空规律的深刻思考。
                本工具仅供文化研究与个人参考，不构成任何决策建议。请理性看待，切勿迷信。
              </p>
            </div>
          </motion.div>
        )}

        {/* Tab 5: 示例演示 */}
        {activeTab === 'demo' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="card-mystic p-4 text-center">
              <p className="text-ink-300 text-xs font-serif">
                内置示例奇门盘，点击"模拟解读"查看完整的分析过程，帮助你理解实际看盘方法
              </p>
            </div>

            {SAMPLE_BOARDS.map(function (sample) {
              return (
                <SampleBoardCard
                  key={sample.id}
                  sample={sample}
                  isActive={sampleOpen === sample.id}
                  onToggle={function () {
                    setSampleOpen(sampleOpen === sample.id ? null : sample.id);
                  }}
                />
              );
            })}

            <div className="card-mystic p-4 text-center">
              <p className="text-ink-500 text-[10px] font-serif leading-relaxed">
                💡 提示：将你实际起的盘与示例盘的解读思路对比，逐步培养自己的分析能力。
                建议先从判断吉凶开始，逐步深入到细节分析。
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
