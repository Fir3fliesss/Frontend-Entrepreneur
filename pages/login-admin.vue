<template>
  <div class="min-h-screen bg-[#FFDFD3] flex flex-col items-center justify-center p-4">
    <div class="bg-[#FFF9F7] p-8 rounded-lg w-full max-w-xs text-center border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] h-">

      <h1 class="text-2xl font-black text-[#087E4C] uppercase mb-8">PRENUER'S DAY</h1>

      <h2 class="text-2xl font-bold text-black mb-1">Login Admin</h2>
      <p class="text-sm text-gray-800 mb-6">Masukkan Username dan Password untuk login</p>

      <div class="mb-6">
        <input
          type="text"
          placeholder="Masukkan Username"
          class="w-full px-4 py-3 text-base border-2 border-black rounded-md focus:outline-none focus:border-green-500 placeholder-gray-500"
          v-model="name"
        />
      </div>

      <div class="mb-6">
        <input
          type="password"
          placeholder="Masukkan Password"
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
const name = ref('');
const password = ref('');

const handleLogin = async () => {
  if (!name.value || !password.value) {
    alert('Nama Perusahaan dan Password tidak boleh kosong.');
    return;
  }

  const loginEndpoint = `${base_url}/api/admin/login`;
  const requestBody = { name: name.value, password: password.value };

  try {
    const { data, error } = await useFetch(loginEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (error.value) {
      alert(`Login gagal: ${error.value.data?.message || 'Nama/Password salah, silahkan coba lagi'}`);
      return;
    }

    const responseData = data.value;
    if (responseData && responseData.status && responseData.token) {
      localStorage.setItem('token', responseData.token);
      localStorage.setItem('userType', 'admin');
      router.push('/admin-dashboard');
    } else {
      alert('Login gagal: Data tidak lengkap.');
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
