<template>

      <nav class="sidebar sidebar-offcanvas" id="sidebar">
          <ul class="nav">
            <li class="nav-item nav-profile">
              <a href="#" class="nav-link">
                <div class="profile-image">
                  <img class="img-xs rounded-circle" src="../assets/images/faces/face8.jpg" alt="profile image">
                  <div class="dot-indicator bg-success"></div>
                </div>
                <div class="text-wrapper">
                  <p class="profile-name">{{ name }}</p>
                  <p class="designation">{{ email }}</p>
                </div>
              </a>
            </li>
            <li class="nav-item nav-category">Main Menu</li>
            <li class="nav-item">
              <router-link class="nav-link" to="/dashboard">
                <i class="menu-icon typcn typcn-document-text"></i>
                <span class="menu-title">Dashboard</span>
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                <i class="menu-icon typcn typcn-coffee"></i>
                <span class="menu-title">Master Data</span>
                <i class="menu-arrow"></i>
              </a>
              <div class="collapse" id="ui-basic">
                <ul class="nav flex-column sub-menu">
                  <li class="nav-item">
                    <router-link class="nav-link" to="/master/mapel">Mata Pelajaran</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" to="/master/kompetensi">Kompetensi Dasar</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" to="/master/topik">Topik Pembelajaran</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" to="/master/kurir">Kurir Pengiriman</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" to="/master/tag">Tag Kegiatan</router-link>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/lesson">
                <i class="menu-icon typcn typcn-shopping-bag"></i>
                <span class="menu-title">Rencana Pembelajaran</span>
              </router-link>
            </li>
             <li class="nav-item">
              <a class="nav-link" data-toggle="collapse" href="#ui-basic2" aria-expanded="false" aria-controls="ui-basic">
                <i class="menu-icon typcn typcn-coffee"></i>
                <span class="menu-title">Kegiatan</span>
                <i class="menu-arrow"></i>
              </a>
              <div class="collapse" id="ui-basic2">
                <ul class="nav flex-column sub-menu">
                  <li class="nav-item">
                    <router-link class="nav-link" to="/activity/pembuka">Kegiatan Pembuka</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" to="/activity/inti">Kegiatan Inti</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" to="/activity/penutup">Kegiatan Penutup</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" to="/activity/general">Buat Kegiatan Baru </router-link>
                  </li>
                 
                </ul>
              </div>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/users" >
                <i class="menu-icon typcn typcn-bell"></i>
                <span class="menu-title">User Management</span>
              </router-link>
            </li>
          
            <li class="nav-item">
              <a class="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
                <i class="menu-icon typcn typcn-document-add"></i>
                <span class="menu-title">Pengiriman</span>
                <i class="menu-arrow"></i>
              </a>
              <div class="collapse" id="auth">
                <ul class="nav flex-column sub-menu">
                  <li class="nav-item">
                    <router-link class="nav-link" to="/delivery/new">Permintaan Baru</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link  class="nav-link" to="/delivery/status">Status Pengiriman</router-link>
                  </li>
                </ul>
              </div>
            </li>
              <li class="nav-item">
              <a class="nav-link" @click="logout" >
                <i class="menu-icon typcn typcn-user-outline"></i>
                <span class="menu-title">Logout</span>
              </a>
            </li>
          </ul>
        </nav>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
      name :'',
      email :''
    }
  },
  mounted() {
    //get local storage
    var users_local = JSON.parse(localStorage.getItem("user") || "[]");
    this.name = users_local[0].User_name;
    this.email = users_local[0].User_email;
  },
  methods:{
    logout(){
      this.$store.dispatch('logout')
      localStorage.clear();
      this.$router.push({ path: '/' })
    }
  }
}
</script>