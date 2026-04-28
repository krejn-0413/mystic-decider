import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function PwaInstallPrompt() {
  var [showPrompt, setShowPrompt] = useState(false);
  var [deferredPrompt, setDeferredPrompt] = useState(null);
  var [isInstalled, setIsInstalled] = useState(false);
  var [isIOS, setIsIOS] = useState(false);

  useEffect(function () {
    var isStandalone = window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone
      || window.location.search.includes('source=pwa');

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    var ua = window.navigator.userAgent;
    var iOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    setIsIOS(iOS);

    if (iOS) {
      var hasPrompted = localStorage.getItem('yibu-pwa-ios-prompted');
      if (!hasPrompted) {
        setTimeout(function () { setShowPrompt(true); }, 5000);
      }
      return;
    }

    function handler(e) {
      e.preventDefault();
      setDeferredPrompt(e);
      var hasPrompted = localStorage.getItem('yibu-pwa-prompted');
      if (!hasPrompted) {
        setTimeout(function () { setShowPrompt(true); }, 3000);
      }
    }

    window.addEventListener('beforeinstallprompt', handler);

    return function () {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  function handleInstall() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function (result) {
      if (result.outcome === 'accepted') {
        setShowPrompt(false);
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    });
  }

  function handleDismiss() {
    setShowPrompt(false);
    if (isIOS) {
      localStorage.setItem('yibu-pwa-ios-prompted', 'true');
    } else {
      localStorage.setItem('yibu-pwa-prompted', 'true');
    }
  }

  return (
    <AnimatePresence>
      {showPrompt && !isInstalled && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 z-50 max-w-sm mx-auto"
        >
          <div
            className="rounded-xl p-4 border shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(26,20,16,0.98), rgba(13,10,8,0.98))',
              borderColor: 'rgba(244,196,48,0.25)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
            }}
          >
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 text-ink-500 hover:text-ink-300 transition-colors"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(244,196,48,0.15), rgba(201,168,76,0.1))', border: '1px solid rgba(244,196,48,0.2)' }}>
                <svg width="24" height="24" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="tg2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f4c430" />
                      <stop offset="100%" stopColor="#c9a84c" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="46" fill="none" stroke="url(#tg2)" strokeWidth="2" opacity="0.5" />
                  <path d="M50 4 A46 46 0 0 0 50 96 A23 23 0 0 1 50 50 A23 23 0 0 0 50 4 Z" fill="url(#tg2)" opacity="0.85" />
                  <circle cx="50" cy="27" r="7" fill="#0d0a08" />
                  <circle cx="50" cy="73" r="7" fill="url(#tg2)" opacity="0.85" />
                </svg>
              </div>
              <div>
                <p className="font-serif text-xs text-gold-400 tracking-wider">安装 易卜</p>
                <p className="text-[10px] text-ink-500">添加到主屏幕，离线也可摇卦</p>
              </div>
            </div>

            {isIOS ? (
              <div className="text-[10px] text-ink-400 leading-relaxed">
                <p className="mb-1">iOS 安装步骤：</p>
                <ol className="list-decimal list-inside space-y-0.5 text-ink-500">
                  <li>点击底部分享按钮 <span className="text-ink-300">⎙</span></li>
                  <li>向下滑动，选择 <span className="text-gold-400">"添加到主屏幕"</span></li>
                  <li>点击右上角"添加"</li>
                </ol>
              </div>
            ) : (
              <button
                onClick={handleInstall}
                className="w-full py-2.5 rounded-lg text-xs font-serif tracking-wider transition-all"
                style={{
                  background: 'linear-gradient(135deg, rgba(244,196,48,0.15), rgba(201,168,76,0.1))',
                  border: '1px solid rgba(244,196,48,0.3)',
                  color: '#f4c430',
                }}
              >
                添加到主屏幕
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
