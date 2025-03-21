<script setup>
    import { ref, onMounted, watch, nextTick } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useProductStore } from '@/stores/productStore';
    import InputText from 'primevue/inputtext';
    import Button from 'primevue/button';
    import Textarea from 'primevue/textarea';
    import InputNumber from 'primevue/inputnumber';
    import Card from 'primevue/card';
    import { PutObjectCommand } from "@aws-sdk/client-s3";
    import s3Client from "@/awsConfig";
    import Sortable from 'sortablejs';
    

    const route = useRoute();
    const router = useRouter();
    const productStore = useProductStore();
    const isEditing = ref(false);
    
    const product = ref({
        name: '',
        description: '',
        price: null,
        stock: null,
        imageUrls: []
    });

    //AWS
    const selectedFile = ref(null);
    const imageUrls = ref([]);
    const listRef = ref(null);

    const uploadImage = async () => {
      
        if (!selectedFile.value) return alert("Selecciona una imagen");

        const file = selectedFile.value;
        const fileName = `${Date.now()}-${file.name}`;


         // Convertir el archivo en un ArrayBuffer y luego a Uint8Array
        const arrayBuffer = await file.arrayBuffer();
        const fileBuffer = new Uint8Array(arrayBuffer);

        const params = {
          Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
          Key: fileName,
          Body: fileBuffer,
          ContentType: file.type, 
        };

        try {
          
          await s3Client.send(new PutObjectCommand(params));
          imageUrls.value = [...imageUrls.value, { url: encodeURI(`https://${import.meta.env.VITE_AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`) }];
          selectedFile.value = null;

        } catch (error) {
          console.error("Error al subir la imagen", error);
        }
    };

    // Eliminar imagen
    const removeImage = (index) => {
      imageUrls.value.splice(index, 1);
    };

    // Cargar datos si estamos editando
    onMounted(async () => {
        if (route.params.id) {
            isEditing.value = true;
            const existingProduct = await productStore.fetchProductById(route.params.id);
            
            if (existingProduct.images) {
              imageUrls.value = existingProduct.images.map(url => ({ url }));
            }

            //console.log(imageUrls.value)
            product.value = {
              name: existingProduct.name,
              description: existingProduct.description,
              price: existingProduct.price,
              stock: existingProduct.stock,
              imageUrls: imageUrls.value    
            }
        }

        await nextTick();  
        
        if (listRef.value) {
            Sortable.create(listRef.value, {
                animation: 150,
                ghostClass: 'blue-background-class',
                filter: '.quieto'
            });
        }

    });

    const saveProduct = async () => {
      //product.value = JSON.parse(JSON.stringify(product.value))
      if (isEditing.value) {
        console.log(product.value)
        await productStore.updateProduct(route.params.id, product.value);
      } else {
        console.log(product.value)
        await productStore.addProduct(product.value);
      }
      router.push('/admin');
    };

    watch(imageUrls, (newImages) => {
        product.value.imageUrls = newImages;
    }, { deep: true });

</script>

<template>
  <div class="flex justify-center items-center min-h-screen">

    <Card class="w-full max-w-md p-6 shadow-lg">
      <template #title>
        <h2 class="text-xl font-semibold text-gray-800">{{ isEditing ? 'Editar Producto' : 'Agregar Producto' }}</h2>
      </template>
      <template #content>
        <form @submit.prevent="saveProduct" class="flex flex-col gap-4">
          <div>
            <label class="text-sm">Nombre</label>
            <InputText v-model="product.name" class="w-full" />
          </div>
          <div>
            <label class="text-sm">Descripción</label>
            <Textarea v-model="product.description" class="w-full" />
          </div>
          <div>
            <label class="text-sm">Precio</label>
            <InputNumber v-model="product.price" class="w-full" mode="currency" currency="USD" />
          </div>
          <div>
            <label class="text-sm">Stock</label>
            <InputNumber v-model="product.stock" class="w-full" />
          </div>

          <label>Fotos</label>
          <div class="mb-1 flex flex-wrap gap-2">
              <div ref="listRef" class="mb-2 flex flex-wrap gap-2">
                <div v-for="(img, index) in imageUrls" :key="index" class="relative group">
                  <img :src="img.url" alt="Imagen subida" width="150" class="rounded-lg w-24 h-24"/>
                  <!-- Botón de eliminar (X) -->
                  <button 
                    @click.prevent="removeImage(index)"
                    class="absolute top-0 right-0 bg-black-500 text-white w-6 h-6 flex items-center justify-center rounded-full 
                          text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                    >
                    ✕
                  </button>
                </div>
                <label className="w-24 h-24 text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white cursor-pointer shadow-sm
                          border border-primary quieto">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                              </svg>
                          <div>
                              Add image
                          </div>
                          <input type="file" class="hidden" @change="(e) => {
                            e.preventDefault(); 
                            selectedFile = e.target.files[0]; 
                            uploadImage()
                          }">
                </label>
              </div>
              
            
          </div>
          

          <Button :label="isEditing ? 'Actualizar' : 'Guardar'" type="submit" class="w-full mt-4" />
        </form>
      </template>
    </Card>
  </div>
</template>
