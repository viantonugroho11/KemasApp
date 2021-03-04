<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Kemas App</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="medium">Kemas App</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card color="primary">
        <ion-card-header>
          <ion-card-subtitle>Dompet Kebaikan</ion-card-subtitle>
          <ion-card-title>Rp.30.000</ion-card-title>
        </ion-card-header>
      </ion-card>
      <ion-grid>
        <ion-row>
          <ion-col v-for="(item, index) in kategoris" :key="index">
            <router-link :to="{name: 'kategori.show', params:{id: item.id }}" class="btn btn-sm btn-primary mr-1">
              <ion-button color="primary">{{ item.nama }}</ion-button>
            </router-link>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-grid>
          <ion-row>
              <ion-col>
                <ion-text color="secondary">
                  <h6>Donasi</h6>
                </ion-text>
               </ion-col>
          </ion-row>
      </ion-grid>
      <ion-grid>
        <!-- <div v-if="programs"> -->
          <ion-slides ref="slider" pager="true" :options="slideOpts">
            <!-- <div> -->
            <ion-slide  v-for="(item,n) in programs" :key="n">
              <ion-card color="primary">
                <ion-card-header>
                  <ion-card-subtitle>2</ion-card-subtitle>
                  <ion-card-title>
                    {{item.nama}}
                  </ion-card-title>
                </ion-card-header>
              </ion-card>
            </ion-slide>
            <!-- </div> -->
          </ion-slides>
        <!-- </div> -->

      </ion-grid>
      <ion-grid>
          <ion-row>
              <ion-col>
                <ion-text color="secondary">
                  <h6>Artikel</h6>
                </ion-text>
               </ion-col>
          </ion-row>
      </ion-grid>
      <ion-grid>
          <ion-slides>
            <ion-slide>
              <ion-card color="primary">
                <ion-card-header>
                  <ion-card-subtitle>1</ion-card-subtitle>
                  <ion-card-title>
                    1
                  </ion-card-title>
                </ion-card-header>
              </ion-card>
            </ion-slide>
          </ion-slides>
      </ion-grid>
      <!-- <ExploreContainer name="Tab 1 page" /> -->
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
IonCard  , IonCardSubtitle, IonCardTitle,
IonSlides, IonSlide
 } from '@ionic/vue';
import { ref } from 'vue'
import { onMounted } from 'vue'
// import { useRoute } from 'vue-router'
import axios from 'axios'
// import ExploreContainer from '@/components/ExploreContainer.vue';

export default  {
  name: 'Tab1',
  components: {  IonHeader, IonToolbar, IonTitle, IonContent, IonPage,
  IonCard  , IonCardSubtitle, IonCardTitle,
  IonSlides, IonSlide },

  setup(){
    const slideOpts = {
    initialSlide: 1,
    slidesPerView: 1,
    loop:true,
    speed: 400
    };
    //inisialisasi vue router on Composition API
    // const router = useRouter()
    //vue router
    // const route = useRoute()
    //state user
    // const res = await axios.get('http://localhost:8000/api/home')
    //inisialisasi Kategori
    const kategoris = ref([])
    //inisialisasi Program
    const programs = ref([])
    
    // programs.value=any
    // programs.ins
    onMounted( async () =>{
      await axios.get('http://localhost:8000/api/home')
        .then(response => {
          //assign state posts with response data
          kategoris.value = response.data.kategori
          programs.value = response.data.program
          console.log(response.data.program);
          
        }).catch(error => {
            console.log(error.response.data)
        })
        console.log(kategoris.value)
    })

    // const loadData = async () => {
    
    //   const response = await axios.get('http://localhost:8000/api/home');
    //   console.log(response.data);
    //   if (response.data) {
    //     kategoris.value = response.data.kategori
        
    //     programs.value = response.data.program
    //     console.log(programs);
    //   }
    // }
    
    //state validation
    //method login
    return {
        // loadData,
        programs,
        kategoris,
        slideOpts // <-- state validation 
        // loginFailed,    // <-- state loggedIn
        // login           // <-- method login
    }
  }
}
  
</script>