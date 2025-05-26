<template>
  <div class="min-h-screen bg-[#FFDFD3] flex flex-col items-center justify-center p-4">
    <div class="bg-[#FFF9F7] p-8 rounded-lg w-full max-w-xs text-center border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
      <h1 class="text-2xl font-black text-[#087E4C] uppercase mb-8">PRENUER'S DAY</h1>
      <h2 class="text-2xl font-bold text-black mb-1">Register Siswa</h2>
      <p class="text-sm text-gray-800 mb-6">Masukkan Nama dan NIS untuk mendaftar</p>
      <div class="mb-6">
        <input
          type="text"
          placeholder="Masukkan Nama Siswa"
          class="w-full px-4 py-3 text-base border-2 border-black rounded-md focus:outline-none focus:border-green-500 placeholder-gray-500"
          v-model="nama"
        />
      </div>
      <div class="mb-6">
        <input
          type="text"
          placeholder="Masukkan NIS"
          class="w-full px-4 py-3 text-base border-2 border-black rounded-md focus:outline-none focus:border-green-500 placeholder-gray-500"
          v-model="nis"
        />
      </div>
      <div class="mb-6">
        <hr class="border-t-2 border-black">
      </div>
      <div class="mb-8">
        <button
          class="bg-[#98FFCF] hover:bg-green-400 text-black font-bold border-2 border-black rounded-lg py-3 px-6 text-lg w-full transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:shadow-none active:translate-x-[3px] active:translate-y-[3px] hover:translate-x-[3px] hover:translate-y-[3px]"
          @click="handleRegister"
        >
          Register
        </button>
      </div>
      <p class="text-xs text-gray-800">Powered By <span class="font-bold text-[#5EB1FF]">Devaccto RPL</span></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const router = useRouter();
const base_url = config.public.BASE_URL_API;
const nama = ref('');
const nis = ref('');

const handleRegister = async () => {
  if (!nama.value || !nis.value) {
    alert('Nama dan NIS tidak boleh kosong.');
    return;
  }
  const body = new URLSearchParams();
  body.append('nama', nama.value);
  body.append('nis', nis.value);
  try {
    const response = await fetch(`${base_url}/api/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    });
    const data = await response.json();
    if (response.ok && data.status === true) {
      alert('Registrasi berhasil! Silakan login.');
      router.push('/login-student');
    } else {
      alert(`Registrasi gagal: ${data.message || 'Terjadi kesalahan.'}`);
    }
  } catch (error) {
    alert('Terjadi kesalahan saat registrasi.');
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=MuseoModerno:wght@100..900&display=swap');
h1{
  font-family: 'MuseoModerno', sans-serif !important;
}
body, input, button, p, h2, h3, h4, h5, h6, span, div {
  font-family: 'poppins', sans-serif;
}
</style>
