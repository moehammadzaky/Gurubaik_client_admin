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
                           <h2 class="card-title"><b>Kelola Data Kurir Pengiriman</b></h2> 
                        </div>
                        <div class="col-lg-3">
                         <button type="button" class="btn btn-primary toolbar-item" style="width:100%"  v-on:click="showModal">Tambah Kurir Pengiriman</button> 
                        </div> 
                     </div> 

                    <table class="table">
                        <thead>
                          <tr>
                            <th>Nama Perusahaan</th>
                            <th >Action</th>
                          </tr>
                        </thead>
                        <tbody v-if="Kurir.length > 0">
                          <tr v-for="(kurir,index) in displayed" v-bind:key="index"> 
                            <td>{{ kurir.Kurir_name}}</td>
                            <td>
                                <button type="button" class="btn btn-primary" v-on:click="showModalEdit(kurir.Id_shipping, kurir.Kurir_name)" style="margin-right:3px">Edit</button>
                                 <button type="button" class="btn btn-danger" v-on:click="showModalDelete(kurir.Id_shipping, kurir.Kurir_name)">Delete</button>
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
          <p class="card-description"> Tambah Nama Kurir Pengiriman </p>
              <form class="forms-sample" @submit.prevent="AddKurir">
                  
                    <div class="form-group">
                      <label for="exampleInputPassword1">Nama Perusahaan </label>
                      <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Input nama perusahaan" v-model="inputKurir">
                    </div>

                    <button style="width:49%" type="submit" class="btn btn-primary mr-2">Tambah Data</button>
                    <button style="width:49%" class="btn btn-danger" v-on:click="hideModal">Batalkan</button>
              </form>
          </div>
      </modal> 
      <modal name="modal-edit">
        <div class="modal-style" style="margin:20px">
          <p class="card-description"> Ganti Nama Kurir Pengiriman</p>
              <form class="forms-sample" @submit.prevent="UpdateKurir">
                
                    <div class="form-group">
                      <label for="exampleInputPassword1">Nama Perusahaan</label>
                      <input type="text" class="form-control" id="exampleInputPassword1"  v-model="EditKurir">
                    </div>
                    <button style="width:49%" type="submit" class="btn btn-primary mr-2" >Ganti Nama</button>
                    <button style="width:49%" class="btn btn-danger" v-on:click="hideModalEdit">Batalkan</button>
              </form>
          </div>
      </modal> 
        <modal name="modal-delete">
        <div class="modal-style" style="margin:20px">
          <p class="card-description"> Apakah yakin menghapus kurir pengiriman {{DelName}}?</p>
           <button style="width:49%" @click="deleteData" class="btn btn-primary mr-2" >Ya,Hapus</button>
           <button style="width:49%" class="btn btn-danger" v-on:click="hideModalDelete">Batalkan</button> 
          </div>
      </modal>
  

  </div>
</template>


<script>

export default {
  name: 'Kurir',  
  data() {
    return {

      inputKurir:'',
      users:[],
      Kurir:[],
      EditKurir:'',
      EditIdKurir :'',
      page: 1,
      perPage: 5,
      pages: [], 
       DelId :'',
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
        this.$http.get('/master/kurir').then(response => {
        this.Kurir = response.data.values;
         });
      },
      showModal () {
        this.$modal.show('modal');
      },
      hideModal () {
        this.$modal.hide('modal');
      },
      showModalEdit (id, name) {
         this.EditKurir = name
        this.EditIdKurir = id
        this.$modal.show('modal-edit');
   
      },
      hideModalEdit () {
        this.$modal.hide('modal-edit');
         this.EditKurir = ''
        this.EditIdKurir = ''
      }, showModalDelete (id,name) {
        this.$modal.show('modal-delete');
        this.DelId = id
        this.DelName = name
      },
      hideModalDelete () {
        this.$modal.hide('modal-delete');
      },
      AddKurir(){
         this.$http.post('/master/kurir/', { 
                kurir_name: this.inputKurir,       
                })
                .then(request => this.Successful(request))
                .catch(() => this.Failed())
      },
      Successful(request){
         this.Kurir = request.data.values
         this.page = 1
         this.$modal.hide('modal');
      },
      Failed(){

      }, 
      deleteData(){
         this.$http.delete('/master/kurir/'+this.DelId)
                .then(response => {
            this.Kurir = response.data.values
             this.page = 1
             this.$modal.hide('modal-delete');
            }).catch(() => this.Failed())
      },
      UpdateKurir(){
        this.$http.put('/master/kurir/'+this.EditIdKurir, {
              kurir_name : this.EditKurir
        }).then(response => {
             this.Kurir = response.data.values
             this.page = 1
             this.$modal.hide('modal-edit');
          }).catch(() => console.log('Error'));
      },
       setPages () {
            let numberOfPages = Math.ceil(this.Kurir.length / this.perPage);
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        }, 
        paginate (Kurir) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return  Kurir.slice(from, to);
        }
    },
    computed: {
        displayed () {
            return this.paginate(this.Kurir);
        }
    },
    watch: {
        Kurir () {
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