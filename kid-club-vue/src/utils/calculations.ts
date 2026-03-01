import type { PeriodSettings, Personel, Gorev, BordroHesap } from '@/types';

// ─── Ücret Hesaplama (Madde 14) ───────────────────────────────────────────────

export function hesaplaEnAzSaatUcreti(period: PeriodSettings): number {
  return period.gunduzOgretimiGostergesi * period.katsayi * (1 / 6);
}

export function hesaplaEnCokSaatUcreti(period: PeriodSettings): number {
  if (period.yemekVar) {
    return period.gunduzOgretimiGostergesi * period.katsayi * (1 / 3);
  }
  return period.gunduzOgretimiGostergesi * period.katsayi * (1 / 4);
}

export function hesaplaUcretOdeyenOgrenciSayisi(period: PeriodSettings): number {
  return (
    period.toplamOgrenciSayisi -
    period.ucretsizOgrenciSayisi -
    period.yuzElliIndirimliOgrenciSayisi * 0.5
  );
}

export function hesaplaAylikToplamButce(period: PeriodSettings): number {
  const ucretOdeyenOgrenci = hesaplaUcretOdeyenOgrenciSayisi(period);
  return (
    period.belirlenenSaatUcreti *
    period.gunlukEtkinlikSaat *
    period.isGunuSayisi *
    ucretOdeyenOgrenci
  );
}

// ─── Bütçe Dağılım Oranları (Madde 16) ───────────────────────────────────────

// Percentages per task spec (Madde 16):
// Temel Giderler %33, Müdür %7, Müdür Yrd %5, Öğretmen/Usta/Krd %49,
// Yazışma-Muhasebe %2, Temizlik/Bakım/Beslenme %4
export function hesaplaGiderOranlari(_yemekVar: boolean): { [key: string]: number } {
  return {
    temelGider: 0.33,
    ogretmenUstaKoordinatör: 0.49,
    mudur: 0.07,
    mudurYrd: 0.05,
    muhasebe: 0.02,
    temizlik: 0.04,
  };
}

// ─── Brüt Ücret Üst Limitleri (Madde 16/4) ───────────────────────────────────

export function hesaplaBrutTavanUcret(
  gorev: Gorev,
  enYuksekDMBrutAylik: number,
  _kadrolu: boolean
): number {
  switch (gorev) {
    case 'Okul Müdürü':
      return enYuksekDMBrutAylik * 2.75;
    case 'Koordinatör Öğretmen':
      return enYuksekDMBrutAylik * 2.75;
    case 'Müdür Yardımcısı':
      return enYuksekDMBrutAylik * 2.5;
    case 'Öğretmen':
      return enYuksekDMBrutAylik * 3.0;
    case 'Ücretli Usta Öğretici':
      return enYuksekDMBrutAylik * 4.0;
    case 'Hizmetli-Aşçı':
      return enYuksekDMBrutAylik * 2.0;
    case 'Memur':
      return enYuksekDMBrutAylik * 2.0;
    default:
      return enYuksekDMBrutAylik * 2.0;
  }
}

// ─── Görev → Pay Oranı ────────────────────────────────────────────────────────

export function gorevPayOrani(gorev: Gorev, oranlar: { [key: string]: number }): number {
  switch (gorev) {
    case 'Okul Müdürü':
      return oranlar['mudur'] ?? 0;
    case 'Müdür Yardımcısı':
      return oranlar['mudurYrd'] ?? 0;
    case 'Öğretmen':
      return oranlar['ogretmenUstaKoordinatör'] ?? 0;
    case 'Ücretli Usta Öğretici':
      return oranlar['ogretmenUstaKoordinatör'] ?? 0;
    case 'Koordinatör Öğretmen':
      return oranlar['ogretmenUstaKoordinatör'] ?? 0;
    case 'Hizmetli-Aşçı':
      return oranlar['temizlik'] ?? 0;
    case 'Memur':
      return oranlar['muhasebe'] ?? 0;
    default:
      return 0;
  }
}

// ─── Vergi Hesaplama ──────────────────────────────────────────────────────────

export function hesaplaDamgaVergisi(brutUcret: number): number {
  return brutUcret * 0.00759; // Binde 7.59
}

// ─── Personel Bordro Hesaplama ────────────────────────────────────────────────

export function hesaplaPersonelBordro(
  personel: Personel,
  period: PeriodSettings,
  toplamButce: number,
  oranlar: { [key: string]: number }
): BordroHesap {
  const payliBudge = toplamButce * gorevPayOrani(personel.gorev, oranlar);

  const brutTavan = hesaplaBrutTavanUcret(
    personel.gorev,
    period.enYuksekDMBrutAylik,
    personel.kadroDurumu === 'Kadrolu'
  );

  let kazanc = payliBudge / 1.225;

  let limitUstuKesinti = 0;
  if (kazanc > brutTavan) {
    limitUstuKesinti = kazanc - brutTavan;
    kazanc = brutTavan;
  }

  const isverenSgkPayi = kazanc * 0.205;
  const isverenIssizlikPayi = kazanc * 0.02;
  const brutTutar = kazanc + isverenSgkPayi + isverenIssizlikPayi;

  const gunlukUcret = kazanc / period.isGunuSayisi;
  const raporIzinKesinti = gunlukUcret * personel.raporIzinGun;
  const netKazanc = kazanc - raporIzinKesinti;

  const sgkIsciPayi = netKazanc * 0.14;
  const issizlikIsci = netKazanc * 0.01;
  const gelirVergisiMatrahi = netKazanc - sgkIsciPayi - issizlikIsci;

  const gelirVergisi =
    personel.vergiDilimi === -1 ? 0 : gelirVergisiMatrahi * (personel.vergiDilimi / 100);
  const damgaVergisi = hesaplaDamgaVergisi(netKazanc);

  const netUcret =
    netKazanc - sgkIsciPayi - issizlikIsci - gelirVergisi - damgaVergisi;

  const temelGidereAktarilan = limitUstuKesinti + isverenSgkPayi + isverenIssizlikPayi;

  return {
    personelId: personel.id,
    payliBudge,
    kazanc,
    isverenSgkPayi,
    isverenIssizlikPayi,
    brutTutar,
    gelirVergisiMatrahi,
    gelirVergisi,
    damgaVergisi,
    sgkIsciPayi,
    issizlikIsci,
    raporIzinKesinti,
    limitUstuKesinti,
    netUcret,
    temelGidereAktarilan,
  };
}

// ─── Tüm Personel Bordro ─────────────────────────────────────────────────────

export function hesaplaTumPersonelBordro(
  personeller: Personel[],
  period: PeriodSettings
): BordroHesap[] {
  const toplamButce = hesaplaAylikToplamButce(period);
  const oranlar = hesaplaGiderOranlari(period.yemekVar);
  return personeller.map((p) => hesaplaPersonelBordro(p, period, toplamButce, oranlar));
}

// ─── Para Formatı ─────────────────────────────────────────────────────────────

export function formatPara(tutar: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2,
  }).format(tutar);
}

export function formatSayi(sayi: number, basamak = 2): string {
  return new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: basamak,
    maximumFractionDigits: basamak,
  }).format(sayi);
}
