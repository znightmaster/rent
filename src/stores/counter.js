import axios from 'axios';
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', () => {
  const apartment = ref(null);

  const getApartment = async () => {
    const { data } = await axios.get('https://api.jsonbin.io/v3/b/67d693da8561e97a50ecf9fc');
    console.log(data.record);

    apartment.value = data.record;

  };
  const modal = ref(null);

  return { apartment, getApartment, modal };
});
