import { useDemoStore } from './../../store/demo';
import { defineComponent, ref, computed } from 'vue';
import { storeToRefs } from 'pinia';

  
  export default defineComponent ({
  
    setup() {

      const demoStore = useDemoStore();
      const { count } = storeToRefs(demoStore);

      let userName = ref("");
      const isNamePresent = computed(() => userName.value.length > 0);
  
      function submitName() {
        console.log(userName.value)
      }

      function incrementCounter() {
          demoStore.count++;
          // NOTE:// this approach does NOT work --> count.value = count.value++;
      }

      function doubleCounter() {
          demoStore.count = demoStore.double;
      }
  
      return {
        userName,
        isNamePresent,
        submitName,
        count,
        incrementCounter,
        doubleCounter,  // this and doubleValue do the same task.
        doubleValue: computed(() => {
            // computed only works on the first click, after that no error is shown.  
            // Nothing happens visually.
            demoStore.count = demoStore.double
        }),
      }
  
    },
  });