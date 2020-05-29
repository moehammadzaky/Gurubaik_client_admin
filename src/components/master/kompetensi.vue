<template>
    <div class="main-panel">
     <div class="content-wrapper">
         <!--start content-->
          <div class="row">
            
              <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">  
                     <div class="row" style="margin-bottom:20px">   
                        <div class="col-lg-9">  
                           <h2 class="card-title"><b>Kompetensi by Mata Pelajaran</b></h2>
                            <div class="row">
                                <div class="col-lg-12"> 
                                    <div class="row">
                                      <div class="col-lg-6">
                                          <label><code>Pilih Kelas*</code></label>
                                          <v-select style="width:100%" label="Kelas_name" :options="dataKelas" v-model="selectedKelas" :value="selectedKelas" @input="setSelected"></v-select>
                                      </div>
                                      <div class="col-lg-6">
                                            <label><code>Pilih Mata Pelajaran*</code></label>
                                           <v-select style="width:100%" label="Mapel_name" :options="Mapel" v-model="selectedMapel" :value="selectedMapel" @input="setSelectedMapel"></v-select>
                                      </div>   
                                    </div>    
                                </div>        
                            </div>    
                        </div>
                        <div class="col-lg-3">
                         <button type="button" class="btn btn-primary toolbar-item" style="width:100%"  v-on:click="showModal">Tambah Kompetensi</button> 
                        </div> 
                     </div> 

                    <table class="table">
                        <thead>
                          <tr>
                      
                            <th>Kelas</th>
                            <th>Mata Pelajaran</th>
                            <th>Kompetensi</th>
                            <th >Action</th>
                          </tr>
                        </thead>
                        <tbody v-if="Kompetensi.length > 0">
                          <tr v-for="kd in displayed" v-bind:key="kd.Id_kd "> 
                         
                            <td>{{ kd.Kelas_name }}</td>
                            <td>{{ kd.Mapel_name}}</td>
                            <td>{{ kd.Kd_name}}</td>
                            <td>
                                <button type="button" class="btn btn-primary" v-on:click="showModalEdit(kd.Id_kd, kd.Kd_name)" style="margin-right:3px">Edit</button>
                                <button type="button" class="btn btn-danger" v-on:click="showModalDelete(kd.Id_kd, kd.Kd_name)">Delete</button>
                            </td>
                          </tr>
                        </tbody>
                         <tbody v-else>
                           <p class="card-description">Data was not found, please select Kelas and Mata Pelajaran</p>
                        </tbody>

                      </table>
                      <!--end table -->
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
         <!--end content -->   
      </div>  

     <modal name="modal">
        <div class="modal-style" style="margin:20px">
          <p class="card-description"> Tambah Kompetensi by Mata Pelajaran</p>
              <form class="forms-sample" @submit.prevent="AddKd">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Pilih Kelas</label>                        
                       <v-select style="width:100%" label="Kelas_name" :options="dataKelas" v-model="selectedKelas" :value="selectedKelas" @input="setSelected"></v-select>
                    </div>
                  
                    <div class="form-group">
                      <label for="exampleInputEmail1">Pilih Mata Pelajaran</label>                        
                      <v-select style="width:100%" label="Mapel_name" :options="Mapel" v-model="selectedMapel" :value="selectedMapel" @input="setSelectedMapel"></v-select>
                    </div>

                    <div class="form-group">
                      <label for="exampleInputPassword1">Nama Kompetensi Dasar</label>
                      <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Input name Kompetensi Dasar" v-model="inputKd">
                    </div>
                    <button style="width:49%" type="submit" class="btn btn-primary mr-2">Tambah Kompetensi</button>
                    <button style="width:49%" class="btn btn-danger" v-on:click="hideModal">Batalkan</button>
              </form>
          </div>
      </modal> 
      <modal name="modal-edit">
        <div class="modal-style" style="margin:20px">
          <p class="card-description"> Ganti Name Kompetensi</p>
              <form class="forms-sample" @submit.prevent="UpdateData">
                
                    <div class="form-group">
                      <label for="exampleInputPassword1">Nama Kompetensi</label>
                      <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Input name kompetensi" v-model="EditKd">
                    </div>
                    <button style="width:49%" type="submit" class="btn btn-primary mr-2" >Ganti Nama</button>
                    <button style="width:49%" class="btn btn-danger" v-on:click="hideModalEdit">Batalkan</button>
              </form>
          </div>
      </modal> 
       <modal name="modal-delete">
        <div class="modal-style" style="margin:20px">
          <p class="card-description"> Apakah yakin menghapus kompetensi {{DelName}}?</p>
           <button style="width:49%" @click="deleteData" class="btn btn-primary mr-2" >Ya,Hapus</button>
           <button style="width:49%" class="btn btn-danger" v-on:click="hideModalDelete">Batalkan</button> 
          </div>
      </modal>

  </div>
</template>


<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
  name: 'kompetensi',  
  data() {
    return {
      dataKelas: [],
      selectedKelas :'',
      inputKd:'',
      users:[],
      Mapel:[],
      EditKd:'',
      EditIdKd :'',
      selectedMapel:'',
      Kompetensi:[],
      page: 1,
      perPage: 5,
      pages: [], 
       DelId :'',
      DelName : ''
    }
     
  },
  mounted() {
    var  users_local = JSON.parse(localStorage.getItem("user") || "[]");
    this.users = users_local;

    this.$http.get('/master/kelas').then(response => {
    this.dataKelas = response.data.values;
    });

  },
  methods: {
      showModal () {
        this.$modal.show('modal');
      },
      hideModal () {
        this.$modal.hide('modal');
      },
      showModalEdit (id, name) {
        this.$modal.show('modal-edit');
        this.EditKd = name
        this.EditIdKd = id
      },
      hideModalEdit () {
        this.$modal.hide('modal-edit');
         this.EditMapel = ''
        this.EditIdMapel = ''
      },
       showModalDelete (id,name) {
        this.$modal.show('modal-delete');
        this.DelId = id
        this.DelName = name
      },
      hideModalDelete () {
        this.$modal.hide('modal-delete');
      },
      AddKd(){
         this.$http.post('/master/kompetensi', { 
                Mapel_id : this.selectedMapel.Id_mapel,
                Kd_name: this.inputKd, 
                Created_by: this.users[0].User_name,
                })
                .then(request => this.Successful(request))
                .catch(() => this.Failed())
      },
      Successful(request){
         this.Kompetensi = request.data.values
         this.page = 1
         this.$modal.hide('modal');
        
      },
      Failed(){

      },
      setSelected(value){
        //get data MAPEL 
          this.$http.get('/master/mapel/'+value.id_kelas).then(response => {
              this.Mapel = response.data.values;
          }).catch(() => this.Mapel = []);
          this.Kompetensi = [];
      },
      setSelectedMapel(value){
        //get data Kompetensi
          this.$http.get('master/kompetensi/'+value.Id_mapel).then(response => {
              this.Kompetensi = response.data.values;
          }).catch(() => this.Kompetensi = []);
      },
      deleteData(){
         this.$http.delete('/master/kompetensi/'+this.selectedMapel.Id_mapel+'/'+this.DelId)
                .then(response => {
            this.Kompetensi = response.data.values
             this.page = 1
             this.$modal.hide('modal-delete');
            }).catch(() => this.Failed())
      },
      UpdateData(){
        this.$http.put('/master/kompetensi/'+this.selectedMapel.Id_mapel, {
              Id : this.EditIdKd,
              kompetensi : this.EditKd,
              username : this.users[0].User_name
        }).then(response => {
             this.Kompetensi = response.data.values
             this.page = 1
             this.$modal.hide('modal-edit');
          }).catch(() => console.log('Error'));
      },
     setPages () {
            let numberOfPages = Math.ceil(this.Kompetensi.length / this.perPage);
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        }, 
        paginate (Kompetensi) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return  Kompetensi.slice(from, to);
        }
    }, 
    computed: {
        displayed () {
            return this.paginate(this.Kompetensi);
        }
    },
    watch: {
        Kompetensi () {
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