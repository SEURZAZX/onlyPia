document.addEventListener("DOMContentLoaded", () => {
  // Elemen UI
  const initialScreen = document.getElementById("initialScreen");
  const messageScreen = document.getElementById("messageScreen");
  const heartIcon = document.getElementById("heartIcon");
  const messageTitleDisplay = document.getElementById("messageTitle");
  const loveMessageDisplay = document.getElementById("loveMessage");
  const showAnotherGombalButton = document.getElementById("showAnotherGombal");
  const resetButton = document.getElementById("resetButton"); // Tombol Ulang dari Awal
  const heartParticlesOverlay = document.getElementById("heartParticles");

  // Nama target
  const targetName = "Pia"; // Nama yang dituju!

  // Database Gombalan untuk Pia
  const gombalanMessages = [
    "Hai Pia, kamu tahu enggak kenapa bintang bersinar? Karena mereka ingin meniru pancaran matamu!",
    "Pia, kamu itu seperti WiFi. Bikin aku nggak bisa jauh-jauh, selalu ingin terhubung.",
    "Kalau aku harus memilih antara bernapas dan mencintaimu, aku akan menggunakan napas terakhirku untuk bilang 'Aku cinta Pia'.",
    "Pia, kamu tahu bedanya kopi sama kamu? Kopi bikin melek, kamu bikin aku melek setiap saat mikirin kamu.",
    "Kata orang, cinta itu buta. Tapi setelah lihat Pia, aku tahu cinta itu indah, seindah senyummu.",
    "Aku punya satu pertanyaan buat Pia: Selain di hatiku, kamu lebih suka tinggal di mana?",
    "Pia, kamu itu kayak alarm. Bikin aku bangun dari mimpi indah, tapi bangun untuk melihat kenyataan yang lebih indah, yaitu kamu.",
    "Aku nggak butuh Google Maps, karena arah hidupku sudah pasti ke Pia.",
    "Pia, kamu itu manis banget, bikin aku diabetes. Tapi diabetes cinta, bukan diabetes gula.",
    "Setiap kali aku melihat Pia, jantungku berdetak kencang. Mungkin ini yang namanya 'cinta pada pandangan pertama' yang terus berulang.",
    "Pia, apa kamu tahu kenapa aku suka sama kamu? Karena kamu itu 'Pia'-ling sempurna di mataku.",
    "Jika ada rating 1-10 untuk kecantikan, Pia itu 11!",
    "Pia, kamu tahu gak bedanya kamu sama PR? Kalau PR itu bikin pusing, kalau kamu itu bikin kangen.",
    "Seandainya Pia itu lautan, aku rela jadi karang yang setia menopangmu selamanya.",
  ];

  let currentGombalanIndex = -1; // Untuk melacak gombalan terakhir yang ditampilkan

  // Fungsi untuk menampilkan layar
  function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach((screen) => {
      screen.classList.remove("active");
      screen.classList.add("hidden");
    });
    document.getElementById(screenId).classList.add("active");
    document.getElementById(screenId).classList.remove("hidden");
  }

  // Fungsi untuk membuat efek partikel hati
  function createHeartParticle(x, y) {
    const heart = document.createElement("span");
    heart.classList.add("heart-particle");
    heart.textContent = "💖"; // Emoji hati
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heartParticlesOverlay.appendChild(heart);

    heart.addEventListener("animationend", () => {
      heart.remove();
    });
  }

  // Fungsi untuk animasi ketik teks
  let typingTimeout;
  function typeText(element, text, speed = 30) {
    clearTimeout(typingTimeout);
    let i = 0;
    element.textContent = "";

    return new Promise((resolve) => {
      function type() {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          typingTimeout = setTimeout(type, speed);
        } else {
          resolve();
        }
      }
      type();
    });
  }

  // Fungsi untuk menampilkan pesan gombalan
  async function displayGombalan() {
    loveMessageDisplay.textContent = ""; // Kosongkan teks sebelum ketik yang baru
    showAnotherGombalButton.classList.remove("hidden"); // Pastikan tombol tampil
    resetButton.classList.add("hidden"); // Sembunyikan tombol reset saat gombalan tampil

    let newIndex;
    // Pastikan tidak sama dengan yang terakhir jika memungkinkan dan ada lebih dari 1 gombalan
    do {
      newIndex = Math.floor(Math.random() * gombalanMessages.length);
    } while (newIndex === currentGombalanIndex && gombalanMessages.length > 1);

    currentGombalanIndex = newIndex;
    const gombalan = gombalanMessages[newIndex];

    // Ganti placeholder nama Pia di judul pesan
    messageTitleDisplay.textContent = `Pesan Manis Untuk ${targetName}:`;
    await typeText(loveMessageDisplay, gombalan, 30); // Panggil animasi ketik

    // Setelah gombalan selesai diketik, tampilkan tombol reset
    resetButton.classList.remove("hidden");
  }

  // Fungsi reset game (kembali ke layar awal)
  function resetGame() {
    clearTimeout(typingTimeout); // Hentikan animasi ketik jika sedang berjalan
    initialScreen.classList.remove("hidden");
    initialScreen.classList.add("active");
    messageScreen.classList.add("hidden");
    messageScreen.classList.remove("active");

    currentGombalanIndex = -1;
    loveMessageDisplay.textContent = "";
    messageTitleDisplay.textContent = "";

    heartParticlesOverlay.innerHTML = ""; // Hapus partikel hati
  }

  // Event Listeners
  heartIcon.addEventListener("click", () => {
    showScreen("messageScreen");
    displayGombalan(); // Tampilkan gombalan pertama
    // Buat efek partikel hati saat klik
    const rect = heartIcon.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    for (let i = 0; i < 15; i++) {
      // Membuat 15 partikel hati
      setTimeout(() => {
        createHeartParticle(
          centerX + (Math.random() - 0.5) * 50,
          centerY + (Math.random() - 0.5) * 50
        );
      }, i * 50);
    }
  });

  showAnotherGombalButton.addEventListener("click", displayGombalan);
  resetButton.addEventListener("click", resetGame);

  // Inisialisasi: Tampilkan layar awal
  showScreen("initialScreen");
});
