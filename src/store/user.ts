import { User } from './../models/user';
import { defineStore} from "pinia";
import axios, { AxiosError } from 'axios';

const signInUrl = "http://localhost:4001/post/signin";
interface UserState {
    userInfo: User
}

export const useUserStore = defineStore({
    id:"userStore",
    state: ():UserState =>({ 
        userInfo: {} as User
    }),
    actions: {
        async signIn(email: string) {
            try{
                const response = await axios.post<User>(signInUrl, { email: email });
                const user = await response.data;

                if(user) {
                    this.userInfo = user;
                    return true;
                }
            }catch(error) {
                const err = error as AxiosError;
            }

            // failed to login
            return false;
        }
    },
    getters: {
        isAuthenticated() {
            if (this.userInfo && this.userInfo.id) {
                return true;
            }

            // else not authenticated
            return false;
        }
    }
});