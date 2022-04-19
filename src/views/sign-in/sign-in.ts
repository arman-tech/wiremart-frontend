import { useUserStore } from './../../store/user';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: "signIn",
    setup() {
        const email = ref("");
        const password = ref("");
        const useUser = useUserStore();
        const router = useRouter()
        

        const onSignIn = async () => {
            if(await useUser.signIn(email.value)) {
                router.back();  // go the previous page
            }
            
            // clear email and password
            email.value = "";
            password.value = "";
        }

        return { 
            email, 
            password, 
            onSignIn 
        }
    }
});