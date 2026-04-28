import { useState, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Trash2, Edit3, Bookmark, X, MessageSquare, RotateCcw, Clock, Check } from 'lucide-react';
import { getHistoryGroupedByDate, deleteFromHistory, updateHistoryNote, clearHistory } from '../utils/history';

const DATE_FILTERS = [
  { value: 'today', label: '今天' },
  { value: 'week', label: '本周' },
  { value: 'month', label: '本月' },
  { value: 'all', label: '全部' },
];

const TYPE_FILTERS = [
  { value: 'all', label: '全部' },
  { value: 'lost-item', label: '🔍 寻物' },
];

function NoteEditor({ record, onSave, onClose }) {
  const [text, setText] = useState(record.note || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave(record.id, text);
    setSaved(true);
    setTimeout(() => onClose(), 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="card-mystic p-5 w-full max-w-sm"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">{record.originalHexagram?.unicode}</span>
            <span className="text-sm font-serif text-gold-400">{record.originalHexagram?.name}</span>
          </div>
          <button onClick={onClose} className="text-ink-500 hover:text-ink-300">
            <X size={18} />
          </button>
        </div>

        {record.question && (
          <p className="text-ink-400 text-xs mb-3 italic">「{record.question}」</p>
        )}

        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="记录你的感悟和反思..."
          className="w-full bg-ink-800/50 border border-ink-700/50 rounded-lg p-3 text-sm text-ink-200 placeholder-ink-500/50 resize-none h-24 focus:outline-none focus:border-gold-400/30 transition-colors"
          autoFocus
        />

        <div className="flex gap-2 mt-3">
          <button
            onClick={handleSave}
            className="btn-mystic flex-1 py-2 flex items-center justify-center gap-1.5 text-xs"
          >
            {saved ? <Check size={14} /> : <Bookmark size={14} />}
            <span>{saved ? '已保存' : '保存笔记'}</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-ink-700/50 text-ink-400 text-xs hover:text-ink-200 transition-colors"
          >
            取消
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function HistoryRecord({ record, onDelete, onEditNote }) {
  const navigate = useNavigate();
  const TypeIcon = record.type === 'coin' ? RotateCcw : record.type === 'time' ? Clock : record.type === 'lost-item' ? Search : Edit3;

  const handleClick = () => {
    navigate('/result', { state: { result: record } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      layout
      className="card-mystic p-3 cursor-pointer hover:border-ink-600/50 transition-all"
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-ink-700/30 flex items-center justify-center text-lg">
          {record.originalHexagram?.unicode || '☰'}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-serif text-sm text-ink-200 truncate">
              {record.originalHexagram?.name || '未知卦象'}
            </span>
            <div className="flex gap-1">
              {record.hasChanging && <span className="text-[9px] text-red-400">⚡</span>}
              {TypeIcon && <TypeIcon size={12} className="text-ink-500 shrink-0" />}
            </div>
          </div>
          {record.question && (
            <p className="text-[11px] text-ink-500 truncate">「{record.question}」</p>
          )}
          <p className="text-[10px] text-ink-500 truncate">
            {record.note || record.originalHexagram?.meaning || record.date}
          </p>
        </div>

        <div className="flex flex-col items-end gap-1 shrink-0" onClick={e => e.stopPropagation()}>
          <button
            onClick={() => onEditNote(record)}
            className="text-ink-500 hover:text-gold-400 transition-colors p-1"
            title="编辑笔记"
          >
            <MessageSquare size={14} />
          </button>
          <button
            onClick={() => onDelete(record.id)}
            className="text-ink-500 hover:text-red-400 transition-colors p-1"
            title="删除"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ClearDialog({ onConfirm, onCancel }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="card-mystic p-5 w-full max-w-xs text-center"
        onClick={e => e.stopPropagation()}
      >
        <p className="text-ink-200 font-serif text-sm mb-2">确认清空所有记录？</p>
        <p className="text-ink-500 text-xs mb-4">此操作不可撤销</p>
        <div className="flex gap-2">
          <button onClick={onCancel} className="flex-1 py-2 rounded-lg border border-ink-700/50 text-ink-400 text-xs hover:text-ink-200 transition-colors">
            取消
          </button>
          <button onClick={onConfirm} className="flex-1 py-2 rounded-lg bg-red-500/20 text-red-400 text-xs hover:bg-red-500/30 transition-colors">
            确认清空
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function History() {
  const [keyword, setKeyword] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [recordType, setRecordType] = useState('all');
  const [editingRecord, setEditingRecord] = useState(null);
  const [showClear, setShowClear] = useState(false);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const groups = getHistoryGroupedByDate(keyword, dateFilter, recordType === 'all' ? undefined : recordType);
  const totalCount = groups.reduce((sum, g) => sum + g.records.length, 0);

  const refresh = () => forceUpdate();

  const handleDelete = (id) => {
    deleteFromHistory(id);
    refresh();
  };

  const handleClear = () => {
    clearHistory();
    setShowClear(false);
    refresh();
  };

  const handleSaveNote = (id, text) => {
    updateHistoryNote(id, text);
    refresh();
  };

  return (
    <div className="flex flex-col pt-6 gap-4">
      <div className="text-center">
        <h2 className="font-serif text-xl text-gold-400 tracking-wider">历史记录</h2>
        <p className="text-ink-500 text-xs mt-1">共 {totalCount} 条记录</p>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
        <input
          type="text"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="搜索卦名、问题、笔记..."
          className="w-full bg-ink-800/50 border border-ink-700/50 rounded-lg pl-9 pr-3 py-2.5 text-sm text-ink-200 placeholder-ink-500/50 focus:outline-none focus:border-gold-400/30 transition-colors"
        />
      </div>

      <div className="flex gap-2">
        {DATE_FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setDateFilter(f.value)}
            className={`flex-1 py-2 text-xs rounded-lg font-serif transition-all ${
              dateFilter === f.value
                ? 'bg-gold-400/15 text-gold-400 border border-gold-400/30'
                : 'bg-ink-800/30 text-ink-500 border border-transparent hover:text-ink-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        {TYPE_FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setRecordType(f.value)}
            className={`flex-1 py-1.5 text-xs rounded-lg font-serif transition-all ${
              recordType === f.value
                ? 'bg-gold-400/15 text-gold-400 border border-gold-400/30'
                : 'bg-ink-800/30 text-ink-500 border border-transparent hover:text-ink-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {totalCount > 0 && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowClear(true)}
            className="text-[10px] text-ink-500 hover:text-red-400 transition-colors flex items-center gap-1"
          >
            <Trash2 size={12} />
            <span>清空全部</span>
          </button>
        </div>
      )}

      <div className="space-y-3">
        <AnimatePresence mode="wait">
          {totalCount === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-ink-500 font-serif">{keyword ? '未找到匹配记录' : '暂无历史记录'}</p>
            </motion.div>
          ) : (
            <motion.div key="records" className="space-y-4">
              {groups.map(group => (
                <div key={group.label}>
                  <p className="text-[11px] text-ink-500 font-serif mb-2 px-1">{group.label}</p>
                  <div className="space-y-2">
                    {group.records.map(r => (
                      <HistoryRecord
                        key={r.id}
                        record={r}
                        onDelete={handleDelete}
                        onEditNote={setEditingRecord}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {editingRecord && (
          <NoteEditor
            record={editingRecord}
            onSave={handleSaveNote}
            onClose={() => setEditingRecord(null)}
          />
        )}
        {showClear && (
          <ClearDialog
            onConfirm={handleClear}
            onCancel={() => setShowClear(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
