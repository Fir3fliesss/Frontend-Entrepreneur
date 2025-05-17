<template>
  <div class="min-h-screen bg-[#FFDFD3] flex flex-col items-center justify-center p-4">
    <div class="bg-[#FFF9F7] p-8 rounded-lg w-full max-w-xs text-center border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">

      <h1 class="text-2xl font-black text-[#087E4C] uppercase mb-8">PRENUER'S DAY</h1>

      <!-- Username Display -->
      <h2 class="text-xl font-bold text-black mb-4">Selamat Datang, [Username]</h2>

      <!-- QR Code Section -->
      <div class="mb-6">
        <button
          class="bg-[#98FFCF] hover:bg-green-400 text-black font-bold border-2 border-black rounded-lg py-3 px-6 text-lg w-full transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
          @click="generateQR"
        >
          Generate QR Code
        </button>
        <div v-if="qrCode" class="mt-4">
          <!-- Placeholder for QR Code Image -->
          <img :src="qrCode" alt="QR Code" class="mx-auto border-2 border-black"/>
        </div>
      </div>

      <div class="mb-6">
        <hr class="border-t-2 border-black">
      </div>

      <!-- Collected Stamps Section -->
      <div class="mb-8">
        <h3 class="text-xl font-bold text-black mb-4">Stempel Terkumpul</h3>
        <!-- Placeholder for stamps display -->
        <div class="grid grid-cols-3 gap-4">
          <!-- Example Stamp Placeholder -->
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

      <!-- Logout Button -->
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('Nama Siswa'); // Placeholder username
const qrCode = ref(''); // Placeholder for QR code data

const generateQR = () => {
  // Logic to generate QR code will go here
  console.log('Generate QR button clicked');
  // Example: qrCode.value = 'data:image/png;base64,...';
};

const handleLogout = () => {
  console.log('Logout button clicked');
  localStorage.removeItem('token');
  localStorage.removeItem('userType');
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
