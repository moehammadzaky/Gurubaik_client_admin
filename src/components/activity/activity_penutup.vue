<template>

    <div class="main-panel">
     <div class="content-wrapper">
         <!--start content-->
          <div class="row">
            <div class="col-md-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Filter Kegiatan Pembuka</h4>
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
                                          <label><code>Filter Jenjang</code></label>
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
                                    <table class="table">
                                            <thead>
                                            <tr>
                                                <th>Activity ID</th>
                                                <th>Title</th>
                                                <th>Status</th>
                                                <th>Jenjang</th>
                                                <th>Kelas</th>
                                                <th>Mata Pelajaran</th>
                                                <th>Kompetensi</th>
                                                <th>Topik</th>
                                                <th >Action</th>
                                            </tr>
                                            </thead>
                                            <tbody v-if="dataActivity.length > 0">
                                            <tr v-for="item in displayed" v-bind:key="item.Id_activity "> 
                                              
                                                <td><router-link :to="{ name: 'Detail', params: { Activity_id: item.Id_activity } }"><code style="font-size:14px">{{ item.Id_activity }}</code></router-link></td>
                                            <td>{{ item.Activity_title}}</td>
                                                <td>{{ item.Activity_status}} / {{ item.Activity_publish }}</td>
                                                <td>{{ item.Jenjang_name }}</td>
                                                <td> {{ item.Kelas_name }}</td>
                                                <td>{{ item.Mapel_name}}</td>
                                                <td> {{ item.Kd_name }}</td>
                                                <td> {{ item.Topik_name}}</td>
                                                <td>
                                                    <router-link :to="{ name: 'EditActivity', params: { Id_activity: item.Id_activity } }">
                                                         <button type="button" class="btn btn-primary"  style="margin-right:3px">Edit</button>
                                                    </router-link>
                                                      <button type="button" class="btn btn-danger" @click="showModalDelete(item.Id_activity)">Delete</button>
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

          
    <modal name="modal-delete">
        <div class="modal-style" style="margin:20px">
          <p class="card-description"> Apakah yakin menghapus activity dengan ID {{DelId}}?</p>
           <button style="width:49%" @click="deleteData" class="btn btn-primary mr-2" >Ya,Hapus</button>
           <button style="width:49%" class="btn btn-danger" v-on:click="hideModalDelete">Batalkan</button> 
          </div>
      </modal>


     </div> 
    </div>         
</template>


<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
export default {
    name: 'activity',
    data(){
        return{
            dataActivity:[],
            type : 'Penutup',
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
             DelId :''
        }
    },
    mounted(){
        //get data kelas
        this.$http.get('/activity/'+this.type).then(response => {
            this.dataActivity = response.data.values;
            this.datalength = response.data.values.length;
        });
    },
    methods:{
         setSelectedJenjang(){
           this.$http.get('/master/kelas/'+this.selectedJenjang.jenjang).then(response => {
              this.dataKelas = response.data.values;
            }).catch(() => this.dataKelas = []);
            
           let data = []
           if (this.selectedJenjang !== null){
                this.$http.get('/activity/'+this.type).then(response => {
                    data = response.data.values;
                    var result = data.filter(jenjang => {
                        if (jenjang.Jenjang_name === this.selectedJenjang.jenjang){
                            return jenjang
                        }
                    });
                    this.dataActivity = result
                });
            }else{
                 this.$http.get('/activity/'+this.type).then(response => {
                      this.dataActivity = response.data.values;
                     });
            }  
        },setSelectedKelas(){
             this.$http.get('/master/mapel/'+this.selectedKelas.id_kelas).then(response => {
              this.dataMapel = response.data.values;
            }).catch(() => this.dataMapel = []);
        
            let data = []
           if (this.selectedKelas!== null){
                this.$http.get('/activity/'+this.type).then(response => {
                    data = response.data.values;
                    var result = data.filter(kelas => {
                        if (kelas.Kelas_name === this.selectedKelas.Kelas_name){
                            return kelas
                        }
                    });
                    this.dataActivity = result
                });
            }else{
                 this.$http.get('/activity/'+this.type).then(response => {
                      this.dataActivity = response.data.values;
                     });
            }  

        },setSelectedMapel(){
            //get data Kompetensi
            this.$http.get('master/kompetensi/'+this.selectedMapel.Id_mapel).then(response => {
                this.dataKompetensi = response.data.values;
            }).catch(() => this.dataKompetensi= []);
            
            let data = []
           if (this.selectedMapel!== null){
                this.$http.get('/activity/'+this.type).then(response => {
                    data = response.data.values;
                    var result = data.filter(mapel => {
                        if (mapel.Mapel_name === this.selectedMapel.Mapel_name){
                            return mapel
                        }
                    });
                    this.dataActivity = result
                });
            }else{
                 this.$http.get('/activity/'+this.type).then(response => {
                      this.dataActivity = response.data.values;
                     });
            }  
        },setSelectedKompetensi(){
            this.$http.get('master/topik/'+this.selectedKompetensi.Id_kd).then(response => {
              this.dataTopik = response.data.values;
            }).catch(() => this.dataTopik = []);
            let data = []
           if (this.selectedKompetensi!== null){
                this.$http.get('/activity/'+this.type).then(response => {
                    data = response.data.values;
                    var result = data.filter(kd => {
                        if (kd.Kd_name === this.selectedKompetensi.Kd_name){
                            return kd
                        }
                    });
                    this.dataActivity = result
                });
            }else{
                 this.$http.get('/activity/'+this.type).then(response => {
                      this.dataActivity = response.data.values;
                     });
            }  

        },setSelectedTopik(){
             let data = []
           if (this.selectedTopik !== null){
                this.$http.get('/activity/'+this.type).then(response => {
                    data = response.data.values;
                    var result = data.filter(topik => {
                        if (topik.Topik_name === this.selectedTopik.Topik_name){
                            return topik
                        }
                    });
                    this.dataActivity = result
                });
            }else{
                 this.$http.get('/activity/'+this.type).then(response => {
                      this.dataActivity = response.data.values;
                     });
            }  
        }, showModalDelete (id) {
            this.$modal.show('modal-delete');
            this.DelId = id
        },
        hideModalDelete () {
            this.$modal.hide('modal-delete');
        },deleteData(){
         this.$http.delete('/activity/'+this.DelId+'/'+this.type)
                .then(response => {
            this.dataActivity = response.data.values
             this.page = 1
             this.$modal.hide('modal-delete');
            }).catch(() => console.log("Error"))
        }, 
        
        setPages () {
            let numberOfPages = Math.ceil(this.dataActivity.length / this.perPage);
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        }, 
        paginate (dataActivity) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return  dataActivity.slice(from, to);
        }
    },
    computed: {
        displayed () {
            return this.paginate(this.dataActivity);
        }
    },
    watch: {
        dataActivity () {
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