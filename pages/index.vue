<template>
  <div class="min-h-screen bg-[#f0f0f0] grid grid-cols-1 p-4">
    <div class="max-w-4xl mx-auto w-full">
      <!-- Main Card with Grid Background -->
      <div class="bg-white border-4 border-green-700 shadow-[8px_8px_0px_0px_rgba(0,100,0)] p-6 rounded-lg relative overflow-hidden">
        <!-- Grid Background -->
        <div class="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none">
          <template v-for="i in 144" :key="i">
            <div class="border-[0.5px] border-gray-200"></div>
          </template>
        </div>

        <!-- Content (above grid) -->
        <div class="relative z-10">
          <!-- Header -->
          <div class="mb-8 relative">
            <h1 class="text-5xl font-black text-green-700 tracking-wider transform -rotate-1 uppercase">COLLECT 5 STAMPS</h1>
            <h2 class="text-4xl font-extrabold text-green-700 tracking-wide transform rotate-1 uppercase mt-2">PRENEUR'S DAY</h2>
            <!-- Star decoration -->
            <div class="absolute -top-4 right-20 transform rotate-12">
              <div class="w-10 h-10 bg-yellow-200 border-2 border-green-700 rotate-45"></div>
            </div>
          </div>

          <!-- Stamps Collection -->
          <div class="grid grid-cols-3 gap-8 mb-8">
            <!-- Stamps 1-3 in first row -->
            <div v-for="n in 3" :key="n" class="aspect-square bg-green-100 border-4 border-green-600 rounded-full flex items-center justify-center transform hover:scale-105 transition-transform">
              <span class="text-5xl font-black text-green-700">{{ n }}</span>
            </div>

            <!-- Placeholder for illustration -->
            <div class="row-span-2 col-span-1 flex items-center justify-center">
              <div class="relative">
                <!-- Ramen cup character -->
                <div class="w-32 h-32 bg-white border-4 border-green-700 rounded-full flex items-center justify-center relative">
                  <div class="w-24 h-16 bg-white border-4 border-green-700 rounded-full absolute -bottom-2">
                    <!-- Simple face -->
                    <div class="flex justify-center items-center h-full">
                      <div class="w-2 h-2 bg-green-700 rounded-full mx-1"></div>
                      <div class="w-2 h-2 bg-green-700 rounded-full mx-1"></div>
                    </div>
                  </div>
                  <!-- Arms -->
                  <div class="w-6 h-12 bg-white border-4 border-green-700 rounded-full absolute -left-8 top-10 transform -rotate-45"></div>
                  <div class="w-6 h-12 bg-white border-4 border-green-700 rounded-full absolute -right-8 top-10 transform rotate-45"></div>
                  <!-- Legs -->
                  <div class="w-4 h-10 bg-white border-4 border-green-700 rounded-full absolute -bottom-10 left-6 transform rotate-12"></div>
                  <div class="w-4 h-10 bg-white border-4 border-green-700 rounded-full absolute -bottom-10 right-6 transform -rotate-12"></div>
                </div>
                <!-- Noodles on top -->
                <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div class="w-20 h-2 bg-green-700 rounded-full transform rotate-12 mb-1"></div>
                  <div class="w-20 h-2 bg-green-700 rounded-full mb-1"></div>
                  <div class="w-20 h-2 bg-green-700 rounded-full transform -rotate-12"></div>
                </div>
              </div>
            </div>

            <!-- Stamps 4-5 in second row -->
            <div class="col-span-2 flex justify-center gap-8">
              <div v-for="n in 2" :key="n+3" class="aspect-square bg-green-100 border-4 border-green-600 rounded-full flex items-center justify-center transform hover:scale-105 transition-transform w-full max-w-[120px]">
                <span class="text-5xl font-black text-green-700">{{ n+3 }}</span>
              </div>
            </div>
          </div>

          <!-- Bonus Badge -->
          <div class="absolute top-10 right-10">
            <div class="bg-yellow-200 border-4 border-green-700 rounded-full py-3 px-8 transform rotate-6 shadow-[4px_4px_0px_0px_rgba(0,100,0)]">
              <span class="text-3xl font-black text-green-700 uppercase">PENUS</span>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex justify-between items-center mt-6">
            <div class="border-2 border-green-700 rounded-full py-2 px-6">
              <span class="text-green-700 font-bold">06 - 28 Mei 2025</span>
            </div>
            <div class="text-green-700 font-bold">
              @SMK Plus Pelita Nusantara
            </div>
          </div>

          <!-- Star decorations -->
          <div class="absolute bottom-20 left-10 transform rotate-12">
            <div class="w-8 h-8 bg-yellow-200 border-2 border-green-700 rotate-45"></div>
          </div>
          <div class="absolute bottom-40 right-40 transform -rotate-12">
            <div class="w-8 h-8 bg-yellow-200 border-2 border-green-700 rotate-45"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// No additional script needed for this static design
</script>

<style>
/* Custom styles can be added here if needed */
@font-face {
  font-family: 'Neobrutalism';
  src: local('Arial'), local('Helvetica'), sans-serif;
  font-weight: bold;
}

* {
  font-family: 'Neobrutalism', sans-serif;
}
</style>
