import { EducationLevel, LevelId } from '../types/curriculum';
import { sdTopics } from './sdCurriculum';
import { smpTopics } from './smpCurriculum';
import { smaTopics } from './smaCurriculum';
import { ptTopics } from './ptCurriculum';

export const educationLevels: EducationLevel[] = [
  {
    id: 'sd',
    shortTitle: 'SD',
    fullTitle: 'Sekolah Dasar',
    focusTitle: 'Pengenalan Visual & Suara',
    description:
      'Mengenal huruf hijaiyah, bunyi harakat, angka, warna, hewan, buah, keluarga, serta sapaan sehari-hari dengan kartu bergambar dan audio.',
    methodSummary: 'Kartu bergambar, audio pelafalan, dan susun huruf',
    heroImage: '/src/assets/images/jenjang_sd_1794961337671.jpg',
    topics: sdTopics,
  },
  {
    id: 'smp',
    shortTitle: 'SMP',
    fullTitle: 'Sekolah Menengah Pertama',
    focusTitle: 'Kosakata & Kalimat Dasar',
    description:
      'Pengembangan mufradat tematik, kata ganti, kata tunjuk, pembagian kata, fi‘il tiga masa, mubtada-khabar, hingga membaca dan menyusun kalimat.',
    methodSummary: 'Mufradat terstruktur, dialog, dan susun kalimat',
    heroImage: '/src/assets/images/jenjang_smp_1794961338780.jpg',
    topics: smpTopics,
  },
  {
    id: 'sma',
    shortTitle: 'SMA',
    fullTitle: 'Sekolah Menengah Atas',
    focusTitle: 'Tata Bahasa & Keterampilan',
    description:
      'Dasar ilmu nahwu dan sharaf, i‘rab dasar, wazan tashrif, isim fa‘il-maf‘ul, balaghah dasar, serta empat keterampilan berbahasa Arab.',
    methodSummary: 'Kaidah nahwu-sharaf, qira‘ah, istima‘, dan tarjamah',
    heroImage: '/src/assets/images/jenjang_sma_1794961339297.jpg',
    topics: smaTopics,
  },
  {
    id: 'pt',
    shortTitle: 'Perguruan Tinggi',
    fullTitle: 'Perguruan Tinggi',
    focusTitle: 'Akademis & Mendalam',
    description:
      'Nahwu dan sharaf lanjutan, balaghah lengkap, ilmu ashwat dan dalalah, penggunaan kamus Arab, kajian kitab turats, hingga karya ilmiah.',
    methodSummary: 'Analisis sintaksis, kajian teks turats, dan riset ilmiah',
    heroImage: '/src/assets/images/jenjang_pt_1794961339944.jpg',
    topics: ptTopics,
  },
];

export function getLevelById(id: LevelId): EducationLevel {
  return educationLevels.find((lvl) => lvl.id === id) || educationLevels[0];
}
