import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Check, X } from 'lucide-react';

export default function ShareButton({ hexagram, reading, question }) {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = `🔮 易卜 · ${
    reading ? `寻物占：${reading.itemTypeLabel}` : `六爻占卜`
  }\n` +
    `卦象：${hexagram?.name}（${hexagram?.unicode || ''}）\n` +
    `卦意：${hexagram?.meaning || ''}\n` +
    `问题：${question || '无'}\n` +
    (reading ? `方位：${reading.primaryDirection?.direction || '未知'}\n` : '') +
    (reading?.relativePosition?.fullDescription ? `详解：${reading.relativePosition.fullDescription}\n` : '') +
    `\n—— 易卜 · 传统文化娱乐参考`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = shareText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        // ignore
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: '易卜', text: shareText });
        return;
      } catch { /* user cancelled */ }
    }
    setShowModal(true);
  };

  return (
    <>
      <button
        onClick={handleShare}
        className="btn-mystic flex items-center gap-2 py-2.5 text-xs flex-1 justify-center"
      >
        <Share2 size={14} />
        <span>分享结果</span>
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.6)' }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="card-mystic p-5 max-w-sm w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-serif text-gold-400 tracking-wider">分享卦象</h3>
                <button onClick={() => setShowModal(false)} className="text-ink-500 hover:text-ink-300">
                  <X size={16} />
                </button>
              </div>
              <pre className="text-ink-300 text-xs leading-relaxed whitespace-pre-wrap font-sans bg-ink-800/30 rounded-lg p-3 max-h-48 overflow-y-auto">
                {shareText}
              </pre>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleCopy}
                  className="btn-mystic flex items-center justify-center gap-2 py-2.5 text-xs flex-1"
                >
                  {copied ? <Check size={14} /> : <Share2 size={14} />}
                  <span>{copied ? '已复制' : '复制到剪贴板'}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
