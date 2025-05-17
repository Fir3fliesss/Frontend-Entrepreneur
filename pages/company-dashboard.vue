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
        <div v-if="scanning" class="mt-4 border-2 border-black aspect-video flex items-center justify-center">
          <span class="text-gray-600">Camera Preview Area</span>
        </div>
      </div>

      <div v-if="showConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="bg-white p-6 rounded-lg border-2 border-black text-center">
          <p class="mb-4 text-black">[Scan Result Confirmation Text]</p>
          <div class="flex justify-center gap-4">
            <button
              class="bg-gray-300 hover:bg-gray-400 text-black font-bold border-2 border-black rounded-lg py-2 px-4 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
              @click="cancelScan"
            >
              Batal
            </button>
            <button
              class="bg-[#98FFCF] hover:bg-green-400 text-black font-bold border-2 border-black rounded-lg py-2 px-4 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
              @click="confirmScan"
            >
              Lanjut
            </button>
          </div>
        </div>
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
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const config = useRuntimeConfig();
const base_url = config.public.BASE_URL_API;

const router = useRouter();
const scanning = ref(false);
const showConfirmation = ref(false);
const companyName = ref('[Nama Perusahaan]');

const startScan = () => {
  console.log('Start Scan button clicked');
  scanning.value = true;
};

const cancelScan = () => {
  console.log('Cancel Scan button clicked');
  showConfirmation.value = false;
  scanning.value = false;
};

const confirmScan = () => {
  console.log('Confirm Scan button clicked');
  showConfirmation.value = false;
  scanning.value = false;
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

const handleLogout = () => {
  console.log('Logout button clicked');
  localStorage.removeItem('token');
  localStorage.removeItem('userType');
  localStorage.removeItem('companyId'); 
  router.push('/login-company');
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
