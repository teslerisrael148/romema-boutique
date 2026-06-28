"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { gradientFor } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, staggerItem } from "@/components/ui/Reveal";

// בעת מעבר לייצור — להחליף ב-Instagram Basic Display API / oEmbed.
const posts = [
  { id: "ig1", caption: "מטפחת אורורה בשמפניה ✨" },
  { id: "ig2", caption: "סטיילינג לשבת קודש" },
  { id: "ig3", caption: "מאחורי הקלעים של הקולקציה" },
  { id: "ig4", caption: "ערב חגיגי בקריסטל לוקס" },
  { id: "ig5", caption: "בובואי בקשירה צרפתית" },
  { id: "ig6", caption: "גוונים חדשים שהגיעו 💕" },
];

export function InstagramFeed() {
  return (
    <section className="container-lux py-20 sm:py-28">
      <SectionHeading
        overline="עקבו אחרינו"
        title={`@${siteConfig.social.instagramHandle}`}
        description="הצטרפו לקהילת רוממה באינסטגרם — השראה יומיומית, סטיילינג והצצות לקולקציות חדשות."
      />

      <StaggerGroup className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {posts.map((post, i) => (
          <motion.a
            key={post.id}
            variants={staggerItem}
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-2xl"
            style={{ background: gradientFor(post.id, i) }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-warmgray-900/0 p-3 text-center text-ivory opacity-0 transition-all duration-300 group-hover:bg-warmgray-900/55 group-hover:opacity-100">
              <Instagram size={22} />
              <span className="text-xs leading-snug">{post.caption}</span>
            </div>
          </motion.a>
        ))}
      </StaggerGroup>

      <div className="mt-10 text-center">
        <a
          href={siteConfig.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
        >
          <Instagram size={18} />
          למעקב באינסטגרם
        </a>
      </div>
    </section>
  );
}
