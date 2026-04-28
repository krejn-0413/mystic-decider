const EARTHLY_BRANCHES = [
  { name: '子', period: '23:00-00:59', hourRange: [23, 0] },
  { name: '丑', period: '01:00-02:59', hourRange: [1, 2] },
  { name: '寅', period: '03:00-04:59', hourRange: [3, 4] },
  { name: '卯', period: '05:00-06:59', hourRange: [5, 6] },
  { name: '辰', period: '07:00-08:59', hourRange: [7, 8] },
  { name: '巳', period: '09:00-10:59', hourRange: [9, 10] },
  { name: '午', period: '11:00-12:59', hourRange: [11, 12] },
  { name: '未', period: '13:00-14:59', hourRange: [13, 14] },
  { name: '申', period: '15:00-16:59', hourRange: [15, 16] },
  { name: '酉', period: '17:00-18:59', hourRange: [17, 18] },
  { name: '戌', period: '19:00-20:59', hourRange: [19, 20] },
  { name: '亥', period: '21:00-22:59', hourRange: [21, 22] },
];

const PALACE_DATA = {
  1: { name: '坎', position: '北', trigram: '☵', element: '水', number: 1 },
  2: { name: '坤', position: '西南', trigram: '☷', element: '土', number: 2 },
  3: { name: '震', position: '东', trigram: '☳', element: '木', number: 3 },
  4: { name: '巽', position: '东南', trigram: '☴', element: '木', number: 4 },
  5: { name: '中', position: '中央', trigram: '☯', element: '土', number: 5 },
  6: { name: '乾', position: '西北', trigram: '☰', element: '金', number: 6 },
  7: { name: '兑', position: '西', trigram: '☱', element: '金', number: 7 },
  8: { name: '艮', position: '东北', trigram: '☶', element: '土', number: 8 },
  9: { name: '离', position: '南', trigram: '☲', element: '火', number: 9 },
};

const NINE_PALACES_LAYOUT = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
];

function toBeijingTime(date) {
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utc + 8 * 3600000);
}

function getHeavenlyStem(dayOfYear) {
  const stems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  return stems[(dayOfYear - 1) % 10];
}

function getEarthlyBranch(dayOfYear) {
  const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  return branches[(dayOfYear - 1) % 12];
}

export function getCurrentShichen() {
  const now = toBeijingTime(new Date());
  const hour = now.getHours();
  for (const branch of EARTHLY_BRANCHES) {
    const [start, end] = branch.hourRange;
    if (start <= end) {
      if (hour >= start && hour <= end) return { ...branch, hour };
    }
    if (start === 23 && (hour >= 23 || hour === 0)) return { ...branch, hour };
  }
  return { ...EARTHLY_BRANCHES[0], hour };
}

const SOLAR_TERMS = [
  { name: '冬至', month: 12, day: 22 },
  { name: '小寒', month: 1, day: 6 },
  { name: '大寒', month: 1, day: 20 },
  { name: '立春', month: 2, day: 4 },
  { name: '雨水', month: 2, day: 19 },
  { name: '惊蛰', month: 3, day: 6 },
  { name: '春分', month: 3, day: 21 },
  { name: '清明', month: 4, day: 5 },
  { name: '谷雨', month: 4, day: 20 },
  { name: '立夏', month: 5, day: 6 },
  { name: '小满', month: 5, day: 21 },
  { name: '芒种', month: 6, day: 6 },
  { name: '夏至', month: 6, day: 21 },
  { name: '小暑', month: 7, day: 7 },
  { name: '大暑', month: 7, day: 23 },
  { name: '立秋', month: 8, day: 7 },
  { name: '处暑', month: 8, day: 23 },
  { name: '白露', month: 9, day: 8 },
  { name: '秋分', month: 9, day: 23 },
  { name: '寒露', month: 10, day: 8 },
  { name: '霜降', month: 10, day: 23 },
  { name: '立冬', month: 11, day: 7 },
  { name: '小雪', month: 11, day: 22 },
  { name: '大雪', month: 12, day: 7 },
];

export function getDunInfo() {
  const now = toBeijingTime(new Date());
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const dayOfYear = Math.floor((now - new Date(year, 0, 0)) / 86400000);

  const summerSolstice = new Date(year, 5, 21);
  const winterSolstice = new Date(year, 11, 22);
  const current = new Date(year, month - 1, day);

  const isYangDun = current >= winterSolstice || current < summerSolstice;

  const nearbyTerm = SOLAR_TERMS.reduce((prev, curr) => {
    const d = new Date(year, curr.month - 1, curr.day);
    const diff = Math.abs(current - d);
    const prevDiff = Math.abs(current - new Date(year, prev.month - 1, prev.day));
    return diff < prevDiff ? curr : prev;
  });

  const juNumber = isYangDun
    ? (dayOfYear % 9) || 9
    : (dayOfYear % 9) || 9;

  const heavenlyStem = getHeavenlyStem(dayOfYear);
  const earthlyBranch = getEarthlyBranch(dayOfYear);

  return {
    isYangDun,
    dunType: isYangDun ? '阳遁' : '阴遁',
    juNumber,
    heavenlyStem,
    earthlyBranch,
    nearbyTerm: nearbyTerm.name,
    dayGanzhi: `${heavenlyStem}${earthlyBranch}`,
  };
}

export function getPalaceInfo(palaceNumber) {
  return PALACE_DATA[palaceNumber] || null;
}

export function getNinePalaces() {
  return NINE_PALACES_LAYOUT;
}

const ZHIFU_BY_BRANCH = {
  子: { zhiFu: '天蓬星', zhiShi: '休门' },
  丑: { zhiFu: '天芮星', zhiShi: '死门' },
  寅: { zhiFu: '天冲星', zhiShi: '伤门' },
  卯: { zhiFu: '天辅星', zhiShi: '杜门' },
  辰: { zhiFu: '天禽星', zhiShi: '中门' },
  巳: { zhiFu: '天心星', zhiShi: '开门' },
  午: { zhiFu: '天柱星', zhiShi: '惊门' },
  未: { zhiFu: '天任星', zhiShi: '生门' },
  申: { zhiFu: '天英星', zhiShi: '景门' },
  酉: { zhiFu: '天蓬星', zhiShi: '休门' },
  戌: { zhiFu: '天芮星', zhiShi: '死门' },
  亥: { zhiFu: '天冲星', zhiShi: '伤门' },
};

export function getZhiFuZhiShi(branchName) {
  return ZHIFU_BY_BRANCH[branchName] || { zhiFu: '天蓬星', zhiShi: '休门' };
}

export const STARS_INFO = [
  { name: '天蓬星', meaning: '宜守不宜攻', domain: '边防、固守' },
  { name: '天芮星', meaning: '宜静不宜动', domain: '学习、收敛' },
  { name: '天冲星', meaning: '先难后易', domain: '突破、进击' },
  { name: '天辅星', meaning: '顺风顺水', domain: '辅助、教育' },
  { name: '天禽星', meaning: '大吉大利', domain: '中庸、调和' },
  { name: '天心星', meaning: '谋事可成', domain: '策划、开创' },
  { name: '天柱星', meaning: '宜守不宜攻', domain: '防守、支撑' },
  { name: '天任星', meaning: '任重道远', domain: '负重、持久' },
  { name: '天英星', meaning: '光辉灿烂', domain: '展示、成名' },
];

export const DOORS_INFO = [
  { name: '休门', meaning: '休养生息', color: '水', direction: '北' },
  { name: '生门', meaning: '生机勃勃', color: '土', direction: '东北' },
  { name: '伤门', meaning: '伤筋动骨', color: '木', direction: '东' },
  { name: '杜门', meaning: '杜塞不通', color: '木', direction: '东南' },
  { name: '景门', meaning: '景色宜人', color: '火', direction: '南' },
  { name: '死门', meaning: '死气沉沉', color: '土', direction: '西南' },
  { name: '惊门', meaning: '惊心动魄', color: '金', direction: '西' },
  { name: '开门', meaning: '开门大吉', color: '金', direction: '西北' },
];

export function getSeasonHint(month) {
  const hints = [
    { months: [3, 4, 5], text: '春 · 木旺，宜规划开拓' },
    { months: [6, 7, 8], text: '夏 · 火旺，宜果断行动' },
    { months: [9, 10, 11], text: '秋 · 金旺，宜收获取舍' },
    { months: [12, 1, 2], text: '冬 · 水旺，宜静观其变' },
  ];
  return hints.find(h => h.months.includes(month))?.text || '';
}

const DIRECTION_HINTS = {
  1: '坎北 · 水旺 · 宜守秘不宜显',
  2: '坤西南 · 土旺 · 宜包容不宜争',
  3: '震东 · 木旺 · 宜进取不宜退',
  4: '巽东南 · 木旺 · 宜徐进不宜急',
  5: '中宫 · 土旺 · 宜中和不宜偏',
  6: '乾西北 · 金旺 · 宜决断不宜疑',
  7: '兑西 · 金旺 · 宜沟通不宜独',
  8: '艮东北 · 土旺 · 宜止不宜行',
  9: '离南 · 火旺 · 宜显不宜隐',
};

export function getDirectionHint(palaceNumber) {
  return DIRECTION_HINTS[palaceNumber] || '';
}
