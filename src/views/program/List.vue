<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
          <ion-buttons slot="start">
                <ion-back-button default-href="home"></ion-back-button>
          </ion-buttons>
        <ion-title>List Program</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-card color="primary">
        <ion-card-header>
          <ion-card-subtitle>Dompet Kebaikan</ion-card-subtitle>
          <ion-card-title>Rp.00</ion-card-title>
        </ion-card-header>
      </ion-card>
      <ion-grid>
        <ion-row>
          <ion-col v-for="(item, index) in kategoris" :key="index">
              <ion-button color="primary">{{ item.nama }}</ion-button>
          </ion-col>
        </ion-row>
        <ion-row v-for="(item, index) in programs" :key="index" class="ion-grid-padding-lg">
            <router-link :to="{name: 'program.show', params:{id: item.id }}">
            <ion-col size="12" size-xs>
              <ion-card color="primary">
                <ion-row>
                    <ion-col size="3">
                        <!-- <ion-img src="kemas.developmentteam.my.id/storage/PhotoProgram/atZiXOm1QgOeDQRUZDVx594n1x55PGaKuO0vfBm8.png"   
                        </ion-img> -->
                        <img src="http://localhost:8000/storage/PhotoProgram/">
                    </ion-col>
                    <ion-col>
                        <ion-card-content>
                            <p>{{item.nama}}</p>
                            <p>{{item.detail_singkat}}</p>
                            <ion-progress-bar color="secondary" value="0.5"></ion-progress-bar>
                        </ion-card-content>
                    </ion-col>
                </ion-row>      
              </ion-card>
            </ion-col>
            </router-link>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonTitle, IonToolbar,
    IonContent, IonHeader, IonPage,  
IonCard,IonCardContent  , IonCardSubtitle, IonCardTitle,
//IonLabel, IonInput, IonItem,
IonButton ,
//progressbar
IonProgressBar,
//gird
IonCol, IonGrid, IonRow} from '@ionic/vue';
import { reactive, ref } from 'vue'
import { onMounted } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import axios from 'axios'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {
    //component
    //progressbar
    IonProgressBar,
    //
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    //card
    IonCard ,
    IonCardSubtitle, 
    IonCardTitle,
    IonCardContent,
    //input
    // IonLabel, 
    // IonInput, 
    // IonItem,
    //button
    IonButton,
    //grid
    IonCol, 
    IonGrid, 
    IonRow
  },
  setup(){
      const slideOpts = {
      initialSlide: 1,
      speed: 400
      };
      //vue router
            const route = useRoute()
            //inisialisasi vue router on Composition API
            const router = useRouter()

            //state user
            const user = reactive({
                email: '',
                password: '',
            })
            //inisialisasi Kategori
            const kategoris = ref([])
            //inisialisasi Program
            const programs = ref([])

            onMounted(() =>{
              axios.get(`http://localhost:8000/api/program/${route.params.id}`)
                .then(response => {
                  console.log(response.data.data)
                  //assign state posts with response data
                  programs.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)

                })
            })
            //state validation
            const validation = ref([])

            //state loginFailed
            // const loginFailed = ref(null)

            //method login
            function login() {

                //define variable 
                const email = user.email
                const password = user.password

                //send server with axios
                axios.post('http://localhost:8000/api/login', {
                        email,
                        password,
                })
                .then(response => {

                    if(response.data.success) {

                        //set token
                        localStorage.setItem('token', response.data.token)

                        //redirect ke halaman dashboard
                        return router.push({
                            name: 'my'
                        })
                    }

                    //set state loggedIn to true
                    // loginFailed.value = true


                }).catch(error => {
                    //set validation dari error response
                    validation.value = error.response.data
                })

            }
            return {
                programs,
                kategoris,
                slideOpts,
                user,           // <-- state user
                validation,     // <-- state validation 
                // loginFailed,    // <-- state loggedIn
                login           // <-- method login
            }
  }
});
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>