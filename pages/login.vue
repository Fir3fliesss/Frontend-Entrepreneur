<template>
  <div class="min-h-screen bg-[#FFDFD3] flex flex-col items-center justify-center p-4">
    <div class="bg-[#FFF9F7] py-12 px-8 rounded-lg w-full max-w-xs text-center border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">

      <h1 class="text-2xl font-black text-[#087E4C] uppercase mb-8">PRENUER'S DAY</h1>

      <h2 class="text-2xl font-bold text-black mb-1">Student Login</h2>
      <p class="text-sm text-gray-800 mb-6">Login With Your NIS</p>

      <div class="mb-6">
        <input
          type="text"
          placeholder="Enter Your NIS Here"
          class="w-full px-4 py-3 text-base border-2 border-black rounded-md focus:outline-none focus:border-green-500 placeholder-gray-500"
        />
      </div>

      <div class="mb-6">
        <hr class="border-t-2 border-black">
      </div>

      <div class="mb-8">
        <button class="bg-[#98FFCF] hover:bg-green-400 text-black font-bold border-2 border-black rounded-lg py-3 px-6 text-lg w-full transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
          Sign In
        </button>
      </div>

      <p class="text-xs text-gray-800">Powered By <span class="font-bold text-[#5EB1FF]">Devaccto RPL</span></p>

    </div>
  </div>
</template>

<script lang="ts" setup>
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
