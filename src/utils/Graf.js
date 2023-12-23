import Class from "@/app/models/Class";

class Graf {
  constructor(res) {
    this.res = res;
    this.dugumler = new Map();

    this.res.forEach(givenSubject => {
      this.dugumEkle(givenSubject.code);
    });

    this.res.forEach(givenSubject => {
      this.res.forEach(otherGivenSubject => {
        if (
          givenSubject !== otherGivenSubject &&
          this.zamanCakisiyor(givenSubject, otherGivenSubject)
        ) {
          this.kenarEkle(givenSubject.code, otherGivenSubject.code);
        }
      });
    });

    // Grafı renklendir
    this.grafRenklendir();

  }

  zamanCakisiyor(ders1, ders2) {
    return (
      ders1.day === ders2.day &&
      (
        (ders1.startTime >= ders2.startTime && ders1.startTime < ders2.endTime) ||
        (ders1.endTime > ders2.startTime && ders1.endTime <= ders2.endTime)
      )
    );
  }

  //foreachla givensubject gez
  //key için  diğer keyleri gez

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
    const renkler = [...new Set(Class.map(Class => Class.code))];
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

  renklendirilmisGrafiGetir() {
    const dugumler = [...this.dugumler.entries()];
    const renklendirilmisGraf = [];

    for (const [dugum, veri] of dugumler) {
      renklendirilmisGraf.push({
        dugum,
        renk: veri.renk,
        data: veri.data,
      });
    }

    return renklendirilmisGraf;
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
