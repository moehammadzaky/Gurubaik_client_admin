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
                           <h2 class="card-title"><b>Kelola Data Tagging Kegiatan</b></h2> 
                        </div>
                        <div class="col-lg-3">
                         <button type="button" class="btn btn-primary toolbar-item" style="width:100%"  v-on:click="showModal">Tambah Data Tag</button> 
                        </div> 
                     </div> 

                    <table class="table">
                        <thead>
                          <tr>
                            <th>Nama Tag</th>
                            <th>Konten Tag</th>
                            <th >Action</th>
                          </tr>
                        </thead>
                        <tbody v-if="Tag.length > 0">
                          <tr v-for="(tag,index) in displayed" v-bind:key="index"> 
                            <td>{{ tag.name_convert}}</td>
                            <td>{{ tag.type_convert}}</td>
                            <td>
                                     <button type="button" class="btn btn-danger" v-on:click="showModalDelete(tag.name)">Delete</button>
                            </td>
                          </tr>
                        </tbody>
                         <tbody v-else>
                           <p class="card-description">Data was not found</p>
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
          <p class="card-description"> Tambah Tag Kegiatan </p>
              <form class="forms-sample" @submit.prevent="AddTag">
                  
                    <div class="form-group">
                      <label for="exampleInputPassword1">Nama Tag </label>
                      <input type="text" class="form-control"  placeholder="Input nama tagging" v-model="inputTag">
                      <code>Contoh : Jumlah siswa</code>
                    </div>

                    <div class="form-group">
                      <label for="exampleInputPassword1">Konten Tagging</label>
                      <input type="text" class="form-control"  placeholder="'Tinggi','Sedang','Rendah'" v-model="inputTagKonten">
                      <code>*Dipisah comma tanpa spasi dan diawali huruf kapital</code><br>
                      <code>Contoh : 'Tinggi','Sedang','Rendah'</code>
                    </div>

                    <button style="width:49%" type="submit" class="btn btn-primary mr-2">Tambah Data</button>
                    <button style="width:49%" class="btn btn-danger" v-on:click="hideModal">Batalkan</button>
              </form>
          </div>
      </modal> 

        <modal name="modal-delete">
        <div class="modal-style" style="margin:20px">
          <p class="card-description"> Apakah yakin menghapus tag {{DelName}}?</p>
           <button style="width:49%" @click="deleteData" class="btn btn-primary mr-2" >Ya,Hapus</button>
           <button style="width:49%" class="btn btn-danger" v-on:click="hideModalDelete">Batalkan</button> 
          </div>
      </modal>
  
    
  

  </div>
</template>


<script>

export default {
  name: 'Tag',  
  data() {
    return {

      inputTag:'',
      inputTagKonten :'',
      users:[],
      Tag:[],
      EditKurir:'',
      EditIdKurir :'',
      page: 1,
      perPage: 5,
      pages: [], 
      DelName : ''
      
    }
     
  },
  mounted() {
    //get local storage
    var  users_local = JSON.parse(localStorage.getItem("user") || "[]");
    this.users = users_local;
    this.getData()
  },
  methods: {
      getData(){
        this.$http.get('/master/filter').then(response => {
        this.Tag = response.data.values;
         });
      },
      showModal () {
        this.$modal.show('modal');
      },
      hideModal () {
        this.$modal.hide('modal');
      }, 
      showModalDelete (name) {
        this.$modal.show('modal-delete');
        this.DelName = name
      },
      hideModalDelete () {
        this.$modal.hide('modal-delete');
      },
      AddTag(){
        let filter = [{
          "name" : this.inputTag,
          "type" : this.inputTagKonten
        }]
         this.$http.post('/master/filter', filter)
                .then(request => this.Successful(request))
                .catch(() => this.Failed())
      },
      Successful(request){
         this.Tag = request.data.values
         this.page = 1
         this.$modal.hide('modal');
      },
      Failed(){

      },
       deleteData(){
         this.$http.delete('/master/filter/'+this.DelName)
                .then(response => {
            this.Tag = response.data.values
             this.page = 1
             this.$modal.hide('modal-delete');
            }).catch(() => this.Failed())
      },
       setPages () {
            let numberOfPages = Math.ceil(this.Tag.length / this.perPage);
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        }, 
        paginate (Tag) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return  Tag.slice(from, to);
        }
    },
    computed: {
        displayed () {
            return this.paginate(this.Tag);
        }
    },
    watch: {
        Tag () {
            this.setPages();
        }
    },
    components:{

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