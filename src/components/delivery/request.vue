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
                           <h2 class="card-title"><b>Permintaan pengiriman alat dan bahan</b></h2> 
                           
                        </div>
                        
                     </div> 
                     <div style="overflow-x:auto;">
                        <table class="table">
                            <thead>
                            <tr>
                         
                                <th>Order Name</th>
                                <th>Order Address</th>
                                <th>Request at</th>
                                <th>Lesson Plan ID</th>
                                <th>User</th>
                                <th >Action</th>
                            </tr>
                            </thead>
                            <tbody v-if="dataRequest.length > 0">
                            <tr v-for="(item,index) in displayed" v-bind:key="index"> 
                      
                                <td>{{ item.Order_name }}</td>
                                <td>{{ item.Order_address }}</td>
                                <td>{{ item.date_format}}</td>
                                <td><router-link :to="{ name: 'Lesson', params: { Lesson_id: item.lesson_plan_id}}">{{ item.lesson_plan_id}}</router-link></td>
                                <td><router-link :to="{ path: '/users', query: { email: item.User_email }}">{{ item.User_email }}</router-link></td>
                                <td>
                                    <button type="button" class="btn btn-primary" style="margin-right:3px" v-on:click="konfirmasi(item.Delivery_id)">Accept</button>
                                    <button type="button" class="btn btn-danger" v-on:click="reject(item.Delivery_id)">Reject</button>
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


  </div>
</template>


<script>


export default {
  name: 'Request',  
  data() {
    return {
      dataRequest: [],
      users:[],
      page: 1,
      perPage: 5,
      pages: [], 
    }
     
  },
  mounted() {
    //get local storage
    var  users_local = JSON.parse(localStorage.getItem("user") || "[]");
    this.users = users_local;

    this.$http.get('/delivery').then(response => {
    this.dataRequest = response.data.values;
    });

  },
  methods: {
     konfirmasi(id){
       console.log(id)
        this.$http.post('/delivery/status/'+id,{
          status : "Terkonfirmasi"
        }).then(response => {
              this.dataRequest = response.data.values

            }).catch(() => console.log("ERROR"));
     },reject(id){
         this.$http.post('/delivery/status/'+id,{
          status : "Ditolak"
        }).then(response => {
                      this.dataRequest = response.data.values
            }).catch(() => console.log("ERROR"));
     },prevPage(){

     },nextPage(){

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

    }, 
    computed: {
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