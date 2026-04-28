const STORAGE_KEY = 'mystic-decider-history';

export function getHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(record) {
  const history = getHistory();
  const newRecord = {
    ...record,
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    note: record.note || '',
    _savedAt: Date.now(),
  };
  history.unshift(newRecord);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  return newRecord;
}

export function deleteFromHistory(id) {
  const history = getHistory().filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  return history;
}

export function updateHistoryNote(id, note) {
  const history = getHistory().map(r => r.id === id ? { ...r, note } : r);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  return history;
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
  return [];
}

export function searchHistory(keyword, dateRange, recordType) {
  let history = getHistory();
  if (keyword.trim()) {
    const kw = keyword.toLowerCase();
    history = history.filter(r =>
      (r.originalHexagram?.name || '').includes(kw) ||
      (r.originalHexagram?.meaning || '').includes(kw) ||
      (r.note || '').toLowerCase().includes(kw) ||
      (r.question || '').toLowerCase().includes(kw) ||
      (r.date || '').includes(kw)
    );
  }
  if (dateRange && dateRange !== 'all') {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    history = history.filter(r => {
      const t = r._savedAt || r.timestamp || 0;
      if (dateRange === 'today') return t >= today;
      if (dateRange === 'week') return t >= today - 7 * 86400000;
      if (dateRange === 'month') return t >= today - 30 * 86400000;
      return true;
    });
  }
  if (recordType === 'lost-item') {
    history = history.filter(r => r.type === 'lost-item');
  }
  return history;
}

export function getHistoryGroupedByDate(keyword, dateRange, recordType) {
  const records = searchHistory(keyword, dateRange, recordType);
  const groups = {};
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const yesterday = new Date(today.getTime() - 86400000);
  const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

  records.forEach(r => {
    const d = new Date(r._savedAt || r.timestamp || 0);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    let label;
    if (key === todayStr) label = '今天';
    else if (key === yesterdayStr) label = '昨天';
    else label = key;

    if (!groups[label]) groups[label] = [];
    groups[label].push(r);
  });

  const sortKeys = Object.keys(groups).sort((a, b) => {
    if (a === '今天') return -1;
    if (b === '今天') return 1;
    if (a === '昨天') return -1;
    if (b === '昨天') return 1;
    return b.localeCompare(a);
  });

  return sortKeys.map(key => ({ label: key, records: groups[key] }));
}
