<template>
  <div class="min-h-screen bg-[#FFDFD3] flex flex-col items-center justify-center p-4">

    <button
      @click="logout"
      class="fixed top-4 right-4 bg-[#FF6B6B] text-white font-bold py-2 px-4 rounded-md border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all z-10 hover:shadow-none active:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
    >
      Logout
    </button>

    <div class="bg-[#FFF9F7] p-8 rounded-lg w-full max-w-2xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] relative mt-12 md:mt-0">
      <h1 class="text-2xl font-black text-[#087E4C] uppercase mb-8 text-center">Admin Dashboard</h1>

      <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Cari nama perusahaan..."
          class="p-2 border-2 border-black rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] w-full md:w-auto"
        />

        <select
          v-model="statusFilter"
          class="p-2 border-2 border-black rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] w-full md:w-auto bg-white"
        >
          <option value="all">Semua Status</option>
          <option value="active">Aktif</option>
          <option value="inactive">Non-Aktif</option>
        </select>
      </div>

      <div class="overflow-x-auto w-full">
        <table class="w-full border-2 border-black rounded-lg bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <thead>
            <tr class="bg-[#98FFCF] border-b-2 border-black">
              <th class="py-3 px-4 text-left font-bold text-[#087E4C] min-w-[150px]">Nama Perusahaan</th>
              <th class="py-3 px-4 text-left font-bold text-[#087E4C] min-w-[100px]">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="company in filteredCompanies" :key="company.company_id" class="border-b-2 border-black">
              <td class="py-3 px-4 font-bold text-black break-words">{{ company.name_company }}</td>
              <td class="py-3 px-4">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" class="sr-only peer" :checked="company.status" @change="() => toggleStatus(company)" />
                  <div class="w-14 h-8 bg-[#FFDFD3] border-2 border-black rounded-full peer peer-checked:bg-[#98FFCF] transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"></div>
                  <div class="absolute left-1 top-1 bg-white border-2 border-black w-6 h-6 rounded-full transition-transform duration-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] peer-checked:translate-x-6"></div>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

interface Company {
  company_id: string;
  name_company: string;
  status: boolean;
}

const config = useRuntimeConfig();
const base_url = config.public.BASE_URL_API;
const companies = ref<Company[]>([]);
const searchQuery = ref('');
const statusFilter = ref('all'); 'all'
const router = useRouter();

const fetchCompanies = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token tidak ditemukan di localStorage');
    router.push('/login-admin');
    return;
  }

  try {
    const { data, error } = await useFetch(`${base_url}/api/admin/companies`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (error.value) {
      console.error('Fetch error:', error.value);
      alert('Failed to fetch companies');
      companies.value = [];
      return;
    }

    const result = data.value as any;
    if (result && result.success && Array.isArray(result.data)) {
      companies.value = result.data.map((company: any) => ({
        ...company,
        status: !!company.status
      }));
    } else {
      companies.value = [];
    }
  } catch (err) {
    alert('Failed to fetch companies');
    console.error('Fetch error:', err);
  }
};

const toggleStatus = async (company: Company) => {
  const token = localStorage.getItem('token');
  const newStatus = !company.status;
  if (!token) {
    alert('Token tidak ditemukan.');
    return;
  }

  try {
    const { data, error } = await useFetch(`${base_url}/api/admin/status/${company.company_id}/${newStatus}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (error.value) {
      console.error('Toggle status error:', error.value);
      alert('Terjadi kesalahan saat mengubah status');
      return;
    }

    const result = data.value as any;
    if (result && typeof result.status === 'boolean') {
      company.status = result.status;
    } else {
      alert('Gagal mengubah status perusahaan');
    }
  } catch (err) {
    alert('Terjadi kesalahan saat mengubah status');
    console.error('Toggle status error:', err);
  }
};

const filteredCompanies = computed(() => {
  let filtered = companies.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(company =>
      company.name_company.toLowerCase().includes(query)
    );
  }

  if (statusFilter.value !== 'all') {
    const isActive = statusFilter.value === 'active';
    filtered = filtered.filter(company => company.status === isActive);
  }

  return filtered;
});

const logout = () => {
  localStorage.removeItem('token');
  router.push('/login-admin');
};

onMounted(fetchCompanies);
</script>
