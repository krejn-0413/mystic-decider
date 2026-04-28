import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info } from 'lucide-react';
import { JIU_XING_INFO, BA_MEN_INFO, BA_SHEN_INFO } from '../utils/qimenEngine';

var TABS = [
  { key: 'stars', label: '九星' },
  { key: 'doors', label: '八门' },
  { key: 'spirits', label: '八神' },
];

export default function QimenKnowledge() {
  var [activeTab, setActiveTab] = useState('stars');
  var [selectedItem, setSelectedItem] = useState(null);

  var items = [];
  if (activeTab === 'stars') items = JIU_XING_INFO;
  else if (activeTab === 'doors') items = BA_MEN_INFO;
  else items = BA_SHEN_INFO;

  return (
    <div>
      <div className="flex items-center gap-1 bg-ink-800/50 rounded-lg p-1 mb-3">
        {TABS.map(function (tab) {
          var isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={function () { setActiveTab(tab.key); setSelectedItem(null); }}
              className={[
                'flex-1 py-1.5 text-xs font-serif rounded-md transition-all',
                isActive
                  ? 'bg-gold-400/15 text-gold-400 shadow-sm'
                  : 'text-ink-400 hover:text-ink-200',
              ].join(' ')}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-1">
        {items.map(function (item) {
          return (
            <button
              key={item.name}
              onClick={function () { setSelectedItem(selectedItem === item ? null : item); }}
              className="w-full flex items-center justify-between p-2.5 rounded-lg border border-ink-700/30 hover:border-gold-400/20 transition-all text-left"
              style={{
                background: selectedItem === item
                  ? 'rgba(201,168,76,0.06)'
                  : 'rgba(42,34,27,0.5)',
                borderColor: selectedItem === item
                  ? 'rgba(201,168,76,0.3)'
                  : 'rgba(201,168,76,0.08)',
              }}
            >
              <div>
                <span className="text-xs font-serif text-ink-200">{item.name}</span>
                <span className="text-[10px] text-ink-500 ml-2">{item.meaning}</span>
              </div>
              <Info size={12} className="text-ink-500 shrink-0" />
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-2 p-3 rounded-lg bg-ink-800/40 border border-ink-700/30">
              {selectedItem.domain && (
                <div className="mb-2">
                  <span className="text-[10px] text-ink-500">传统含义：</span>
                  <p className="text-[11px] text-ink-300 font-serif mt-0.5">{selectedItem.domain}</p>
                </div>
              )}
              {selectedItem.modern && (
                <div>
                  <span className="text-[10px] text-ink-500">现代参考：</span>
                  <p className="text-[11px] text-ink-300 font-serif mt-0.5">{selectedItem.modern}</p>
                </div>
              )}
              {selectedItem.direction && (
                <div className="mt-1.5 text-[10px] text-ink-500">
                  方位：{selectedItem.direction} · 五行：{selectedItem.element}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
