const ITEM_TYPE_LABELS = {
  wallet: '钱包',
  phone: '手机',
  keys: '钥匙',
  documents: '文件',
  accessories: '饰品',
  other: '其他',
};

const YONG_SHEN_MAP = {
  wallet: { name: '妻财', icon: '💰' },
  phone: { name: '妻财', icon: '📱' },
  keys: { name: '妻财', icon: '🔑' },
  accessories: { name: '妻财', icon: '💍' },
  documents: { name: '父母', icon: '📄' },
  other: { name: '妻财', icon: '📦' },
};

const ITEM_SPECIFIC_HINTS = {
  wallet: [
    '沙发缝隙或坐垫下方', '外套内袋或背包夹层', '床头柜抽屉或梳妆台',
    '办公桌抽屉或文件架', '车内储物格或座椅下',
  ],
  phone: [
    '被子或枕头下面', '书堆或杂志之间', '充电器附近或插座旁',
    '浴室置物架或洗漱台', '汽车杯架或中控台',
  ],
  keys: [
    '门框挂钩或玄关柜', '包包小口袋或夹层', '抽屉角落或笔筒旁',
    '厨房台面或餐桌上', '外套口袋里',
  ],
  documents: [
    '文件柜或档案夹中', '书架或书桌抽屉', '公文包或电脑包夹层',
    '打印机或办公桌面上', '床底收纳箱或储物盒',
  ],
  accessories: [
    '首饰盒或梳妆台抽屉', '床头柜或衣柜格子', '卫生间洗漱台或镜柜',
    '随身小包的暗袋', '沙发扶手或茶几桌面',
  ],
  other: [
    '常去房间的角落处', '最近使用的家具附近', '日常活动路线的中途',
    '收纳容器或储物箱中', '衣物堆叠或悬挂处',
  ],
};

const DISTANCE_ESTIMATES = {
  1: { meters: '0.5-1米', desc: '伸手可及的范围', detail: '几乎就在脚下或手边，弯腰即可看到' },
  2: { meters: '1-2米', desc: '房间同侧的范围', detail: '离你最近的一两个家具之间，视线平齐高度' },
  3: { meters: '2-3米', desc: '房间中部范围', detail: '房间中间区域的家具表面或抽屉里' },
  4: { meters: '3-5米', desc: '房间对侧范围', detail: '房间另一侧，或隔壁房间的入口附近' },
  5: { meters: '5-8米', desc: '较远范围', detail: '可能在另一个房间，或被收纳至较高处' },
  6: { meters: '8米以上', desc: '极远范围', detail: '可能在户外、车库、储藏室等非常用区域' },
};

const COVERING_DESCRIPTIONS = {
  金: ['被金属容器盖住', '压在金属物品下', '被锁在柜中', '夹在金属文件架中'],
  木: ['被衣物或布料遮挡', '夹在书本或文件里', '被木制家具挡住视线', '藏在抽屉角落'],
  水: ['被潮湿环境包围', '遮挡在毛巾或布料下', '隐藏在盆栽植物旁', '在水槽附近的暗处'],
  火: ['被电器或充电线挡住', '藏于明亮显眼处但被遮挡', '在电器设备后面', '被灯光或反光物掩盖'],
  土: ['被杂物堆积覆盖', '藏于地面角落灰尘中', '被地毯或地垫遮盖', '混在同类物品中'],
};

const TIMING_HINTS = {
  morning: { label: '清晨', hint: '夜间移动或整理后容易被收纳' },
  forenoon: { label: '上午', hint: '早间日常活动中随手放置' },
  noon: { label: '中午', hint: '午休或就餐时随手落下的' },
  afternoon: { label: '下午', hint: '午后活动中遗忘在某处' },
  evening: { label: '傍晚', hint: '黄昏时分归家或外出时放置' },
  night: { label: '夜间', hint: '夜间松懈时容易放在非常规位置' },
};

const TRIGRAM_DIRECTION = {
  乾: { direction: '西北', symbol: '☰', element: '金', hint: '西北方，金属柜、高处抽屉、保险柜附近' },
  坤: { direction: '西南', symbol: '☷', element: '土', hint: '西南方，地面角落、矮柜底层、衣物堆中' },
  震: { direction: '东', symbol: '☳', element: '木', hint: '东方，木器抽屉、书架、门口附近' },
  巽: { direction: '东南', symbol: '☴', element: '木', hint: '东南方，窗边矮柜、通风处、布艺软包中' },
  坎: { direction: '北', symbol: '☵', element: '水', hint: '北方，水槽旁、卫生间、潮湿处、盆栽附近' },
  离: { direction: '南', symbol: '☲', element: '火', hint: '南方，电器旁、电视柜、明亮显眼处、书架上层' },
  艮: { direction: '东北', symbol: '☶', element: '土', hint: '东北方，杂物堆、床底、衣柜底层、隐蔽角落' },
  兑: { direction: '西', symbol: '☱', element: '金', hint: '西方，金属容器、首饰盒、抽屉边缘、包袋内' },
};

const PALACE_ELEMENT = {
  乾: '金', 坤: '土', 震: '木', 巽: '木',
  坎: '水', 离: '火', 艮: '土', 兑: '金',
};

const ELEMENT_ENV = {
  金: '金属容器、锁具、保险柜、铁盒、五金工具旁',
  木: '木器、书架、衣柜、抽屉、窗帘后、竹编容器',
  水: '水槽、卫生间、厨房、潮湿角落、花盆旁、鱼缸附近',
  火: '电器、电视柜、灶台、暖气旁、充电器附近、光明处',
  土: '地面、角落、地毯下、鞋柜、床底、杂物堆',
};

const POSITION_HEIGHT = {
  1: { level: '极低', desc: '地面、地板缝隙、地毯下、门槛附近', heightDesc: '贴近地面，需弯腰查看' },
  2: { level: '较低', desc: '矮柜抽屉、茶几底层、鞋柜、矮桌', heightDesc: '膝盖高度，伸手可及的低处' },
  3: { level: '中低', desc: '桌面、书架中层、腰部高度柜子', heightDesc: '腰部高度，日常视线平齐' },
  4: { level: '中等', desc: '门边挂钩、窗台、书架中上层', heightDesc: '胸部高度，约1.2-1.5米' },
  5: { level: '较高', desc: '柜顶、高架搁板、天花板附近', heightDesc: '需仰视，约1.8米以上高处' },
  6: { level: '极高', desc: '梁上、阁楼、户外高处、屋顶', heightDesc: '极高处，需攀爬或梯子' },
};

const DIFFICULTY_LEVELS = [
  { min: 0, max: 2, text: '容易找回，就在近处随手可及', icon: '✅', advice: '先检查当前所在位置周围，尤其是桌面和口袋' },
  { min: 3, max: 4, text: '可能被遮挡或收纳，建议仔细翻找', icon: '🔍', advice: '回想最后一次使用的时间，检查常用收纳位置' },
  { min: 5, max: 6, text: '被移动或收至他处，需扩大搜索范围', icon: '🤔', advice: '询问家人或同事，检查非常用位置和包袋夹层' },
  { min: 7, max: 8, text: '不易找回，已被收纳至不常用位置', icon: '⚠️', advice: '彻底清理该区域，检查所有容器和角落' },
  { min: 9, max: 12, text: '找回难度较大，做好最坏准备', icon: '🌪️', advice: '扩大搜索至户外或公共区域，考虑挂失补办' },
];

export function getItemTypeLabel(typeKey) {
  return ITEM_TYPE_LABELS[typeKey] || '未知物品';
}

export function getYongShen(itemType) {
  return YONG_SHEN_MAP[itemType] || YONG_SHEN_MAP.other;
}

export function getDirectionByTrigram(trigramName) {
  return TRIGRAM_DIRECTION[trigramName] || TRIGRAM_DIRECTION.乾;
}

export function getAllDirections() {
  return Object.entries(TRIGRAM_DIRECTION).map(([name, data]) => ({ name, ...data }));
}

function getTimePeriod(hours) {
  if (hours >= 5 && hours < 8) return 'morning';
  if (hours >= 8 && hours < 12) return 'forenoon';
  if (hours >= 12 && hours < 14) return 'noon';
  if (hours >= 14 && hours < 18) return 'afternoon';
  if (hours >= 18 && hours < 22) return 'evening';
  return 'night';
}

function getDifficultyScore(result) {
  let score = 0;
  const movingCount = result.changingYao ? result.changingYao.filter(Boolean).length : 0;
  score += movingCount * 1.5;
  const hexId = result.originalHexagram?.id || 1;
  score += (hexId % 3);
  if (result.hasChanging && result.changedHexagram) {
    score += 0.5;
  }
  return Math.min(Math.max(Math.round(score), 0), 12);
}

function generateRelativePosition(reading, itemInfo) {
  const itemType = itemInfo?.itemType || 'other';
  const yaoPos = reading.movingPositions.length > 0 ? reading.movingPositions[0] : 3;
  const distance = DISTANCE_ESTIMATES[yaoPos] || DISTANCE_ESTIMATES[3];
  const element = reading.primaryElement;
  const coverings = COVERING_DESCRIPTIONS[element] || COVERING_DESCRIPTIONS.土;
  const covering = coverings[yaoPos % coverings.length];

  const lostHours = itemInfo?.lostTime
    ? new Date(itemInfo.lostTime).getHours()
    : new Date().getHours();
  const period = getTimePeriod(lostHours);
  const timing = TIMING_HINTS[period];

  const itemHints = ITEM_SPECIFIC_HINTS[itemType] || ITEM_SPECIFIC_HINTS.other;
  const itemHint = itemHints[reading.movingPositions.length % itemHints.length];

  const dir = reading.primaryDirection;

  const description = '很可能在' + dir.direction + '方向，距离你约' + distance.meters + '的位置。' + distance.detail + '。' + covering + '。此外，' + itemHint + '的可能性较大。';

  const environmentDesc = '当前环境以' + element + '元素为主导，' + (ELEMENT_ENV[element] || '') + '。' + timing.hint + '，结合卦象' + reading.lowerTrigramName + '宫的特性，' + reading.primaryHeight.desc + '为重点搜索区域。';

  const searchSequence = '第一步：检查' + dir.direction + '方向' + reading.primaryHeight.level + '处的' + ((ELEMENT_ENV[element] || '').split('、')[0] || '家具') + '附近。第二步：查看' + itemHint + '。第三步：扩大至' + distance.desc + '范围重新搜索。';

  return {
    fullDescription: description,
    environmentDesc: environmentDesc,
    searchSequence: searchSequence,
    distance: distance.meters,
    distanceDesc: distance.desc,
    coveringHint: covering,
    timingHint: timing,
    itemHint: itemHint,
  };
}

export function generateLostItemReading(result, itemInfo) {
  var hex = result.originalHexagram;
  if (!hex) return null;

  var itemType = itemInfo?.itemType || 'other';
  var yongShen = getYongShen(itemType);
  var lowerTrigramName = hex.lowerTrigram || '乾';
  var upperTrigramName = hex.upperTrigram || '坤';
  var primaryDirection = getDirectionByTrigram(lowerTrigramName);
  var secondaryDirection = getDirectionByTrigram(upperTrigramName);

  var changingYaoArr = result.changingYao || [];
  var movingPositions = changingYaoArr
    .map(function(c, i) { return c ? i + 1 : null; }).filter(Boolean);
  var firstMovingPos = movingPositions.length > 0 ? movingPositions[0] : null;

  var primaryYaoPos = firstMovingPos || 3;
  var secondaryYaoPos = movingPositions.length > 1 ? movingPositions[1] : (firstMovingPos ? (firstMovingPos % 6) + 1 : 4);

  var primaryHeight = POSITION_HEIGHT[primaryYaoPos] || POSITION_HEIGHT[3];
  var secondaryHeight = POSITION_HEIGHT[secondaryYaoPos] || POSITION_HEIGHT[4];

  var primaryElement = PALACE_ELEMENT[lowerTrigramName] || '土';
  var secondaryElement = PALACE_ELEMENT[upperTrigramName] || '金';
  var primaryEnv = ELEMENT_ENV[primaryElement] || ELEMENT_ENV.土;
  var secondaryEnv = ELEMENT_ENV[secondaryElement] || ELEMENT_ENV.金;

  var difficultyScore = getDifficultyScore(result);
  var difficulty = DIFFICULTY_LEVELS.find(function(d) { return d.min <= difficultyScore && difficultyScore <= d.max; }) || DIFFICULTY_LEVELS[0];

  var tempReading = {
    primaryDirection: primaryDirection,
    secondaryDirection: secondaryDirection,
    primaryHeight: primaryHeight,
    secondaryHeight: secondaryHeight,
    primaryElement: primaryElement,
    secondaryElement: secondaryElement,
    primaryEnv: primaryEnv,
    secondaryEnv: secondaryEnv,
    movingPositions: movingPositions,
    lowerTrigramName: lowerTrigramName,
    upperTrigramName: upperTrigramName,
  };

  var relativePos = generateRelativePosition(tempReading, itemInfo);

  var searchDirection = primaryDirection.direction + (primaryHeight.level === '极高' ? '偏' + secondaryDirection.direction : '');

  var searchSuggestion = '优先检查' + primaryDirection.direction + '方向，' + primaryHeight.heightDesc + '，注意' + primaryEnv + '。';
  var secondarySuggestion = secondaryDirection.direction !== primaryDirection.direction
    ? '其次检查' + secondaryDirection.direction + '方向，' + secondaryHeight.heightDesc + '，留意' + secondaryEnv + '。'
    : '同时留意' + primaryDirection.direction + '方向的' + secondaryHeight.desc + '。';

  var locationHint = itemInfo?.location
    ? '根据您提供的丢失地点\u300C' + itemInfo.location + '\u300D，' + primaryDirection.hint
    : primaryDirection.hint;

  var movingHint = movingPositions.length > 0
    ? '第' + movingPositions.join('、') + '爻动，提示物品' + (movingPositions.length > 1 ? '被多次移动' : '仍在某处未远走')
    : '无动爻，物品位置相对固定，不易移位';

  var timeSinceLost = itemInfo?.lostTime
    ? '丢失时间：' + new Date(itemInfo.lostTime).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
    : '丢失时间不详';

  return {
    yongShen: yongShen.name,
    yongShenIcon: yongShen.icon,
    itemTypeLabel: getItemTypeLabel(itemType),
    primaryDirection: primaryDirection,
    secondaryDirection: secondaryDirection,
    primaryHeight: primaryHeight,
    secondaryHeight: secondaryHeight,
    primaryElement: primaryElement,
    secondaryElement: secondaryElement,
    primaryEnv: primaryEnv,
    secondaryEnv: secondaryEnv,
    difficulty: difficulty,
    difficultyScore: difficultyScore,
    searchDirection: searchDirection,
    searchSuggestion: searchSuggestion,
    secondarySuggestion: secondarySuggestion,
    locationHint: locationHint,
    movingHint: movingHint,
    timeSinceLost: timeSinceLost,
    movingPositions: movingPositions,
    lowerTrigramName: lowerTrigramName,
    upperTrigramName: upperTrigramName,
    itemLocation: itemInfo?.location || '',
    relativePosition: relativePos,
  };
}
