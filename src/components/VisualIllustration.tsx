import React from 'react';

interface VisualIllustrationProps {
  visualKey: string;
  label?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  xs: 'w-12 h-12',
  sm: 'w-16 h-16',
  md: 'w-28 h-28',
  lg: 'w-40 h-40 sm:w-48 sm:h-48',
};

export const VisualIllustration: React.FC<VisualIllustrationProps> = ({
  visualKey,
  label,
  size = 'lg',
  className = '',
}) => {
  const boxSize = sizeMap[size];

  // Dynamic hijaiyah letter badge: "letter:أَ"
  if (visualKey.startsWith('letter:')) {
    const letter = visualKey.replace('letter:', '');
    return (
      <div
        className={`${boxSize} rounded-2xl bg-gradient-to-br from-sky-50 to-blue-100 border border-sky-200 flex items-center justify-center relative overflow-hidden select-none ${className}`}
        aria-label={label || letter}
      >
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <circle cx="60" cy="60" r="46" fill="#ffffff" stroke="#bae6fd" strokeWidth="2.5" />
          <circle cx="60" cy="60" r="39" fill="none" stroke="#e0f2fe" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>
        <span
          dir="rtl"
          className="absolute font-arabic font-bold text-sky-800 text-4xl sm:text-5xl leading-none"
        >
          {letter}
        </span>
      </div>
    );
  }

  // Dynamic number visual: "number:1" ... "number:20"
  if (visualKey.startsWith('number:')) {
    const numStr = visualKey.replace('number:', '');
    const count = Math.min(10, Math.max(1, parseInt(numStr, 10) || 1));
    const dots = Array.from({ length: count });
    return (
      <div
        className={`${boxSize} rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-200 flex flex-col items-center justify-center p-2 select-none ${className}`}
        aria-label={label || `Angka ${numStr}`}
      >
        <span className="font-display font-bold text-sky-700 text-3xl sm:text-4xl tabular-nums leading-none">
          {numStr}
        </span>
        <div className="flex flex-wrap items-center justify-center gap-1 mt-2 max-w-[82%]">
          {dots.map((_, idx) => (
            <span key={idx} className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" />
          ))}
        </div>
      </div>
    );
  }

  // Dynamic color swatch: "color:#HEX"
  if (visualKey.startsWith('color:')) {
    const hex = visualKey.replace('color:', '');
    const isLight = hex.toLowerCase() === '#ffffff' || hex.toLowerCase() === '#facc15';
    return (
      <div
        className={`${boxSize} rounded-2xl bg-white border border-slate-200 flex items-center justify-center p-3 select-none ${className}`}
        aria-label={label || 'Warna'}
      >
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <circle
            cx="60"
            cy="56"
            r="36"
            fill={hex}
            stroke={isLight ? '#cbd5e1' : '#0284c7'}
            strokeWidth={isLight ? '2.5' : '0'}
          />
          <path
            d="M42 98 C50 92 70 92 78 98"
            stroke="#94a3b8"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="48" cy="44" r="7" fill="#ffffff" opacity="0.32" />
        </svg>
      </div>
    );
  }

  // Dynamic grammar schematic badge: "schema:TOP|BOTTOM"
  if (visualKey.startsWith('schema:')) {
    const [, topText = '', bottomText = ''] = visualKey.split(':');
    return (
      <div
        className={`${boxSize} rounded-2xl bg-gradient-to-br from-sky-50 via-white to-blue-50 border border-sky-200 flex flex-col items-center justify-center p-2.5 text-center select-none ${className}`}
        aria-label={label || topText}
      >
        <div className="w-full rounded-lg bg-sky-600 text-white py-1.5 px-2 text-xs sm:text-sm font-semibold truncate">
          {topText}
        </div>
        <svg viewBox="0 0 24 20" className="w-5 h-4 text-sky-400 my-1 shrink-0">
          <path d="M12 2 L12 16 M6 11 L12 17 L18 11" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="w-full rounded-lg bg-sky-100 text-sky-900 border border-sky-200 py-1.5 px-2 text-xs font-medium truncate">
          {bottomText}
        </div>
      </div>
    );
  }

  const renderSvg = () => {
    switch (visualKey) {
      // === HARAKAT & BUNYI ===
      case 'harakat_fathah':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <line x1="36" y1="30" x2="84" y2="18" stroke="#0284c7" strokeWidth="7" strokeLinecap="round" />
            <path d="M35 66 Q35 88 60 88 Q85 88 85 66" fill="none" stroke="#0f172a" strokeWidth="7" strokeLinecap="round" />
            <circle cx="60" cy="100" r="4.5" fill="#0f172a" />
          </svg>
        );
      case 'harakat_kasrah':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <path d="M35 46 Q35 68 60 68 Q85 68 85 46" fill="none" stroke="#0f172a" strokeWidth="7" strokeLinecap="round" />
            <circle cx="60" cy="79" r="4.5" fill="#0f172a" />
            <line x1="38" y1="102" x2="82" y2="90" stroke="#0284c7" strokeWidth="7" strokeLinecap="round" />
          </svg>
        );
      case 'harakat_dhammah':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <path d="M62 24 C70 24 72 34 62 36 C52 36 52 24 62 24 Z M66 35 C66 44 56 49 48 48" fill="none" stroke="#0284c7" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M35 68 Q35 90 60 90 Q85 90 85 68" fill="none" stroke="#0f172a" strokeWidth="7" strokeLinecap="round" />
            <circle cx="60" cy="102" r="4.5" fill="#0f172a" />
          </svg>
        );
      case 'harakat_sukun':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <circle cx="60" cy="28" r="10" fill="none" stroke="#0284c7" strokeWidth="6" />
            <path d="M35 66 Q35 88 60 88 Q85 88 85 66" fill="none" stroke="#0f172a" strokeWidth="7" strokeLinecap="round" />
            <circle cx="60" cy="100" r="4.5" fill="#0f172a" />
          </svg>
        );
      case 'harakat_tasydid':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <path d="M44 26 Q48 38 56 38 Q60 38 60 28 Q60 38 64 38 Q72 38 76 26" fill="none" stroke="#0284c7" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M35 68 Q35 90 60 90 Q85 90 85 68" fill="none" stroke="#0f172a" strokeWidth="7" strokeLinecap="round" />
            <circle cx="60" cy="102" r="4.5" fill="#0f172a" />
          </svg>
        );
      case 'harakat_tanwin':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <line x1="38" y1="26" x2="82" y2="15" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
            <line x1="38" y1="40" x2="82" y2="29" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
            <path d="M35 72 Q35 94 60 94 Q85 94 85 72" fill="none" stroke="#0f172a" strokeWidth="7" strokeLinecap="round" />
          </svg>
        );

      // === HEWAN (ANIMALS) ===
      case 'animal_cat':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <polygon points="32,52 38,24 54,42" fill="#f59e0b" />
            <polygon points="88,52 82,24 66,42" fill="#f59e0b" />
            <circle cx="60" cy="64" r="30" fill="#fbbf24" />
            <circle cx="48" cy="58" r="4.5" fill="#0f172a" />
            <circle cx="72" cy="58" r="4.5" fill="#0f172a" />
            <polygon points="60,68 55,63 65,63" fill="#fb7185" />
            <path d="M52 73 Q60 78 68 73" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M26 64 L40 66 M26 72 L40 70 M94 64 L80 66 M94 72 L80 70" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'animal_lion':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#fef3c7" />
            <circle cx="60" cy="62" r="38" fill="#d97706" />
            <circle cx="60" cy="62" r="26" fill="#fcd34d" />
            <circle cx="38" cy="36" r="8" fill="#d97706" />
            <circle cx="82" cy="36" r="8" fill="#d97706" />
            <circle cx="50" cy="58" r="4" fill="#0f172a" />
            <circle cx="70" cy="58" r="4" fill="#0f172a" />
            <polygon points="60,68 54,62 66,62" fill="#78350f" />
            <path d="M52 74 Q60 80 68 74" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case 'animal_elephant':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#e0f2fe" />
            <ellipse cx="32" cy="58" rx="18" ry="26" fill="#64748b" />
            <ellipse cx="88" cy="58" rx="18" ry="26" fill="#64748b" />
            <circle cx="60" cy="56" r="26" fill="#94a3b8" />
            <path d="M54 66 Q54 96 68 96 Q74 96 72 88" fill="none" stroke="#94a3b8" strokeWidth="11" strokeLinecap="round" />
            <circle cx="49" cy="50" r="3.8" fill="#0f172a" />
            <circle cx="71" cy="50" r="3.8" fill="#0f172a" />
          </svg>
        );
      case 'animal_bird':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#e0f2fe" />
            <ellipse cx="62" cy="66" rx="28" ry="20" fill="#0ea5e9" />
            <circle cx="82" cy="48" r="14" fill="#0284c7" />
            <polygon points="94,46 106,50 94,54" fill="#f59e0b" />
            <circle cx="85" cy="45" r="2.8" fill="#ffffff" />
            <path d="M40 62 Q55 44 70 62" fill="#7dd3fc" />
            <polygon points="34,64 20,56 24,72" fill="#0369a1" />
          </svg>
        );
      case 'animal_fish':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#e0f2fe" />
            <polygon points="34,60 16,42 16,78" fill="#0284c7" />
            <ellipse cx="64" cy="60" rx="32" ry="21" fill="#38bdf8" />
            <circle cx="82" cy="55" r="4" fill="#0f172a" />
            <circle cx="83" cy="54" r="1.5" fill="#ffffff" />
            <path d="M56 48 Q64 60 56 72" fill="none" stroke="#e0f2fe" strokeWidth="3" strokeLinecap="round" />
            <circle cx="102" cy="38" r="3.5" fill="#7dd3fc" />
            <circle cx="96" cy="28" r="2.5" fill="#7dd3fc" />
          </svg>
        );
      case 'animal_horse':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#fef3c7" />
            <path d="M42 96 L42 62 Q42 36 68 30 L78 24 L76 38 L92 52 Q94 60 84 64 L72 62 L72 96 Z" fill="#92400e" />
            <path d="M42 52 Q32 42 46 32 L54 34" fill="none" stroke="#451a03" strokeWidth="7" strokeLinecap="round" />
            <circle cx="75" cy="44" r="3.5" fill="#ffffff" />
            <circle cx="75" cy="44" r="1.8" fill="#0f172a" />
          </svg>
        );
      case 'animal_cow':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#ecfdf5" />
            <path d="M36 36 Q28 24 38 24 Q44 24 44 36" fill="#cbd5e1" />
            <path d="M84 36 Q92 24 82 24 Q76 24 76 36" fill="#cbd5e1" />
            <rect x="34" y="34" width="52" height="52" rx="22" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="48" cy="46" r="9" fill="#334155" />
            <ellipse cx="60" cy="76" rx="22" ry="13" fill="#fda4af" />
            <circle cx="48" cy="54" r="3.5" fill="#0f172a" />
            <circle cx="72" cy="54" r="3.5" fill="#0f172a" />
            <circle cx="52" cy="75" r="2.5" fill="#9f1239" />
            <circle cx="68" cy="75" r="2.5" fill="#9f1239" />
          </svg>
        );
      case 'animal_rabbit':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <ellipse cx="46" cy="34" rx="9" ry="22" fill="#e2e8f0" />
            <ellipse cx="74" cy="34" rx="9" ry="22" fill="#e2e8f0" />
            <ellipse cx="46" cy="34" rx="4.5" ry="15" fill="#fda4af" />
            <ellipse cx="74" cy="34" rx="4.5" ry="15" fill="#fda4af" />
            <circle cx="60" cy="70" r="26" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="50" cy="65" r="3.5" fill="#0f172a" />
            <circle cx="70" cy="65" r="3.5" fill="#0f172a" />
            <polygon points="60,74 56,70 64,70" fill="#fb7185" />
          </svg>
        );
      case 'animal_camel':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#fef3c7" />
            <path d="M28 72 Q28 46 46 50 Q56 32 68 48 Q78 52 84 42 L88 26 L98 28 Q102 36 94 40 L90 62 L84 94 L76 94 L76 72 L46 72 L42 94 L34 94 Z" fill="#d97706" />
            <circle cx="93" cy="31" r="2.2" fill="#0f172a" />
          </svg>
        );
      case 'animal_rooster':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#fff7ed" />
            <path d="M58 26 Q64 16 70 26 Q76 18 78 28 L60 32 Z" fill="#ef4444" />
            <circle cx="66" cy="40" r="14" fill="#fbbf24" />
            <polygon points="79,38 90,42 79,46" fill="#f97316" />
            <ellipse cx="52" cy="70" rx="24" ry="18" fill="#ea580c" />
            <path d="M28 62 Q18 46 34 48 Q26 38 40 48" fill="none" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" />
            <circle cx="69" cy="38" r="2.5" fill="#0f172a" />
          </svg>
        );

      // === BUAH-BUAHAN & MAKANAN (FRUITS & FOOD) ===
      case 'fruit_apple':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#fef2f2" />
            <path d="M60 32 Q62 20 72 18" stroke="#78350f" strokeWidth="4" fill="none" strokeLinecap="round" />
            <ellipse cx="74" cy="24" rx="10" ry="5" fill="#22c55e" transform="rotate(-20 74 24)" />
            <path d="M60 36 C42 28 24 44 28 68 C32 90 48 98 60 92 C72 98 88 90 92 68 C96 44 78 28 60 36 Z" fill="#ef4444" />
            <ellipse cx="44" cy="52" rx="5" ry="10" fill="#fca5a5" opacity="0.55" transform="rotate(-15 44 52)" />
          </svg>
        );
      case 'fruit_banana':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#fefce8" />
            <path d="M28 84 Q56 96 86 58 Q96 42 88 26 Q82 32 76 46 Q54 76 28 84 Z" fill="#facc15" stroke="#eab308" strokeWidth="2" />
            <rect x="84" y="22" width="7" height="7" rx="2" fill="#78350f" />
          </svg>
        );
      case 'fruit_orange':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#fff7ed" />
            <circle cx="60" cy="64" r="32" fill="#f97316" />
            <ellipse cx="68" cy="28" rx="10" ry="5" fill="#22c55e" transform="rotate(-15 68 28)" />
            <circle cx="48" cy="52" r="2" fill="#fdba74" />
            <circle cx="56" cy="46" r="2" fill="#fdba74" />
            <circle cx="44" cy="62" r="2" fill="#fdba74" />
          </svg>
        );
      case 'fruit_grape':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#faf5ff" />
            <path d="M60 22 L60 34" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
            <circle cx="46" cy="46" r="11" fill="#9333ea" />
            <circle cx="60" cy="46" r="11" fill="#7e22ce" />
            <circle cx="74" cy="46" r="11" fill="#9333ea" />
            <circle cx="52" cy="64" r="11" fill="#7e22ce" />
            <circle cx="68" cy="64" r="11" fill="#a855f7" />
            <circle cx="60" cy="82" r="11" fill="#9333ea" />
          </svg>
        );
      case 'fruit_watermelon':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#ecfdf5" />
            <path d="M22 52 A38 38 0 0 0 98 52 Z" fill="#16a34a" />
            <path d="M28 52 A32 32 0 0 0 92 52 Z" fill="#ef4444" />
            <circle cx="48" cy="64" r="2.5" fill="#0f172a" />
            <circle cx="60" cy="70" r="2.5" fill="#0f172a" />
            <circle cx="72" cy="64" r="2.5" fill="#0f172a" />
          </svg>
        );
      case 'fruit_date':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#fffbeb" />
            <ellipse cx="48" cy="56" rx="14" ry="24" fill="#92400e" transform="rotate(-18 48 56)" />
            <ellipse cx="72" cy="66" rx="14" ry="24" fill="#78350f" transform="rotate(15 72 66)" />
            <ellipse cx="44" cy="48" rx="4" ry="8" fill="#d97706" opacity="0.5" transform="rotate(-18 44 48)" />
          </svg>
        );
      case 'fruit_mango':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#fefce8" />
            <path d="M68 28 C88 32 90 68 68 88 C48 104 30 92 32 72 C34 46 48 24 68 28 Z" fill="#f59e0b" />
            <ellipse cx="64" cy="22" rx="9" ry="4" fill="#16a34a" />
          </svg>
        );
      case 'fruit_pomegranate':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#fff1f2" />
            <polygon points="50,32 54,20 60,26 66,20 70,32" fill="#e11d48" />
            <circle cx="60" cy="64" r="31" fill="#e11d48" />
            <circle cx="48" cy="54" r="5" fill="#fda4af" opacity="0.4" />
          </svg>
        );
      case 'fruit_lemon':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#fefce8" />
            <ellipse cx="60" cy="62" rx="34" ry="25" fill="#facc15" transform="rotate(-15 60 62)" />
            <ellipse cx="78" cy="34" rx="10" ry="5" fill="#22c55e" transform="rotate(20 78 34)" />
          </svg>
        );
      case 'obj_milk':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <path d="M44 26 L76 26 L76 38 L82 48 L82 96 L38 96 L38 48 L44 38 Z" fill="#ffffff" stroke="#0284c7" strokeWidth="3.5" />
            <rect x="44" y="20" width="32" height="8" rx="3" fill="#0284c7" />
            <rect x="42" y="60" width="36" height="20" fill="#bae6fd" />
          </svg>
        );
      case 'obj_bread':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#fffbeb" />
            <path d="M22 66 C22 40 98 40 98 66 L94 84 L26 84 Z" fill="#d97706" />
            <line x1="42" y1="54" x2="50" y2="66" stroke="#fef3c7" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="58" y1="52" x2="66" y2="66" stroke="#fef3c7" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="74" y1="54" x2="82" y2="66" stroke="#fef3c7" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        );

      // === ALAM & BENDA LAIN ===
      case 'obj_sun':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#eff6ff" />
            <circle cx="60" cy="60" r="24" fill="#facc15" />
            <g stroke="#f59e0b" strokeWidth="4.5" strokeLinecap="round">
              <line x1="60" y1="18" x2="60" y2="28" />
              <line x1="60" y1="92" x2="60" y2="102" />
              <line x1="18" y1="60" x2="28" y2="60" />
              <line x1="92" y1="60" x2="102" y2="60" />
              <line x1="30" y1="30" x2="38" y2="38" />
              <line x1="82" y1="82" x2="90" y2="90" />
              <line x1="90" y1="30" x2="82" y2="38" />
              <line x1="38" y1="82" x2="30" y2="90" />
            </g>
          </svg>
        );
      case 'obj_star':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#0c4a6e" />
            <polygon points="60,22 70,46 96,48 76,66 82,92 60,78 38,92 44,66 24,48 50,46" fill="#fde047" />
          </svg>
        );
      case 'obj_flower':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#fff1f2" />
            <line x1="60" y1="54" x2="60" y2="100" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" />
            <ellipse cx="72" cy="80" rx="10" ry="5" fill="#22c55e" transform="rotate(-25 72 80)" />
            <circle cx="60" cy="34" r="12" fill="#f43f5e" />
            <circle cx="44" cy="46" r="12" fill="#fb7185" />
            <circle cx="76" cy="46" r="12" fill="#fb7185" />
            <circle cx="50" cy="60" r="12" fill="#f43f5e" />
            <circle cx="70" cy="60" r="12" fill="#f43f5e" />
            <circle cx="60" cy="48" r="10" fill="#facc15" />
          </svg>
        );
      case 'obj_cloud':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#e0f2fe" />
            <path d="M32 78 L88 78 A16 16 0 0 0 90 46 A22 22 0 0 0 48 38 A18 18 0 0 0 32 78 Z" fill="#ffffff" stroke="#7dd3fc" strokeWidth="3" />
          </svg>
        );
      case 'obj_phone':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <rect x="38" y="20" width="44" height="80" rx="9" fill="#0284c7" />
            <rect x="43" y="28" width="34" height="58" rx="4" fill="#ffffff" />
            <circle cx="60" cy="92" r="3.5" fill="#bae6fd" />
          </svg>
        );
      case 'obj_clothes':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <path d="M44 26 L22 40 L30 56 L42 50 L42 94 L78 94 L78 50 L90 56 L98 40 L76 26 Q60 36 44 26 Z" fill="#0ea5e9" />
          </svg>
        );
      case 'obj_mosque':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#eff6ff" />
            <path d="M36 58 C36 32 84 32 84 58 Z" fill="#0284c7" />
            <rect x="30" y="58" width="60" height="38" rx="3" fill="#ffffff" stroke="#0284c7" strokeWidth="3" />
            <rect x="52" y="70" width="16" height="26" rx="8" fill="#0ea5e9" />
            <line x1="60" y1="22" x2="60" y2="34" stroke="#0284c7" strokeWidth="3" />
            <circle cx="60" cy="20" r="3.5" fill="#facc15" />
          </svg>
        );
      case 'obj_mountain':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#e0f2fe" />
            <polygon points="16,94 52,32 88,94" fill="#0284c7" />
            <polygon points="56,94 82,48 108,94" fill="#38bdf8" />
            <polygon points="52,32 42,50 52,46 62,50" fill="#ffffff" />
          </svg>
        );
      case 'obj_car':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <path d="M26 62 L36 40 L84 40 L94 62 L100 66 L100 82 L20 82 L20 66 Z" fill="#0284c7" />
            <rect x="40" y="46" width="18" height="14" rx="2" fill="#e0f2fe" />
            <rect x="62" y="46" width="18" height="14" rx="2" fill="#e0f2fe" />
            <circle cx="38" cy="84" r="10" fill="#1e293b" />
            <circle cx="82" cy="84" r="10" fill="#1e293b" />
            <circle cx="38" cy="84" r="4" fill="#cbd5e1" />
            <circle cx="82" cy="84" r="4" fill="#cbd5e1" />
          </svg>
        );

      // === AKSI HARIAN (DAILY ACTIONS) ===
      case 'action_drink':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <polygon points="38,30 82,30 74,94 46,94" fill="#ffffff" stroke="#0284c7" strokeWidth="4" />
            <polygon points="42,54 78,54 72,90 48,90" fill="#38bdf8" />
            <line x1="68" y1="18" x2="58" y2="68" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round" />
          </svg>
        );
      case 'action_eat':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#fffbeb" />
            <circle cx="60" cy="62" r="32" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3.5" />
            <circle cx="60" cy="62" r="22" fill="#fde68a" />
            <circle cx="54" cy="58" r="6" fill="#ef4444" />
            <circle cx="68" cy="64" r="6" fill="#22c55e" />
          </svg>
        );
      case 'action_read':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <path d="M22 40 Q42 32 60 42 Q78 32 98 40 L98 90 Q78 82 60 92 Q42 82 22 90 Z" fill="#ffffff" stroke="#0284c7" strokeWidth="4" />
            <line x1="60" y1="42" x2="60" y2="92" stroke="#0284c7" strokeWidth="3" />
            <circle cx="48" cy="30" r="7" fill="#0ea5e9" />
            <circle cx="72" cy="30" r="7" fill="#0ea5e9" />
            <line x1="55" y1="30" x2="65" y2="30" stroke="#0284c7" strokeWidth="3" />
          </svg>
        );
      case 'action_write':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <rect x="26" y="24" width="56" height="72" rx="6" fill="#ffffff" stroke="#bae6fd" strokeWidth="3" />
            <line x1="36" y1="42" x2="68" y2="42" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
            <line x1="36" y1="56" x2="68" y2="56" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
            <line x1="36" y1="70" x2="58" y2="70" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
            <path d="M88 34 L98 44 L72 70 L60 72 L62 60 Z" fill="#0284c7" />
          </svg>
        );
      case 'action_go':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <circle cx="60" cy="30" r="10" fill="#0284c7" />
            <path d="M58 42 L54 66 L40 94 M56 66 L76 92 M40 52 L60 46 L78 58" fill="none" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M82 32 L100 32 M94 26 L101 32 L94 38" fill="none" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'action_sleep':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#e0f2fe" />
            <rect x="22" y="64" width="76" height="20" rx="5" fill="#0284c7" />
            <rect x="26" y="54" width="22" height="12" rx="5" fill="#ffffff" />
            <rect x="22" y="50" width="8" height="44" rx="3" fill="#0369a1" />
            <rect x="90" y="60" width="8" height="34" rx="3" fill="#0369a1" />
            <path d="M78 24 A12 12 0 1 0 90 38 A9 9 0 1 1 78 24 Z" fill="#facc15" />
          </svg>
        );

      // === PROFESI & TEMPAT (SMP) ===
      case 'prof_doctor':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <circle cx="60" cy="42" r="18" fill="#fde68a" />
            <path d="M32 96 C32 70 88 70 88 96 Z" fill="#ffffff" stroke="#0284c7" strokeWidth="3" />
            <path d="M48 70 Q48 88 60 88 Q72 88 72 70" fill="none" stroke="#0284c7" strokeWidth="3.5" />
            <circle cx="60" cy="88" r="4" fill="#ef4444" />
            <rect x="55" y="18" width="10" height="10" rx="2" fill="#ef4444" />
          </svg>
        );
      case 'prof_engineer':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#fefce8" />
            <circle cx="60" cy="52" r="18" fill="#fde68a" />
            <path d="M38 46 C38 26 82 26 82 46 Z" fill="#facc15" />
            <rect x="34" y="44" width="52" height="6" rx="3" fill="#eab308" />
            <path d="M34 96 C34 74 86 74 86 96 Z" fill="#0284c7" />
          </svg>
        );
      case 'prof_teacher':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <rect x="20" y="22" width="80" height="44" rx="6" fill="#0f766e" stroke="#92400e" strokeWidth="4" />
            <circle cx="48" cy="64" r="14" fill="#fde68a" />
            <path d="M26 98 C26 78 70 78 70 98 Z" fill="#0284c7" />
            <line x1="68" y1="74" x2="88" y2="44" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
          </svg>
        );
      case 'place_school':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#eff6ff" />
            <polygon points="60,22 22,48 98,48" fill="#0284c7" />
            <rect x="26" y="48" width="68" height="48" fill="#ffffff" stroke="#bae6fd" strokeWidth="3" />
            <rect x="52" y="66" width="16" height="30" fill="#0ea5e9" />
            <circle cx="60" cy="36" r="5" fill="#ffffff" />
            <rect x="34" y="58" width="12" height="12" rx="2" fill="#bae6fd" />
            <rect x="74" y="58" width="12" height="12" rx="2" fill="#bae6fd" />
          </svg>
        );
      case 'place_library':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <rect x="24" y="24" width="72" height="72" rx="6" fill="#ffffff" stroke="#0284c7" strokeWidth="3.5" />
            <line x1="24" y1="60" x2="96" y2="60" stroke="#0284c7" strokeWidth="3.5" />
            <rect x="32" y="34" width="10" height="24" rx="2" fill="#0ea5e9" />
            <rect x="44" y="30" width="10" height="28" rx="2" fill="#0284c7" />
            <rect x="56" y="36" width="10" height="22" rx="2" fill="#38bdf8" />
            <rect x="34" y="68" width="12" height="24" rx="2" fill="#f59e0b" />
            <rect x="48" y="66" width="10" height="26" rx="2" fill="#0284c7" />
            <rect x="60" y="70" width="12" height="22" rx="2" fill="#0ea5e9" />
          </svg>
        );

      // === TEMA MODERN (SMA) ===
      case 'theme_tech':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#eff6ff" />
            <rect x="26" y="30" width="68" height="44" rx="6" fill="#0284c7" />
            <rect x="32" y="36" width="56" height="32" rx="3" fill="#e0f2fe" />
            <path d="M18 82 L102 82 L94 92 L26 92 Z" fill="#0369a1" />
            <circle cx="60" cy="52" r="8" fill="#0284c7" />
          </svg>
        );
      case 'theme_health':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#fff1f2" />
            <path d="M60 92 C30 72 22 52 34 38 C44 26 56 34 60 42 C64 34 76 26 86 38 C98 52 90 72 60 92 Z" fill="#f43f5e" />
            <path d="M40 58 L50 58 L56 46 L64 68 L70 58 L80 58" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'theme_env':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#ecfdf5" />
            <circle cx="60" cy="64" r="30" fill="#0ea5e9" />
            <path d="M42 56 Q52 44 66 52 Q74 62 62 74 Q48 78 42 56 Z" fill="#22c55e" />
            <path d="M60 34 Q72 20 84 26 Q78 38 60 34 Z" fill="#16a34a" />
          </svg>
        );

      // === ANGGOTA TUBUH (BODY) ===
      case 'body_head':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <circle cx="60" cy="62" r="28" fill="#fde68a" />
            <path d="M32 58 Q36 30 60 30 Q84 30 88 58 Q74 44 60 44 Q46 44 32 58 Z" fill="#334155" />
            <circle cx="50" cy="62" r="3" fill="#0f172a" />
            <circle cx="70" cy="62" r="3" fill="#0f172a" />
            <path d="M52 74 Q60 80 68 74" fill="none" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case 'body_eye':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <path d="M18 60 Q60 26 102 60 Q60 94 18 60 Z" fill="#ffffff" stroke="#0284c7" strokeWidth="3.5" />
            <circle cx="60" cy="60" r="16" fill="#0284c7" />
            <circle cx="60" cy="60" r="7" fill="#0f172a" />
            <circle cx="65" cy="54" r="3" fill="#ffffff" />
          </svg>
        );
      case 'body_ear':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <path d="M52 26 C78 22 86 48 74 68 C68 78 66 94 52 94 C42 94 40 82 46 74" fill="none" stroke="#0284c7" strokeWidth="7" strokeLinecap="round" />
            <path d="M54 44 C66 44 68 58 58 66" fill="none" stroke="#38bdf8" strokeWidth="4.5" strokeLinecap="round" />
          </svg>
        );
      case 'body_nose':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <path d="M58 28 L58 68 Q58 84 44 82 Q36 80 44 70" fill="none" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
            <path d="M58 82 Q72 86 76 76 Q78 68 68 66" fill="none" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
          </svg>
        );
      case 'body_mouth':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#fff1f2" />
            <path d="M24 58 Q46 42 60 50 Q74 42 96 58 Q78 86 60 86 Q42 86 24 58 Z" fill="#fb7185" />
            <path d="M36 58 Q60 66 84 58" stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round" />
          </svg>
        );
      case 'body_hand':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <path d="M40 64 L40 36 A4 4 0 0 1 48 36 L48 56 L50 28 A4 4 0 0 1 58 28 L58 56 L62 26 A4 4 0 0 1 70 26 L70 56 L74 34 A4 4 0 0 1 82 34 L82 68 C82 86 72 96 58 96 C44 96 34 86 30 72 L24 58 A4 4 0 0 1 32 54 L40 64 Z" fill="#0ea5e9" />
          </svg>
        );
      case 'body_foot':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <path d="M46 26 L46 66 Q46 80 34 84 Q24 88 30 96 L82 96 Q94 96 92 86 Q88 78 70 76 L64 26 Z" fill="#0284c7" />
          </svg>
        );

      // === KELUARGA ===
      case 'family_father':
      case 'family_mother':
      case 'family_brother':
      case 'family_sister':
      case 'family_grandparent':
      case 'family_child': {
        const isFemale = visualKey === 'family_mother' || visualKey === 'family_sister';
        const isElder = visualKey === 'family_grandparent';
        const isChild = visualKey === 'family_child';
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            {isFemale && <path d="M32 62 C32 30 88 30 88 62 L92 96 L28 96 Z" fill="#0284c7" />}
            <circle cx="60" cy="48" r={isChild ? 18 : 22} fill="#fde68a" />
            {!isFemale && (
              <path
                d="M38 44 Q44 24 60 24 Q76 24 82 44"
                fill={isElder ? '#cbd5e1' : '#1e293b'}
              />
            )}
            <path d="M34 96 C34 74 86 74 86 96 Z" fill={isFemale ? '#38bdf8' : '#0284c7'} />
            <circle cx="52" cy="48" r="2.8" fill="#0f172a" />
            <circle cx="68" cy="48" r="2.8" fill="#0f172a" />
            <path d="M54 57 Q60 62 66 57" fill="none" stroke="#92400e" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        );
      }

      // === SEKOLAH & RUMAH ===
      case 'school_book':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#eff6ff" />
            <path d="M22 36 Q42 28 60 38 Q78 28 98 36 L98 88 Q78 80 60 90 Q42 80 22 88 Z" fill="#ffffff" stroke="#0284c7" strokeWidth="4" />
            <line x1="60" y1="38" x2="60" y2="90" stroke="#0284c7" strokeWidth="3" />
            <line x1="32" y1="50" x2="50" y2="50" stroke="#7dd3fc" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="32" y1="62" x2="50" y2="62" stroke="#7dd3fc" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="70" y1="50" x2="88" y2="50" stroke="#7dd3fc" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="70" y1="62" x2="88" y2="62" stroke="#7dd3fc" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        );
      case 'school_pen':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <g transform="rotate(-40 60 60)">
              <rect x="48" y="22" width="24" height="62" rx="4" fill="#0284c7" />
              <polygon points="48,84 72,84 60,104" fill="#fde68a" />
              <polygon points="56,96 64,96 60,104" fill="#0f172a" />
              <rect x="48" y="22" width="24" height="10" rx="3" fill="#38bdf8" />
            </g>
          </svg>
        );
      case 'school_bag':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#eff6ff" />
            <path d="M46 34 C46 22 74 22 74 34" fill="none" stroke="#0369a1" strokeWidth="5" />
            <rect x="30" y="34" width="60" height="62" rx="14" fill="#0284c7" />
            <rect x="38" y="58" width="44" height="28" rx="8" fill="#38bdf8" />
            <line x1="46" y1="68" x2="74" y2="68" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );
      case 'school_ruler':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#fefce8" />
            <g transform="rotate(-30 60 60)">
              <rect x="20" y="46" width="80" height="28" rx="4" fill="#fbbf24" stroke="#d97706" strokeWidth="2.5" />
              <path d="M32 46 L32 56 M44 46 L44 53 M56 46 L56 56 M68 46 L68 53 M80 46 L80 56" stroke="#78350f" strokeWidth="2.5" />
            </g>
          </svg>
        );
      case 'school_board':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <rect x="18" y="28" width="84" height="54" rx="6" fill="#0f766e" stroke="#92400e" strokeWidth="5" />
            <line x1="34" y1="46" x2="86" y2="46" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="42" y1="60" x2="78" y2="60" stroke="#99f6e4" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="42" y1="84" x2="34" y2="100" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />
            <line x1="78" y1="84" x2="86" y2="100" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />
          </svg>
        );
      case 'house_home':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <polygon points="60,22 20,56 100,56" fill="#0284c7" />
            <rect x="30" y="56" width="60" height="42" rx="4" fill="#ffffff" stroke="#bae6fd" strokeWidth="2.5" />
            <rect x="52" y="68" width="16" height="30" rx="3" fill="#0ea5e9" />
          </svg>
        );
      case 'house_door':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#fffbeb" />
            <rect x="36" y="20" width="48" height="80" rx="6" fill="#b45309" />
            <rect x="44" y="28" width="32" height="28" rx="3" fill="#d97706" />
            <circle cx="74" cy="64" r="4" fill="#fef08a" />
          </svg>
        );
      case 'house_window':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <rect x="26" y="26" width="68" height="68" rx="6" fill="#bae6fd" stroke="#0284c7" strokeWidth="5" />
            <line x1="60" y1="26" x2="60" y2="94" stroke="#0284c7" strokeWidth="4" />
            <line x1="26" y1="60" x2="94" y2="60" stroke="#0284c7" strokeWidth="4" />
          </svg>
        );
      case 'house_chair':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <rect x="38" y="24" width="44" height="36" rx="6" fill="#0284c7" />
            <rect x="34" y="58" width="52" height="10" rx="4" fill="#0369a1" />
            <line x1="40" y1="68" x2="40" y2="98" stroke="#0369a1" strokeWidth="6" strokeLinecap="round" />
            <line x1="80" y1="68" x2="80" y2="98" stroke="#0369a1" strokeWidth="6" strokeLinecap="round" />
          </svg>
        );
      case 'house_clock':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <circle cx="60" cy="60" r="34" fill="#ffffff" stroke="#0284c7" strokeWidth="5" />
            <line x1="60" y1="60" x2="60" y2="38" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
            <line x1="60" y1="60" x2="78" y2="60" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
            <circle cx="60" cy="60" r="3.5" fill="#0f172a" />
          </svg>
        );
      case 'house_lamp':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#fefce8" />
            <circle cx="60" cy="48" r="22" fill="#facc15" />
            <rect x="50" y="68" width="20" height="14" rx="4" fill="#64748b" />
            <path d="M54 82 L66 82 L62 90 L58 90 Z" fill="#334155" />
            <line x1="60" y1="16" x2="60" y2="22" stroke="#eab308" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="28" y1="48" x2="34" y2="48" stroke="#eab308" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="86" y1="48" x2="92" y2="48" stroke="#eab308" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        );

      // === HARI & SAPAAN ===
      case 'calendar_day':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <rect x="24" y="26" width="72" height="70" rx="10" fill="#ffffff" stroke="#bae6fd" strokeWidth="3" />
            <rect x="24" y="26" width="72" height="22" rx="10" fill="#0284c7" />
            <circle cx="44" cy="58" r="4" fill="#38bdf8" />
            <circle cx="60" cy="58" r="4" fill="#38bdf8" />
            <circle cx="76" cy="58" r="4" fill="#38bdf8" />
            <circle cx="44" cy="76" r="4" fill="#0284c7" />
            <circle cx="60" cy="76" r="4" fill="#38bdf8" />
            <circle cx="76" cy="76" r="4" fill="#38bdf8" />
          </svg>
        );
      case 'greeting_morning':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#e0f2fe" />
            <circle cx="60" cy="64" r="22" fill="#facc15" />
            <path d="M18 82 L102 82" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
            <line x1="60" y1="24" x2="60" y2="34" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
            <line x1="32" y1="36" x2="40" y2="44" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
            <line x1="88" y1="36" x2="80" y2="44" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
          </svg>
        );
      case 'greeting_evening':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#0c4a6e" />
            <path d="M72 34 A26 26 0 1 0 88 76 A20 20 0 1 1 72 34 Z" fill="#fde047" />
            <circle cx="36" cy="36" r="3" fill="#bae6fd" />
            <circle cx="86" cy="34" r="2.5" fill="#bae6fd" />
            <circle cx="42" cy="82" r="2.5" fill="#bae6fd" />
          </svg>
        );
      case 'greeting_wave':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <rect x="24" y="30" width="54" height="36" rx="12" fill="#0284c7" />
            <polygon points="34,66 48,66 36,78" fill="#0284c7" />
            <rect x="46" y="54" width="50" height="32" rx="12" fill="#38bdf8" />
            <circle cx="42" cy="48" r="3" fill="#ffffff" />
            <circle cx="51" cy="48" r="3" fill="#ffffff" />
            <circle cx="60" cy="48" r="3" fill="#ffffff" />
          </svg>
        );
      case 'greeting_thanks':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <path d="M60 88 C34 70 28 52 38 40 C48 28 58 38 60 44 C62 38 72 28 82 40 C92 52 86 70 60 88 Z" fill="#0ea5e9" />
            <path d="M46 54 L56 64 L76 44" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );

      // === GRAMMAR & AKADEMIK VISUALS ===
      case 'grammar_pronoun':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <circle cx="38" cy="44" r="12" fill="#0284c7" />
            <path d="M22 80 C22 64 54 64 54 80 Z" fill="#0284c7" />
            <circle cx="82" cy="44" r="12" fill="#38bdf8" />
            <path d="M66 80 C66 64 98 64 98 80 Z" fill="#38bdf8" />
            <path d="M52 44 L66 44 M62 39 L67 44 L62 49" stroke="#0369a1" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'grammar_pointer':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <circle cx="84" cy="42" r="16" fill="#38bdf8" />
            <path d="M26 78 L66 48" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
            <polygon points="68,46 54,46 62,58" fill="#0284c7" />
          </svg>
        );
      case 'grammar_scale':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <line x1="60" y1="24" x2="60" y2="92" stroke="#0369a1" strokeWidth="5" strokeLinecap="round" />
            <line x1="40" y1="92" x2="80" y2="92" stroke="#0369a1" strokeWidth="5" strokeLinecap="round" />
            <line x1="26" y1="40" x2="94" y2="40" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" />
            <path d="M20 66 Q30 78 40 66 Z" fill="#38bdf8" />
            <path d="M80 66 Q90 78 100 66 Z" fill="#38bdf8" />
            <line x1="30" y1="40" x2="30" y2="66" stroke="#7dd3fc" strokeWidth="2.5" />
            <line x1="90" y1="40" x2="90" y2="66" stroke="#7dd3fc" strokeWidth="2.5" />
          </svg>
        );
      case 'grammar_syntax':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <rect x="42" y="20" width="36" height="18" rx="5" fill="#0284c7" />
            <line x1="60" y1="38" x2="34" y2="62" stroke="#7dd3fc" strokeWidth="3" />
            <line x1="60" y1="38" x2="86" y2="62" stroke="#7dd3fc" strokeWidth="3" />
            <rect x="16" y="62" width="36" height="18" rx="5" fill="#38bdf8" />
            <rect x="68" y="62" width="36" height="18" rx="5" fill="#0ea5e9" />
            <rect x="68" y="88" width="36" height="14" rx="4" fill="#bae6fd" />
          </svg>
        );
      case 'academic_turats':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#eff6ff" />
            <rect x="28" y="24" width="64" height="72" rx="6" fill="#0369a1" />
            <rect x="34" y="30" width="52" height="60" rx="3" fill="#fef3c7" />
            <line x1="42" y1="44" x2="78" y2="44" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
            <line x1="42" y1="56" x2="78" y2="56" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
            <line x1="48" y1="68" x2="78" y2="68" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );
      case 'academic_phonetics':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <path d="M26 60 Q40 32 52 60 T78 60 T98 60" fill="none" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" />
            <circle cx="38" cy="84" r="6" fill="#38bdf8" />
            <circle cx="60" cy="84" r="6" fill="#0284c7" />
            <circle cx="82" cy="84" r="6" fill="#38bdf8" />
          </svg>
        );
      case 'academic_dictionary':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <rect x="26" y="26" width="54" height="68" rx="6" fill="#0284c7" />
            <rect x="34" y="34" width="38" height="14" rx="3" fill="#ffffff" />
            <circle cx="78" cy="74" r="18" fill="#ffffff" stroke="#0369a1" strokeWidth="4" />
            <line x1="91" y1="87" x2="102" y2="98" stroke="#0369a1" strokeWidth="5" strokeLinecap="round" />
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <rect width="120" height="120" rx="20" fill="#f0f9ff" />
            <polygon
              points="60,22 92,41 92,79 60,98 28,79 28,41"
              fill="#e0f2fe"
              stroke="#0284c7"
              strokeWidth="3"
            />
            <circle cx="60" cy="60" r="16" fill="#0284c7" />
            <circle cx="60" cy="60" r="7" fill="#ffffff" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`${boxSize} rounded-2xl overflow-hidden shrink-0 select-none ${className}`}
      role="img"
      aria-label={label || visualKey}
    >
      {renderSvg()}
    </div>
  );
};
