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
                           <h2 class="card-title"><b>Status pengiriman alat dan bahan</b></h2> 
                           
                        </div>
                        
                     </div> 
                     <div style="overflow-x:auto;">
                        <table class="table">
                            <thead>
                            <tr>
                            
                                <th>Order Name</th>
                                <th>Order Address</th>
                                <th>Status</th>
                                <th>Request at </th>
                                <th>Lesson Plan ID</th>
                                <th>User</th>
                                <th >Action</th>
                            </tr>
                            </thead>
                            <tbody v-if="dataRequest.length > 0">
                            <tr v-for="(item,index) in dataRequest" v-bind:key="index"> 
                      
                                <td>{{ item.Order_name }}</td>
                                <td>{{ item.Order_address }}</td>
                                <td>{{ item.status}}</td>
                                <td>{{ item.history[0].date_format}}</td>
                                <td><router-link :to="{ name: 'Lesson', params: { Lesson_id: item.lesson_plan_id}}">{{ item.lesson_plan_id}}</router-link></td>
                                  <td><router-link :to="{ path: '/users', query: { email: item.User_email }}">{{ item.User_email }}</router-link></td>
                              
                                <td>
                                    <button type="button" class="btn btn-info" style="margin-right:3px" v-on:click="Detail(item.history, item.detail)">Detail</button>
                                    <button type="button" class="btn btn-primary" style="margin-right:3px" v-on:click="Update(item.Delivery_id, item.detail)">Update Status</button>
                                    
                                </td>
                            </tr>
                            </tbody>
                            <tbody v-else>
                            <p class="card-description">Data was not found</p>
                            </tbody>

                        </table>
                     </div> 
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
          <p class="card-description"> Detail Status Pengiriman</p>
            
            <ul class="timeline">
                <li class="timeline-item" v-for="(his,index) in history"  v-bind:key="index">
         
                      <p v-if="his.Delivery_status_name === 'Dalam Pengiriman'" class="timeline-content">{{ his.Delivery_status_name}} by {{detail.Delivery_by}} - {{detail.Delivery_resi}} </p>
                       <p v-else class="timeline-content">{{ his.Delivery_status_name}} </p>
                   
                      <p class="event-time">{{ his.date_format }}</p> 
                </li>         
            </ul>
          
          </div>
      </modal> 

      <modal name="update">
        <div class="modal-style" style="margin:20px">
          <p class="card-description">Update status pengiriman </p>
              <form class="forms-sample" @submit.prevent="UpdateStatus">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Piih Kurir</label>                        
                      <v-select label="Kurir_name" :options="dataKurir" v-model="selectedKurir"></v-select>
                    </div>
                    <div class="form-group">
                      <label >Input No Resi</label>
                      <input type="text" class="form-control"  placeholder="Input nomer resi pengiriman" v-model="selectedResi">
                    </div>
                    <button style="width:49%" type="submit" class="btn btn-primary mr-2">Update Data</button>
                    <button style="width:49%" class="btn btn-danger" v-on:click="hideModal">Batalkan</button>
              </form>
          </div>
      </modal> 


  </div>
</template>


<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
  name: 'Status',  
  data() {
    return {
      dataRequest: [],
      users:[],
      history : [],
      detail : '',
      id_dev :'',
      dataKurir :[],
      inputResi:'',
      selectedKurir :'',
      selectedResi :'',
       page: 1,
      perPage: 5,
      pages: [], 
    }
     
  },
  mounted() {
    //get local storage
    var  users_local = JSON.parse(localStorage.getItem("user") || "[]");
    this.users = users_local;

    this.$http.get('/delivery/status').then(response => {
    this.dataRequest = response.data.values;
    });

     this.$http.get('/master/kurir').then(response => {
    this.dataKurir = response.data.values;
    });

  },
  methods: {
      Detail(item, detail){
        this.history = item
        this.detail = detail[0]
        this.$modal.show('modal')
      },Update(item, detail){
        this.id_dev = item
        if (detail.length > 0){
           this.selectedKurir = detail[0].Delivery_by
           this.selectedResi = detail[0].Delivery_resi
        } 
        this.$modal.show('update')
      },hideModal(){
        this.$modal.hide('update');
        this.inputResi = '';this.id_dev = ''
      },
      UpdateStatus(){
          this.$http.post('/delivery/update/'+this.id_dev, { 
                Delivery_by: this.selectedKurir.Kurir_name, 
                Delivery_resi : this.selectedResi,
                Updated_by: this.users[0].User_name,
                }).then(response => 
                this.dataRequest = response.data.values,
                this.$modal.hide('update')
                ).catch(() => console.log("Error"))
      },setPages () {
            let numberOfPages = Math.ceil(this.dataRequest.length / this.perPage);
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        }, 
        paginate (dataRequest) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return  dataRequest.slice(from, to);
        }

    },computed: {
        displayed () {
            return this.paginate(this.dataRequest);
        }
    },
    watch: {
        dataRequest () {
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