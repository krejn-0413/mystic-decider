import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { XIANG_YI_DATABASE } from '../utils/qimenEngine';

var GOOD_DOORS = ['开门', '休门', '生门'];
var BAD_DOORS = ['死门', '惊门', '伤门'];

function SectionCard({ title, subtitle, children, borderColor }) {
  return (
    <div style={{
      border: '1px solid ' + (borderColor || 'rgba(255,215,0,0.2)'),
      borderRadius: '14px',
      background: 'linear-gradient(135deg, rgba(30,22,10,0.9) 0%, rgba(15,10,4,0.95) 100%)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,215,0,0.05)',
      overflow: 'hidden',
      marginBottom: '16px',
    }}>
      <div style={{
        padding: '16px 20px 12px',
        borderBottom: '1px solid rgba(255,215,0,0.1)',
        background: 'linear-gradient(90deg, rgba(255,215,0,0.06) 0%, transparent 100%)',
      }}>
        <div style={{ fontSize: '17px', fontWeight: 700, color: '#f0d060', fontFamily: '"Noto Serif SC", serif' }}>
          {title}
        </div>
        {subtitle && <div style={{ fontSize: '12px', color: 'rgba(255,215,0,0.45)', marginTop: '2px' }}>{subtitle}</div>}
      </div>
      <div style={{ padding: '16px 20px 20px' }}>
        {children}
      </div>
    </div>
  );
}

function Badge({ label, color }) {
  return (
    <span style={{
      display: 'inline-block', padding: '2px 8px', borderRadius: '6px',
      fontSize: '12px', fontWeight: 600, color: '#fff',
      backgroundColor: color || '#6b7280', margin: '2px 3px',
    }}>{label}</span>
  );
}

function DirectionArrow({ direction }) {
  var degMap = { '正北': 0, '东北': 45, '正东': 90, '东南': 135, '正南': 180, '西南': 225, '正西': 270, '西北': 315, '中央': 0 };
  var deg = degMap[direction] || 0;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#f0d060' }}>
      <motion.span
        animate={{ rotate: deg }}
        style={{ display: 'inline-block', fontSize: '18px', lineHeight: 1 }}
      >↑</motion.span>
      {direction}
    </span>
  );
}

function QimenInterpretation({ palaces, fourPillars, isLostMode, lostItem, zhiFu, zhiShi, jvShu, yinYang }) {
  if (!palaces || palaces.length === 0) return null;

  var tabOptions = ['整体解读', '符号速查'];
  var [activeTab, setActiveTab] = useState('整体解读');
  var [searchTerm, setSearchTerm] = useState('');

  var zhiFuPalace = zhiFu ? palaces.find(function(p) { return p.star === zhiFu; }) : null;
  var zhiShiPalace = zhiShi ? palaces.find(function(p) { return p.door === zhiShi; }) : null;

  var goodDoorsPalaces = palaces.filter(function(p) { return GOOD_DOORS.indexOf(p.door) >= 0; });
  var badDoorsPalaces = palaces.filter(function(p) { return BAD_DOORS.indexOf(p.door) >= 0; });

  var avgScore = Math.round(palaces.reduce(function(s, p) { return s + (p.totalScore || 5); }, 0) / palaces.length);

  function getPalaceByIndex(idx) { return palaces.find(function(p) { return p.palaceIndex === idx; }); }

  var allStars = Object.keys(XIANG_YI_DATABASE.jiuXing);
  var allDoors = Object.keys(XIANG_YI_DATABASE.baMen);
  var allShens = Object.keys(XIANG_YI_DATABASE.baShen);

  var filteredStars = useMemo(function() {
    if (!searchTerm) return allStars;
    return allStars.filter(function(s) { return s.indexOf(searchTerm) >= 0; });
  }, [searchTerm]);

  var filteredDoors = useMemo(function() {
    if (!searchTerm) return allDoors;
    return allDoors.filter(function(d) { return d.indexOf(searchTerm) >= 0; });
  }, [searchTerm]);

  var filteredShens = useMemo(function() {
    if (!searchTerm) return allShens;
    return allShens.filter(function(s) { return s.indexOf(searchTerm) >= 0; });
  }, [searchTerm]);

  return (
    <div>
      {/* Tab bar */}
      <div style={{
        display: 'flex', gap: '4px', marginBottom: '16px',
        background: 'rgba(255,215,0,0.05)',
        borderRadius: '12px', padding: '4px',
        border: '1px solid rgba(255,215,0,0.1)',
      }}>
        {tabOptions.map(function(tab) {
          var isActive = activeTab === tab;
          return (
            <button key={tab} onClick={function() { setActiveTab(tab); }}
              style={{
                flex: 1, padding: '10px 16px', border: 'none', borderRadius: '10px',
                fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                background: isActive ? 'rgba(255,215,0,0.15)' : 'transparent',
                color: isActive ? '#f0d060' : 'rgba(255,215,0,0.5)',
                transition: 'all 0.2s',
              }}
            >{tab}</button>
          );
        })}
      </div>

      {activeTab === '整体解读' && (
        <div>
          {/* Overall summary card */}
          <SectionCard title="盘象总览" subtitle={'时家奇门 · ' + (yinYang || '阳') + '遁' + (jvShu || '') + '局'}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(255,215,0,0.04)', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', color: 'rgba(255,215,0,0.4)', marginBottom: '4px' }}>四柱</div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#f0d060', fontFamily: '"Noto Serif SC", serif' }}>
                  {fourPillars ? fourPillars.year + ' ' + fourPillars.month + ' ' + fourPillars.day + ' ' + fourPillars.hour : '—'}
                </div>
              </div>
              <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(255,215,0,0.04)', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', color: 'rgba(255,215,0,0.4)', marginBottom: '4px' }}>整体评分</div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: avgScore >= 6 ? '#22c55e' : '#eab308' }}>{avgScore}/10</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,215,0,0.5)', marginTop: '2px' }}>
                  全盘{goodDoorsPalaces.length}吉门 · {badDoorsPalaces.length}凶门
                </div>
              </div>
            </div>

            <div style={{ fontSize: '14px', color: '#e0d5b8', lineHeight: 1.8, marginBottom: '12px' }}>
              <p style={{ margin: '0 0 6px 0' }}>
                {avgScore >= 7 ? '今日局象整体偏吉，气场顺畅，适宜主动谋划和执行重要事务。' :
                 avgScore >= 5 ? '今日局象中平，吉凶参半，宜稳中求进，不宜冒进。' :
                 '今日局象偏弱，气场阻滞，宜守不宜攻，以休养生息为主。'}
                {goodDoorsPalaces.length >= 3 ? '全盘吉门较多，良机频现。' : '吉门较少，需谨慎把握时机。'}
              </p>
            </div>
          </SectionCard>

          {/* Value Fu / Value Shi */}
          <SectionCard title="值符 · 值使" subtitle="全盘核心枢纽">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(34,197,94,0.06)', borderRadius: '10px', border: '1px solid rgba(34,197,94,0.2)' }}>
                <div style={{ fontSize: '11px', color: 'rgba(255,215,0,0.4)', marginBottom: '4px' }}>值符（九星首领）</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#22c55e', marginBottom: '4px' }}>
                  {zhiFu || '—'}
                </div>
                {zhiFuPalace && (
                  <div style={{ fontSize: '12px', color: 'rgba(255,215,0,0.6)' }}>
                    落宫：{palaceDirection(zhiFuPalace.palaceIndex)} ({palaceName(zhiFuPalace.palaceIndex)})
                  </div>
                )}
              </div>
              <div style={{ padding: '12px', background: 'rgba(59,130,200,0.06)', borderRadius: '10px', border: '1px solid rgba(59,130,200,0.2)' }}>
                <div style={{ fontSize: '11px', color: 'rgba(255,215,0,0.4)', marginBottom: '4px' }}>值使（八门主宰）</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#3b82c8', marginBottom: '4px' }}>
                  {zhiShi || '—'}
                </div>
                {zhiShiPalace && (
                  <div style={{ fontSize: '12px', color: 'rgba(255,215,0,0.6)' }}>
                    落宫：{palaceDirection(zhiShiPalace.palaceIndex)} ({palaceName(zhiShiPalace.palaceIndex)})
                  </div>
                )}
              </div>
            </div>
            <div style={{ marginTop: '12px', fontSize: '13px', color: '#e0d5b8', lineHeight: 1.7, padding: '10px', background: 'rgba(255,215,0,0.04)', borderRadius: '8px' }}>
              {zhiFuPalace && zhiShiPalace
                ? '值符（' + zhiFu + '）落' + palaceDirection(zhiFuPalace.palaceIndex) + '，值使（' + zhiShi + '）落' + palaceDirection(zhiShiPalace.palaceIndex) + '。' +
                  '值符为全盘之主，代表天时大势；值使为全盘之枢，代表人事通道。'
                : '值符值使信息待计算确认。'}
            </div>
          </SectionCard>

          {/* Three Good / Three Bad doors */}
          <SectionCard title="三吉门 · 三凶门分布" subtitle="全盘门户吉凶一览">
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#22c55e', marginBottom: '8px' }}>▲ 三吉门</div>
              {goodDoorsPalaces.length === 0 && <div style={{ fontSize: '13px', color: 'rgba(255,215,0,0.4)' }}>无三吉门临宫</div>}
              {goodDoorsPalaces.map(function(p) {
                var info = XIANG_YI_DATABASE.baMen[p.door];
                return (
                  <div key={p.palaceIndex} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '8px 10px', marginBottom: '6px',
                    background: 'rgba(34,197,94,0.05)', borderRadius: '8px',
                    border: '1px solid rgba(34,197,94,0.15)',
                  }}>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#22c55e', minWidth: '40px' }}>{p.door}</span>
                    <span style={{ fontSize: '12px', color: 'rgba(255,215,0,0.6)', minWidth: '60px' }}>
                      {palaceDirection(p.palaceIndex)}
                    </span>
                    <span style={{ fontSize: '12px', color: '#e0d5b8' }}>
                      {info ? info.meaning : ''} · 宜{info ? info.suitable : ''}
                    </span>
                  </div>
                );
              })}
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#ef4444', marginBottom: '8px' }}>▼ 三凶门</div>
              {badDoorsPalaces.length === 0 && <div style={{ fontSize: '13px', color: 'rgba(255,215,0,0.4)' }}>无三凶门临宫</div>}
              {badDoorsPalaces.map(function(p) {
                var info = XIANG_YI_DATABASE.baMen[p.door];
                return (
                  <div key={p.palaceIndex} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '8px 10px', marginBottom: '6px',
                    background: 'rgba(239,68,68,0.05)', borderRadius: '8px',
                    border: '1px solid rgba(239,68,68,0.15)',
                  }}>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#ef4444', minWidth: '40px' }}>{p.door}</span>
                    <span style={{ fontSize: '12px', color: 'rgba(255,215,0,0.6)', minWidth: '60px' }}>
                      {palaceDirection(p.palaceIndex)}
                    </span>
                    <span style={{ fontSize: '12px', color: '#e0d5b8' }}>
                      {info ? info.meaning : ''} · 忌{info ? info.avoid : ''}
                    </span>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          {/* Lost item analysis */}
          {isLostMode && (
            <SectionCard title="寻物指引" subtitle="失物用神分析与找回建议" borderColor="rgba(240,208,96,0.3)">
              <div style={{ fontSize: '14px', color: '#e0d5b8', lineHeight: 1.8, marginBottom: '12px' }}>
                <p style={{ margin: '0 0 8px 0' }}>
                  {'失物「' + (lostItem || '未知') + '」的用神分析：'}
                </p>
              </div>

              {/* Direction recommendation */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                padding: '16px', marginBottom: '12px',
                background: 'rgba(255,215,0,0.06)', borderRadius: '12px',
                border: '1px solid rgba(255,215,0,0.15)',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'rgba(255,215,0,0.4)', marginBottom: '4px' }}>推荐方位</div>
                  <DirectionArrow direction={lostDirection(palaces)} />
                </div>
                <div style={{ width: '1px', height: '40px', background: 'rgba(255,215,0,0.15)' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'rgba(255,215,0,0.4)', marginBottom: '4px' }}>位置特征</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#f0d060' }}>
                    {lostLocationDesc(palaces)}
                  </div>
                </div>
                <div style={{ width: '1px', height: '40px', background: 'rgba(255,215,0,0.15)' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: 'rgba(255,215,0,0.4)', marginBottom: '4px' }}>找回几率</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: findChanceColor(palaces) }}>
                    {findChance(palaces)}
                  </div>
                </div>
              </div>

              <div style={{
                padding: '12px', borderRadius: '8px',
                background: 'rgba(255,215,0,0.04)',
                fontSize: '13px', color: '#e0d5b8', lineHeight: 1.7,
              }}>
                <p style={{ margin: '0 0 6px 0' }}>
                  <strong style={{ color: '#f0d060' }}>详细分析：</strong>
                  {lostAnalysis(palaces)}
                </p>
                <p style={{ margin: 0 }}>
                  <strong style={{ color: '#f0d060' }}>找回建议：</strong>
                  {lostAdvice(palaces)}
                </p>
              </div>
            </SectionCard>
          )}

          {/* All palaces brief */}
          <SectionCard title="九宫一览" subtitle="各宫星门神组合速览">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {[1,2,3,4,5,6,7,8,9].map(function(idx) {
                var p = getPalaceByIndex(idx);
                var info = XIANG_YI_DATABASE.palace[idx];
                if (!p) {
                  return (
                    <div key={idx} style={{
                      padding: '8px', borderRadius: '8px', textAlign: 'center',
                      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,215,0,0.06)',
                    }}>
                      <div style={{ fontSize: '11px', color: 'rgba(255,215,0,0.3)' }}>{info ? info.direction : ''}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,215,0,0.2)', marginTop: '2px' }}>空宫</div>
                    </div>
                  );
                }
                var starInfo = XIANG_YI_DATABASE.jiuXing[p.star];
                var doorInfo = XIANG_YI_DATABASE.baMen[p.door];
                return (
                  <div key={idx} style={{
                    padding: '8px', borderRadius: '8px', textAlign: 'center',
                    background: p.totalScore >= 6 ? 'rgba(34,197,94,0.04)' : 'rgba(239,68,68,0.04)',
                    border: '1px solid ' + (p.totalScore >= 6 ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)'),
                    cursor: 'default',
                  }}>
                    <div style={{ fontSize: '10px', color: 'rgba(255,215,0,0.4)', marginBottom: '2px' }}>
                      {p.palaceIndex} · {info ? info.direction : ''}
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: starInfo && starInfo.good ? '#22c55e' : '#ef4444' }}>
                      {p.star || '—'}
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 500, color: doorInfo && doorInfo.good ? '#22c55e' : '#ef4444' }}>
                      {p.door || '—'}
                    </div>
                    <div style={{ fontSize: '10px', color: 'rgba(255,215,0,0.3)', marginTop: '2px' }}>
                      {p.shen || ''}
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </div>
      )}

      {activeTab === '符号速查' && (
        <SectionCard title="符号速查" subtitle="九星 · 八门 · 八神 详细百科">
          {/* Search */}
          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="搜索符号名称..."
              value={searchTerm}
              onChange={function(e) { setSearchTerm(e.target.value); }}
              style={{
                width: '100%', padding: '10px 14px', borderRadius: '10px',
                border: '1px solid rgba(255,215,0,0.2)',
                background: 'rgba(0,0,0,0.3)', color: '#e0d5b8',
                fontSize: '14px', outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Nine Stars */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#f0d060', marginBottom: '10px', fontFamily: '"Noto Serif SC", serif' }}>
              九星（共{allStars.length}）
            </div>
            {filteredStars.map(function(name) {
              var info = XIANG_YI_DATABASE.jiuXing[name];
              if (!info) return null;
              var color = info.good ? '#22c55e' : '#ef4444';
              return (
                <div key={name} style={{
                  padding: '10px 12px', marginBottom: '6px', borderRadius: '10px',
                  background: 'rgba(255,215,0,0.03)', border: '1px solid rgba(255,215,0,0.08)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: color }}>{name}</span>
                    <Badge label={info.meaning} color={color} />
                    <Badge label={info.wuxing + '属' + info.gua + '卦'} color="#6b7280" />
                    <Badge label={'评分 ' + info.score + '/10'} color={color} />
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,215,0,0.5)', lineHeight: 1.6, marginBottom: '4px' }}>
                    <span style={{ color: 'rgba(255,215,0,0.4)' }}>传统：</span>{info.traditional}
                  </div>
                  <div style={{ fontSize: '12px', color: '#e0d5b8', lineHeight: 1.6 }}>
                    <span style={{ color: 'rgba(255,215,0,0.4)' }}>现代：</span>{info.modern}
                  </div>
                  <div style={{ fontSize: '11px', color: '#c4a84c', lineHeight: 1.5, marginTop: '4px', paddingTop: '4px', borderTop: '1px solid rgba(255,215,0,0.06)' }}>
                    💡 {info.advice}
                  </div>
                </div>
              );
            })}
            {filteredStars.length === 0 && <div style={{ color: 'rgba(255,215,0,0.3)', fontSize: '13px' }}>未找到匹配的九星</div>}
          </div>

          {/* Eight Doors */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#f0d060', marginBottom: '10px', fontFamily: '"Noto Serif SC", serif' }}>
              八门（共{allDoors.length}）
            </div>
            {filteredDoors.map(function(name) {
              var info = XIANG_YI_DATABASE.baMen[name];
              if (!info) return null;
              var color = info.good ? '#22c55e' : '#ef4444';
              return (
                <div key={name} style={{
                  padding: '10px 12px', marginBottom: '6px', borderRadius: '10px',
                  background: 'rgba(255,215,0,0.03)', border: '1px solid rgba(255,215,0,0.08)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: color }}>{name}</span>
                    <Badge label={info.meaning} color={color} />
                    <Badge label={info.wuxing + '属'} color="#6b7280" />
                    <Badge label={'评分 ' + info.score + '/10'} color={color} />
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,215,0,0.5)', lineHeight: 1.6, marginBottom: '4px' }}>
                    <span style={{ color: 'rgba(255,215,0,0.4)' }}>传统：</span>{info.traditional}
                  </div>
                  <div style={{ fontSize: '12px', color: '#e0d5b8', lineHeight: 1.6 }}>
                    <span style={{ color: '#22c55e' }}>宜：</span>{info.suitable}
                    <span style={{ color: '#ef4444', marginLeft: '10px' }}>忌：</span>{info.avoid}
                  </div>
                  <div style={{ fontSize: '12px', color: '#e0d5b8', lineHeight: 1.6 }}>
                    <span style={{ color: 'rgba(255,215,0,0.4)' }}>现代：</span>{info.modern}
                  </div>
                  <div style={{ fontSize: '11px', color: '#c4a84c', lineHeight: 1.5, marginTop: '4px', paddingTop: '4px', borderTop: '1px solid rgba(255,215,0,0.06)' }}>
                    💡 {info.advice}
                  </div>
                </div>
              );
            })}
            {filteredDoors.length === 0 && <div style={{ color: 'rgba(255,215,0,0.3)', fontSize: '13px' }}>未找到匹配的八门</div>}
          </div>

          {/* Eight Gods */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#f0d060', marginBottom: '10px', fontFamily: '"Noto Serif SC", serif' }}>
              八神（共{allShens.length}）
            </div>
            {filteredShens.map(function(name) {
              var info = XIANG_YI_DATABASE.baShen[name];
              if (!info) return null;
              var color = info.good ? '#22c55e' : '#ef4444';
              return (
                <div key={name} style={{
                  padding: '10px 12px', marginBottom: '6px', borderRadius: '10px',
                  background: 'rgba(255,215,0,0.03)', border: '1px solid rgba(255,215,0,0.08)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: color }}>{name}</span>
                    <Badge label={info.meaning} color={color} />
                    <Badge label={'评分 ' + info.score + '/10'} color={color} />
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,215,0,0.5)', lineHeight: 1.6, marginBottom: '4px' }}>
                    <span style={{ color: 'rgba(255,215,0,0.4)' }}>传统：</span>{info.traditional}
                  </div>
                  <div style={{ fontSize: '12px', color: '#e0d5b8', lineHeight: 1.6 }}>
                    <span style={{ color: 'rgba(255,215,0,0.4)' }}>现代：</span>{info.modern}
                  </div>
                  <div style={{ fontSize: '11px', color: '#c4a84c', lineHeight: 1.5, marginTop: '4px', paddingTop: '4px', borderTop: '1px solid rgba(255,215,0,0.06)' }}>
                    💡 {info.advice}
                  </div>
                </div>
              );
            })}
            {filteredShens.length === 0 && <div style={{ color: 'rgba(255,215,0,0.3)', fontSize: '13px' }}>未找到匹配的八神</div>}
          </div>

          <div style={{
            padding: '10px 14px', borderRadius: '8px',
            background: 'rgba(255,215,0,0.04)',
            fontSize: '12px', color: 'rgba(255,215,0,0.4)', lineHeight: 1.6,
          }}>
            ※ 以上内容为奇门遁甲传统文化知识的现代转述，仅供文化参考。理性看待，勿迷信追求。
          </div>
        </SectionCard>
      )}
    </div>
  );
}

/* Helper functions */
function palaceName(idx) {
  var names = { 1: '坎', 2: '坤', 3: '震', 4: '巽', 5: '中', 6: '乾', 7: '兑', 8: '艮', 9: '离' };
  return names[idx] || '';
}

function palaceDirection(idx) {
  var dirs = {
    1: '正北', 2: '西南', 3: '正东', 4: '东南',
    5: '中央', 6: '西北', 7: '正西', 8: '东北', 9: '正南'
  };
  return dirs[idx] || '';
}

function lostDirection(palaces) {
  var dirs = { 1: '正北', 2: '西南', 3: '正东', 4: '东南', 5: '中央', 6: '西北', 7: '正西', 8: '东北', 9: '正南' };
  var best = palaces.reduce(function(best, p) {
    return (!best || (p.totalScore || 0) > (best.totalScore || 0)) ? p : best;
  }, null);
  if (best) return dirs[best.palaceIndex] || '不明';
  return '不明';
}

function lostLocationDesc(palaces) {
  var best = palaces.reduce(function(best, p) {
    return (!best || (p.totalScore || 0) > (best.totalScore || 0)) ? p : best;
  }, null);
  if (!best) return '不明';
  var info = XIANG_YI_DATABASE.palace[best.palaceIndex];
  if (!info) return '不明';
  var wuxing = info.wuxing;
  if (wuxing === '土') return '室内低处/被遮挡';
  if (wuxing === '水') return '水边/潮湿处';
  if (wuxing === '火') return '明亮处/高处/电器旁';
  if (wuxing === '木') return '柜中/木质家具旁';
  if (wuxing === '金') return '金属容器/高处';
  return '不明';
}

function findChance(palaces) {
  var avg = palaces.reduce(function(s, p) { return s + (p.totalScore || 5); }, 0) / palaces.length;
  if (avg >= 7) return '较高';
  if (avg >= 5) return '中等';
  return '较低';
}

function findChanceColor(palaces) {
  var avg = palaces.reduce(function(s, p) { return s + (p.totalScore || 5); }, 0) / palaces.length;
  if (avg >= 7) return '#22c55e';
  if (avg >= 5) return '#eab308';
  return '#ef4444';
}

function lostAnalysis(palaces) {
  var best = palaces.reduce(function(best, p) {
    return (!best || (p.totalScore || 0) > (best.totalScore || 0)) ? p : best;
  }, null);
  if (!best) return '信息不足，无法分析。';
  var dir = palaceDirection(best.palaceIndex);
  var starInfo = XIANG_YI_DATABASE.jiuXing[best.star];
  var doorInfo = XIANG_YI_DATABASE.baMen[best.door];
  var shenInfo = XIANG_YI_DATABASE.baShen[best.shen];
  var palaceInfo = XIANG_YI_DATABASE.palace[best.palaceIndex];

  var text = '失物用神落于' + dir + '（' + (palaceInfo ? palaceInfo.wuxing : '') + '性）。';
  if (starInfo) text += '九星' + best.star + '临宫，' + (starInfo.good ? '尚为吉兆。' : '需谨慎。');
  if (doorInfo) text += '八门逢' + best.door + '，' + (doorInfo.good ? '门户通畅，有望找回。' : '门户闭塞，需耐心寻找。');
  if (shenInfo) text += '八神逢' + best.shen + '，' + (shenInfo.good ? '运势加持。' : '注意干扰因素。');

  return text;
}

function lostAdvice(palaces) {
  var best = palaces.reduce(function(best, p) {
    return (!best || (p.totalScore || 0) > (best.totalScore || 0)) ? p : best;
  }, null);
  if (!best) return '建议仔细回忆最后使用地点，耐心查找。';
  var dir = palaceDirection(best.palaceIndex);
  var desc = lostLocationDesc(palaces);
  var palaceInfo = XIANG_YI_DATABASE.palace[best.palaceIndex];
  var doorInfo = XIANG_YI_DATABASE.baMen[best.door];

  var advice = '建议优先前往' + dir + '方向寻找，' + desc + '。';
  if (doorInfo && !doorInfo.good) advice += '此方位门户偏凶，可能需要翻找较隐蔽的位置。';
  if (palaceInfo && palaceInfo.wuxing === '土') advice += '检查柜子底部、抽屉角落、地毯下等被遮挡处。';
  if (palaceInfo && palaceInfo.wuxing === '水') advice += '留意洗手间、厨房、鱼缸附近或低洼潮湿处。';
  if (palaceInfo && palaceInfo.wuxing === '火') advice += '检查书桌台面、电器附近、明亮显眼处。';
  if (palaceInfo && palaceInfo.wuxing === '木') advice += '开柜检查、翻看抽屉、木质家具附近。';
  if (palaceInfo && palaceInfo.wuxing === '金') advice += '检查金属容器、保险柜、高处架子。';
  advice += ' 保持冷静，耐心回忆，往往不经意间就能发现。';

  return advice;
}

export default QimenInterpretation;
