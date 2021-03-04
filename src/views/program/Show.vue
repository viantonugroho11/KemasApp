<template>
  <ion-page>
    <ion-header :translucent="true">
      <!-- <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar> -->
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-card>
        <img src="http://localhost:8000/storage/PhotoProgram/atZiXOm1QgOeDQRUZDVx594n1x55PGaKuO0vfBm8.png" />
        <ion-card-header>
          <ion-card-subtitle>Target {{showpg.nominal}}</ion-card-subtitle>
          <ion-card-title>{{showpg.nama}}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
            <div v-html="showpg.detail"></div>
          <!-- {{showpg.detail}} -->
        </ion-card-content>
      </ion-card>
      <ion-grid>
        <ion-row>
          <ion-col>
              <ion-button color="primary">1</ion-button>
          </ion-col>
          <ion-col>
            <ion-button color="primary">1</ion-button>
          </ion-col>
          <ion-col>
            <ion-button color="primary">1</ion-button>
          </ion-col>
          <ion-col>
            <ion-button color="primary">1</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage,  
IonCard ,
IonCardContent ,
IonCardSubtitle, IonCardTitle,
//IonLabel, IonInput, IonItem,
IonButton ,
//gird
IonCol, IonGrid, IonRow} from '@ionic/vue';
import { reactive, ref } from 'vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {
    //component

    IonContent,
    IonHeader,
    IonPage,
    // IonTitle,
    // IonToolbar,
    //card
    IonCard ,
    IonCardContent , 
    IonCardSubtitle, 
    IonCardTitle,
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
                  //vue router
            const route = useRoute()
            //inisialisasi vue router on Composition API
            // const router = useRouter()

            //state user
            const user = reactive({
                email: '',
                password: '',
            })
            //inisialisasi Kategori
            const kategoris = ref([])
            //inisialisasi Program
            const programs = ref([])

            const showpg=reactive({
                id:'',
                nama:'',
                detail:'',
                batas:'',
                nominal:''
            })

            onMounted(() =>{
              axios.get(`http://localhost:8000/api/program/show/${route.params.id}`)
                .then(response => {
                  console.log(response.data.data)
                  //assign state posts with response data
                  showpg.id = response.data.data.id
                  showpg.nama = response.data.data.nama
                  showpg.detail = response.data.data.detail
                  showpg.batas = response.data.data.batas
                  showpg.nominal = response.data.data.nominal
                }).catch(error => {
                    console.log(error.response.data)

                })
            })
            //state validation
            const validation = ref([])

            //state loginFailed
            // const loginFailed = ref(null)

            return {
                showpg,
                programs,
                kategoris,
                user,           // <-- state user
                validation    // <-- state validation 
                // loginFailed,    // <-- state loggedIn
                // login           // <-- method login
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