"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/config";

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = setTimeout(() => setTooltip(false), 6000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-5 left-5 z-50 flex items-center gap-3"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <AnimatePresence>
            {tooltip && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="relative hidden rounded-2xl bg-white px-4 py-3 text-sm font-medium text-warmgray-800 shadow-lux sm:block"
              >
                <button
                  onClick={() => setTooltip(false)}
                  aria-label="סגירה"
                  className="absolute -left-2 -top-2 rounded-full bg-warmgray-900 p-1 text-white"
                >
                  <X size={12} />
                </button>
                יש שאלה? דברו איתנו 💬
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href={whatsappLink(
              `שלום ${siteConfig.name}, אשמח לקבל ייעוץ והכוונה לבחירת מטפחת ✨`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="צרו קשר בוואטסאפ"
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lux transition-transform hover:scale-110"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40" />
            <MessageCircle size={26} className="relative fill-white" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
