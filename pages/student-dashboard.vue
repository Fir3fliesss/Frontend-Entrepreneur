<template>
  <div class="min-h-screen bg-[#FFDFD3] flex flex-col items-center justify-center p-4">
    <div class="bg-[#FFF9F7] p-8 rounded-lg w-full max-w-xs text-center border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">

      <h1 class="text-2xl font-black text-[#087E4C] uppercase mb-8">PRENUER'S DAY</h1>

      <h2 class="text-xl font-bold text-black mb-4">Selamat Datang, <span class="text-[#087E4C]">{{ username }}</span></h2>

      <div class="mb-6">
        <button
          class="bg-[#98FFCF] hover:bg-green-400 text-black font-bold border-2 border-black rounded-lg py-3 px-6 text-lg w-full transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
          @click="openQrPopup"
        >
          Generate QR Code
        </button>
        <div v-if="qrCode" class="mt-4">
          <img :src="qrCode" alt="QR Code" class="mx-auto border-2 border-black"/>
        </div>
      </div>

      <div class="mb-6">
        <hr class="border-t-2 border-black">
      </div>

      <div class="mb-8">
        <h3 class="text-xl font-bold text-black mb-4">Stempel Terkumpul</h3>
        <div class="grid grid-cols-3 gap-4">
          <template v-if="stamps.length > 0">
            <div v-for="(stamp, idx) in stamps" :key="idx" class="flex items-center justify-center">
              <img :src="base_url + '/storage/' + stamp.company_stamp" alt="Stamp" class="w-16 h-16 object-cover rounded-full border-2 border-[#087E4C] shadow-md bg-white" />
            </div>
          </template>
          <template v-else>
            <div class="aspect-square bg-gray-200 border-2 border-black rounded-md flex items-center justify-center col-span-3">
              <span class="text-sm text-gray-600">Belum ada stamp</span>
            </div>
          </template>
        </div>
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

    <transition name="slide-up">
      <div v-if="showQrPopup" class="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
        <div class="bg-white w-full max-w-sm rounded-t-2xl p-6 border-t-4 border-[#087E4C] shadow-lg animate-slideUp relative min-h-[70vh]">
          <button @click="closeQrPopup" class="absolute top-3 right-4 text-2xl font-bold text-gray-500 hover:text-black">&times;</button>
          <h2 class="text-lg font-bold text-[#087E4C] mb-4">QR Code Anda</h2>
          <div id="qr-code-container" class="flex justify-center"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const config = useRuntimeConfig();

const router = useRouter();
const username = ref('Nama Siswa');
const qrCode = ref('');
const base_url = config.public.BASE_URL_API;

const showQrPopup = ref(false);
interface Stamp {
  company_stamp: string;
}

const stamps = ref<Stamp[]>([]);

const generateQR = async () => {
  const siswaId = localStorage.getItem('siswa_id') || '';
  await nextTick();
  const container = document.getElementById('qr-code-container');
  if (container) {
    container.innerHTML = '';
    const { default: QrCreator } = await import('qr-creator');
    QrCreator.render({
      text: siswaId,
      radius: 0.2,
      ecLevel: 'H',
      fill: '#087E4C',
      background: null,
      size: 300
    }, container);
  }
};

const openQrPopup = () => {
  showQrPopup.value = true;
  generateQR();
};

const closeQrPopup = () => {
  showQrPopup.value = false;
};

const fetchStudentDetails = async () => {
  const token = localStorage.getItem('token');
  const siswaId = localStorage.getItem('siswa_id');

  if (!token || !siswaId) {
    console.error('Token atau Siswa ID tidak ditemukan di localStorage.');
    router.push('/login-student');
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
      username.value = result.data.nama;
    } else {
      console.error('Gagal mengambil detail siswa:', result.message || response.statusText);
      if (response.status === 401) {
        alert('Sesi Anda telah berakhir. Silakan login kembali.');
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        localStorage.removeItem('siswa_id');
        router.push('/login-student');
      }
    }
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil detail siswa:', error);
    alert('Terjadi kesalahan pada server. Silakan coba lagi nanti.');
  }
};

const fetchStamps = async () => {
  const token = localStorage.getItem('token');
  const siswaId = localStorage.getItem('siswa_id');
  if (!token || !siswaId) return;
  try {
    const response = await fetch(`${base_url}/api/stamp/${siswaId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });
    const result = await response.json();
    if (response.ok && result.success) {
      stamps.value = result.data;
    } else {
      stamps.value = [];
    }
  } catch (e) {
    stamps.value = [];
  }
};

onMounted(() => {
  fetchStudentDetails();
  fetchStamps();
});

const handleLogout = () => {
  console.log('Logout button clicked');
  localStorage.removeItem('token');
  localStorage.removeItem('userType');
  localStorage.removeItem('siswa_id');
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
</style>
