import { motion, AnimatePresence } from 'framer-motion';
import { XIANG_YI_DATABASE, ELEMENT_COLORS } from '../utils/qimenEngine';

var BAGUA_PALACE_MAP = {
  1: { name: '坎宫', trigram: '坎☵' },
  2: { name: '坤宫', trigram: '坤☷' },
  3: { name: '震宫', trigram: '震☳' },
  4: { name: '巽宫', trigram: '巽☴' },
  5: { name: '中宫', trigram: '☯' },
  6: { name: '乾宫', trigram: '乾☰' },
  7: { name: '兑宫', trigram: '兑☱' },
  8: { name: '艮宫', trigram: '艮☶' },
  9: { name: '离宫', trigram: '离☲' },
};

function getInfo(db, name) {
  if (!db || !name) return null;
  return db[name] || null;
}

function ScoreBadge({ score }) {
  var color = score >= 8 ? '#22c55e' : score >= 6 ? '#eab308' : score >= 4 ? '#f97316' : '#ef4444';
  var label = score >= 8 ? '大吉' : score >= 6 ? '吉' : score >= 4 ? '中平' : score >= 2 ? '凶' : '大凶';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      padding: '2px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600,
      color: '#fff', backgroundColor: color, marginLeft: '8px',
    }}>{label} {score}/10</span>
  );
}

function Badge({ children, color }) {
  return (
    <span style={{
      display: 'inline-block', padding: '2px 10px', borderRadius: '999px',
      fontSize: '12px', fontWeight: 600, color: '#fff',
      backgroundColor: color || '#6b7280', margin: '2px 4px 2px 0',
    }}>{children}</span>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{ display: 'flex', padding: '6px 0', borderBottom: '1px solid rgba(255,215,0,0.08)' }}>
      <span style={{ width: '80px', flexShrink: 0, color: 'rgba(255,215,0,0.6)', fontSize: '13px' }}>{label}</span>
      <span style={{ color: '#e0d5b8', fontSize: '13px', lineHeight: 1.5 }}>{value}</span>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h4 style={{
      fontSize: '15px', fontWeight: 600, color: '#f0d060',
      margin: '0 0 8px 0', paddingBottom: '6px', borderBottom: '1px solid rgba(255,215,0,0.2)',
    }}>{children}</h4>
  );
}

function PalaceDetailModal({ palace, onClose, isLostMode }) {
  if (!palace) return null;
  var palaceInfo = XIANG_YI_DATABASE.palace[palace.palaceIndex];
  if (!palaceInfo) palaceInfo = XIANG_YI_DATABASE.palace[5];

  var starName = palace.star;
  var doorName = palace.door;
  var shenName = palace.shen;
  var tiPan = palace.tianPanGan;

  var starInfo = getInfo(XIANG_YI_DATABASE.jiuXing, starName);
  var doorInfo = getInfo(XIANG_YI_DATABASE.baMen, doorName);
  var shenInfo = getInfo(XIANG_YI_DATABASE.baShen, shenName);

  var starScore = starInfo ? starInfo.score : 5;
  var doorScore = doorInfo ? doorInfo.score : 5;
  var shenScore = shenInfo ? shenInfo.score : 5;
  var avgScore = Math.round((starScore + doorScore + shenScore) / 3);

  var colorInfo = ELEMENT_COLORS[palaceInfo.wuxing] || ELEMENT_COLORS['土'];

  var combinedKey = null;
  if (starName && doorName) {
    var comboKey = starName + '+' + doorName;
    var found = XIANG_YI_DATABASE.combination.find(function(c) { return c.pattern === comboKey; });
    if (found) combinedKey = found;
  }

  var isGoodPalace = avgScore >= 6;
  var overallAdvice = isGoodPalace
    ? '此宫位吉星吉门汇聚，气场旺盛。' + palaceInfo.direction + '方向利于行动，可积极把握机会。'
    : '此宫位气场偏弱，' + palaceInfo.direction + '方向需谨慎行事，宜守不宜攻。';

  if (isLostMode && palace.palaceIndex) {
    overallAdvice += ' 寻物方面，' + palaceInfo.direction + '为可能方位，' +
      (palaceInfo.wuxing === '土' ? '物品可能在室内、低处或被杂物遮挡。' :
       palaceInfo.wuxing === '水' ? '物品可能在水边、潮湿处或低洼地。' :
       palaceInfo.wuxing === '火' ? '物品可能在明亮处、高处或电器附近。' :
       palaceInfo.wuxing === '木' ? '物品可能在柜子、抽屉或木质家具附近。' :
       '物品可能在金属容器、高处或西方位置。');
  }

  return (
    <AnimatePresence>
      {palace && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="qimen-modal-overlay"
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
            padding: '16px', overflowY: 'auto',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={function(e) { e.stopPropagation(); }}
            className="qimen-modal-content"
            style={{
              position: 'relative', maxWidth: '560px', width: '100%',
              maxHeight: '85vh', overflowY: 'auto',
              borderRadius: '16px', border: '1px solid rgba(255,215,0,0.3)',
              background: 'linear-gradient(135deg, #1a1208 0%, #0f0a04 100%)',
              boxShadow: '0 0 40px rgba(255,215,0,0.1), inset 0 0 60px rgba(255,215,0,0.03)',
              padding: '0',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '20px 24px 16px',
              borderBottom: '1px solid rgba(255,215,0,0.2)',
              background: 'linear-gradient(180deg, rgba(255,215,0,0.08) 0%, transparent 100%)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '28px', fontWeight: 700, color: '#f0d060', fontFamily: '"Noto Serif SC", serif' }}>
                    {BAGUA_PALACE_MAP[palace.palaceIndex].name}
                  </span>
                  <span style={{ fontSize: '13px', color: 'rgba(255,215,0,0.5)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(255,215,0,0.2)' }}>
                    宫{palace.palaceIndex}
                  </span>
                </div>
                <button onClick={onClose} style={{
                  background: 'none', border: '1px solid rgba(255,215,0,0.2)',
                  color: 'rgba(255,215,0,0.6)', fontSize: '20px',
                  cursor: 'pointer', padding: '4px 10px', borderRadius: '6px', lineHeight: 1,
                }}>✕</button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                <span style={{ fontSize: '14px', color: colorInfo.text, fontWeight: 500 }}>
                  {palaceInfo.wuxing} · {palaceInfo.direction} · {palaceInfo.trigram}
                </span>
                <ScoreBadge score={avgScore} />
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: '16px 24px 24px' }}>
              {/* Current symbols grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '20px' }}>
                <div style={{ background: 'rgba(255,215,0,0.05)', border: '1px solid rgba(255,215,0,0.12)', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'rgba(255,215,0,0.5)', marginBottom: '4px' }}>九星</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: starInfo && starInfo.good ? '#22c55e' : '#ef4444' }}>{starName || '—'}</div>
                  {starInfo && <div style={{ fontSize: '11px', color: 'rgba(255,215,0,0.4)', marginTop: '2px' }}>{starInfo.meaning}</div>}
                </div>
                <div style={{ background: 'rgba(255,215,0,0.05)', border: '1px solid rgba(255,215,0,0.12)', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'rgba(255,215,0,0.5)', marginBottom: '4px' }}>八门</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: doorInfo && doorInfo.good ? '#22c55e' : '#ef4444' }}>{doorName || '—'}</div>
                  {doorInfo && <div style={{ fontSize: '11px', color: 'rgba(255,215,0,0.4)', marginTop: '2px' }}>{doorInfo.meaning}</div>}
                </div>
                <div style={{ background: 'rgba(255,215,0,0.05)', border: '1px solid rgba(255,215,0,0.12)', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'rgba(255,215,0,0.5)', marginBottom: '4px' }}>八神</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: shenInfo && shenInfo.good ? '#22c55e' : '#ef4444' }}>{shenName || '—'}</div>
                  {shenInfo && <div style={{ fontSize: '11px', color: 'rgba(255,215,0,0.4)', marginTop: '2px' }}>{shenInfo.meaning}</div>}
                </div>
              </div>

              {tiPan && (
                <div style={{ padding: '8px 12px', background: 'rgba(255,215,0,0.06)', borderRadius: '8px', marginBottom: '16px', fontSize: '13px', color: '#e0d5b8', textAlign: 'center', border: '1px solid rgba(255,215,0,0.1)' }}>
                  天盘奇仪：{tiPan} —— 表示天时赋予该宫的气场特征
                </div>
              )}

              {/* Palace basics */}
              <SectionTitle>宫位基础详解</SectionTitle>
              <div style={{ marginBottom: '16px' }}>
                <InfoRow label="方位" value={palaceInfo.direction} />
                <InfoRow label="五行" value={palaceInfo.wuxing} />
                <InfoRow label="八卦" value={palaceInfo.trigram} />
                <InfoRow label="季节" value={palaceInfo.season || '—'} />
                <InfoRow label="时辰" value={palaceInfo.hour || '—'} />
                <InfoRow label="颜色" value={palaceInfo.color || '—'} />
                <InfoRow label="身体" value={palaceInfo.body || '—'} />
                <InfoRow label="象征" value={palaceInfo.symbol} />
                <InfoRow label="古典赞" value={palaceInfo.nature} />
                <InfoRow label="宫位含义" value={palaceInfo.meaning} />
              </div>

              {/* Star detail */}
              {starInfo && (
                <div style={{ marginBottom: '16px' }}>
                  <SectionTitle>九星：{starName}详解</SectionTitle>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '4px' }}>
                    <Badge color={starInfo.good ? '#22c55e' : '#ef4444'}>{starInfo.meaning}</Badge>
                    <Badge color="#6b7280">{starInfo.wuxing}属{starInfo.gua}卦</Badge>
                    <ScoreBadge score={starInfo.score} />
                  </div>
                  <InfoRow label="传统象意" value={starInfo.traditional} />
                  <InfoRow label="现代解读" value={starInfo.modern} />
                  <InfoRow label="详细说明" value={starInfo.detail} />
                  <InfoRow label="建议" value={starInfo.advice} />
                </div>
              )}

              {/* Door detail */}
              {doorInfo && (
                <div style={{ marginBottom: '16px' }}>
                  <SectionTitle>八门：{doorName}详解</SectionTitle>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '4px' }}>
                    <Badge color={doorInfo.good ? '#22c55e' : '#ef4444'}>{doorInfo.meaning}</Badge>
                    <Badge color="#6b7280">{doorInfo.wuxing}属</Badge>
                    <ScoreBadge score={doorInfo.score} />
                  </div>
                  <InfoRow label="传统象意" value={doorInfo.traditional} />
                  <InfoRow label="现代解读" value={doorInfo.modern} />
                  <InfoRow label="宜事" value={doorInfo.suitable} />
                  <InfoRow label="忌事" value={doorInfo.avoid} />
                  <InfoRow label="建议" value={doorInfo.advice} />
                </div>
              )}

              {/* Shen detail */}
              {shenInfo && (
                <div style={{ marginBottom: '16px' }}>
                  <SectionTitle>八神：{shenName}详解</SectionTitle>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '4px' }}>
                    <Badge color={shenInfo.good ? '#22c55e' : '#ef4444'}>{shenInfo.meaning}</Badge>
                    <ScoreBadge score={shenInfo.score} />
                  </div>
                  <InfoRow label="传统象意" value={shenInfo.traditional} />
                  <InfoRow label="现代解读" value={shenInfo.modern} />
                  <InfoRow label="建议" value={shenInfo.advice} />
                </div>
              )}

              {/* Combined interpretation */}
              <SectionTitle>综合这宫评测</SectionTitle>
              <div style={{
                padding: '14px', borderRadius: '10px',
                border: '1px solid ' + (isGoodPalace ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'),
                background: isGoodPalace ? 'rgba(34,197,94,0.05)' : 'rgba(239,68,68,0.05)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: isGoodPalace ? '#22c55e' : '#ef4444' }}>
                    {isGoodPalace ? '▲ 吉祥之象' : '▼ 警惕之象'}
                  </span>
                  <ScoreBadge score={avgScore} />
                </div>
                {combinedKey && (
                  <div style={{ padding: '8px 10px', background: 'rgba(255,215,0,0.06)', borderRadius: '6px', marginBottom: '8px', fontSize: '13px', color: '#f0d060' }}>
                    ⭐ 组合：{combinedKey.pattern} — {combinedKey.desc}
                  </div>
                )}
                <p style={{ fontSize: '13px', color: '#e0d5b8', lineHeight: 1.7, margin: 0 }}>{overallAdvice}</p>
              </div>

              {/* Cultural note */}
              <div style={{
                marginTop: '16px', padding: '10px 14px',
                background: 'rgba(255,215,0,0.04)', borderRadius: '8px',
                border: '1px solid rgba(255,215,0,0.08)',
                fontSize: '12px', color: 'rgba(255,215,0,0.45)', lineHeight: 1.6,
              }}>
                ※ 奇门遁甲是中国古代数术文化的经典传承，以上解读仅供参考。合理借鉴，勿迷信追求。
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PalaceDetailModal;
