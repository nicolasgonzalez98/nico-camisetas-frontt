<script setup>
    import { reactive } from 'vue';
    import { useRouter } from 'vue-router';
    import {userAuthStore} from '../../stores/authStore'

    import InputText from 'primevue/inputtext';
    import Password from 'primevue/password';
    import Button from 'primevue/button';
    import Card from 'primevue/card';
    import Toast from 'primevue/toast';
    import { useToast } from 'primevue/usetoast';

    const authStore = userAuthStore()
    const router = useRouter()

    const toast = useToast()

    const form = reactive({
        email: '',
        password: '',
    });

    const logIn = async () => {
        try {
            
            await authStore.logIn(form)
            router.push('/')
            
        } catch (error) {
            
            toast.add({
            severity: 'error',
            summary: 'Error al iniciar sesión',
            detail: 'Correo o contraseña incorrectos.',
            life: 3000
          });
        }
    }
</script>

<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <Toast />

        <Card class="w-full max-w-md p-6 shadow-lg">
          <template #title>
            <h2 class="text-xl font-semibold text-gray-800">Registro</h2>
          </template>
          <template #content>
            <form @submit.prevent="logIn" class="flex flex-col gap-4">
              <div class="flex flex-col">
                <label for="email" class="text-sm text-gray-700 mb-1">Correo</label>
                <InputText v-model="form.email" id="email" class="w-full" />
              </div>
              <div class="flex flex-col">
                <label for="password" class="text-sm text-gray-700 mb-1">Contraseña</label>
                <Password v-model="form.password" id="password" class="w-full" toggleMask />
              </div>
              <Button label="Ingresar" type="submit" class="w-full mt-4" />
            </form>

            <div class="mt-4 text-center">
              <router-link to="/forgot-password" class="text-blue-500 hover:underline text-sm">
                ¿Olvidaste tu contraseña?
              </router-link>
            </div>

          </template>
        </Card>

        
      </div>
</template>