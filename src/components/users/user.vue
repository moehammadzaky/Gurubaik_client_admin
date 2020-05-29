<template>
    <div class="main-panel">
     <div class="content-wrapper">
         <!--start content-->
          <div class="row">
            
              <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">  
                     <div class="row" style="margin-bottom:20px">   
                        <div class="col-lg-12">  
                           <div class="row">
                              <div class="col-lg-9">
                               <h2 class="card-title"><b>User Management</b></h2> 
                              </div>
                              <div class="col-lg-3">
                                   <button type="button" class="btn btn-primary toolbar-item" style="width:100%"  v-on:click="showModal">Add New User</button>
                              </div>  
                           </div>

                           <div class="row">
                                  <div class="col-lg-4">
                                     <label><code>Filter by Email</code></label>      
                                      <input type="email" class="form-control" placeholder="email@example.com" v-model="selectedUser">
                                   </div>

                                   <div class="col-lg-3">
                                     <label><code>Filter by Contact</code></label>      
                                      <input type="email" class="form-control"  placeholder="0822xxxxxxx" v-model="selectedContact">
                                   </div>  

                                   <div class="col-lg-2">
                                     <label><code>Filter by Jenjang</code></label>      
                                        <v-select style="width:100%" label="Jenjang_name" :options="dataJenjang" v-model="selectedJenjang"></v-select>
                                   </div>   
                                   <div class="col-lg-3"> 
                                        <button style="width:50%;margin-top: 32px;height: 31px;" type="submit" class="btn btn-primary mr-2"  v-on:click="SearchUser">Search</button>     
                                   </div>  

                               </div>    
                        </div>
                     </div> 
                     <div style="overflow-x:auto;">
                      <table class="table">
                        <thead>
                          <tr>

                            <th>Email</th>
                            <th >Name</th>
                            <th >Jenjang</th>
                            <th >School</th>
                            <th> Contact </th>
                            <th> Registered by </th>
                            <th> Verify </th>
                            <th >Action</th>
                          </tr>
                        </thead>
                        <tbody v-if="Users.length > 0">
                          <tr v-for="item in displayed" v-bind:key="item.Id_user "> 
                           
                            <td>{{ item.User_email }}</td>
                            <td>{{ item.User_name}}</td>
                            <td>{{ item.Jenjang_name}}</td>
                            <td>{{ item.User_sekolah}}</td>
                            <td>{{ item.User_contact}}</td>
                            <td>{{ item.User_registered_by}} </td>
                            <td>{{item.User_verify}}</td>
                            <td>
                                <button type="button" class="btn btn-danger" v-on:click="showModalEdit(item.Id_user)" style="margin-right:3px">Reset Password</button>
                               <!-- <button type="button" class="btn btn-danger" v-on:click="deleteData()">Delete</button> -->
                            </td>
                          </tr>
                        </tbody>
                         <tbody v-else>
                           <p class="card-description">Data was not found, please filter by email or jenjang</p>
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
                      <!--end table -->
                     
                  </div>  
                </div>
              </div>
            </div>
         <!--end content -->   
      </div>  
     
     <modal name="modal" height="auto" :scrollable="true" style="margin-top:30px">
        <div class="modal-style" style="margin:20px">
          <p class="card-description"> Add New User </p>
              <form class="forms-sample" @submit.prevent="AddUser">
                    <div class="form-group">
                      <label for="exampleInputPassword1">Name</label>
                      <input type="text" class="form-control"  placeholder="Masukkan nama pengguna" v-model="inputName">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Email</label>
                      <input type="text" class="form-control"  placeholder="Input email" v-model="inputEmail">
                    </div>
                     <div class="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input type="password" class="form-control"  placeholder="********" v-model="inputPassword">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Select Jenjang</label>                        
                      <v-select label="Jenjang_name" :options="dataJenjang" v-model="selectedJenjang"></v-select>
                    </div>
                     <div class="form-group">
                      <label for="exampleInputPassword1">Contact</label>
                      <input type="text" class="form-control"  placeholder="0822xxxxxx" v-model="inputContact">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">School Name</label>
                      <input type="text" class="form-control"  placeholder="Masukkan nama sekolah pengguna" v-model="inputSekolah">
                    </div>
      
                    
                    
                    <button style="width:49%" type="submit" class="btn btn-primary mr-2">Add New</button>
                    <button style="width:49%" class="btn btn-danger" v-on:click="hideModal">Cancel</button>
              </form>
          </div>
      </modal> 

      <modal name="modal-edit">
            <div class="modal-style" style="margin:20px">
              <p class="card-description"> Update Password</p>
                  <form class="forms-sample" @submit.prevent="UpdatePassword">
                      
                        <div class="form-group">
                          <input type="password" class="form-control"  placeholder="Input new password" v-model="new_password">
                        </div>
                        <button style="width:49%" type="submit" class="btn btn-primary mr-2" >Reset Password</button>
                        <button style="width:49%" class="btn btn-danger" v-on:click="hideModalEdit">Cancel</button>
                  </form>
              </div>
      </modal> 


  </div>
</template>


<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
  name: 'users',  
  data() {
    return {
      dataJenjang: [],  
      selectedJenjang :'',
      Users: [],
      selectedUser:'',
      selectedContact :'',
      new_password: '',
      Id_user :'',
      inputName : '',
      inputEmail : '',
      inputSekolah :'',
      inputPassword :'',
      inputContact :'',
       page: 1,
            perPage: 5,
            pages: [], 
    }
     
  },
  mounted() {
    //get local storage
    var  users_local = JSON.parse(localStorage.getItem("user") || "[]");
    this.users = users_local;

    //get data kelas
    this.$http.get('/master/jenjang').then(response => {
    this.dataJenjang = response.data.values;
    });
    this.queryUser()
  },
  methods: {
      queryUser(){
       this.selectedUser = this.$route.query.email
       this.SearchUser()
      },
      SearchUser(){
           //get data MAPEL 
          this.$http.post('/users',{
              email : this.selectedUser,
              jenjang : this.selectedJenjang.Jenjang_id,
              contact : this.selectedContact
          }).then(response => {
              this.Users = response.data.values;
          }).catch(() => this.Users = []);
          this.Users = [];
      }, 
      showModalEdit (id) {
        this.$modal.show('modal-edit');
        this.Id_user = id;
      
      },
      hideModalEdit () {
        this.$modal.hide('modal-edit');
         this.Id_user = '';
         this.new_password = '';
      },
     
      deleteData(){
     
      },
      UpdatePassword(){
          this.$http.put('/users/resetpassword/'+this.Id_user,{
              password : this.new_password,
          }).then(response => {
              this.Users = response.data.values;
              this.hideModalEdit()
          }).catch(() => this.Users = []);
      },
      showModal () {
        this.$modal.show('modal');
      },
      hideModal () {
        this.$modal.hide('modal');
      },
      AddUser(){
         this.$http.post('/register',{
              username: this.inputName,
              role : 'users',
              email : this.inputEmail,
              password : this.inputPassword,
              contact : this.inputContact,
              asal_sekolah : this.inputSekolah,
              jenjang : this.selectedJenjang.Jenjang_id
          }).then(response => {
              this.Users = response.data.values;
              this.hideModal()
          }).catch(() => this.Users = []);
      },
       setPages () {
            let numberOfPages = Math.ceil(this.Users.length / this.perPage);
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        }, 
        paginate (Users) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return  Users.slice(from, to);
        }
    }, 
    computed: {
        displayed () {
            return this.paginate(this.Users);
        }
    },
    watch: {
        Users () {
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