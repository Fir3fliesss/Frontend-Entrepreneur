<template>
  <div class="min-h-screen bg-[#FFDFD3] flex flex-col items-center justify-center p-4">
    <div class="bg-[#FFF9F7] p-8 rounded-lg w-full max-w-xs text-center border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">

      <h1 class="text-2xl font-black text-[#087E4C] uppercase mb-8">PRENUER'S DAY</h1>

      <h2 class="text-xl font-bold text-black mb-4">Selamat Datang, <span class="text-[#087E4C]">{{ companyName }}</span></h2>

      <div class="mb-6">
        <button
          class="bg-[#98FFCF] hover:bg-green-400 text-black font-bold border-2 border-black rounded-lg py-3 px-6 text-lg w-full transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
          @click="startScan"
        >
          Scan QR Code
        </button>
      </div>

      <div class="mb-6">
        <hr class="border-t-2 border-black">
      </div>

      <div class="mb-8">
        <button
          class="bg-red-400 hover:bg-red-500 text-black font-bold border-2 border-black rounded-lg py-3 px-6 text-lg w-full transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
          @click="handleLogout"
        >
          Logout
        </button>
      </div>

      <p class="text-xs text-gray-800">Powered By <span class="font-bold text-[#5EB1FF]">Devaccto RPL</span></p>
    </div>

    <!-- Popup Scan QR -->
    <transition name="slide-up">
      <div v-if="showScanPopup" class="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
        <div class="bg-white w-full max-w-sm rounded-t-2xl p-6 border-t-4 border-[#087E4C] shadow-lg animate-slideUp relative min-h-[70vh]">
          <transition name="slide-right-top">
            <div
              v-if="showBuyerSlide"
              class="fixed top-24 right-0 bg-[#FFF9F7] border-2 border-black rounded-xl px-6 py-3 flex flex-col items-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] z-50"
              style="min-width: 220px;"
            >
              <p class="text-lg font-bold text-[#087E4C] mb-2">Konfirmasi pembelian</p>
              <div class="flex flex-row justify-around w-full gap-4">
                <button @click="closeBuyerSlide" class="bg-red-300 hover:bg-red-400 border-2 border-black rounded-lg w-12 h-12 flex items-center justify-center text-3xl font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  ✕
                </button>
                <button @click="closeBuyerSlide" class="bg-green-200 hover:bg-green-300 border-2 border-black rounded-lg w-12 h-12 flex items-center justify-center text-3xl font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  ✓
                </button>
              </div>
            </div>
          </transition>
          <button @click="closeScanPopup" class="absolute top-3 right-4 text-2xl font-bold text-gray-500 hover:text-black">&times;</button>
          <h2 class="text-lg font-bold text-[#087E4C] mb-4">Scan QR Siswa</h2>
          <div class="flex justify-center items-center min-h-[200px] relative">
            <video ref="videoElem" class="rounded-lg border-2 border-black object-cover" autoplay playsinline width="350" height="350" style="aspect-ratio: 1 / 1; max-width: 90vw;"></video>
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] pointer-events-none">
            </div>
          </div>
          <div v-if="buyerName" class="mt-4 text-center text-lg font-bold text-[#087E4C]">
            Buyer anda adalah {{ buyerName }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { highlight } from '@nuxt/ui/runtime/utils/fuse.js';
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const config = useRuntimeConfig();
const base_url = config.public.BASE_URL_API;

const router = useRouter();
const companyName = ref('[Nama Perusahaan]');
const showScanPopup = ref(false);
const videoElem = ref<HTMLVideoElement | null>(null);
const buyerName = ref<string | null>(null);
const showBuyerSlide = ref(false);
let qrScanner: any = null;

const startScan = async () => {
  showScanPopup.value = true;
  buyerName.value = null;
  showBuyerSlide.value = false;
  await nextTick();
  if (!qrScanner && videoElem.value) {
    const { default: QrScanner } = await import('qr-scanner');
    qrScanner = new QrScanner(
      videoElem.value,
      async (result: any) => {
        console.log('QR Code Scanned:', result.data || result);
        await fetchStudentDetails(result.data);
        // closeScanPopup();
      },
      {
        onDecodeError: (error: any) => {},
        highlightCodeOutline: true,
        highlightScanRegion: true,
      }
    );
  }
  if (qrScanner) {
    qrScanner.start();
  }
};

const closeScanPopup = () => {
  showScanPopup.value = false;
  if (qrScanner) {
    qrScanner.stop();
  }
};

const fetchCompanyDetails = async () => {
  const token = localStorage.getItem('token');
  const companyId = localStorage.getItem('companyId');

  if (!token || !companyId) {
    console.error('Token atau Company ID tidak ditemukan di localStorage');
    router.push('/login-company');
    return;
  }

  const companyDetailEndpoint = `${base_url}/api/company/${companyId}`;

  try {
    const response = await fetch(companyDetailEndpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok && data.success && data.data) {
      companyName.value = data.data.name_company;
    } else {
      console.error('Gagal mengambil detail perusahaan:', data.message || 'Response tidak sukses');
      companyName.value = 'Perusahaan Tidak Ditemukan';
    }
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil detail perusahaan:', error);
    companyName.value = 'Error Memuat Data';
  }
};

onMounted(() => {
  fetchCompanyDetails();
});

const fetchStudentDetails = async (siswaId: string) => {
  const token = localStorage.getItem('token');

  if (!token || !siswaId) {
    console.error('Token atau Siswa ID tidak ditemukan di localStorage.');
    return;
  }

  const studentDetailEndpoint = `${base_url}/api/siswa/${siswaId}`;

  try {
    const response = await fetch(studentDetailEndpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    const result = await response.json();

    if (response.ok && result.success) {
      buyerName.value = result.data.nama;
      showBuyerSlide.value = true; // Tampilkan slide notifikasi
    } else {
      buyerName.value = null;
      showBuyerSlide.value = false;
    }
  } catch (error) {
    buyerName.value = null;
    showBuyerSlide.value = false;
  }
};

const closeBuyerSlide = () => {
  showBuyerSlide.value = false;
};
const handleLogout = () => {
  console.log('Logout button clicked');
  localStorage.removeItem('token');
  localStorage.removeItem('userType');
  localStorage.removeItem('companyId');
  router.push('/');
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=MuseoModerno:wght@100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

h1{
  font-family: 'MuseoModerno', sans-serif !important;
}

body, input, button, p, h2, h3, h4, h5, h6, span, div {
  font-family: 'Poppins', sans-serif;
}
.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.slide-up-enter-to, .slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.slide-down-enter-active, .slide-down-leave-active {
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s;
}
.slide-down-enter-from, .slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
.slide-down-enter-to, .slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.slide-right-top-enter-active, .slide-right-top-leave-active {
  transition: transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s;
}
.slide-right-top-enter-from, .slide-right-top-leave-to {
  transform: translateX(100%) scale(0.95);
  opacity: 0;
}
.slide-right-top-enter-to, .slide-right-top-leave-from {
  transform: translateX(0) scale(1);
  opacity: 1;
}
</style>
