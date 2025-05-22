<template>
  <div class="min-h-screen bg-[#FFDFD3] flex flex-col items-center justify-center p-4">
    <div v-if="showInactivePopup" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div class="bg-white border-2 border-black rounded-lg shadow-lg p-6 max-w-xs w-full text-center">
        <h3 class="text-lg font-bold text-red-600 mb-2">Akun Belum Aktif</h3>
        <p class="mb-4 text-sm text-gray-700">Akun Anda sekalian saat ini berstatus <span class="font-bold">pembeli</span>.<br>Silakan berbelanja dan kumpulkan stamp terlebih dahulu.</p>
        <button @click="showInactivePopup = false" class="mt-2 px-4 py-2 bg-[#FFDFD3] border-2 border-black rounded-lg font-bold hover:bg-red-200">Tutup</button>
      </div>
    </div>
    <div class="bg-[#FFF9F7] p-8 rounded-lg w-full max-w-xs text-center border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] h-">

      <h1 class="text-2xl font-black text-[#087E4C] uppercase mb-8">PRENUER'S DAY</h1>

      <h2 class="text-2xl font-bold text-black mb-1">Login Perusahaan</h2>
      <p class="text-sm text-gray-800 mb-6">Masukkan Nama Perusahaan dan Password untuk login</p>

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
          class="bg-[#98FFCF] hover:bg-green-400 text-black font-bold border-2 border-black rounded-lg py-3 px-6 text-lg w-full transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
          @click="handleLogin"
        >
          Sign In
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
const showInactivePopup = ref(false);

const handleLogin = async () => {
  if (!name_company.value || !password.value) {
    alert('Nama Perusahaan dan Password tidak boleh kosong.');
    return;
  }
  const loginEndpoint = `${base_url}/api/company/login`;
  const requestBody = { name_company: name_company.value, password: password.value };
  try {
    const response = await fetch(loginEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    if (response.ok && data.status === true && data.company && data.company.company_id) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userType', 'company');
      localStorage.setItem('companyId', data.company.company_id);
      router.push('/company-dashboard');
    } else if (!response.ok && data.message && data.message.toLowerCase().includes('not active')) {
      showInactivePopup.value = true;
    } else {
      alert(`Login gagal: ${data.message || 'Nama Perusahaan/Password salah, silahkan coba lagi'}`);
    }
  } catch (error) {
    alert('Terjadi kesalahan saat login.');
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
