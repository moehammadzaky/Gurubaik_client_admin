<template>
    <nav class="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div class="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
          <a class="navbar-brand brand-logo" href="index.html">
            <img src="../assets/gurubaik_logo_long.png" alt="logo" /> </a>
          <a class="navbar-brand brand-logo-mini" href="index.html">
            <img src="../assets/images/logo-mini.svg" alt="logo" /> </a>
        </div>
        <div class="navbar-menu-wrapper d-flex align-items-center">
          <ul class="navbar-nav">
            <li class="nav-item font-weight-semibold d-none d-lg-block">Dashboard Admin Gurubaik.id</li>
          </ul>
          <!--
          <form class="ml-auto search-form d-none d-md-block" action="#">
            <div class="form-group">
              <input type="search" class="form-control" placeholder="Search Here">
            </div>
          </form>
          -->
          <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown">
              <a class="nav-link count-indicator" id="messageDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
                <i class="mdi mdi-bell-outline"></i>
                <span class="count">{{dataRequest.length}}</span>
              </a>
              <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0" aria-labelledby="messageDropdown">
              
                <a class="dropdown-item py-3" @click="toNew()">
                  <p class="mb-0 font-weight-medium float-left" style="cursor:pointer">Permintaan pengiriman baru </p>
                  <span class="badge badge-pill badge-primary float-right"  style="cursor:pointer">View all</span>
                </a>
                <div class="dropdown-divider"></div>

                <div v-for="(item, index) in dataRequest" :key="index">
                <a class="dropdown-item preview-item">
                 
                  <div class="preview-item-content flex-grow py-2">
                    <p class="preview-subject ellipsis font-weight-medium text-dark">New Requested</p>
                    <p class="font-weight-light small-text"> {{item.User_email}} - {{item.Order_address}} </p>
                     <p class="font-weight-light small-text"> {{item.date_format}}</p>
                  </div>
                </a>
                </div>
               
              </div>
            </li>
          
            <li class="nav-item dropdown d-none d-xl-inline-block user-dropdown">
              <a class="nav-link dropdown-toggle" id="UserDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
                <img class="img-xs rounded-circle" src="../assets/images/faces/face8.jpg" alt="Profile image"> </a>
              <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="UserDropdown">
                <div class="dropdown-header text-center">
                  <img class="img-md rounded-circle" src="../assets/images/faces/face8.jpg" alt="Profile image">
                  <p class="mb-1 mt-3 font-weight-semibold">{{ name }}</p>
                  <p class="font-weight-light text-muted mb-0">{{ email }}</p>
                </div>
                <a class="dropdown-item" @click="logout()" ><span style="text-align:center">Log Out</span></a>
              </div>
            </li>
          </ul>
          <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
            <span class="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
</template>

<script>
export default {
  data () {
    return {
      name :'',
      email :'',
      dataRequest:[]
    }
  },
  mounted() {
    //get local storage
    var users_local = JSON.parse(localStorage.getItem("user") || "[]");
    this.name = users_local[0].User_name;
    this.email = users_local[0].User_email;

    this.$http.get('/delivery').then(response => {
    this.dataRequest = response.data.values;
    });
  },methods:{
     logout(){
      this.$store.dispatch('logout')
      localStorage.clear();
      this.$router.push({ path: '/' })
    },toNew(){
      this.$router.push({ path: '/delivery/new' })
    }
  }
}
</script>
<style scoped>
.navbar.default-layout .navbar-brand-wrapper {
    background: #fff !important;
    width: 270px;
    height: 63px;
}
.navbar.default-layout .navbar-menu-wrapper {
   box-shadow: none;
}
</style>