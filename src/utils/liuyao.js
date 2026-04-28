const SHI_YING_MAP = {
  1: 6, 44: 1, 33: 2, 12: 3, 20: 4, 23: 5, 35: 4, 14: 3,
  6: 6, 60: 1, 3: 2, 63: 3, 49: 4, 55: 5, 36: 4, 7: 3,
  52: 6, 22: 1, 26: 2, 41: 3, 38: 4, 10: 5, 61: 4, 53: 3,
  51: 6, 16: 1, 40: 2, 32: 3, 46: 4, 48: 5, 28: 4, 17: 3,
  57: 6, 9: 1, 37: 2, 42: 3, 25: 4, 21: 5, 27: 4, 18: 3,
  30: 6, 56: 1, 50: 2, 64: 3, 4: 4, 59: 5, 6: 4, 13: 3,
  2: 6, 24: 1, 19: 2, 11: 3, 34: 4, 43: 5, 5: 4, 8: 3,
  58: 6, 47: 1, 45: 2, 31: 3, 39: 4, 15: 5, 62: 4, 54: 3,
};

export function getShiYing(hexagramId) {
  const shi = SHI_YING_MAP[hexagramId] || 6;
  const ying = shi <= 3 ? shi + 3 : shi - 3;
  return { shi, ying };
}

const YAO_LABELS = ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'];

export function getYaoPositionLabel(position) {
  return YAO_LABELS[position - 1] || `第${position}爻`;
}

export const GLOSSARY = [
  {
    term: '世爻',
    icon: '👑',
    description: '代表问卦者自身，是卦象的核心。世爻旺相则吉，休囚则凶，反映当事人当前状态。',
  },
  {
    term: '应爻',
    icon: '🤝',
    description: '代表所问之事、对方或环境。与世爻的生克关系决定事情走向。',
  },
  {
    term: '动爻',
    icon: '⚡',
    description: '发生变化的爻（老阳或老阴），是事情发展的关键。动爻所在位置和五行决定了变化的性质。',
  },
  {
    term: '用神',
    icon: '🎯',
    description: '根据所问之事选取的代表爻位：问事业看官鬼爻，问财运看妻财爻，问健康看子孙爻，问父母长辈看父母爻。',
  },
  {
    term: '六亲',
    icon: '👪',
    description: '父母(庇护/长辈)、兄弟(同辈/竞争)、官鬼(事业/压力)、妻财(财富/伴侣)、子孙(创意/健康)，五种关系覆盖人生诸事。',
  },
];

export function getYaoGlossary(isShi, isYing, isMoving) {
  const items = [];
  if (isShi) items.push({ label: '世爻', desc: '代表你自己', color: 'text-gold-400', bg: 'bg-gold-400/15' });
  if (isYing) items.push({ label: '应爻', desc: '代表对方/环境', color: 'text-jade-400', bg: 'bg-jade-400/15' });
  if (isMoving) items.push({ label: '动爻', desc: '事情关键变化点', color: 'text-red-400', bg: 'bg-red-400/15' });
  return items;
}

const POSITION_MEANINGS = {
  1: { title: '初爻 · 根基', desc: '代表事物的初始状态、基层或开端。反映问题的基础和根本。' },
  2: { title: '二爻 · 显现', desc: '代表事物初步发展，开始显现。对应内在修养和初步行动。' },
  3: { title: '三爻 · 进退', desc: '代表事物发展中的关键转折点。需谨慎决策，进退之间考验智慧。' },
  4: { title: '四爻 · 渐进', desc: '代表事物进入中高层阶段。需要更广阔的视野和策略。' },
  5: { title: '五爻 · 君位', desc: '代表事物的鼎盛阶段，君主之位。是决策和掌控的关键位置。' },
  6: { title: '上爻 · 终极', desc: '代表事物的终极状态或结果。物极必反，需警惕过度。' },
};

export function getPositionMeaning(position) {
  return POSITION_MEANINGS[position] || { title: `第${position}爻`, desc: '' };
}
