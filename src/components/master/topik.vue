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
                           <h2 class="card-title"><b>Topik Pembelajaran by Kompetensi</b></h2>
                            <div class="row">
                                <div class="col-lg-12"> 
                                    <div class="row">
                                      <div class="col-lg-4">
                                          <label><code>Pilih Kelas*</code></label>
                                          <v-select style="width:100%" label="Kelas_name" :options="dataKelas" v-model="selectedKelas" :value="selectedKelas" @input="setSelected"></v-select>
                                      </div>
                                      <div class="col-lg-4">
                                            <label><code>Pilih Mata Pelajaran*</code></label>
                                           <v-select style="width:100%" label="Mapel_name" :options="Mapel" v-model="selectedMapel" :value="selectedMapel" @input="setSelectedMapel"></v-select>
                                      </div> 
                                       <div class="col-lg-4">
                                            <label><code>Pilih Kompetensi*</code></label>
                                           <v-select style="width:100%" label="Kd_name" :options="Kompetensi" v-model="selectedKd" :value="selectedKd" @input="setSelectedKd"></v-select>
                                      </div>   
                                    </div>    
                                </div>        
                            </div>    
                        </div>
                        <div class="col-lg-3">
                         <button type="button" class="btn btn-primary toolbar-item" style="width:100%"  v-on:click="showModal">Tambah Topik</button> 
                        </div> 
                     </div> 

                    <table class="table">
                        <thead>
                          <tr>
                            <th>Kelas</th>
                            <th>Mata Pelajaran</th>
                            <th >Kompetensi </th>
                            <th >Topik Pembelajaran</th>
                            <th >Action</th>
                          </tr>
                        </thead>
                        <tbody v-if="Topik.length > 0">
                          <tr v-for="item in displayed" v-bind:key="item.Id_topik "> 
                            <td>{{ item.Kelas_name }}</td>
                            <td>{{ item.Mapel_name}}</td>
                            <td>{{ item.Kd_name}}</td>
                            <td>{{ item.Topik_name}}</td>
                            <td>
                                <button type="button" class="btn btn-primary" v-on:click="showModalEdit(item.Id_topik, item.Topik_name)" style="margin-right:3px">Edit</button>
                                <button type="button" class="btn btn-danger" v-on:click="showModalDelete(item.Id_topik, item.Topik_name)">Delete</button>
                            </td>
                          </tr>
                        </tbody>
                         <tbody v-else>
                           <p class="card-description">Data was not found, please select Kelas, Mata Pelajaran and Kompetensi</p>
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
          <p class="card-description"> Tambah Topik Pembelajaran by Kompetensi</p>
              <form class="forms-sample" @submit.prevent="AddTopik">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Pilih Kelas</label>                        
                       <v-select style="width:100%" label="Kelas_name" :options="dataKelas" v-model="selectedKelas" :value="selectedKelas" @input="setSelected"></v-select>
                    </div>
                  
                    <div class="form-group">
                      <label for="exampleInputEmail1">Pilih Mata Pelajaran</label>                        
                      <v-select style="width:100%" label="Mapel_name" :options="Mapel" v-model="selectedMapel" :value="selectedMapel" @input="setSelectedMapel"></v-select>
                    </div>
                    
                    <div class="form-group">
                      <label for="exampleInputEmail1">Pilih Kompetensi</label>                        
                      <v-select style="width:100%" label="Kd_name" :options="Kompetensi" v-model="selectedKd" :value="selectedKd" @input="setSelectedKd"></v-select>
                    </div>

                    <div class="form-group">
                      <label for="exampleInputPassword1">Masukkan Topik Pembelajaran</label>
                      <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Input name Topik Pembelajaran" v-model="inputTopik">
                    </div>
                    
                     <label><code>Atau, Import CSV </code></label>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Pilih File (.CSV)</label>
                        <input type="file" id="file" ref="filecsv" accept=".csv" v-on:change="handleFileUpload()" class="form-control file-upload-info" style="padding-top:5px"/>
                    </div>


                    <button style="width:49%" type="submit" class="btn btn-primary mr-2">Tambah Topik</button>
                    <button style="width:49%" class="btn btn-danger" v-on:click="hideModal">Batalkan</button>
              </form>
          </div>
      </modal> 
      <modal name="modal-edit">
        <div class="modal-style" style="margin:20px">
          <p class="card-description"> Ganti Nama Topik Pembelajaran</p>
              <form class="forms-sample" @submit.prevent="UpdateData">
                
                    <div class="form-group">
                      <label for="exampleInputPassword1">Nama Topik</label>
                      <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Input name Topik" v-model="EditTopik">
                    </div>
                    <button style="width:49%" type="submit" class="btn btn-primary mr-2" >Ganti Nama</button>
                    <button style="width:49%" class="btn btn-danger" v-on:click="hideModalEdit">Batalkan</button>
              </form>
          </div>
      </modal> 
       <modal name="modal-delete">
        <div class="modal-style" style="margin:20px">
          <p class="card-description"> Apakah yakin menghapus topik {{DelName}}?</p>
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
  name: 'topik',  
  data() {
    return {
      dataKelas: [],
      selectedKelas :'',
      inputTopik:'',
      users:[],
      Mapel:[],
      EditTopik:'',
      EditIdTopik:'',
      selectedMapel:'',
      selectedKd:'',
      selectedTopik:'',
      Kompetensi:[],
      Topik:[],
      page: 1,
      perPage: 5,
      pages: [], 
      DelId :'',
      DelName : '',
      csv :''
    }
     
  },
  mounted() {
    //get local storage
    var  users_local = JSON.parse(localStorage.getItem("user") || "[]");
    this.users = users_local;

    //get data kelas
    this.$http.get('/master/kelas').then(response => {
    this.dataKelas = response.data.values;
    });

  },
  methods: {
      handleFileUpload(){
        this.csv = this.$refs.filecsv.files[0];
      },
      showModal () {
        this.$modal.show('modal');
      },
      hideModal () {
        this.$modal.hide('modal');
      },
      showModalEdit (id, name) {
        this.$modal.show('modal-edit');
        this.EditTopik = name
        this.EditIdTopik = id
      },
      hideModalEdit () {
        this.$modal.hide('modal-edit');
         this.EditTopik = ''
        this.EditIdTopik = ''
      },
      showModalDelete (id,name) {
        this.$modal.show('modal-delete');
        this.DelId = id
        this.DelName = name
      },
      hideModalDelete () {
        this.$modal.hide('modal-delete');
      },
      AddTopik(){

        let formData = new FormData();
        let file = this.csv;
        formData.append('file', file);
        formData.append('Created_by', this.users[0].User_name);
      
      if (this.csv === ''){
         this.$http.post('/master/topik', { 
                Kd_id : this.selectedKd.Id_kd,
                Topik_name: this.inputTopik, 
                Created_by: this.users[0].User_name,
                })
                .then(request => this.Successful(request))
                .catch(() => this.Failed())
      }else{
        this.$http.post('/master/topik/csv/'+this.selectedKd.Id_kd, formData,{
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                })
                .then(request => this.Successful(request))
                .catch(() => this.Failed())
      }      
      },
      Successful(request){
         this.Topik = request.data.values
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
          this.Topik = [];
      },
      setSelectedMapel(value){
        //get data Kompetensi
          this.$http.get('master/kompetensi/'+value.Id_mapel).then(response => {
              this.Kompetensi = response.data.values;
          }).catch(() => this.Kompetensi = []);
          this.Topik = [];
      },
      setSelectedKd(value){
        //get data Topik
          this.$http.get('master/topik/'+value.Id_kd).then(response => {
              this.Topik = response.data.values;
          }).catch(() => this.Topik = []);
      }, 
      deleteData(){
         this.$http.delete('/master/topik/'+this.selectedKd.Id_kd+'/'+this.DelId)
                .then(response => {
            this.Topik = response.data.values
             this.page = 1
             this.$modal.hide('modal-delete');
            }).catch(() => this.Failed())
      },
      UpdateData(){
        this.$http.put('/master/topik/'+this.selectedKd.Id_kd, {
              Id : this.EditIdTopik,
              topik : this.EditTopik,
              username : this.users[0].User_name
        }).then(response => {
             this.Topik = response.data.values
              this.page = 1
             this.$modal.hide('modal-edit');
          }).catch(() => console.log('Error'));
      },
        setPages () {
            let numberOfPages = Math.ceil(this.Topik.length / this.perPage);
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        }, 
        paginate (Topik) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return  Topik.slice(from, to);
        }
    },
     computed: {
        displayed () {
            return this.paginate(this.Topik);
        }
    },
    watch: {
        Topik () {
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
    top:100px !important;
}
.vs__dropdown-toggle {
    height: 31px;
}
</style>