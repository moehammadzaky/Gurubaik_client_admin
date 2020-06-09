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
                           <h2 class="card-title"><b>Mata Pelajaran by Kelas</b></h2> 
                           <label><code>Pilih Kelas*</code></label>      
                            <v-select style="width:40%" label="Kelas_name" :options="dataKelas" v-model="selectedKelas" :value="selectedKelas" @input="setSelected"></v-select>
                        </div>
                        <div class="col-lg-3">
                         <button type="button" class="btn btn-primary toolbar-item" style="width:100%"  v-on:click="showModal">Tambah Mata Pelajaran</button> 
                        </div> 
                     </div> 

                    <table class="table">
                        <thead>
                          <tr>
                            <th>Jenjang</th>
                            <th>Kelas</th>
                            <th>Mata Pelajaran</th>
                            <th >Action</th>
                          </tr>
                        </thead>
                        <tbody v-if="Mapel.length > 0">
                          <tr v-for="(mapel,index) in displayed" v-bind:key="index"> 
                            <td>{{ mapel.Jenjang_id }}</td>
                            <td>{{ mapel.Kelas_name}}</td>
                            <td>{{ mapel.Mapel_name}}</td>
                            <td>
                                <button type="button" class="btn btn-primary" v-on:click="showModalEdit(mapel.Id_mapel, mapel.Mapel_name)" style="margin-right:3px">Edit</button>
                                <button type="button" class="btn btn-danger" v-on:click="showModalDelete(mapel.Id_mapel, mapel.Mapel_name)">Delete</button>
                            </td>
                          </tr>
                        </tbody>
                         <tbody v-else>
                           <p class="card-description">Data was not found, please select Kelas</p>
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
          <p class="card-description"> Tambah Mata Pelajaran by Kelas </p>
              <form class="forms-sample" @submit.prevent="AddMapel">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Piih Kelas</label>                        
                      <v-select label="Kelas_name" :options="dataKelas" v-model="selectedKelas"></v-select>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Nama Mata Pelajaran</label>
                      <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Input name mata pelajaran" v-model="inputMapel">
                    </div>
                    <label><code>Atau, Import CSV </code></label>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Pilih File (.CSV)</label>
                        <input type="file" id="file" ref="filecsv" accept=".csv" v-on:change="handleFileUpload()" class="form-control file-upload-info" style="padding-top:5px"/>
                    </div>


                    <button style="width:49%" type="submit" class="btn btn-primary mr-2">Tambah Mata Pelajaran</button>
                    <button style="width:49%" class="btn btn-danger" v-on:click="hideModal">Batalkan</button>
              </form>
          </div>
      </modal> 
      <modal name="modal-edit">
        <div class="modal-style" style="margin:20px">
          <p class="card-description"> Ganti Nama Mata Pelajaran</p>
              <form class="forms-sample" @submit.prevent="UpdateMapel">
                
                    <div class="form-group">
                      <label for="exampleInputPassword1">Nama Mata Pelajaran</label>
                      <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Input name mata pelajaran" v-model="EditMapel">
                    </div>
                    <button style="width:49%" type="submit" class="btn btn-primary mr-2" >Ganti Nama</button>
                    <button style="width:49%" class="btn btn-danger" v-on:click="hideModalEdit">Batalkan</button>
              </form>
          </div>
      </modal> 
      
      <modal name="modal-delete">
        <div class="modal-style" style="margin:20px">
          <p class="card-description"> Apakah yakin menghapus mata pelajaran {{DelName}}?</p>
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
  name: 'mapel',  
  data() {
    return {
      dataKelas: [],
      selectedKelas :'',
      inputMapel:'',
      users:[],
      Mapel:[],
      EditMapel:'',
      EditIdMapel :'',
      page: 1,
      perPage: 5,
      pages: [], 
      DelId :'',
      DelName : '',
      csv : ''
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
      showModalEdit (id, mapel) {
        this.$modal.show('modal-edit');
        this.EditMapel = mapel
        this.EditIdMapel = id
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
      AddMapel(){
        let formData = new FormData();
         let file = this.csv;
        formData.append('file', file);
        formData.append('Created_by', this.users[0].User_name);
      
        if (this.csv === ''){
              this.$http.post('/master/mapel/'+this.selectedKelas.id_kelas, { 
                Mapel_name: this.inputMapel, 
                Created_by: this.users[0].User_name,
                })
                .then(request => this.Successful(request))
                .catch(() => this.Failed())
        }else{
           this.$http.post('/master/mapel/csv/'+this.selectedKelas.id_kelas, formData,{
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                })
                .then(request => this.Successful(request))
                .catch(() => this.Failed())
        }
       
      },
      Successful(request){
         this.Mapel = request.data.values
         this.page = 1
         this.$modal.hide('modal');
      },
      Failed(){
        
      },
      setSelected(value){
        //get data MAPEL 
          this.$http.get('/master/mapel/'+value.id_kelas).then(response => {
              this.Mapel = response.data.values;
              this.page = 1
          }).catch(() => this.Mapel = []);
      },
      deleteData(){
         this.$http.delete('/master/mapel/'+this.selectedKelas.id_kelas+'/'+this.DelId)
                .then(response => {
            this.Mapel = response.data.values
             this.page = 1
             this.$modal.hide('modal-delete');
            }).catch(() => this.Failed())
      },
      UpdateMapel(){
        this.$http.put('/master/mapel/'+this.selectedKelas.id_kelas, {
              Id : this.EditIdMapel,
              mapel : this.EditMapel,
              username : this.users[0].User_name
        }).then(response => {
             this.Mapel = response.data.values
             this.page = 1
             this.$modal.hide('modal-edit');
          }).catch(() => console.log('Error'));
      },
       setPages () {
            let numberOfPages = Math.ceil(this.Mapel.length / this.perPage);
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        }, 
        paginate (Mapel) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return  Mapel.slice(from, to);
        }
    },
    computed: {
        displayed () {
            return this.paginate(this.Mapel);
        }
    },
    watch: {
        Mapel () {
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