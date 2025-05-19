<template>
  <div class="min-h-screen bg-[#F0F8FF] grid grid-cols-1 p-4 items-center justify-center">
    <div class="max-w-2xl mx-auto w-full">
      <div class="bg-white border-4 border-green-700 shadow-[10px_10px_0px_0px_rgba(0,100,0,0.8)] p-8 rounded-xl relative overflow-hidden">
        <div class="absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none opacity-50">
          <template v-for="i in 100" :key="i">
            <div class="border-[0.5px] border-green-200"></div>
          </template>
        </div>

        <div class="relative z-10 text-center">
          <div class="mb-8 relative">
            <h1 class="text-4xl md:text-5xl font-black text-green-700 tracking-tight transform -rotate-2 uppercase">
              Selamat Datang di
            </h1>
            <h2 class="text-5xl md:text-6xl font-black text-green-800 tracking-wider transform rotate-1 uppercase mt-2">
              Preneur's Day <span class="bg-yellow-300 px-2 text-green-800 text-nowrap">Batch 3</span>
            </h2>
            <div class="absolute -top-6 -left-6 transform rotate-[-25deg]">
              <div class="w-12 h-12 bg-yellow-300 border-2 border-green-700 rotate-45 shadow-[3px_3px_0px_0px_rgba(0,100,0,0.7)]"></div>
            </div>
             <div class="absolute -bottom-5 -right-5 transform rotate-[15deg]">
              <div class="w-8 h-8 bg-pink-300 border-2 border-green-700 rotate-45 shadow-[2px_2px_0px_0px_rgba(0,100,0,0.7)]"></div>
            </div>
          </div>

          <p class="text-xl font-semibold text-green-600 mb-10 tracking-wide">
            Ayo kumpulkan <span class="inline-block transform -rotate-5 bg-green-200 px-1 rounded">stamp</span> sebanyak mungkin!
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <button
              @click="goToStudentLogin"
              class="bg-[#A7F3D0] text-black font-bold text-lg py-4 px-6 border-4 border-green-700 rounded-lg shadow-[6px_6px_0px_0px_rgba(0,100,0,0.7)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150 ease-in-out transform active:scale-95 active:shadow-none uppercase tracking-wider">
              Login Student
            </button>
            <button
              @click="goToCompanyLogin"
              class="bg-[#FFDAB9] text-black font-bold text-lg py-4 px-6 border-4 border-green-700 rounded-lg shadow-[6px_6px_0px_0px_rgba(0,100,0,0.7)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150 ease-in-out transform active:scale-95 active:shadow-none uppercase tracking-wider">
              Login Company
            </button>
          </div>

          <div class="mb-8 p-4 border-2 border-dashed border-green-400 rounded-md bg-green-50">
            <blockquote class="text-md italic text-green-700">
              "The entrepreneur shifts economic resources out of an area of lower and into an area of higher productivity and greater yield."
            </blockquote>
            <p class="text-right text-sm font-semibold text-green-600 mt-2">- Jean-Baptiste Say</p>
          </div>

          <div class="flex flex-col sm:flex-row justify-between items-center mt-10 pt-6 border-t-2 border-green-300">
            <div class="border-2 border-green-700 rounded-full py-2 px-6 mb-4 sm:mb-0">
              <span class="text-green-700 font-bold text-sm">06 - 28 Mei 2025</span>
            </div>
            <div class="text-green-700 font-bold text-sm">
              @SMK Plus Pelita Nusantara
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  <center class="opacity-20 text-center text-xs font-extralight text-green-600">Powered by <a href="instagram.com/synchronizeteams">SynchronizeTeams</a></center>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToStudentLogin = () => {
  // TODO: Implement actual navigation logic if student login is a separate page
  router.push('/login-student');
};

const goToCompanyLogin = () => {
  // TODO: Implement actual navigation logic if company login is a separate page
  router.push('/login-company');
};

</script>

<style>
@font-face {
  font-family: 'Neobrutalism';
  src: local('Arial Black'), local('Impact'), sans-serif;
  font-weight: 900;
}

* {
  font-family: 'Neobrutalism', 'Arial', 'Helvetica', sans-serif;
}

button:focus-visible {
  outline: 3px solid #4ade80;
  outline-offset: 2px;
}
</style>
