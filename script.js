// Menunggu hingga seluruh halaman HTML selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    
    console.log('Selamat datang di PintarMatika!');

    // Mendapatkan semua tombol pilihan jenjang
    const tombolJenjang = document.querySelectorAll('.btn');

    // Menambahkan event listener untuk setiap tombol
    tombolJenjang.forEach(tombol => {
        tombol.addEventListener('click', (event) => {
            // Mencegah link berpindah halaman (untuk sementara)
            event.preventDefault(); 
            
            // Mengambil nama jenjang dari atribut data-jenjang
            const jenjang = tombol.getAttribute('data-jenjang');
            
            // Menampilkan pesan (ini bisa diganti dengan navigasi ke halaman sebenarnya)
            alert(`Anda memilih jenjang ${jenjang}. Fitur ini akan segera tersedia!`);
            
            // Contoh di masa depan:
            // window.location.href = `/${jenjang.toLowerCase()}.html`;
        });
    });

});
