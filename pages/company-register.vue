<template>
  <div class="min-h-screen bg-[#FFDFD3] flex flex-col items-center justify-center p-4">
    <div class="bg-[#FFF9F7] p-8 rounded-lg w-full max-w-xs text-center border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
      <h1 class="text-2xl font-black text-[#087E4C] uppercase mb-8">PRENUER'S DAY</h1>
      <h2 class="text-2xl font-bold text-black mb-1">Register Perusahaan</h2>
      <p class="text-sm text-gray-800 mb-6">Masukkan Nama Perusahaan, Logo, dan Password untuk mendaftar</p>
      <div class="mb-6">
        <input
          type="text"
          placeholder="Masukkan Nama Perusahaan"
          class="w-full px-4 py-3 text-base border-2 border-black rounded-md focus:outline-none focus:border-green-500 placeholder-gray-500"
          v-model="name_company"
        />
      </div>
      <div class="mb-6">
        <input
          type="file"
          accept="image/*"
          class="w-full px-4 py-2 text-base border-2 border-black rounded-md focus:outline-none focus:border-green-500 placeholder-gray-500 bg-white"
          @change="onFileChange"
        />
      </div>
      <div class="mb-6">
        <input
          type="password"
          placeholder="Masukkan Password Perusahaan"
          class="w-full px-4 py-3 text-base border-2 border-black rounded-md focus:outline-none focus:border-green-500 placeholder-gray-500"
          v-model="password"
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
const name_company = ref('');
const password = ref('');
const logo = ref<File|null>(null);

const onFileChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    logo.value = files[0];
  } else {
    logo.value = null;
  }
};

const handleRegister = async () => {
  if (!name_company.value || !password.value || !logo.value) {
    alert('Nama Perusahaan, Logo, dan Password tidak boleh kosong.');
    return;
  }
  const formData = new FormData();
  formData.append('name_company', name_company.value);
  formData.append('logo', logo.value);
  formData.append('password', password.value);
  try {
    const response = await fetch(`${base_url}/api/company/register`, {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    console.log('Response:', data); // Tambahkan ini
    if (response.ok && data.status === true) {
      alert('Registrasi berhasil! Silakan login.');
      router.push('/login-company');
    } else {
      alert(`Registrasi gagal: ${data.message || 'Terjadi kesalahan.'}`);
    }
  } catch (error) {
    alert('Terjadi kesalahan saat registrasi.');
    console.error(error); // Tambahkan ini
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
