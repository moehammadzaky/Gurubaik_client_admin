<template>
<div class="main-panel">
     <div class="content-wrapper">
            <!-- Page Title Header Ends-->
            <div class="row">
              <div class="col-md-12 grid-margin">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      
                      <div class="col-lg-4 col-md-6 mt-md-0 mt-4">
                        <div class="d-flex">
                          <div class="wrapper">
                            <h3 class="mb-0 font-weight-semibold">{{lesson}}</h3>
                            <h5 class="mb-0 font-weight-medium text-primary">Rencana Pembalajaran</h5>
                             <p class="mb-0 text-muted">Dibuat oleh pengguna</p>
                          </div>
                          <div class="wrapper my-auto ml-auto ml-lg-4">
                            <canvas height="50" width="100" id="stats-line-graph-2"></canvas>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-2 col-md-6 mt-md-0 mt-4">
                        <div class="d-flex">
                          <div class="wrapper">
                            <h3 class="mb-0 font-weight-semibold">{{pembuka}}</h3>
                            <h5 class="mb-0 font-weight-medium text-primary">Kegiatan </h5>
                            <p class="mb-0 text-muted">Pembuka</p>
                          </div>
                          <div class="wrapper my-auto ml-auto ml-lg-4">
                            <canvas height="50" width="100" id="stats-line-graph-3"></canvas>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-2 col-md-6 mt-md-0 mt-4">
                        <div class="d-flex">
                          <div class="wrapper">
                            <h3 class="mb-0 font-weight-semibold">{{inti}}</h3>
                             <h5 class="mb-0 font-weight-medium text-primary">Kegiatan</h5>
                            <p class="mb-0 text-muted">Inti</p>
                          </div>
                          <div class="wrapper my-auto ml-auto ml-lg-4">
                            <canvas height="50" width="100" id="stats-line-graph-4"></canvas>
                          </div>
                        </div>
                      </div>
                       <div class="col-lg-2 col-md-6 mt-md-0 mt-4">
                        <div class="d-flex">
                          <div class="wrapper">
                            <h3 class="mb-0 font-weight-semibold">{{penutup}}</h3>
                             <h5 class="mb-0 font-weight-medium text-primary">Kegiatan</h5>
                            <p class="mb-0 text-muted">Penutup</p>
                          </div>
                          <div class="wrapper my-auto ml-auto ml-lg-4">
                            <canvas height="50" width="100" id="stats-line-graph-4"></canvas>
                          </div>
                        </div>
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
export default {
  name: 'dashboard',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      lesson : '',
      pembuka :'',
      inti :'',
      penutup :''
    }
  },
  mounted(){
    this.getData()
  },methods :{
    getData(){
       this.$http.get('/lesson').then(response => {
            this.lesson = response.data.values.length;
        });
         this.$http.get('/activity/Pembuka').then(response => {
            this.pembuka = response.data.values.length;
        });
         this.$http.get('/activity/Inti').then(response => {
            this.inti= response.data.values.length;
        });
         this.$http.get('/activity/Penutup').then(response => {
            this.penutup = response.data.values.length;
        });
    }
  }
}
     
</script>

