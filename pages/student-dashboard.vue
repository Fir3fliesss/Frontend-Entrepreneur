<template>
  <div class="min-h-screen bg-[#FFDFD3] flex flex-col items-center justify-center p-4">
    <div class="bg-[#FFF9F7] p-8 rounded-lg w-full max-w-xs text-center border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">

      <h1 class="text-2xl font-black text-[#087E4C] uppercase mb-8">PRENUER'S DAY</h1>

      <h2 class="text-xl font-bold text-black mb-4">Selamat Datang, <span class="text-[#087E4C]">{{ username }}</span></h2>

      <div class="mb-6">
        <button
          class="bg-[#98FFCF] hover:bg-green-400 text-black font-bold border-2 border-black rounded-lg py-3 px-6 text-lg w-full transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
          @click="generateQR"
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
          <div class="aspect-square bg-gray-200 border-2 border-black rounded-md flex items-center justify-center">
            <span class="text-sm text-gray-600">Stamp</span>
          </div>
           <div class="aspect-square bg-gray-200 border-2 border-black rounded-md flex items-center justify-center">
            <span class="text-sm text-gray-600">Stamp</span>
          </div>
           <div class="aspect-square bg-gray-200 border-2 border-black rounded-md flex items-center justify-center">
            <span class="text-sm text-gray-600">Stamp</span>
          </div>
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
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const config = useRuntimeConfig();

const router = useRouter();
const username = ref('Nama Siswa');
const qrCode = ref('');
const base_url = config.public.BASE_URL_API;

const generateQR = () => {
  console.log('Generate QR button clicked');
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

onMounted(() => {
  fetchStudentDetails();
});

const handleLogout = () => {
  console.log('Logout button clicked');
  localStorage.removeItem('token');
  localStorage.removeItem('userType');
  localStorage.removeItem('siswa_id'); 
  router.push('/login-student');
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
</style>
