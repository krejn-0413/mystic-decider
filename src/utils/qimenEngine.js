var TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
var DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
var SHI_CHEN_MAP = [
  { dz: '子', hours: [23, 0] },
  { dz: '丑', hours: [1, 2] },
  { dz: '寅', hours: [3, 4] },
  { dz: '卯', hours: [5, 6] },
  { dz: '辰', hours: [7, 8] },
  { dz: '巳', hours: [9, 10] },
  { dz: '午', hours: [11, 12] },
  { dz: '未', hours: [13, 14] },
  { dz: '申', hours: [15, 16] },
  { dz: '酉', hours: [17, 18] },
  { dz: '戌', hours: [19, 20] },
  { dz: '亥', hours: [21, 22] },
];

var DI_ZHI_PALACE = { '子': 1, '丑': 8, '寅': 8, '卯': 3, '辰': 4, '巳': 4, '午': 9, '未': 2, '申': 2, '酉': 7, '戌': 6, '亥': 6 };

var JIA_ZI_XUN = {
  '甲子': { xunShou: '戊', diZhi: '子', palace: 1 },
  '甲戌': { xunShou: '己', diZhi: '戌', palace: 6 },
  '甲申': { xunShou: '庚', diZhi: '申', palace: 7 },
  '甲午': { xunShou: '辛', diZhi: '午', palace: 9 },
  '甲辰': { xunShou: '壬', diZhi: '辰', palace: 4 },
  '甲寅': { xunShou: '癸', diZhi: '寅', palace: 8 },
};

function getXunInfo(hourStem, hourBranch) {
  var hourStemIdx = TIAN_GAN.indexOf(hourStem);
  var hourBranchIdx = DI_ZHI.indexOf(hourBranch);
  var xunOffset = (hourStemIdx - hourBranchIdx + 12) % 12;
  if (xunOffset === 0) return JIA_ZI_XUN['甲子'];
  if (xunOffset === 2) return JIA_ZI_XUN['甲戌'];
  if (xunOffset === 4) return JIA_ZI_XUN['甲申'];
  if (xunOffset === 6) return JIA_ZI_XUN['甲午'];
  if (xunOffset === 8) return JIA_ZI_XUN['甲辰'];
  if (xunOffset === 10) return JIA_ZI_XUN['甲寅'];
  return JIA_ZI_XUN['甲子'];
}

var WU_HU_DUN = [
  { yearStem: 0, monthStemStart: 2 },  // 甲己 → 丙寅
  { yearStem: 1, monthStemStart: 4 },  // 乙庚 → 戊寅
  { yearStem: 2, monthStemStart: 6 },  // 丙辛 → 庚寅
  { yearStem: 3, monthStemStart: 8 },  // 丁壬 → 壬寅
  { yearStem: 4, monthStemStart: 0 },  // 戊癸 → 甲寅
];

var WU_SHU_DUN = [
  { dayStem: 0, hourStemStart: 0 },  // 甲己 → 甲子
  { dayStem: 1, hourStemStart: 2 },  // 乙庚 → 丙子
  { dayStem: 2, hourStemStart: 4 },  // 丙辛 → 戊子
  { dayStem: 3, hourStemStart: 6 },  // 丁壬 → 庚子
  { dayStem: 4, hourStemStart: 8 },  // 戊癸 → 壬子
];

var MONTH_START_TERM_NAMES = ['立春','惊蛰','清明','立夏','芒种','小暑','立秋','白露','寒露','立冬','大雪','小寒'];

var SOLAR_TERMS_COMMON = [
  { name: '小寒', month: 1, day: 5, isYang: true },
  { name: '大寒', month: 1, day: 20, isYang: true },
  { name: '立春', month: 2, day: 4, isYang: true },
  { name: '雨水', month: 2, day: 19, isYang: true },
  { name: '惊蛰', month: 3, day: 5, isYang: true },
  { name: '春分', month: 3, day: 20, isYang: true },
  { name: '清明', month: 4, day: 5, isYang: true },
  { name: '谷雨', month: 4, day: 20, isYang: true },
  { name: '立夏', month: 5, day: 5, isYang: true },
  { name: '小满', month: 5, day: 21, isYang: true },
  { name: '芒种', month: 6, day: 5, isYang: true },
  { name: '夏至', month: 6, day: 21, isYang: false },
  { name: '小暑', month: 7, day: 7, isYang: false },
  { name: '大暑', month: 7, day: 22, isYang: false },
  { name: '立秋', month: 8, day: 7, isYang: false },
  { name: '处暑', month: 8, day: 23, isYang: false },
  { name: '白露', month: 9, day: 7, isYang: false },
  { name: '秋分', month: 9, day: 23, isYang: false },
  { name: '寒露', month: 10, day: 8, isYang: false },
  { name: '霜降', month: 10, day: 23, isYang: false },
  { name: '立冬', month: 11, day: 7, isYang: false },
  { name: '小雪', month: 11, day: 22, isYang: false },
  { name: '大雪', month: 12, day: 7, isYang: false },
  { name: '冬至', month: 12, day: 22, isYang: true },
];

var YANG_DUN_JU = {
  '冬至': [7, 1, 4], '小寒': [8, 2, 5], '大寒': [9, 3, 6],
  '立春': [8, 5, 2], '雨水': [9, 6, 3], '惊蛰': [1, 7, 4],
  '春分': [3, 9, 6], '清明': [4, 1, 7], '谷雨': [5, 2, 8],
  '立夏': [4, 1, 7], '小满': [5, 2, 8], '芒种': [6, 3, 9],
};

var YIN_DUN_JU = {
  '夏至': [9, 3, 6], '小暑': [8, 2, 5], '大暑': [7, 1, 4],
  '立秋': [2, 5, 8], '处暑': [1, 4, 7], '白露': [9, 3, 6],
  '秋分': [7, 1, 4], '寒露': [6, 9, 3], '霜降': [5, 8, 2],
  '立冬': [6, 9, 3], '小雪': [5, 8, 2], '大雪': [4, 7, 1],
};

var JIU_GONG_LAYOUT = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
];

var PALACE_INFO = {
  1: { name: '坎', position: '北', trigram: '☵', element: '水', direction: '正北' },
  2: { name: '坤', position: '西南', trigram: '☷', element: '土', direction: '西南' },
  3: { name: '震', position: '东', trigram: '☳', element: '木', direction: '正东' },
  4: { name: '巽', position: '东南', trigram: '☴', element: '木', direction: '东南' },
  5: { name: '中', position: '中央', trigram: '☯', element: '土', direction: '中宫' },
  6: { name: '乾', position: '西北', trigram: '☰', element: '金', direction: '西北' },
  7: { name: '兑', position: '西', trigram: '☱', element: '金', direction: '正西' },
  8: { name: '艮', position: '东北', trigram: '☶', element: '土', direction: '东北' },
  9: { name: '离', position: '南', trigram: '☲', element: '火', direction: '正南' },
};

var JIU_XING_MAP = {
  1: '天蓬星', 2: '天芮星', 3: '天冲星', 4: '天辅星', 5: '天禽星',
  6: '天心星', 7: '天柱星', 8: '天任星', 9: '天英星',
};

var JIU_XING_PALACE = {
  1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9,
};

var BA_MEN_MAP = {
  1: '休门', 8: '生门', 3: '伤门', 4: '杜门', 9: '景门', 2: '死门', 7: '惊门', 6: '开门',
};

var BA_MEN_PALACE = { '休门': 1, '生门': 8, '伤门': 3, '杜门': 4, '景门': 9, '死门': 2, '惊门': 7, '开门': 6 };

var BA_SHEN_ORDER = ['值符', '腾蛇', '太阴', '六合', '白虎', '玄武', '九地', '九天'];

export var JIU_XING_INFO = [
  { name: '天蓬星', meaning: '宜守不宜攻', domain: '边防、固守、隐秘之事', modern: '适合保守策略，不宜冒进。代表防御、安全、隐私方面的事务。' },
  { name: '天芮星', meaning: '宜静不宜动', domain: '学习、收敛、休养', modern: '适合学习充电、整理内务。代表需要耐心和沉淀的事情。' },
  { name: '天冲星', meaning: '先难后易', domain: '突破、进击、开拓', modern: '前期有阻力，但坚持后会有突破。代表需要勇气的挑战。' },
  { name: '天辅星', meaning: '顺风顺水', domain: '辅助、教育、合作', modern: '适合合作、求教、教育相关事务。代表贵人运和助力。' },
  { name: '天禽星', meaning: '大吉大利', domain: '中庸、调和、稳定', modern: '中庸之道，平稳发展。代表和谐、平衡的时期。' },
  { name: '天心星', meaning: '谋事可成', domain: '策划、开创、医疗', modern: '适合规划新项目、创业、健康管理。代表智慧和决断力。' },
  { name: '天柱星', meaning: '宜守不宜攻', domain: '防守、支撑、稳固', modern: '适合巩固现有基础，不宜扩张。代表需要坚守的领域。' },
  { name: '天任星', meaning: '任重道远', domain: '负重、持久、责任', modern: '需要长期坚持和付出。代表责任重大的事务。' },
  { name: '天英星', meaning: '光辉灿烂', domain: '展示、成名、辉煌', modern: '适合表现自我、推广宣传。代表能获得认可和荣誉。' },
];

export var BA_MEN_INFO = [
  { name: '休门', meaning: '休养生息', element: '水', direction: '北', modern: '适合休息、调整、恢复。利见贵、婚嫁、经商。' },
  { name: '生门', meaning: '生机勃勃', element: '土', direction: '东北', modern: '大吉之门。适合创业、求财、嫁娶、建造。代表新生命的开始。' },
  { name: '伤门', meaning: '伤筋动骨', element: '木', direction: '东', modern: '凶门。适合捕猎、索债，不利出行、经商。代表损伤和竞争。' },
  { name: '杜门', meaning: '杜塞不通', element: '木', direction: '东南', modern: '适合隐遁、躲藏、保密。不利行动，代表阻碍和封闭。' },
  { name: '景门', meaning: '景色宜人', element: '火', direction: '南', modern: '适合献策、展现才华、考试。代表光明前景和表现机会。' },
  { name: '死门', meaning: '死气沉沉', element: '土', direction: '西南', modern: '凶门。适合祭祀、葬埋。不利谋事、出行。代表终结和停滞。' },
  { name: '惊门', meaning: '惊心动魄', element: '金', direction: '西', modern: '适合捕猎、诉讼。代表惊吓、变动、不稳定因素。' },
  { name: '开门', meaning: '开门大吉', element: '金', direction: '西北', modern: '大吉之门。适合开业、求名、远行、婚嫁。代表开创和通达。' },
];

export var BA_SHEN_INFO = [
  { name: '值符', meaning: '天乙贵人', modern: '最吉祥的神煞。代表贵人相助、天时地利。所到之处百事顺遂。' },
  { name: '腾蛇', meaning: '虚惊怪异', modern: '代表虚幻、变化、意外。需要警惕虚假信息和突发事件。' },
  { name: '太阴', meaning: '荫护庇护', modern: '代表暗中助力、女性贵人。适合隐秘谋划、私下协商。' },
  { name: '六合', meaning: '和合喜庆', modern: '代表合作、姻缘、中介。适合谈婚论嫁、签订合同。' },
  { name: '白虎', meaning: '凶煞血光', modern: '代表压力、竞争、危险。需要防范意外伤害和口舌是非。' },
  { name: '玄武', meaning: '暗昧盗贼', modern: '代表小人、失窃、隐私。注意财产安全和个人隐私保护。' },
  { name: '九地', meaning: '稳固持久', modern: '代表稳重、积累、长期。适合仓储、种植、长期投资。' },
  { name: '九天', meaning: '高远广阔', modern: '代表远大理想、出行远行。适合开拓新领域、升职发展。' },
];

export var XIANG_YI_DATABASE = {
  jiuXing: {
    '天蓬星': { good: false, score: 2, wuxing: '水', gua: '坎', meaning: '大凶之星，又名"贪狼星"', traditional: '宜固守边防、修筑城池、屯兵积粮，不宜主动出击、远行经商。代表隐伏、盗贼、险阻。', modern: '此星临宫，宜守不宜攻。当前适合保守策略、整理内部事务，不宜冒险扩张。注意防盗防骗，谨慎处理财务。适合从事安全、保密、防御性质的工作。', detail: '天蓬星原名"贪狼星"，因与北斗七星中的贪狼星同名，古代术数家为避讳而改称天蓬。在奇门遁甲中，天蓬星属水，对应坎卦，方位正北。其性阴险狡诈，主盗贼、小人、暗中破坏。但凡事有两面，天蓬星也代表智慧策略、谋略策划。如果临吉门（如休门、生门），则可化凶为吉，适合谋划策略、暗中布局。', advice: '谨慎行事，多做准备，不宜冲动决策。可请教学者或有经验之人。注意检查安全漏洞和财务风险。' },
    '天芮星': { good: false, score: 3, wuxing: '土', gua: '坤', meaning: '凶星，又名"巨门星"', traditional: '宜静不宜动，适合休养学习、收敛内省。不宜进攻、扩张、远行。主疾病、劳累、学业。', modern: '此星临宫，适合静心学习、休养调整。不宜过度劳累或冒进。如有身体不适应及早就医检查。适合完成手头工作，不宜开启新项目。', detail: '天芮星又名"巨门星"，属土对应坤卦。在奇门中主病符、劳碌、学业。天芮星虽为凶星，但临吉门时主学业有成、考试顺利。特别是在临生门或休门时，反而代表通过学习和积累获得成就。此星也代表农耕、医疗、教育领域的事务。', advice: '注意身体健康，劳逸结合。适合读书学习、整理资料、复盘总结。如有考试或考核，踏实用功必有回报。' },
    '天冲星': { good: false, score: 4, wuxing: '木', gua: '震', meaning: '次凶之星，又名"禄存星"', traditional: '先难后易，宜突破重围、冲锋陷阵。适合主动出击、开拓创新。不利求财、婚嫁。', modern: '前期会遇到较大阻力，但只要坚持终有突破。适合需要勇气和决断力的事务，如创业、换工作、专利申请等。不建议短期求财或感情方面冒进。', detail: '天冲星又名"禄存星"，属木对应震卦。象征雷电、震动、冲击。代表突然的变化、突破性的进展。在古代多用于军事突袭、攻城略地。在现代可理解为项目攻关、技术突破、危机处理。天冲星临宫，意味着需要果断行动，犹豫不决会错失良机。', advice: '果断行动但做好充分准备。适合挑战性任务，不适合稳健型投资。把握时机，当断则断。' },
    '天辅星': { good: true, score: 7, wuxing: '木', gua: '巽', meaning: '吉星，又名"文曲星"', traditional: '大吉之星，适合教育、文化、合作、求财。主文雅、礼貌、好善。', modern: '此星临宫大吉，尤其适合教育、培训、出版、文化传播领域。合作事宜顺利，贵人运强。适合拜访师长、洽谈合作、签订协议。', detail: '天辅星又名"文曲星"，属木对应巽卦。巽为风，代表传播、沟通、教育。天辅星是奇门中最吉利的星之一，主文化教育、道德修养。临宫之人聪明善良、温文尔雅。此星特别利于考试升学、求职面试、商务谈判、文化创作等。天辅星所到之处，百事和顺。', advice: '积极行动，宜主动社交、求学、合作。适合策划宣传、教育培训、文化创意类工作。遇事有贵人相助。' },
    '天禽星': { good: true, score: 8, wuxing: '土', gua: '坤', meaning: '大吉之星，又名"廉贞星"', traditional: '中庸大吉，万事皆宜。代表和谐、平衡、稳定。', modern: '所有事情都处于平衡稳定的状态，适合按部就班推进各项计划。尤其适合调和矛盾、协调关系、谈判斡旋。', detail: '天禽星又名"廉贞星"，属土居中宫。在奇门九星中，天禽星是唯一居中五宫的星，代表大中至正、不偏不倚。此星光临，无论做什么都能保持平衡和谐。古代用于描述君主有德、天下太平。在现代代表事务发展平稳，各方利益均衡，适合从事调解、仲裁、管理等工作。', advice: '万事平和，顺势而为。适合团队建设、家庭聚会、合作谈判。保持中庸之道，不宜极端行事。' },
    '天心星': { good: true, score: 9, wuxing: '金', gua: '乾', meaning: '大吉之星，又名"武曲星"', traditional: '谋事可成，适合医疗、策划、开创。代表智慧和决断力。', modern: '非常适合开启新计划、创业、健康管理。此星代表谋略和智慧，遇到问题能想到解决方案。特别利于医疗健康、策划规划、科技创新等领域。', detail: '天心星又名"武曲星"，属金对应乾卦。乾为天、为君、为父，代表刚健、智慧、领导力。天心星是奇门中最吉利的星之一，主智慧谋略、慈悲善良。在古代代表良医良相，在现代代表企业管理、战略规划、医疗健康。天心星临宫，代表有智慧的人或方法出现，能解决问题。', advice: '大胆规划，积极行动。适合医疗体检、战略规划、项目启动。有智慧和机会解决长期困扰的问题。' },
    '天柱星': { good: false, score: 3, wuxing: '金', gua: '兑', meaning: '凶星，又名"破军星"', traditional: '宜守不宜攻，适合防守、支撑。主口舌是非、破坏、变革。', modern: '此星临宫宜保守，不宜扩张。适合巩固已有基础、处理遗留问题。注意口舌是非和人际关系。在变革期，天柱星也代表破旧立新的力量。', detail: '天柱星又名"破军星"，属金对应兑卦。兑为口舌、为毁折。天柱星主破坏、倒塌、变革。在古代多用于防守、守城。在现代可理解为组织变革、结构重组、清理旧账。天柱星也有能言善辩之象，适合辩论、演讲、律师、销售等靠口才的职业。逢吉门则口才生财，逢凶门则口舌招灾。', advice: '谨言慎行，避免争执。适合整理归档、清理冗余、巩固基础。如有口舌是非，以退为进。' },
    '天任星': { good: true, score: 6, wuxing: '土', gua: '艮', meaning: '吉星，又名"左辅星"', traditional: '任重道远，适合承担责任、长期坚持。主诚实守信、脚踏实地。', modern: '适合需要长期坚持和付出的事情，如考研、深造、项目建设。代表责任和担当，只要脚踏实地就能成功。', detail: '天任星又名"左辅星"，属土对应艮卦。艮为山，代表稳重、停滞、积累。天任星主诚信、责任、持久。古代多用于农耕、建筑、仓储等需要长期坚持的行业。在现代代表项目管理、长期投资、学术研究、基础设施建设等领域。此星虽然进展不快，但胜在稳定持久，最终必有收获。', advice: '脚踏实地，坚持不懈。适合长期项目、学业深造、储蓄投资。不宜急功近利，耐心是成功的关键。' },
    '天英星': { good: false, score: 5, wuxing: '火', gua: '离', meaning: '中平之星，又名"右弼星"', traditional: '光辉灿烂，适合展示才华、成名。主光明、热情、名声。', modern: '适合展现自我、宣传推广、参加比赛或面试。此星能带来关注度和名声，但也容易因过于张扬而招来是非。需把握分寸。', detail: '天英星又名"右弼星"，属火对应离卦。离为火、为日、为电，代表光明、热情、文明。天英星主名声、文化、艺术。在古代多用于科举考试、出使外国。在现代适合演艺、传媒、广告、市场营销等行业。此星临宫表现力强，但也容易过于招摇。临吉门则声名鹊起，临凶门则众矢之的。', advice: '适度展示自己，把握机会表现才华。适合面试、演讲、演出、发布新品。注意不要过于张扬引起反感。' },
  },
  baMen: {
    '休门': { good: true, score: 8, wuxing: '水', meaning: '休养生息，大吉之门', suitable: '拜见贵人、婚嫁、经商、求财、修造、出行', avoid: '不宜诉讼、打猎、远行涉险', traditional: '休门属水，配坎卦。休为休息、安闲。此门为三吉门之首，善于处理人际关系的门路。主休养生息、好事来临。', modern: '休门是最吉利的门之一。适合处理人际关系，如拜访客户、相亲约会、商务应酬。同时适合修养调整、规划未来。此时利于静心思考，不适合激烈的对抗性活动。', advice: '适合社交活动、商务谈判、约会团聚。宜静不宜动，谋定而后动。' },
    '生门': { good: true, score: 9, wuxing: '土', meaning: '生生不息，大吉之门', suitable: '创业、求财、嫁娶、建造、种植、求医', avoid: '不宜丧葬、诉讼、远行', traditional: '生门属土，配艮卦。生为生长、发展。此门为三吉门之最，代表生命力和财富。万物生长之象，百事大吉。', modern: '生门是所有门中最吉利的。适合开启新项目、创业开业、投资理财、婚嫁喜事、装修建造。生门临宫，万事有生机。遇到困难时生门代表转机和希望。尤其适合求财和事业发展。', advice: '大胆行动，抓住机会。适合开业、签约、投资、求婚。是开启新事物的绝佳时机。' },
    '伤门': { good: false, score: 2, wuxing: '木', meaning: '损伤惊动，凶门', suitable: '捕猎、索债、催收、竞争', avoid: '出行、经商、婚嫁、建造', traditional: '伤门属木，配震卦。伤为损伤、伤害。此门主竞争、争斗、损伤。适合以暴制暴、追索债务。', modern: '伤门代表竞争激烈的领域。适合体育竞技、债务追讨、市场竞争。但要注意控制风险，避免过度对抗导致损失。不适合出行旅游、投资合作、婚恋嫁娶等需要和谐的事务。伤门也代表车辆、机械相关的风险。', advice: '谨慎应对竞争，控制风险。适合处理积压的纠纷和债务，但不宜开启新的合作或投资。注意交通安全和机械操作。' },
    '杜门': { good: false, score: 3, wuxing: '木', meaning: '杜塞不通，中平之门', suitable: '隐遁、保密、防守、学术研究', avoid: '远行、经商、求财', traditional: '杜门属木，配巽卦。杜为阻塞、杜绝。此门主隐藏、保密、阻碍。适合从事需要保密的工作。', modern: '杜门代表封闭和阻碍。但凡事有弊有利，杜门也适合专注研究、闭关创作、保密工作。此时不宜强求出击，而应专注于提升内在。适合埋头做事、学术钻研、代码开发等需要专注力的工作。', advice: '专注积累，不宜冒进。适合学习、研究、创作。不适合社交应酬和业务拓展。注意检查是否有未发现的障碍。' },
    '景门': { good: true, score: 6, wuxing: '火', meaning: '景色光明，中吉之门', suitable: '献策、考试、求职、展示才华、文化创作', avoid: '不宜诉讼、远行、潜水', traditional: '景门属火，配离卦。景为景象、光明。此门主策略、谋略、文书。适合展现才华的场合。', modern: '景门代表表现和曝光的机会。适合面试应聘、演讲汇报、发布新产品、文化创作、考试考核等方面。景门临宫，才华能得到赏识和认可。但也要注意，过于张扬可能引来不必要的关注。', advice: '积极展示能力，把握表现机会。适合面试、提案、发布。注意适度表现，避免招摇。' },
    '死门': { good: false, score: 1, wuxing: '土', meaning: '死气沉沉，大凶之门', suitable: '祭祀、超度、法事、终结事务', avoid: '一切谋事、出行、经商、嫁娶、建造', traditional: '死门属土，配坤卦。死为终结、静止。此门为最凶之门，百事不利。只适合祭祀、超度等事宜。', modern: '死门是八门中最凶的。代表停滞、终结、dead end。此门临宫，万事不宜强行。适合了结旧事、清理债务、结束合作关系。不适合开启任何新事务。但也代表旧的不去新的不来，有时需要先结束才能有新的开始。', advice: '宜静不宜动，宜守不宜攻。适合结束旧事务、做清理和整理。不适合新开始。保持耐心，等待时转运来。' },
    '惊门': { good: false, score: 2, wuxing: '金', meaning: '惊心动魄，凶门', suitable: '辩论、诉讼、捕猎、驱邪', avoid: '出行、签约、婚嫁、建造', traditional: '惊门属金，配兑卦。惊为惊恐、惊险。此门主口舌、诉讼、惊吓。适合处理法律事务。', modern: '惊门代表突如其来的变化和惊吓。适合处理法律诉讼、辩论谈判、危机公关。但要注意控制情绪，避免口舌之争升级为冲突。不适合签订长期合同、旅行、大型活动。惊门也代表媒体曝光，临此门需注意公关危机。', advice: '注意沟通方式，防止口舌是非。适合法律咨询、辩论、危机处理。不适合重大决策和签约。' },
    '开门': { good: true, score: 9, wuxing: '金', meaning: '开门大吉，大吉之门', suitable: '开业、求名、远行、婚嫁、求官、就职', avoid: '不宜诉讼、隐秘之事', traditional: '开门属金，配乾卦。开为开创、通达。此门为三吉门之一，代表创始、公开、顺利。', modern: '开门是与生门并列的大吉之门。代表开创和机遇，适合开业庆典、求职就任、公开发布、开始新旅程。开门临宫，万事通达，遇到阻碍也能迎刃而解。尤其适合开启公开性、官方性的事务。', advice: '大胆开创，积极进取。适合开业、入职、发布、旅行。是开启新局面的最佳时机。' },
  },
  baShen: {
    '值符': { good: true, score: 9, meaning: '天乙贵人，大吉之神', traditional: '值符为八神之首，即天乙贵人。所到之处百事顺遂，逢凶化吉。代表贵人、领导、长辈。', modern: '值符是最吉祥的神煞。代表有贵人相助，或者自己就是那个贵人。适合处理重要事务，拜访上级，寻求帮助。值符临宫的人或事会得到特别的眷顾和支持。', advice: '运势强劲，有贵人相助。适合主动拜访权威人士、寻求帮助或指导。所谋之事容易成功。' },
    '腾蛇': { good: false, score: 3, meaning: '虚惊怪异，中平之神', traditional: '腾蛇代表虚幻、变化、意外。主虚惊、怪异之事，也代表变化莫测的局势。', modern: '腾蛇临宫需要警惕虚假信息和突发事件。适合做灵活应变的事情，不适合做长期固定的投资。注意防范欺诈、谣言。感情方面需防虚情假意。但也代表创意和灵活应变能力。', advice: '保持警惕，核实信息。适合灵活应变的工作，不适合重大投资和长期承诺。注意辨别真假。' },
    '太阴': { good: true, score: 7, meaning: '荫护庇护，吉神', traditional: '太阴代表暗中助力、女性贵人。适合隐秘谋划、私下协商。主阴德、暗中帮助。', modern: '太阴是吉神，代表有女性贵人暗中相助。适合私下协商、秘密计划、幕后工作。太阴也代表思考、策划、谋略，适合做需要深思熟虑的工作。夜间或室内事务顺利。', advice: '适合幕后策划、私下协商。女性贵人多助。不宜过于张扬，暗中行事更为有利。' },
    '六合': { good: true, score: 8, meaning: '和合喜庆，大吉之神', traditional: '六合代表合作、姻缘、中介。主和合之美，代表婚姻、合作、谈判顺利。', modern: '六合是非常吉利的神煞，代表人际关系和谐。适合婚恋求婚、商务合作、签合同、中介服务。六合也代表团队合作，众人一心，其利断金。特别适合需要多方协调的事务。', advice: '合作顺利，人际关系和谐。适合求婚订婚、签约合作、调解矛盾。不宜孤军奋战。' },
    '白虎': { good: false, score: 2, meaning: '凶煞血光，大凶之神', traditional: '白虎代表压力、竞争、危险。主血光之灾、冲突、伤病。代表强大的敌对力量。', modern: '白虎临宫需特别注意安全和健康。存在较大的竞争压力，可能面临强劲的对手或困难。适合处理需要强力的工作，但要注意方式方法。在体育竞技、市场竞争中有特殊意义。注意外伤和突发性疾病。', advice: '注意安全，避免冲突。竞争激烈，需做好充分准备。谨防意外伤害，注意健康管理。' },
    '玄武': { good: false, score: 2, meaning: '暗昧盗贼，凶神', traditional: '玄武代表小人、失窃、隐私。主暗中破坏、盗窃、欺骗。代表隐秘的敌人。', modern: '玄武临宫需要提高警惕，注意财产安全和隐私保护。可能存在小人暗中作祟或者信息泄露的风险。适合从事调查、侦探、保密类工作。感情上可能有隐瞒或欺骗。', advice: '保管好财物，注意信息安全。提防小人，做事留有余地。适合调查取证，不宜轻信他人。' },
    '九地': { good: true, score: 6, meaning: '稳固持久，吉神', traditional: '九地代表稳重、积累、长期。主仓储、种植、长期投资。适合耐心积累。', modern: '九地是吉神，代表稳定和持久。适合长期投资、储蓄、仓储物流、土地房产相关事务。九地也代表脚踏实地，只要坚持就能成功。在学习、科研、工程建设等方面特别有利。', advice: '稳扎稳打，长期布局。适合储蓄投资、学习积累、工程建设。不宜急功近利。' },
    '九天': { good: true, score: 7, meaning: '高远广阔，大吉之神', traditional: '九天代表远大理想、出行远行。适合开拓新领域、升职发展。主高升、远行。', modern: '九天是非常吉利的神煞，代表高远的志向和广阔的发展空间。适合制定远大目标、规划未来、出国留学、升职述职。九天也代表创新和突破传统，适合高科技、航天、教育等领域。', advice: '志存高远，大胆拓展。适合晋升、远行、出国、开拓新市场。不宜安于现状。' },
  },
  palace: {
    1: { wuxing: '水', direction: '正北', trigram: '坎☵', season: '冬', hour: '子时(23:00-01:00)', color: '黑、蓝', body: '耳、肾、血液', symbol: '智慧、隐伏、险陷', nature: '坎为水，为险陷，为沟渎。代表困难、挑战，但也代表智慧。水能载舟亦能覆舟，寓意困境中的智慧。', animal: '豕（猪）', meaning: '坎宫主智，好思索，处事谨慎。但易多虑、忧郁。宜水利、航海、物流、科研等行业。此宫见吉星吉门则智谋过人，见凶星凶门则陷入困境。' },
    2: { wuxing: '土', direction: '西南', trigram: '坤☷', season: '夏秋之交', hour: '未申时(13:00-17:00)', color: '黄、棕', body: '腹、脾、肌肉', symbol: '包容、柔顺、养育', nature: '坤为地，为母，为柔顺。代表包容、承载、滋养万物。厚德载物之象。', animal: '牛', meaning: '坤宫主顺，性格温和包容，善理家务。宜农业、地产、管理、服务等行业。此宫见吉星吉门则厚德载物，见凶星凶门则劳碌奔波。' },
    3: { wuxing: '木', direction: '正东', trigram: '震☳', season: '春', hour: '卯时(05:00-07:00)', color: '绿、青', body: '足、肝、筋', symbol: '震动、奋起、变革', nature: '震为雷，为动，为奋起。代表变动、革新、行动力。春雷惊蛰，万物复苏。', animal: '龙', meaning: '震宫主动，性格果断刚毅，勇于创新。宜机械、军事、体育、创业等行业。此宫见吉星吉门则雷厉风行，见凶星凶门则冲动招祸。' },
    4: { wuxing: '木', direction: '东南', trigram: '巽☴', season: '春夏之交', hour: '辰巳时(07:00-11:00)', color: '绿、蓝', body: '股、胆、风', symbol: '渗透、传播、进退', nature: '巽为风，为入，为进退。代表传播、沟通、灵活变通。风行天下，无所不入。', animal: '鸡', meaning: '巽宫主通，善于沟通交际，适应力强。宜教育、传媒、销售、外交等行业。此宫见吉星吉门则一帆风顺，见凶星凶门则犹豫不决。' },
    5: { wuxing: '土', direction: '中央', trigram: '☯', season: '四季', hour: '—', color: '黄', body: '脾、胃', symbol: '中和、平衡、包容', nature: '中宫寄坤，为中央土。代表平衡、调和、中庸之道。万物归一之处。', animal: '人', meaning: '中宫为太极之所在，统摄八方。此宫无门，天禽星所在之处。代表整体大局和中心思想。见天禽星则万事调和发展。' },
    6: { wuxing: '金', direction: '西北', trigram: '乾☰', season: '秋冬之交', hour: '戌亥时(19:00-23:00)', color: '白、金', body: '头、肺、骨', symbol: '刚健、进取、领导', nature: '乾为天，为君，为父。代表刚健、领导力、开创精神。天行健，君子以自强不息。', animal: '马', meaning: '乾宫主健，性格刚毅果断，有领导才能。宜管理、行政、军事、金融等行业。此宫见吉星吉门则功成名就，见凶星凶门则刚愎自用。' },
    7: { wuxing: '金', direction: '正西', trigram: '兑☱', season: '秋', hour: '酉时(17:00-19:00)', color: '白', body: '口、肺、皮肤', symbol: '喜悦、口舌、毁折', nature: '兑为泽，为悦，为口舌。代表喜悦、交流，也代表毁坏和争论。', animal: '羊', meaning: '兑宫主悦，性格开朗善言，有艺术天赋。宜娱乐、传媒、律师、销售等行业。此宫见吉星吉门则喜悦有成，见凶星凶门则口舌是非。' },
    8: { wuxing: '土', direction: '东北', trigram: '艮☶', season: '冬春之交', hour: '丑寅时(01:00-05:00)', color: '黄、棕', body: '手、鼻、胃', symbol: '静止、积累、阻挡', nature: '艮为山，为止，为阻挡。代表静止、积累、等待时机。动静有常，止则止，行则行。', animal: '狗', meaning: '艮宫主止，性格稳重踏实，善于积累。宜仓储、建筑、矿业、科研等行业。此宫见吉星吉门则厚积薄发，见凶星凶门则停滞不前。' },
    9: { wuxing: '火', direction: '正南', trigram: '离☲', season: '夏', hour: '午时(11:00-13:00)', color: '红、紫', body: '目、心、血管', symbol: '光明、文明、热情', nature: '离为火，为日，为电。代表光明、文明、美丽。火代表热情和创造力。', animal: '雉（野鸡）', meaning: '离宫主明，性格热情开朗，有才华和创造力。宜文化、艺术、科技、传媒等行业。此宫见吉星吉门则声名显赫，见凶星凶门则焦躁冲动。' },
  },
  combination: [
    { pattern: '天心星+开门', desc: '智慧与开创的结合，大利事业开拓、管理决策、医疗健康', score: 10 },
    { pattern: '天辅星+生门', desc: '文化与财富的完美结合，大利教育求财、文化事业', score: 10 },
    { pattern: '天禽星+休门', desc: '和谐与休养的结合，大利合作谈判、修养调整', score: 9 },
    { pattern: '天任星+生门', desc: '稳重与财富的结合，大利长期投资、田宅产业', score: 9 },
    { pattern: '天英星+景门', desc: '才华与表现的结合，大利成名、考试、展示', score: 8 },
    { pattern: '天蓬星+休门', desc: '智慧与谋略的结合，适合策略规划、暗中布局', score: 7 },
    { pattern: '天芮星+死门', desc: '疾病与终结的组合，注意健康问题，适合了结旧事', score: 1 },
    { pattern: '天柱星+惊门', desc: '口舌与惊吓的组合，注意法律纠纷、口舌是非', score: 1 },
    { pattern: '天冲星+伤门', desc: '冲击与损伤的组合，需防冲突和意外', score: 2 },
  ],
};

export var ELEMENT_COLORS = {
  '金': { bg: 'rgba(201,168,76,0.15)', text: '#c9a84c', border: 'rgba(201,168,76,0.3)' },
  '木': { bg: 'rgba(91,140,111,0.15)', text: '#5b8c6f', border: 'rgba(91,140,111,0.3)' },
  '水': { bg: 'rgba(59,130,200,0.15)', text: '#3b82c8', border: 'rgba(59,130,200,0.3)' },
  '火': { bg: 'rgba(196,78,82,0.15)', text: '#c44e52', border: 'rgba(196,78,82,0.3)' },
  '土': { bg: 'rgba(160,120,80,0.15)', text: '#a07850', border: 'rgba(160,120,80,0.3)' },
};

var ELEMENT_BG_GRADIENT = {
  '金': ['rgba(201,168,76,0.08)', 'rgba(201,168,76,0.02)'],
  '木': ['rgba(91,140,111,0.08)', 'rgba(91,140,111,0.02)'],
  '水': ['rgba(59,130,200,0.08)', 'rgba(59,130,200,0.02)'],
  '火': ['rgba(196,78,82,0.08)', 'rgba(196,78,82,0.02)'],
  '土': ['rgba(160,120,80,0.08)', 'rgba(160,120,80,0.02)'],
};

function toBeijingTime(date) {
  var utc = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utc + 8 * 3600000);
}

function daysBetween(d1, d2) {
  var t1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
  var t2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());
  return Math.floor((t2 - t1) / 86400000);
}

function getGanZhiIndex(year) {
  var diff = year - 4;
  return { stem: ((diff % 10) + 10) % 10, branch: ((diff % 12) + 12) % 12 };
}

function getMonthBranch(bjDate, year) {
  var bjUTC = new Date(Date.UTC(bjDate.getFullYear(), bjDate.getMonth(), bjDate.getDate()));
  var liChunTerm = null;
  for (var li = 0; li < SOLAR_TERMS_COMMON.length; li++) {
    if (SOLAR_TERMS_COMMON[li].name === '立春') {
      liChunTerm = SOLAR_TERMS_COMMON[li];
      break;
    }
  }
  var liChunDate = liChunTerm ? new Date(Date.UTC(year, liChunTerm.month - 1, liChunTerm.day)) : null;
  var isBeforeLiChun = liChunDate && bjUTC < liChunDate;

  var candidates = [];
  for (var i = 0; i < MONTH_START_TERM_NAMES.length; i++) {
    var termName = MONTH_START_TERM_NAMES[i];
    var term = SOLAR_TERMS_COMMON.find(function(t) { return t.name === termName; });
    if (!term) continue;
    var y = year;
    if (termName === '大雪' || termName === '冬至') {
      if (isBeforeLiChun) y = year - 1;
    } else if (termName === '小寒' || termName === '大寒') {
      if (!isBeforeLiChun) y = year;
      else y = year;
    }
    var termDate = new Date(Date.UTC(y, term.month - 1, term.day));
    candidates.push({ name: termName, date: termDate });
  }
  candidates.sort(function(a, b) { return a.date - b.date; });
  var last = candidates[0];
  for (var i = 0; i < candidates.length; i++) {
    if (bjUTC < candidates[i].date) break;
    last = candidates[i];
  }
  var branchIdx = (MONTH_START_TERM_NAMES.indexOf(last.name) + 2) % 12;
  return branchIdx;
}

function getProperYear(bjDate, year) {
  var bjUTC = new Date(Date.UTC(bjDate.getFullYear(), bjDate.getMonth(), bjDate.getDate()));
  var liChunTerm = null;
  for (var li = 0; li < SOLAR_TERMS_COMMON.length; li++) {
    if (SOLAR_TERMS_COMMON[li].name === '立春') {
      liChunTerm = SOLAR_TERMS_COMMON[li];
      break;
    }
  }
  if (liChunTerm) {
    var liChunDate = new Date(Date.UTC(year, liChunTerm.month - 1, liChunTerm.day));
    if (bjUTC < liChunDate) return year - 1;
  }
  return year;
}

export function calculateFourPillars(date) {
  var bj = toBeijingTime(date);
  var rawYear = bj.getFullYear();
  var properYear = getProperYear(bj, rawYear);
  var month = bj.getMonth() + 1;
  var day = bj.getDate();
  var hour = bj.getHours();

  var yearGanZhi = getGanZhiIndex(properYear);
  var yearStem = TIAN_GAN[yearGanZhi.stem];
  var yearBranch = DI_ZHI[yearGanZhi.branch];

  var monthBranchIdx = getMonthBranch(bj, rawYear);
  var monthBranch = DI_ZHI[monthBranchIdx];

  var wuHu = WU_HU_DUN.find(function(w) { return w.yearStem === yearGanZhi.stem % 5; }) || WU_HU_DUN[0];
  var monthOffset = ((monthBranchIdx - 2) % 12 + 12) % 12;
  var monthStemIdx = (wuHu.monthStemStart + monthOffset) % 10;
  var monthStem = TIAN_GAN[monthStemIdx];

  var refDate = new Date(Date.UTC(2000, 0, 1));
  var bjUTC = new Date(Date.UTC(rawYear, month - 1, day));
  var diffDays = daysBetween(refDate, bjUTC);
  var dayStemIdx = ((4 + diffDays % 10) + 10) % 10;
  var dayBranchIdx = ((6 + diffDays % 12) + 12) % 12;

  var hourBranchItem = SHI_CHEN_MAP.find(function(s) {
    if (s.dz === '子') return hour >= 23 || hour < 1;
    return hour >= s.hours[0] && hour < s.hours[1] + 1;
  }) || SHI_CHEN_MAP[0];
  var hourBranch = hourBranchItem.dz;
  var hourBranchIdx = SHI_CHEN_MAP.indexOf(hourBranchItem);

  var wuShu = WU_SHU_DUN.find(function(w) { return w.dayStem === dayStemIdx % 5; }) || WU_SHU_DUN[0];
  var hourStemIdx = (wuShu.hourStemStart + hourBranchIdx) % 10;
  var hourStem = TIAN_GAN[hourStemIdx];

  return {
    year: yearStem + yearBranch,
    month: monthStem + monthBranch,
    day: TIAN_GAN[dayStemIdx] + DI_ZHI[dayBranchIdx],
    hour: hourStem + hourBranch,
    yearStem: yearStem,
    yearBranch: yearBranch,
    monthStem: monthStem,
    monthBranch: monthBranch,
    dayStem: TIAN_GAN[dayStemIdx],
    dayBranch: DI_ZHI[dayBranchIdx],
    hourStem: hourStem,
    hourBranch: hourBranch,
    shiChenName: hourBranchItem.dz,
  };
}

function findSolarTerm(date) {
  var year = date.getFullYear();
  var bjDate = toBeijingTime(date);
  var bjUTC = new Date(Date.UTC(bjDate.getFullYear(), bjDate.getMonth(), bjDate.getDate()));
  var liChunTerm = null;
  for (var li = 0; li < SOLAR_TERMS_COMMON.length; li++) {
    if (SOLAR_TERMS_COMMON[li].name === '立春') {
      liChunTerm = SOLAR_TERMS_COMMON[li];
      break;
    }
  }
  var liChunDate = liChunTerm ? new Date(Date.UTC(year, liChunTerm.month - 1, liChunTerm.day)) : null;
  var isBeforeLiChun = liChunDate && bjUTC < liChunDate;
  var terms = SOLAR_TERMS_COMMON.map(function(t) {
    var y = year;
    if (isBeforeLiChun && (t.name === '大雪' || t.name === '冬至')) {
      y = year - 1;
    }
    var d = new Date(Date.UTC(y, t.month - 1, t.day));
    return { name: t.name, date: d, isYang: t.isYang, month: t.month, day: t.day };
  });
  terms.sort(function(a, b) { return a.date - b.date; });
  var prev = terms[0];
  for (var i = 0; i < terms.length; i++) {
    if (bjUTC >= terms[i].date) prev = terms[i];
  }
  return prev;
}

function getHouIndex(date, termDate) {
  var diff = Math.floor((date - termDate) / 86400000);
  if (diff < 0) return 0;
  if (diff < 5) return 0;
  if (diff < 10) return 1;
  return 2;
}

function calculateJuNumber(date, termInfo) {
  var isYang = termInfo.isYang;
  var termName = termInfo.name;
  var termDate = new Date(date.getFullYear(), termInfo.month - 1, termInfo.day);
  var houIdx = getHouIndex(date, termDate);
  var juTable = isYang ? YANG_DUN_JU : YIN_DUN_JU;
  var juList = juTable[termName] || [1, 7, 4];
  var ju = juList[houIdx] || juList[0];

  return {
    isYangDun: isYang,
    dunType: isYang ? '阳遁' : '阴遁',
    juNumber: ju,
    currentTerm: termInfo,
    houIndex: houIdx + 1,
  };
}

function getDiPanStems(juNumber, isYangDun) {
  var order = ['戊', '己', '庚', '辛', '壬', '癸', '丁', '丙', '乙'];
  var result = {};
  var palaceOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (var i = 0; i < 9; i++) {
    var palaceNum = palaceOrder[i];
    var stemIdx;
    if (isYangDun) {
      stemIdx = ((juNumber - 1 + i) % 9 + 9) % 9;
    } else {
      stemIdx = ((juNumber - 1 - i) % 9 + 9) % 9;
    }
    result[palaceNum] = order[stemIdx];
  }
  return result;
}

function getTianPanXing(xunInfo, diPanStems, hourStem, isYangDun) {
  var result = {};
  var originalPalace = xunInfo.palace;
  var zhiFuXing = JIU_XING_MAP[originalPalace];

  var hourStemPalace = null;
  for (var p = 1; p <= 9; p++) {
    if (diPanStems[p] === hourStem) {
      hourStemPalace = p;
      break;
    }
  }
  if (!hourStemPalace) hourStemPalace = originalPalace;

  var xingKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (var i = 0; i < xingKeys.length; i++) {
    var srcPalace = xingKeys[i];
    var offset;
    if (isYangDun) {
      offset = ((srcPalace - originalPalace) % 9 + 9) % 9;
    } else {
      offset = ((originalPalace - srcPalace) % 9 + 9) % 9;
    }
    var destPalace;
    if (isYangDun) {
      destPalace = ((hourStemPalace - 1 + offset) % 9 + 9) % 9 + 1;
    } else {
      destPalace = ((hourStemPalace - 1 - offset) % 9 + 9) % 9 + 1;
    }
    result[destPalace] = JIU_XING_MAP[srcPalace];
  }

  return { xingMap: result, zhiFuXing: zhiFuXing, zhiFuPalace: hourStemPalace };
}

function getBaMen(xunInfo, diPanStems, hourBranch, isYangDun) {
  var result = {};
  var originalPalace = xunInfo.palace;
  var zhiShiMenName = BA_MEN_MAP[originalPalace] || '休门';

  var hourBranchPalace = DI_ZHI_PALACE[hourBranch] || 1;
  var hourBranchIdx = DI_ZHI.indexOf(hourBranch);
  var originalBranchPalace = DI_ZHI_PALACE[xunInfo.diZhi] || 1;

  var offset = ((hourBranchPalace - originalPalace) % 9 + 9) % 9;

  var menKeys = [1, 2, 3, 4, 6, 7, 8, 9];
  for (var i = 0; i < menKeys.length; i++) {
    var srcPalace = menKeys[i];
    var menName = BA_MEN_MAP[srcPalace];
    var srcOffset;
    if (isYangDun) {
      srcOffset = ((srcPalace - originalPalace) % 9 + 9) % 9;
    } else {
      srcOffset = ((originalPalace - srcPalace) % 9 + 9) % 9;
    }
    var destPalace;
    if (isYangDun) {
      destPalace = ((hourBranchPalace - 1 + srcOffset) % 9 + 9) % 9 + 1;
    } else {
      destPalace = ((hourBranchPalace - 1 - srcOffset) % 9 + 9) % 9 + 1;
    }
    result[destPalace] = menName;
  }

  return { menMap: result, zhiShiMen: zhiShiMenName, zhiShiPalace: hourBranchPalace };
}

function getBaShen(zhiFuPalace, isYangDun) {
  var result = {};
  var clockwiseOrder = [1, 2, 3, 4, 6, 7, 8, 9];
  var startIdx = -1;
  for (var si = 0; si < clockwiseOrder.length; si++) {
    if (clockwiseOrder[si] === zhiFuPalace) {
      startIdx = si;
      break;
    }
  }
  if (startIdx === -1) startIdx = 0;

  for (var i = 0; i < clockwiseOrder.length; i++) {
    var idx;
    if (isYangDun) {
      idx = (startIdx + i) % 8;
    } else {
      idx = ((startIdx - i) % 8 + 8) % 8;
    }
    var palace = clockwiseOrder[idx];
    result[palace] = BA_SHEN_ORDER[i];
  }
  result[5] = '';
  return result;
}

export function generateQimenBoard(date) {
  var bj = toBeijingTime(date);
  var fourPillars = calculateFourPillars(bj);
  var termInfo = findSolarTerm(bj);
  var juInfo = calculateJuNumber(bj, termInfo);
  var diPan = getDiPanStems(juInfo.juNumber, juInfo.isYangDun);

  var xunInfo = getXunInfo(fourPillars.hourStem, fourPillars.hourBranch);
  var tianPanResult = getTianPanXing(xunInfo, diPan, fourPillars.hourStem, juInfo.isYangDun);
  var baMenResult = getBaMen(xunInfo, diPan, fourPillars.hourBranch, juInfo.isYangDun);
  var baShenMap = getBaShen(tianPanResult.zhiFuPalace, juInfo.isYangDun);

  /* Compute 天盘奇仪 (tianPanGan) — stems fly with the 值符 */
  var tianPanGan = {};
  var zhiFuOriginalPalace = xunInfo.palace;
  var zhiFuCurrentPalace = tianPanResult.zhiFuPalace;
  if (juInfo.isYangDun) {
    var offsetY = ((zhiFuCurrentPalace - zhiFuOriginalPalace) % 9 + 9) % 9;
    for (var ti = 1; ti <= 9; ti++) {
      var srcY = ((ti - 1 - offsetY) % 9 + 9) % 9 + 1;
      tianPanGan[ti] = diPan[srcY];
    }
  } else {
    var offsetN = ((zhiFuOriginalPalace - zhiFuCurrentPalace) % 9 + 9) % 9;
    for (var ti = 1; ti <= 9; ti++) {
      var srcN = ((ti - 1 + offsetN) % 9 + 9) % 9 + 1;
      tianPanGan[ti] = diPan[srcN];
    }
  }

  var palaces = {};
  for (var i = 1; i <= 9; i++) {
    var info = PALACE_INFO[i];
    var starName = tianPanResult.xingMap[i] || '';
    var doorName = i === 5 ? '' : (baMenResult.menMap[i] || '');
    var shenName = baShenMap[i] || '';

    /* Compute totalScore from XIANG_YI_DATABASE */
    var starDb = XIANG_YI_DATABASE.jiuXing[starName];
    var doorDb = XIANG_YI_DATABASE.baMen[doorName];
    var shenDb = XIANG_YI_DATABASE.baShen[shenName];
    var starScore = starDb ? starDb.score : 5;
    var doorScore = doorDb ? doorDb.score : 5;
    var shenScore = shenDb ? shenDb.score : 5;

    palaces[i] = {
      palaceNumber: i,
      name: info.name,
      position: info.position,
      trigram: info.trigram,
      element: info.element,
      direction: info.direction,
      diPanStem: diPan[i] || '',
      tianPanXing: starName,
      baMen: doorName,
      baShen: shenName,
      isZhiFu: i === tianPanResult.zhiFuPalace,
      isZhiShi: i === baMenResult.zhiShiPalace,
      /* normalized fields for enhanced UI */
      star: starName,
      door: doorName,
      shen: shenName,
      palaceIndex: i,
      tianPanGan: tianPanGan[i] || '',
      totalScore: Math.round((starScore + doorScore + shenScore) / 3),
    };
  }

  return {
    date: bj,
    fourPillars: fourPillars,
    dunInfo: juInfo,
    zhiFuXing: tianPanResult.zhiFuXing,
    zhiShiMen: baMenResult.zhiShiMen,
    xunShou: xunInfo.xunShou,
    palaces: palaces,
    layout: JIU_GONG_LAYOUT,
  };
}

export function generateLostItemReading(board, itemDescription, lostLocation) {
  var hourStem = board.fourPillars.hourStem;
  var dayStem = board.fourPillars.dayStem;
  var hourStemPalace = null;
  var dayStemPalace = null;

  for (var p = 1; p <= 9; p++) {
    if (board.palaces[p].diPanStem === hourStem) hourStemPalace = p;
    if (board.palaces[p].diPanStem === dayStem) dayStemPalace = p;
  }

  var targetPalace = board.palaces[hourStemPalace || 1];
  var dir = targetPalace.direction;
  var elem = targetPalace.element;
  var posText = '';
  var recoveryText = '';
  var actionText = '';

  var elemHints = {
    '金': ['金属容器附近', '保险柜、抽屉金属把手处', '电器设备旁', '钥匙、硬币堆中', '铁盒铁罐内'],
    '木': ['木质家具上', '书架、衣柜顶', '绿色植物旁', '文件纸张堆中', '木质抽屉内'],
    '水': ['卫生间、厨房水槽边', '鱼缸附近', '饮水机旁', '潮湿阴暗处', '洗手台下方'],
    '火': ['电器旁边', '暖气附近', '厨房灶台', '灯光照明处', '电视柜附近'],
    '土': ['地面角落', '鞋柜底部', '床底、沙发下', '储物箱中', '墙角堆物处'],
  };

  var dirHints = {
    '正北': ['房间北侧', '床头柜', '进门正前方', '低矮家具', '鞋柜'],
    '西南': ['西南角柜子', '沙发附近', '餐桌下方', '餐桌抽屉', '卧室西南角'],
    '正东': ['东侧书架', '窗户旁边', '电脑桌', '书桌抽屉', '窗帘后面'],
    '东南': ['东南角装饰架', '阳台附近', '鞋柜', '储物架底层', '花草旁边'],
    '西北': ['西北角衣柜', '门口玄关', '高处架子', '大衣柜上层', '储藏室'],
    '正西': ['西侧床头', '化妆台', '挂衣架', '床头柜', '卧室西墙'],
    '东北': ['东北角储物箱', '矮柜底层', '墙角堆物中', '杂物堆', '文件柜底层'],
    '正南': ['南侧窗台', '电视柜', '暖气片旁', '客厅电视柜', '阳台花盆旁'],
  };

  var elemPos = elemHints[elem] || ['隐蔽角落', '物品堆中', '家具缝隙'];
  var dirPos = dirHints[dir] || ['房间角落', '家具附近', '地面'];

  posText = '';
  if (lostLocation) {
    posText += '丢失地点推测在「' + lostLocation + '」附近。';
  }
  posText += '根据' + targetPalace.name + '宫' + targetPalace.trigram + '分析，失物很可能在' +
    dir + '方位，属' + elem + '性。建议重点检查：' +
    dirPos.slice(0, 3).join('、') + '。尤其注意' + elemPos.slice(0, 3).join('、') + '等位置。';

  if (targetPalace.baMen === '休门' || targetPalace.baMen === '生门' || targetPalace.baMen === '开门') {
    recoveryText = '物品被妥善放置的可能性较大，回忆最后一次使用后的动线，耐心寻找应该能找到。';
    actionText = '回想当天行程，重点检查' + dir + '方位。询问家人或同事是否帮忙收纳。';
  } else if (targetPalace.baMen === '死门' || targetPalace.baMen === '惊门' || targetPalace.baMen === '伤门') {
    recoveryText = '可能被杂物掩盖或移动到了意想不到的位置，需要仔细翻找。';
    actionText = '扩大搜索范围，检查垃圾桶附近、衣物口袋、包内夹层等容易被忽略的地方。';
  } else {
    recoveryText = '有一定希望能找回，但需要条理清晰地回忆和搜索。';
    actionText = '从最后一次见到物品的位置开始，按照时间顺序逐一排查。';
  }

  if (targetPalace.baShen === '玄武') {
    actionText += ' 注意：玄武临宫，需防他人误拿或物品被移动。';
  }
  if (targetPalace.baShen === '白虎') {
    actionText += ' 注意：白虎临宫，可能有磕碰损坏风险，尽快寻找。';
  }
  if (targetPalace.baShen === '值符') {
    actionText += ' 值符临宫，有贵人相助之象，可请人帮忙寻找。';
  }

  return {
    direction: dir,
    element: elem,
    palaceName: targetPalace.name,
    palaceTrigram: targetPalace.trigram,
    baMen: targetPalace.baMen,
    baShen: targetPalace.baShen,
    tianPanXing: targetPalace.tianPanXing,
    positionDescription: posText,
    recoveryAssessment: recoveryText,
    actionSuggestion: actionText,
    targetPalaceNumber: targetPalace.palaceNumber,
    hourStemPalace: hourStemPalace,
    dayStemPalace: dayStemPalace,
  };
}

export function getPalaceInfo() {
  return PALACE_INFO;
}

export function getJiuGongLayout() {
  return JIU_GONG_LAYOUT;
}

export { PALACE_INFO, JIU_GONG_LAYOUT, TIAN_GAN, DI_ZHI };
