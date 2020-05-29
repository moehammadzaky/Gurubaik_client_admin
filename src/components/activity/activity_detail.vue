<template>
    
    <div class="main-panel">
     <div class="content-wrapper">
         <!--start content-->
          <div class="row">
            <div class="col-md-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-9">
                                <h4 class="card-title">Detail Activity</h4>
                                <p v-if="dataDetail.Activity_status === 'draft'"> Status Kegiatan: <code style="font-size:14px" >{{ dataDetail.Activity_status }}</code> </p>
                            </div>
                            <div class="col-lg-3">
                         <button type="button" class="btn btn-primary toolbar-item" style="width:100%"  v-on:click="ubahKegiatan">Ubah Kegiatan</button> 
                        </div>     
                        </div> 

                            <div class="row">
                                 <div v-if="dataDetail.dokumentasi && dataDetail.dokumentasi.length === 0" class="col-lg-6">
                                          <img  src="../../assets/gurubaik_logo_long.png" style="width:100%;height:250px;object-fit: contain;cursor:pointer" />
                                 </div>       
                                <div v-else class="col-lg-6">
                                     <div v-if="imageShow.Activity_file_type === 'video'" style="display: inline-block;height:250px;width: 100%;">   
                                             <img  v-bind:src="imageShow.thumbnail" style="width:100%;float:left;cursor:pointer;height: inherit;object-fit: cover;" @click="showModalPreview">
                                             <div  class="play-button" style="margin: -50px 0 0 -14px;cursor:pointer" @click="showModalPreview"></div>
                                    </div>
                                    <img v-else-if="imageShow.Activity_file_type === 'image'" v-bind:src="imageShow.Activity_dok_file" style="width:100%;height:250px;object-fit: contain;cursor:pointer" @click="showModalPreview"/>
                                   
                                    <div class="row" style="height:70px; overflow : hidden auto">
                                        <div class=" col-lg-12" >
                                            <div style="width:60px;height:60px;float:left;border: 1px solid #c1c1c1;margin:5px" v-for="(item,index) in dataDetail.dokumentasi" :key="index"> 
                                                    <div v-if="item.Activity_file_type === 'video'" style="position :relative;display: inline-block;height:100%">   
                                                            <img  v-bind:src="item.thumbnail" style="width:100%;float:left;cursor:pointer;height: inherit;object-fit: cover;" @click="changeShow(item)">
                                                            <div  class="play-button" @click="changeShow(item)"></div>
                                                    </div>
                                                    <img v-else-if="item.Activity_file_type === 'image'" v-bind:src="item.Activity_dok_file" style="width:100%;float:left;cursor:pointer;height: inherit;object-fit: cover;" @click="changeShow(item)">
                                            </div>      
                                        </div>
                                    </div>  

                                </div>
                                <div class="col-lg-6">
                                    <h4>{{ dataDetail.Activity_title }}</h4>
                                    <p style="font-weight: 500;"> {{ dataDetail.Topik_name }}</p>
                                    <div class="row">
                                        <div class="col-lg-1">
                                             
                                            <img v-if="dataDetail.User_image !== null" class="img-xs rounded-circle" :src="dataDetail.User_image" alt="profile image">
                                            <img v-else class="img-xs rounded-circle" src="../../assets/images/faces/face8.jpg" alt="profile image">
                                        </div>
                                        <div class="col-lg-4">
                                            <router-link :to="{ path: '/users', query: { email: dataDetail.User_email }}">
                                                  <p style="font-weight: 500;font-size:14px">{{ dataDetail.User_name }}</p>
                                            </router-link>
                                        </div>  
                                    </div>  
                                    <div class="row" style="margin-top:10px">
                                        <div class="col-lg-3" style="border-right:1px solid #fafafa">
                                          <p style="font-weight: 500;">{{ dataDetail.like }} Likes</p>
                                        </div>
                                        <div class="col-lg-3">
                                          <p style="font-weight: 500;">{{ dataDetail.comment && dataDetail.comment.length }} Komentar</p>
                                        </div>  
                                    </div>               
                                    <div class="row">
                                        <div class="col-lg-2">
                                            <label><code>Jenjang</code></label>
                                            <p style="font-weight: 500;">{{ dataDetail.Jenjang_name }}</p>
                                        </div>  
                                        <div class="col-lg-4">
                                            <label><code>Mata Pelajaran</code></label>
                                             <p style="font-weight: 500;">{{ dataDetail.Kelas_name }}</p>
                                        </div>   
                                        <div class="col-lg-6">
                                                <label><code>Kompetensi</code></label>
                                                <p style="font-weight: 500;">{{ dataDetail.Kd_name }}</p>
                                        </div> 
                                     </div>   

                                     <div class="row" v-if="dataDetail.file && dataDetail.file.length === 1">
                                         <div v-for="(item,index) in dataDetail.file" :key="index">
                                             <button @click="downloadFile(item.Activity_step_file)" class="btn btn-info"> Download {{item.Activity_file_name }}</button>
                                         </div>
                                     </div>   
                                </div>      
                             </div>   
                                            
                                            
                             <!--bottom row -->

                             
                             <div class="tabs">
                                <a  v-bind:class="[ activetab === 1 ? 'active' : '' ]" @click="activetab = 1">Detail Kegiatan</a>
                                <a  v-bind:class="[ activetab === 2 ? 'active' : '' ]" @click="activetab = 2">Komentar ({{ dataDetail.comment && dataDetail.comment.length }})</a>
                            </div>
                            <div class="content">
                                <div v-if="activetab === 1" class="tabcontent">
                                    <div class="row" style="margin-top:30px">
                                        <div class="col-lg-12">
                                            <label style="font-weight: 500;">Deskripsi Kegiatan</label>
                                            <p>{{ dataDetail.Activity_desk }}</p>
                                        </div>    
                                    </div>  

                                    <div class="row" v-if="dataDetail.file && dataDetail.file.length > 1">
                                        <div class="col-lg-12">
                                            <label style="font-weight: 500;">Lembar Kerja Peserta Didik</label>
                                            <ul id="example-1">
                                                    <li v-for="(item,index) in dataDetail.file" :key="index">
                                                        <router-link :to="item.Activity_step_file" target="_blank">{{ item.Activity_file_name }}</router-link>
                                                    </li>
                                                </ul>
                                        </div>    
                                    </div>  

                                    <div class="row">
                                                    <div class="col-lg-12">
                                                        <label style="font-weight: 500;">Alat & Bahan Kegiatan</label>
                                                        <ul id="example-1">
                                                            <li v-for="(item,index) in dataDetail.adb" :key="index">
                                                                {{ item.Acitivty_adb_count }} {{ item.Activity_adb_name}}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div> 

                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <label style="font-weight: 500;">Langkah Kegiatan</label>
                                                        <ul id="example-1">
                                                            <li v-for="(item,index) in dataDetail.step" :key="index">
                                                                <p><span v-html="item.Activity_step_text"></span></p>
                                                            </li>
                                                        </ul>

                                                    
                                                    </div>
                                    </div> 
                                </div>

                                <div v-if="activetab === 2" class="tabcontent">
                                    <div class="row" style="margin-top:20px;padding:15px">
                                    <div class="col-lg-12">
                                        <div class="row" v-for="(item,index) in dataDetail.comment" :key="index">
                                            <div  style="margin:0px;width:fit-content">
                                                    <img class="img-xs rounded-circle" src="../../assets/images/faces/face8.jpg" alt="profile">           
                                            </div>
                                            <div class="col-lg-4" style="padding-top:5px">
                                                <p style="font-weight: 500;font-size:14px;margin-bottom:0">{{ item.User_name }}</p>
                                                <p style="font-size:12px;margin-top:0;color:#828384">{{ item.Created_at}}</p>
                                                <p>{{ item.User_comment }}</p>
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

      <modal name="modal" :adaptive="true" width="50%" height="100%" style="margin-top:100px">
        <div class="modal-style" style="margin:20px">
         <img v-if="imageShow.Activity_file_type === 'image'" v-bind:src="imageShow.Activity_dok_file" style="width:100%;height:400px;object-fit: contain;" />
         <video v-else v-bind:src="imageShow.Activity_dok_file"  style="width:100%;height:400px;object-fit: contain;" controls></video>                       
        </div>
      </modal> 


     </div>
    </div>             
</template>

<script>

export default {
    name :'Detail',
    data () {
        return {
        id :'',
        dataDetail : [],
        activetab: 1,
        imageShow : '',
        items : [],
        index :null,
        
        }
    },
    mounted() {
        this.id = this.$route.params.Activity_id
        this.$http.get('/activity/detail/'+this.$route.params.Activity_id).then(response => {
            this.dataDetail = response.data.values;

            this.imageShow = this.dataDetail.dokumentasi[0]
          
            this.dataDetail.dokumentasi.forEach(item => {
               let it = item.Activity_dok_file
               this.items.push(it)
            });

        });
    },methods:{
         showModalPreview () {
            this.$modal.show('modal');
         },
        ubahKegiatan(){
            this.$router.push({ name: 'EditActivity', params: { Id_activity: this.id } })
        },
        downloadFile(link){
            console.log(link)

         window.open(link, "_blank"); 
        },changeShow(item){
            this.imageShow = item
        },setIndex(index) {
            this.index = index
        }
    }
}
</script>

<style>
.tabs {
    overflow: hidden;
    border-bottom: 2px solid #fafafa;
}

.tabs ul {
    list-style-type: none;
    margin-left: 20px;
}

.tabs a{
    float: left;
    cursor: pointer;
    padding: 12px 24px;
    transition: background-color 0.2s;
    background-color: transparent;
    font-size:14px;
}
.tabs a:hover {
    background-color: transparent;
  
}
.tabs a.active {
    background-color: #fff;
    color: #484848;
    border-bottom : 2px solid #5768f3;
    cursor: default;
    font-weight: 500;
}
.play-button {
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: rgba(0,0,0,0.25);
  border-radius: 100%;
  top: 50%;
  left: 50%;
margin: -14px 0 0 -14px;
  cursor: pointer;
}

.play-button:after {
  content: '';
    display: block;
    position: absolute;
    left: 12px;
    top: 8px;
    border-width: 7px;
    border-style: solid;
    border-color: transparent transparent transparent white;
}

.play-button:hover {
  background-color: black;
}
</style>