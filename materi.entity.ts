export class Kelas {
    id: number;
    nama: string;
    jenjang: 'SD' | 'SMP' | 'SMA';
}

export class Bab {
    id: number;
    nama: string;
    kelasId: number;
    deskripsi: string;
}

export class Materi {
    id: number;
    babId: number; // Menghubungkan ke Bab
    judul: string; // Misal: "1. Penjelasan Konsep"
    tipe: 'penjelasan' | 'contoh_soal' | 'rumus';
    konten: string; // Isi materi dalam format teks atau markdown
}

// src/app.service.ts

import { Injectable } from '@nestjs/common';
import { Kelas } from './kelas.entity';
import { Bab } from './bab.entity';
import { Materi } from './materi.entity';

@Injectable()
export class AppService {
  // =======================================================
  // ==                "DATABASE" STATIS                  ==
  // =======================================================

  private readonly semuaKelas: Kelas[] = [
    { id: 5, nama: 'Kelas 5', jenjang: 'SD' },
    { id: 8, nama: 'Kelas 8', jenjang: 'SMP' },
    { id: 11, nama: 'Kelas 11', jenjang: 'SMA' },
  ];

  private readonly semuaBab: Bab[] = [
    // SD Kelas 5
    { id: 101, kelasId: 5, nama: 'Pecahan', deskripsi: 'Mengenal dan mengoperasikan bilangan pecahan.' },
    { id: 102, kelasId: 5, nama: 'Skala dan Perbandingan', deskripsi: 'Memahami skala pada peta dan perbandingan senilai.' },

    // SMP Kelas 8
    { id: 201, kelasId: 8, nama: 'Teorema Pythagoras', deskripsi: 'Hubungan antar sisi pada segitiga siku-siku.' },
    { id: 202, kelasId: 8, nama: 'Lingkaran', deskripsi: 'Unsur, luas, dan keliling lingkaran.' },

    // SMA Kelas 11
    { id: 301, kelasId: 11, nama: 'Turunan Fungsi (Diferensial)', deskripsi: 'Konsep dasar dan aturan turunan fungsi aljabar.' },
    { id: 302, kelasId: 11, nama: 'Limit Fungsi Aljabar', deskripsi: 'Memahami konsep limit dan cara menyelesaikannya.' },
  ];

  private readonly semuaMateri: Materi[] = [
    // --- Materi Teorema Pythagoras (Bab ID: 201) ---
    {
      id: 1,
      babId: 201,
      judul: '1. Penjelasan Konsep Pythagoras',
      tipe: 'penjelasan',
      konten: `Teorema Pythagoras adalah sebuah aturan dalam matematika yang berlaku khusus untuk **segitiga siku-siku**. Teorema ini menyatakan bahwa kuadrat dari sisi miring (hipotenusa) sama dengan jumlah kuadrat dari kedua sisi penyikunya.\n\nJika sebuah segitiga siku-siku memiliki sisi penyiku **a** dan **b**, serta sisi miring **c**, maka rumusnya adalah:\n\n**a² + b² = c²**\n\nSisi miring (c) adalah sisi terpanjang dan selalu berada di seberang sudut siku-siku (90°).`
    },
    {
      id: 2,
      babId: 201,
      judul: '2. Contoh Soal & Pembahasan',
      tipe: 'contoh_soal',
      konten: `**Soal:**\nSebuah segitiga siku-siku memiliki panjang sisi penyiku 8 cm dan 6 cm. Berapakah panjang sisi miringnya?\n\n**Pembahasan:**\n1. **Identifikasi:** Kita tahu a = 6 cm dan b = 8 cm. Kita mencari c.\n2. **Gunakan Rumus:** a² + b² = c²\n3. **Substitusi Nilai:** 6² + 8² = c²\n4. **Hitung Kuadrat:** 36 + 64 = c²\n5. **Jumlahkan:** 100 = c²\n6. **Akar Kuadrat:** c = √100\n7. **Hasil:** c = 10 cm.\n\nJadi, panjang sisi miringnya adalah **10 cm**.`
    },
    // --- Materi Turunan Fungsi (Bab ID: 301) ---
    {
        id: 3,
        babId: 301,
        judul: '1. Aturan Dasar Turunan (Power Rule)',
        tipe: 'rumus',
        konten: `Aturan paling dasar untuk turunan fungsi aljabar adalah Aturan Pangkat (Power Rule).\n\nJika sebuah fungsi adalah **f(x) = axⁿ**, maka turunannya, yang ditulis sebagai **f'(x)**, adalah:\n\n**f'(x) = n · axⁿ⁻¹**\n\n**Artinya:**\n1. Kalikan pangkat **n** ke depan sebagai koefisien.\n2. Kurangi pangkat asli **n** dengan 1.`
    },
    {
        id: 4,
        babId: 301,
        judul: '2. Contoh Soal Turunan',
        tipe: 'contoh_soal',
        konten: `**Soal 1:**\nTentukan turunan dari f(x) = 4x³.\n\n**Pembahasan:**\n- a = 4, n = 3\n- f'(x) = 3 · 4x³⁻¹\n- f'(x) = 12x²\n\n**Soal 2:**\nTentukan turunan dari g(x) = 5x² + 3x.\n\n**Pembahasan:**\nTurunkan setiap suku secara terpisah.\n- Turunan dari 5x² adalah 2 · 5x²⁻¹ = 10x\n- Turunan dari 3x (atau 3x¹) adalah 1 · 3x¹⁻¹ = 3x⁰ = 3\n- Jadi, g'(x) = 10x + 3`
    },
  ];

  // =======================================================
  // ==                   FUNGSI LOGIKA                   ==
  // =======================================================

  findKelasByJenjang(jenjang: 'SD' | 'SMP' | 'SMA'): Kelas[] {
    return this.semuaKelas.filter(k => k.jenjang === jenjang);
  }

  findBabByKelasId(kelasId: number): Bab[] {
    return this.semuaBab.filter(b => b.kelasId === kelasId);
  }

  findMateriByBabId(babId: number): Materi[] {
    return this.semuaMateri.filter(m => m.babId === babId);
  }
}

// src/app.controller.ts

import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';
import { Bab } from './bab.entity';
import { Kelas } from './kelas.entity';
import { Materi } from './materi.entity';

@Controller('api') // Prefix untuk semua rute di controller ini
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('kelas/:jenjang')
  getKelasByJenjang(@Param('jenjang') jenjang: string): Kelas[] {
    const jenjangUpper = jenjang.toUpperCase();
    if (!['SD', 'SMP', 'SMA'].includes(jenjangUpper)) {
      throw new NotFoundException('Jenjang tidak valid. Gunakan: sd, smp, atau sma.');
    }
    return this.appService.findKelasByJenjang(jenjangUpper as 'SD' | 'SMP' | 'SMA');
  }

  @Get('bab/kelas/:kelasId')
  getBabByKelasId(@Param('kelasId') kelasId: string): Bab[] {
    const id = parseInt(kelasId, 10);
    const hasil = this.appService.findBabByKelasId(id);
    if (hasil.length === 0) {
      throw new NotFoundException(`Tidak ada bab ditemukan untuk kelas ID: ${id}`);
    }
    return hasil;
  }
  
  // ENDPOINT BARU UNTUK MENGAMBIL MATERI
  @Get('materi/bab/:babId')
  getMateriByBabId(@Param('babId') babId: string): Materi[] {
    const id = parseInt(babId, 10);
    const hasil = this.appService.findMateriByBabId(id);
    if (hasil.length === 0) {
      throw new NotFoundException(`Tidak ada materi ditemukan untuk bab ID: ${id}`);
    }
    return hasil;
  }
}
