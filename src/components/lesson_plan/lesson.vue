<template>

    <div class="main-panel">
     <div class="content-wrapper">
         <!--start content-->
          <div class="row">
            <div class="col-md-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Semua Rencana Pembelajaran</h4>
                        <div class="row">
                                <div class="col-lg-12"> 
                                    <div class="row">
                                      <!--
                                      <div class="col-lg-3">
                                          <label><code>Filter by Status</code></label>
                                          <v-select style="width:100%" label="status" :options="dataStatus" v-model="selectedStatus" :value="selectedStatus" @input="setSelectedStatus"></v-select>
                                      </div>
                                     -->

                                      <div class="col-lg-4">
                                          <label><code>Filter by Jenjang</code></label>
                                          <v-select style="width:100%" label="jenjang" :options="dataJenjang" v-model="selectedJenjang" :value="selectedJenjang" @input="setSelectedJenjang"></v-select>
                                      </div>

                                      <div class="col-lg-4">
                                          <label><code>Filter Kelas</code></label>
                                          <v-select style="width:100%" label="Kelas_name" :options="dataKelas" v-model="selectedKelas" :value="selectedKelas" @input="setSelectedKelas"></v-select>
                                       </div>

                                       <div class="col-lg-4">
                                          <label><code>Filter Mata Pelajaran</code></label>
                                          <v-select style="width:100%" label="Mapel_name" :options="dataMapel" v-model="selectedMapel" :value="selectedMapel" @input="setSelectedMapel"></v-select>
                                       </div>
                                       <div class="col-lg-4">
                                          <label><code>Filter Kompetensi</code></label>
                                          <v-select style="width:100%" label="Kd_name" :options="dataKompetensi" v-model="selectedKompetensi" :value="selectedKompetensi" @input="setSelectedKompetensi"></v-select>
                                       </div>
                                       <div class="col-lg-4">
                                          <label><code>Filter Topik</code></label>
                                          <v-select style="width:100%" label="Topik_name" :options="dataTopik" v-model="selectedTopik" :value="selectedTopik" @input="setSelectedTopik"></v-select>
                                       </div>
                                        
                                      
                                    </div>    
                                </div>        
                        </div> 
                  </div>
                </div>
            </div>      
          </div>

           <div class="row" >
                <div class="col-md-12 grid-margin stretch-card">
                    <div class="card">
                         <div class="card-body">
                             <div style="overflow-x:auto;">
                                <table class="table" >
                                        <thead>
                                        <tr>
                                  
                                            <th>Lesson Plan Id</th>
                                            <th>Title</th>
                                            <th>Kegiatan Pembuka</th>
                                            <th>Kegiatan Inti</th>
                                            <th>Kegiatan Penutup</th>
                                            <th>Status</th>
                                            <th>User</th>
                                            <th >Action</th>
                                        </tr>
                                        </thead>
                                        <tbody v-if="data.length > 0">
                                        <tr v-for="(item,index) in displayed" v-bind:key="index "> 
                                         
                                            <td><router-link :to="{ name: 'Lesson', params: { Lesson_id: item.Id_lesson_plan}}"><code style="font-size:14px">{{ item.Id_lesson_plan}}</code></router-link></td>
                                            <td>{{ item.Title_lesson_plan }}</td>
                                            <td v-if="item.Activity_pembuka_id"><router-link :to="{ name: 'Detail', params: { Activity_id: item.Activity_pembuka_id }}">{{ item.Activity_pembuka_id }}</router-link></td>
                                            <td v-else>Tidak ada</td>
                                            <td v-if="item.Activity_Inti_id"><router-link :to="{ name: 'Detail', params: { Activity_id: item.Activity_Inti_id }}">{{ item.Activity_Inti_id }}</router-link></td>
                                            <td v-else>Tidak ada</td>
                                            <td  v-if="item.Activity_penutup_id"><router-link :to="{ name: 'Detail', params: { Activity_id: item.Activity_penutup_id }}">{{ item.Activity_penutup_id }}</router-link></td>
                                            <td v-else>Tidak ada</td>
                                            <td>{{ item.Lesson_plan_status }}</td>
                                            <td><router-link :to="{ path: '/users', query: { email: item.User_email }}"> {{ item.User_email }}</router-link></td>
                                        
                                            <td>
                                                <router-link :to="{ name: 'Lesson', params: { Lesson_id: item.Id_lesson_plan}}">
                                                    <button type="button" class="btn btn-primary"  style="margin-right:3px">Detail</button>
                                                </router-link>
                                            </td>
                                        </tr>
                                        </tbody>
                                        <tbody v-else>
                                        <p class="card-description">Data was not found, please select the correct Filter</p>
                                        </tbody>

                                </table>
                                 <div v-if="displayed.length > 0">
                                        <nav  aria-label="Page navigation example" style="margin-top:20px">
                                        <ul class="pagination">
                                            <li class="page-item">
                                            <button type="button" class="page-link" v-if="page != 1" @click="page--"> Previous </button>
                                            </li>
                                            
                                            <li class="page-item">
                                            <button type="button" class="page-link" v-if="page < pages.length" @click="page++"> Next </button>
                                            </li>
                                        </ul>
                                        </nav>	
                                    </div>
                             </div>
                         </div>   
                    </div>    
                </div>    
          </div>
     </div> 
    </div>         
</template>


<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
export default {
    name: 'Lesson_Plan',
    data(){
        return{
            data:[],
            datalength :'',
            selectedStatus:'',
            selectedJenjang:'',
            selectedKelas :'',
            selectedMapel :'',
            selectedKompetensi :'',
            selectedTopik :'',
            dataStatus : [{status: 'ok'},{status: 'draft'}],
            dataJenjang :[{jenjang: 'SD'},{jenjang: 'SMP'},{jenjang: 'SMA'}],
            dataKelas :[],
            dataMapel :[],
            dataKompetensi :[],
            dataTopik :[],
            page: 1,
            perPage: 5,
            pages: [], 
        }
    },
    mounted(){
        //get data kelas
        this.$http.get('/lesson').then(response => {
            this.data = response.data.values;
        });
    },
    methods:{
         setSelectedJenjang(){
           this.$http.get('/master/kelas/'+this.selectedJenjang.jenjang).then(response => {
              this.dataKelas = response.data.values;
            }).catch(() => this.dataKelas = []);
            
           let datatmp = []
           if (this.selectedJenjang !== null){
                this.$http.get('/lesson').then(response => {
                    datatmp = response.data.values;
                    var result = datatmp.filter(jenjang => {
                        if (jenjang.Jenjang_name === this.selectedJenjang.jenjang){
                            return jenjang
                        }
                    });
                    this.data = result
                });
            }else{
                 this.$http.get('/lesson').then(response => {
                      this.data= response.data.values;
                     });
            }  
        },setSelectedKelas(){
             this.$http.get('/master/mapel/'+this.selectedKelas.id_kelas).then(response => {
              this.dataMapel = response.data.values;
            }).catch(() => this.dataMapel = []);
        
            let datatmp = []
           if (this.selectedKelas!== null){
                this.$http.get('/lesson').then(response => {
                    datatmp = response.data.values;
                    var result = datatmp.filter(kelas => {
                        if (kelas.Kelas_name === this.selectedKelas.Kelas_name){
                            return kelas
                        }
                    });
                    this.data = result
                });
            }else{
                  this.$http.get('/lesson').then(response => {
                      this.data= response.data.values;
                     });
            }  

        },setSelectedMapel(){
            //get data Kompetensi
            this.$http.get('master/kompetensi/'+this.selectedMapel.Id_mapel).then(response => {
                this.dataKompetensi = response.data.values;
            }).catch(() => this.dataKompetensi= []);
            
            let datatmp = []
           if (this.selectedMapel!== null){
                this.$http.get('/lesson').then(response => {
                    datatmp = response.data.values;
                    var result = datatmp.filter(mapel => {
                        if (mapel.Mapel_name === this.selectedMapel.Mapel_name){
                            return mapel
                        }
                    });
                    this.data = result
                });
            }else{
                 this.$http.get('/lesson').then(response => {
                      this.data= response.data.values;
                     });
            }  
        },setSelectedKompetensi(){
            this.$http.get('master/topik/'+this.selectedKompetensi.Id_kd).then(response => {
              this.dataTopik = response.data.values;
            }).catch(() => this.dataTopik = []);
            let datatmp = []
           if (this.selectedKompetensi!== null){
                this.$http.get('/lesson').then(response => {
                    datatmp = response.data.values;
                    var result = datatmp.filter(kd => {
                        if (kd.Kd_name === this.selectedKompetensi.Kd_name){
                            return kd
                        }
                    });
                    this.data = result
                });
            }else{
                 this.$http.get('/lesson').then(response => {
                      this.data = response.data.values;
                     });
            }  

        },setSelectedTopik(){
             let datatmp = []
           if (this.selectedTopik !== null){
                this.$http.get('/lesson').then(response => {
                    datatmp = response.data.values;
                    var result = datatmp.filter(topik => {
                        if (topik.Topik_name === this.selectedTopik.Topik_name){
                            return topik
                        }
                    });
                    this.data = result
                });
            }else{
                 this.$http.get('/lesson').then(response => {
                      this.data  = response.data.values;
                     });
            }  
        },
        setPages () {
            let numberOfPages = Math.ceil(this.data.length / this.perPage);
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        }, 
        paginate (data) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return  data.slice(from, to);
        }
    },
    computed: {
        displayed () {
            return this.paginate(this.data);
        }
    },
    watch: {
        data () {
            this.setPages();
        }
    },
    components:{
      'v-select': vSelect,
    },
}
</script>


<style>
.vs--single .vs__selected {
    font-size: 12px !important;
    background-color: transparent;
    border-color: transparent;
}
.vm--modal {
    height: auto !important;
}
.vs__dropdown-toggle {
    height: 31px;
}
</style>