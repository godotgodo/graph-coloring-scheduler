class Graf {
  constructor(classes) {
    this.classes = classes;
    this.dugumler = new Map();
  }

  dugumEkle(etiket) {
    this.dugumler.set(etiket, { komsular: [], renk: null, derece: 0 });
  }

  kenarEkle(dugum1, dugum2) {
    this.dugumler.get(dugum1).komsular.push(dugum2);
    this.dugumler.get(dugum2).komsular.push(dugum1);
    this.dugumler.get(dugum1).derece++;
    this.dugumler.get(dugum2).derece++;
  }

  grafRenklendir() {
    const renkler = this.classes;
    const ziyaretEdilenDugumler = new Set();

    // Dereceleri yüksekten düşüğe sırala
    const siraliDugumler = [...this.dugumler.keys()].sort(
      (a, b) => this.dugumler.get(b).derece - this.dugumler.get(a).derece
    );

    for (const dugum of siraliDugumler) {
      if (!ziyaretEdilenDugumler.has(dugum)) {
        this.bfsAlgoritmasi(dugum, renkler, ziyaretEdilenDugumler);
      }
    }
  }

  bfsAlgoritmasi(baslangicDugumu, renkler, ziyaretEdilenDugumler) {
    const kuyruk = [baslangicDugumu];
    const ziyaretEdilen = new Set();

    while (kuyruk.length > 0) {
      const mevcutDugum = kuyruk.shift();

      if (!ziyaretEdilen.has(mevcutDugum)) {
        const komsular = this.dugumler.get(mevcutDugum).komsular;
        const kullanilanRenkler = new Set(
          komsular.map((komsu) => this.dugumler.get(komsu).renk)
        );

        for (const renk of renkler) {
          if (!kullanilanRenkler.has(renk)) {
            this.dugumler.get(mevcutDugum).renk = renk;
            break;
          }
        }

        ziyaretEdilen.add(mevcutDugum);
        ziyaretEdilenDugumler.add(mevcutDugum);

        kuyruk.push(...komsular.filter((komsu) => !ziyaretEdilen.has(komsu)));
      }
    }
  }

  renklendirilmisGrafiYazdir() {
    for (const [dugum, veri] of this.dugumler) {
      console.log(`${dugum} -> Renk: ${veri.renk}`);
    }
  }
}

// // Örnek kullanım
// const graf = new Graf();

// graf.dugumEkle("A");
// graf.dugumEkle("B");
// graf.dugumEkle("C");
// graf.dugumEkle("D");
// graf.dugumEkle("F");

// graf.kenarEkle("A", "B");
// graf.kenarEkle("B", "C");
// graf.kenarEkle("C", "D");
// graf.kenarEkle("D", "A");
// graf.kenarEkle("F", "A");

// graf.grafRenklendir();
// graf.renklendirilmisGrafiYazdir();

export default Graf;
