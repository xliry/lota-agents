export interface SchoolInfo {
  il: string;
  ilce: string;
  okulAdi: string;
  mudur: string;
  mudurYrd: string;
}

export type Gorev =
  | 'Okul Müdürü'
  | 'Müdür Yardımcısı'
  | 'Öğretmen'
  | 'Ücretli Usta Öğretici'
  | 'Koordinatör Öğretmen'
  | 'Hizmetli-Aşçı'
  | 'Memur';

export type KadroDurumu = 'Kadrolu' | 'SGKlı';

export type VergiDilimi = 0 | 15 | 20 | 27 | 35 | 40 | -1; // -1 = Muafiyetli

export interface Personel {
  id: string;
  adSoyad: string;
  gorev: Gorev;
  kadroDurumu: KadroDurumu;
  aylikDersSaati: number;
  koordinatorlukSaati: number;
  vergiDilimi: VergiDilimi;
  raporIzinGun: number;
  tcKimlikNo: string;
  iban: string;
}

export interface BordroHesap {
  personelId: string;
  payliBudge: number;
  kazanc: number;
  isverenSgkPayi: number;
  isverenIssizlikPayi: number;
  brutTutar: number;
  gelirVergisiMatrahi: number;
  gelirVergisi: number;
  damgaVergisi: number;
  sgkIsciPayi: number;
  issizlikIsci: number;
  raporIzinKesinti: number;
  limitUstuKesinti: number;
  netUcret: number;
  temelGidereAktarilan: number;
}

export interface GiderKalemi {
  ad: string;
  oran: number;
  tutar: number;
}

export interface TemelGiderKalem {
  aciklama: string;
  tutar: number;
  tarih: string;
}

// Per-month data stored inside each period
export interface AyVeri {
  isGunu: number;
  personelDevam: { [personelId: string]: { [gun: number]: 'X' | 'I' | 'R' | '' } };
  harcamalar: TemelGiderKalem[];
  resmiTatiller: { [tarih: string]: string };
}

// Per-period (1st, 2nd, summer) data
export interface DonemVeri {
  katsayi: number;
  // Period-locked parameters (set at creation, read-only after)
  brutAsagariUcret?: number;
  enYuksekMemurAyligi?: number;
  gunduzOgretimiGostergesi?: number;
  yemekVerilecekMi?: boolean;
  gunlukEtkinlikSaati?: number;
  aylar: { [ayAdi: string]: AyVeri };
}

export type DonemId = '1' | '2' | 'yaz';

// Global settings shared across the entire education year
export interface GlobalAyarlar {
  enYuksekDMBrutAylik: number;
  brutAsgariUcret: number;
  gunduzOgretimiGostergesi: number;
  yemekVar: boolean;
  gunlukEtkinlikSaat: number;
  grupSayisi: number;
  toplamOgrenciSayisi: number;
  yuzElliIndirimliOgrenciSayisi: number;
  ucretsizOgrenciSayisi: number;
  belirlenenSaatUcreti: number;
}

// PeriodSettings is kept for calculation compatibility
export interface PeriodSettings {
  katsayi: number;
  enYuksekDMBrutAylik: number;
  brutAsgariUcret: number;
  gunduzOgretimiGostergesi: number;
  yemekVar: boolean;
  gunlukEtkinlikSaat: number;
  isGunuSayisi: number;
  grupSayisi: number;
  toplamOgrenciSayisi: number;
  yuzElliIndirimliOgrenciSayisi: number;
  ucretsizOgrenciSayisi: number;
  belirlenenSaatUcreti: number;
}

export interface AppState {
  egitimYili: string;       // "2025-2026"
  aktifDonem: DonemId;      // "1" | "2" | "yaz"
  aktifAy: string;          // "eylul", "ekim", etc.
  donemler: {
    '1': DonemVeri;
    '2': DonemVeri;
    'yaz': DonemVeri;
  };
  okulBilgileri: SchoolInfo;
  personelListesi: Personel[];
  globalAyarlar: GlobalAyarlar;
}

// Archive uses same key format but stores AppState snapshots
export interface DonemArchive {
  [donemKey: string]: AppState;
}

// Education year archives — keyed by "YYYY-YYYY" e.g. "2025-2026"
export interface YillarData {
  [egitimYili: string]: AppState;
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const AYLAR = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

// Mapping from Turkish month name (slugified) to display name
export const AY_ADLARI: { [key: string]: string } = {
  ocak: 'Ocak',
  subat: 'Şubat',
  mart: 'Mart',
  nisan: 'Nisan',
  mayis: 'Mayıs',
  haziran: 'Haziran',
  temmuz: 'Temmuz',
  agustos: 'Ağustos',
  eylul: 'Eylül',
  ekim: 'Ekim',
  kasim: 'Kasım',
  aralik: 'Aralık',
};

// Mapping from month slug to month number (1-12)
export const AY_NO: { [key: string]: number } = {
  ocak: 1, subat: 2, mart: 3, nisan: 4, mayis: 5, haziran: 6,
  temmuz: 7, agustos: 8, eylul: 9, ekim: 10, kasim: 11, aralik: 12,
};

// Months that belong to each period
export const DONEM_AYLARI: { [key in DonemId]: string[] } = {
  '1': ['eylul', 'ekim', 'kasim', 'aralik', 'ocak'],
  '2': ['subat', 'mart', 'nisan', 'mayis', 'haziran'],
  'yaz': ['temmuz', 'agustos'],
};

export const DONEM_ADLARI: { [key in DonemId]: string } = {
  '1': '1. Dönem',
  '2': '2. Dönem',
  'yaz': 'Yaz Dönemi',
};

export const GOREVLER: Gorev[] = [
  'Okul Müdürü',
  'Müdür Yardımcısı',
  'Öğretmen',
  'Ücretli Usta Öğretici',
  'Koordinatör Öğretmen',
  'Hizmetli-Aşçı',
  'Memur',
];

export const VERGI_DILIMLERI: { label: string; value: VergiDilimi }[] = [
  { label: '%0', value: 0 },
  { label: '%15', value: 15 },
  { label: '%20', value: 20 },
  { label: '%27', value: 27 },
  { label: '%35', value: 35 },
  { label: '%40', value: 40 },
  { label: 'Muafiyetli', value: -1 },
];

export const AYLIK_IS_GUNU: { [ay: number]: number } = {
  1: 22, 2: 20, 3: 21, 4: 22, 5: 21, 6: 20,
  7: 23, 8: 22, 9: 20, 10: 23, 11: 20, 12: 21,
};

// ─── Defaults ─────────────────────────────────────────────────────────────────

export const DEFAULT_SCHOOL_INFO: SchoolInfo = {
  il: '',
  ilce: '',
  okulAdi: '',
  mudur: '',
  mudurYrd: '',
};

export const DEFAULT_GLOBAL_AYARLAR: GlobalAyarlar = {
  enYuksekDMBrutAylik: 13184.7745,
  brutAsgariUcret: 13184.77,
  gunduzOgretimiGostergesi: 140,
  yemekVar: false,
  gunlukEtkinlikSaat: 2,
  grupSayisi: 1,
  toplamOgrenciSayisi: 0,
  yuzElliIndirimliOgrenciSayisi: 0,
  ucretsizOgrenciSayisi: 0,
  belirlenenSaatUcreti: 0,
};

export const DEFAULT_AY_VERI: AyVeri = {
  isGunu: 20,
  personelDevam: {},
  harcamalar: [],
  resmiTatiller: {},
};

function buildEmptyDonem(katsayi: number, aylar: string[]): DonemVeri {
  const aylarObj: { [key: string]: AyVeri } = {};
  for (const ay of aylar) {
    aylarObj[ay] = { ...DEFAULT_AY_VERI };
  }
  return { katsayi, aylar: aylarObj };
}

export const DEFAULT_STATE: AppState = {
  egitimYili: '2025-2026',
  aktifDonem: '1',
  aktifAy: 'eylul',
  donemler: {
    '1': buildEmptyDonem(1.387871, DONEM_AYLARI['1']),
    '2': buildEmptyDonem(1.450000, DONEM_AYLARI['2']),
    'yaz': buildEmptyDonem(1.450000, DONEM_AYLARI['yaz']),
  },
  okulBilgileri: DEFAULT_SCHOOL_INFO,
  personelListesi: [],
  globalAyarlar: DEFAULT_GLOBAL_AYARLAR,
};

// Helper to build PeriodSettings from AppState for calculation compatibility.
// Period-specific DonemVeri params take priority over globalAyarlar fallbacks.
export function buildPeriodSettings(state: AppState, donemId?: DonemId): PeriodSettings {
  const id = donemId ?? state.aktifDonem;
  const donem = state.donemler[id];
  const ay = donem?.aylar[state.aktifAy] ?? DEFAULT_AY_VERI;
  return {
    katsayi: donem?.katsayi ?? 1.387871,
    enYuksekDMBrutAylik: donem?.enYuksekMemurAyligi ?? state.globalAyarlar.enYuksekDMBrutAylik,
    brutAsgariUcret: donem?.brutAsagariUcret ?? state.globalAyarlar.brutAsgariUcret,
    gunduzOgretimiGostergesi: donem?.gunduzOgretimiGostergesi ?? state.globalAyarlar.gunduzOgretimiGostergesi,
    yemekVar: donem?.yemekVerilecekMi ?? state.globalAyarlar.yemekVar,
    gunlukEtkinlikSaat: donem?.gunlukEtkinlikSaati ?? state.globalAyarlar.gunlukEtkinlikSaat,
    isGunuSayisi: ay.isGunu,
    grupSayisi: state.globalAyarlar.grupSayisi,
    toplamOgrenciSayisi: state.globalAyarlar.toplamOgrenciSayisi,
    yuzElliIndirimliOgrenciSayisi: state.globalAyarlar.yuzElliIndirimliOgrenciSayisi,
    ucretsizOgrenciSayisi: state.globalAyarlar.ucretsizOgrenciSayisi,
    belirlenenSaatUcreti: state.globalAyarlar.belirlenenSaatUcreti,
  };
}

// Helper to get active month's year (for calendar display)
export function getAktifAyYil(egitimYili: string, aktifDonem: DonemId, aktifAy: string): { ay: number; yil: number } {
  const ayNo = AY_NO[aktifAy] ?? 9;
  const [startYilStr] = egitimYili.split('-');
  const startYil = parseInt(startYilStr, 10);
  // 1st term: Sep-Jan → Sep-Dec are startYil, Jan is startYil+1
  // 2nd term: Feb-Jun → all startYil+1
  // Summer: Jul-Aug → startYil+1
  let yil = startYil;
  if (aktifDonem === '1') {
    if (ayNo < 9) yil = startYil + 1; // January
  } else {
    yil = startYil + 1;
  }
  return { ay: ayNo, yil };
}
