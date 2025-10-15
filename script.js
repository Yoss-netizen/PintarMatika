document.addEventListener('DOMContentLoaded', () => {
    // URL dasar API backend Anda
    const API_BASE_URL = 'http://localhost:3000/api';

    // Mendapatkan elemen-elemen dari HTML
    const jenjangSection = document.getElementById('pilih-jenjang');
    const dynamicContentArea = document.getElementById('dynamic-content-area');
    const contentTitle = document.getElementById('content-title');
    const contentDisplay = document.getElementById('content-display');
    const materiDisplay = document.getElementById('materi-display');
    const backButton = document.getElementById('back-button');

    // State untuk navigasi
    const navigationStack = [];

    // Fungsi untuk menampilkan atau menyembunyikan section
    const showView = (view) => {
        jenjangSection.classList.add('hidden');
        dynamicContentArea.classList.add('hidden');

        if (view === 'jenjang') {
            jenjangSection.classList.remove('hidden');
        } else {
            dynamicContentArea.classList.remove('hidden');
        }
    };

    // Fungsi untuk mengambil data dari API
    async function fetchData(endpoint) {
        try {
            const response = await fetch(`${API_BASE_URL}/${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Gagal mengambil data:", error);
            contentDisplay.innerHTML = `<p style="text-align:center; color:red;">Gagal memuat data. Pastikan backend berjalan.</p>`;
            return null;
        }
    }

    // Fungsi untuk me-render daftar kelas
    function renderKelas(kelas, jenjang) {
        contentTitle.textContent = `Pilih Kelas untuk Jenjang ${jenjang}`;
        contentDisplay.innerHTML = '';
        materiDisplay.classList.add('hidden');
        contentDisplay.classList.remove('hidden');

        kelas.forEach(k => {
            const card = document.createElement('div');
            card.className = 'content-card';
            card.innerHTML = `<h4>${k.nama}</h4><p>Materi untuk tingkat ${k.jenjang}</p>`;
            card.dataset.id = k.id;
            card.dataset.nama = k.nama;
            card.dataset.type = 'kelas'; // Tandai sebagai 'kelas'
            contentDisplay.appendChild(card);
        });
    }
    
    // Fungsi untuk me-render daftar bab
    function renderBab(bab, namaKelas) {
        contentTitle.textContent = `Pilih Bab untuk ${namaKelas}`;
        contentDisplay.innerHTML = '';
        materiDisplay.classList.add('hidden');
        contentDisplay.classList.remove('hidden');

        bab.forEach(b => {
            const card = document.createElement('div');
            card.className = 'content-card';
            card.innerHTML = `<h4>${b.nama}</h4><p>${b.deskripsi}</p>`;
            card.dataset.id = b.id;
            card.dataset.nama = b.nama;
            card.dataset.type = 'bab'; // Tandai sebagai 'bab'
            contentDisplay.appendChild(card);
        });
    }

    // Fungsi untuk me-render isi materi
    function renderMateri(materi, namaBab) {
        contentTitle.textContent = `Materi: ${namaBab}`;
        contentDisplay.classList.add('hidden');
        materiDisplay.classList.remove('hidden');
        materiDisplay.innerHTML = '';

        materi.forEach(m => {
            const item = document.createElement('div');
            item.className = 'materi-item';
            item.innerHTML = `
                <h3>${m.judul}</h3>
                <p>${m.konten}</p>
            `;
            materiDisplay.appendChild(item);
        });
    }

    // Fungsi utama untuk menangani navigasi
    async function navigate(type, id, name) {
        showView('dynamic'); // Tampilkan area konten dinamis
        backButton.classList.remove('hidden');
        
        let data;
        switch (type) {
            case 'jenjang':
                data = await fetchData(`kelas/${id.toLowerCase()}`);
                if (data) renderKelas(data, id);
                break;
            case 'kelas':
                data = await fetchData(`bab/kelas/${id}`);
                if (data) renderBab(data, name);
                break;
            case 'bab':
                data = await fetchData(`materi/bab/${id}`);
                if (data) renderMateri(data, name);
                break;
        }
    }

    // Event listener untuk tombol jenjang di halaman utama
    jenjangSection.addEventListener('click', (event) => {
        const jenjangCard = event.target.closest('.jenjang-card');
        if (jenjangCard) {
            const jenjang = jenjangCard.dataset.jenjang;
            navigationStack.push({ type: 'jenjang', id: jenjang });
            navigate('jenjang', jenjang);
        }
    });

    // Event listener untuk card kelas atau bab yang dinamis
    contentDisplay.addEventListener('click', (event) => {
        const card = event.target.closest('.content-card');
        if (card) {
            const { id, type, nama } = card.dataset;
            const nextType = (type === 'kelas') ? 'bab' : ''; // Logika sederhana
            
            navigationStack.push({ type, id, name }); // Simpan state saat ini
            
            if (type === 'kelas') {
                navigate('kelas', id, nama);
            } else if (type === 'bab') {
                navigate('bab', id, nama);
            }
        }
    });
    
    // Event listener untuk tombol kembali
    backButton.addEventListener('click', () => {
        navigationStack.pop(); // Hapus state saat ini
        
        if (navigationStack.length === 0) {
            // Kembali ke halaman utama
            showView('jenjang');
            backButton.classList.add('hidden');
            contentTitle.textContent = '';
        } else {
            // Kembali ke state sebelumnya
            const prevState = navigationStack[navigationStack.length-1];
            navigate(prevState.type, prevState.id, prevState.name);
        }
    });
});
