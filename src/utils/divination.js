import { getHexagramByYao } from '../data/hexagrams';

function tossCoin() {
  return Math.random() < 0.5 ? 2 : 3;
}

function coinTossRound() {
  const results = [tossCoin(), tossCoin(), tossCoin()];
  const sum = results.reduce((a, b) => a + b, 0);
  const isYang = sum % 2 === 1;
  const isMoving = sum === 6 || sum === 9;
  const yinYang = isYang ? 1 : 0;
  const faces = results.map(v => v === 3 ? '正' : '背');
  const yinYangFaces = results.map(v => v === 3 ? '正(阳)' : '背(阴)');
  const typeMap = { 6: '老阴', 7: '少阳', 8: '少阴', 9: '老阳' };
  const typeName = typeMap[sum];
  return { sum, isYang, isMoving, yinYang, coins: results, faces, yinYangFaces, typeName };
}

export function castCoinDivination() {
  const rounds = [];
  for (let i = 0; i < 6; i++) {
    rounds.push(coinTossRound());
  }
  const originalYao = rounds.map(r => r.yinYang);
  const changingYao = rounds.map(r => r.isMoving);
  const changedYao = originalYao.map((y, i) => changingYao[i] ? (y === 1 ? 0 : 1) : y);
  const originalHexagram = getHexagramByYao(originalYao);
  const changedHexagram = getHexagramByYao(changedYao);
  return {
    type: 'coin',
    rounds,
    originalYao,
    changingYao,
    changedYao,
    originalHexagram,
    changedHexagram: originalYao.every((y, i) => y === changedYao[i]) ? null : changedHexagram,
    hasChanging: changingYao.some(c => c),
    timestamp: Date.now(),
    date: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }),
  };
}

function toBeijingTime(date) {
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utc + 8 * 3600000);
}

export function castTimeDivination() {
  const now = toBeijingTime(new Date());
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const upperNum = (year + month) % 8 || 8;
  const lowerNum = (day + hour) % 8 || 8;
  const movingNum = (minute % 6) || 6;
  const trigramMap = {
    1: [1,1,1], 2: [0,0,0], 3: [0,0,1], 4: [1,0,1],
    5: [1,1,0], 6: [0,1,0], 7: [0,1,1], 8: [1,1,1]
  };
  const upperTrigramBinary = trigramMap[upperNum];
  const lowerTrigramBinary = trigramMap[lowerNum];
  const originalYao = [...lowerTrigramBinary, ...upperTrigramBinary];
  const changingYao = originalYao.map((_, i) => i === (6 - movingNum));
  const changedYao = originalYao.map((y, i) => changingYao[i] ? (y === 1 ? 0 : 1) : y);
  const originalHexagram = getHexagramByYao(originalYao);
  const changedHexagram = getHexagramByYao(changedYao);
  return {
    type: 'time',
    timeInfo: { year, month, day, hour, minute },
    originalYao,
    changingYao,
    changedYao,
    originalHexagram,
    changedHexagram: originalYao.every((y, i) => y === changedYao[i]) ? null : changedHexagram,
    hasChanging: changingYao.some(c => c),
    timestamp: Date.now(),
    date: now.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }),
  };
}

export function castManualDivination(originalYao) {
  const changingYao = [false, false, false, false, false, false];
  const changedYao = [...originalYao];
  const originalHexagram = getHexagramByYao(originalYao);
  return {
    type: 'manual',
    originalYao,
    changingYao,
    changedYao,
    originalHexagram,
    changedHexagram: null,
    hasChanging: false,
    timestamp: Date.now(),
    date: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }),
  };
}
