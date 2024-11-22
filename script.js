// Data gambar slider untuk tiap kamar
const roomImages = {
  "Nomor 101": ["gambar/gambar1.jpeg", "gambar/gambar1.1.jpeg"],
  "Nomor 102": ["gambar/gambar2.jpeg", "gambar/gambar2.1.jpeg"],
  "Nomor 103": ["gambar/gambar3.jpeg", "gambar/gambar3.1.jpeg"],
  "Nomor 104": ["gambar/gambar4.jpeg", "gambar/gambar4.1.jpeg"],
  "Nomor 105": ["gambar/gambar5.jpeg", "gambar/gambar5.1.jpeg"],
  "Nomor 106": ["gambar/gambar6.jpeg", "gambar/gambar6.1.jpeg"],
};

// Variabel indeks untuk gambar slider
let currentImageIndex = 0;

// Fungsi untuk membuka modal detail
function showDetail(title, description) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalImage = document.getElementById("modal-image");

  // Set modal content
  modalTitle.textContent = title;
  modalDescription.textContent = description;

  // Set initial image and reset index
  currentImageIndex = 0;
  modalImage.src = roomImages[title][currentImageIndex];

  // Display modal
  modal.style.display = "flex";
  modal.classList.add("fade-in");
  setTimeout(() => {
    modal.classList.remove("fade-in");
  }, 300); // Hapus efek fade-in setelah muncul
}

// Fungsi untuk menutup modal
function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("fade-out");

  // Tambahkan delay untuk efek fade-out sebelum modal hilang
  setTimeout(() => {
    modal.style.display = "none";
    modal.classList.remove("fade-out");
  });
}

// Fungsi navigasi slider
function nextImage() {
  const modalImage = document.getElementById("modal-image");
  const roomTitle = document.getElementById("modal-title").textContent;

  if (roomImages[roomTitle]) {
    // Pastikan gambar tersedia untuk kamar ini
    currentImageIndex = (currentImageIndex + 1) % roomImages[roomTitle].length;
    modalImage.src = roomImages[roomTitle][currentImageIndex];
  } else {
    console.error("No images found for:", roomTitle);
  }
}

function prevImage() {
  const modalImage = document.getElementById("modal-image");
  const roomTitle = document.getElementById("modal-title").textContent;

  if (roomImages[roomTitle]) {
    // Pastikan gambar tersedia untuk kamar ini
    currentImageIndex =
      (currentImageIndex - 1 + roomImages[roomTitle].length) %
      roomImages[roomTitle].length;
    modalImage.src = roomImages[roomTitle][currentImageIndex];
  } else {
    console.error("No images found for:", roomTitle);
  }
}

// Fungsi untuk membuka form pemesanan
function openBookingForm(roomName, price) {
  const bookingModal = document.getElementById("booking-modal");
  bookingModal.style.display = "flex";

  document.getElementById("room-name").value = roomName;

  // Reset form ketika dibuka
  document.getElementById("bookingForm").reset();
  document.getElementById("checkout-date").style.display = "none";
  document.getElementById("checkout-date").disabled = true;
  document.getElementById("checkout-label").style.display = "none";
  document.getElementById("total-price").value = price;
  document.getElementById("payment-amount").value = price;
}

// Fungsi untuk menutup modal pemesanan
function closeBookingModal() {
  const bookingModal = document.getElementById("booking-modal");
  bookingModal.style.display = "none";
}

// Set Tanggal Keluar otomatis berdasarkan Tanggal Masuk
function setCheckoutDate() {
  const checkinDate = document.getElementById("checkin-date").value;
  if (checkinDate) {
    const checkoutDate = new Date(checkinDate);
    checkoutDate.setDate(checkoutDate.getDate() + 31);

    // Tampilkan input Tanggal Keluar
    const formattedCheckoutDate = checkoutDate.toISOString().split("T")[0];
    document.getElementById("checkout-date").value = formattedCheckoutDate;
    document.getElementById("checkout-date").style.display = "block";
    document.getElementById("checkout-label").style.display = "block";
  }
}

// Tangani tombol "Pesan Sekarang"
document
  .getElementById("bookingForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah pengiriman form secara default

    // Ambil data dari form
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const checkinDate = document.getElementById("checkin-date").value;
    const checkoutDate = document.getElementById("checkout-date").value;
    const paymentAmount = document
      .getElementById("payment-amount")
      .value.trim();
    const roomName = document.getElementById("room-name").value.trim();

    // Validasi input
    if (
      !name ||
      !phone ||
      !checkinDate ||
      !checkoutDate ||
      !paymentAmount ||
      !roomName
    ) {
      alert("Mohon lengkapi semua data sebelum memesan!");
      return;
    }

    // Nomor WhatsApp tujuan
    const targetNumber = "6281265557216"; // Ganti dengan nomor WhatsApp tujuan Anda

    // Format pesan WhatsApp
    const message = `Halo, saya ingin memesan kamar dengan rincian berikut:
- Nomor Kamar: ${roomName}
- Nama: ${name}
- No. HP: ${phone}
- Tanggal Masuk: ${checkinDate}
- Tanggal Keluar: ${checkoutDate}
- Jumlah Pembayaran: ${paymentAmount}

Terima kasih.`;

    // Bangun tautan WhatsApp
    const whatsappURL = `https://wa.me/${targetNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Alihkan ke WhatsApp
    window.open(whatsappURL, "_blank");
  });

// Event listener untuk klik di luar modal
window.onclick = function (event) {
  const modal = document.getElementById("modal");
  const bookingModal = document.getElementById("booking-modal");
  if (event.target === modal) closeModal();
  if (event.target === bookingModal) closeBookingModal();
};
