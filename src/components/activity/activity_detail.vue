<template>
    
    <div class="main-panel">
     <div class="content-wrapper">
         <!--start content-->
          <div class="row">
            <div class="col-md-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <div class="row" style="margin-bottom:30px">
                            <div class="col-lg-6">
                                <h4 class="card-title">Detail Activity</h4>
                                <p v-if="dataDetail.Activity_status === 'draft'"> Status Kegiatan: <code style="font-size:14px" >{{ dataDetail.Activity_status }}</code> </p>
                            </div>
                            
                            
                            <div class="col-lg-3">
                                <button type="button" class="btn btn-warning toolbar-item" style="width:100%"  v-on:click="duplikatKegiatan">Duplikat Kegiatan</button> 
                               </div>    
                            <div class="col-lg-3">
                                <button type="button" class="btn btn-primary toolbar-item" style="width:100%"  v-on:click="ubahKegiatan">Ubah Kegiatan</button> 
                            </div>     
                        </div> 

                            <div class="row" >
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
    <modal name="modal-duplikat">
        <div class="modal-style" style="margin:20px">
          <p class="card-description"> Duplikat Kegiatan</p>

          <div class="form-group">
                         <label for="jenjang">Jenjang*</label>
                                                        <v-select  style="width:100%" label="Jenjang_name" :options="dataJenjang" v-model="selectedJenjang" :value="selectedJenjang" @input="setSelectedJenjang"></v-select>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="kelas">Kelas*</label>
                                                        <v-select style="width:100%" label="Kelas_name" :options="dataKelas" v-model="selectedKelas" :value="selectedKelas" @input="setSelectedKelas"></v-select>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="mapel">Mata Pelajaran*</label>
                                                        <v-select  style="width:100%" label="Mapel_name" :options="dataMapel" v-model="selectedMapel" :value="selectedMapel" @input="setSelectedMapel"></v-select>
                                                    </div>
                                                    
                                                    <div class="form-group">
                                                        <label for="kompetensi">Kompetensi*</label>
                                                        <v-select  style="width:100%" label="Kd_name" :options="dataKompetensi" v-model="selectedKompetensi" :value="selectedKompetensi" @input="setSelectedKd"></v-select>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="topik">Topik*</label>
                                                        <v-select  style="width:100%" label="Topik_name" :options="dataTopik" v-model="selectedTopik" :value="selectedTopik"></v-select>
                                                    </div>
           <button style="width:49%" @click="dupData" class="btn btn-primary mr-2" >Duplikat Data</button>
           <button style="width:49%" class="btn btn-danger" v-on:click="hideModalDuplikat">Batalkan</button> 
          </div>
      </modal>


     </div>
    </div>             
</template>

<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
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
           dataJenjang: [],  
            dataKelas :[],
            dataMapel :[],
            dataKompetensi :[],
            dataTopik :[],
             selectedJenjang :'',
            selectedKelas :'',
            selectedMapel :'',
            selectedKompetensi :'',
            selectedTopik :'',
 
        
        }
    },
    mounted() {

         //get local storage
        var  users_local = JSON.parse(localStorage.getItem("user") || "[]");
        this.users = users_local;

        this.id = this.$route.params.Activity_id
        this.$http.get('/activity/detail/'+this.$route.params.Activity_id).then(response => {
            this.dataDetail = response.data.values;

            this.imageShow = this.dataDetail.dokumentasi[0]
          
            this.dataDetail.dokumentasi.forEach(item => {
               let it = item.Activity_dok_file
               this.items.push(it)
            });

        });

        //get data kelas
        this.$http.get('/master/jenjang').then(response => {
        this.dataJenjang = response.data.values;
        });
    },components:{
      'v-select': vSelect
    
    },methods:{
         showModalPreview () {
            this.$modal.show('modal');
         },
        ubahKegiatan(){
            this.$router.push({ name: 'EditActivity', params: { Id_activity: this.id } })
        },
        duplikatKegiatan(){
             this.$modal.show('modal-duplikat');
        },
      
        async dupData(){
            let result_dup = await this.GeneralDup()
            let id_dup = result_dup.data.values.Id_activity
            await this.DokumentasiDup(id_dup, this.id)
            await this.fileDup(id_dup, this.id)
            await this.AdbDup(id_dup)
            await this.stepDup(id_dup)
            await this.publishDup(id_dup)
            this.hideModalDuplikat()
            this.$router.push({ name: 'Detail',  params: { Activity_id: id_dup }})
        },
        GeneralDup(){
            return new Promise(resolve => {

                let json = [{
                    "title" : this.dataDetail.Activity_title,
                    "deksripsi" : this.dataDetail.Activity_desk,
                    "jenjang" : this.selectedJenjang.Jenjang_id,
                    "kelas" : this.selectedKelas.id_kelas,
                    "mapel" : this.selectedMapel.Id_mapel,
                    "kd" : this.selectedKompetensi.Id_kd,
                    "topik" :this.selectedTopik.Id_topik,
                    "type" :this.dataDetail.Activity_type,
                    "filter": []
                }]

                let tags = this.dataDetail.filter 
                let tagtmp = []          
                Object.keys(tags).map(function(key) {
                    var tmp = key.includes("filter_");
                    if (tmp === true){
                        let json_filter = {
                            "name":key,
                            "value" : tags[key]
                        }
                        
                        tagtmp.push(json_filter)
                        return tagtmp
                    }
                });
                json[0].filter = tagtmp

               let result_post = this.$http.post('/activity/general/'+this.users[0].Id_user, json 
                 ).then(request => {return request})
                .catch(() => console.log("Failed"))
                return resolve(result_post)
            }); 
        },
        DokumentasiDup(newid, oldid){
            return new Promise(resolve => {
                let result_post = this.$http.post('/activity/duplicate/dokumentasi/'+oldid,{new_id:newid}).then(request =>{
                    return request})
                    .catch(() => console.log("Failed"))
                return resolve(result_post)
            }); 
        },
        fileDup(newid, oldid){
              return new Promise(resolve => {
                let result_post = this.$http.post('/activity/duplicate/file/'+oldid,{new_id:newid}).then(request =>{
                    return request})
                    .catch(() => console.log("Failed"))
                return resolve(result_post)
            });
        },
        AdbDup(id){
             return new Promise(resolve => {
               let adb = []
               for(let i=0;i< this.dataDetail.adb.length;i++){
                 let json = {
                     "count" : this.dataDetail.adb[i].Acitivty_adb_count,
                                  "name" : this.dataDetail.adb[i].Activity_adb_name
                 }   
                 adb.push(json)
                }

               let result_post = this.$http.post('/activity/adb/'+id+'/false', adb
                ).then(request =>{
                    return request})
                    .catch(() => console.log("Failed"))

                return resolve(result_post)       
             });    
        },
        stepDup(id){
              return new Promise(resolve => {
                let step = {
                    "number" : 1,
                    "text" : this.dataDetail.step[0].Activity_step_text
                 }
                 let result_post =    this.$http.post('/activity/step/'+id, step
                    ).then(request =>{
                    return request})
                    .catch(() => console.log("Failed"))
                return resolve(result_post) 
              });   
        },
        publishDup(id){
            return new Promise(resolve => {
                let result_post = this.$http.put('/activity/publish/'+id
                    ).then(request => {
                        return request
                    })
                    .catch(() => console.log("Failed"))
                return resolve(result_post)
            });    
        },
        hideModalDuplikat(){
            this.$modal.hide('modal-duplikat');
        },
        downloadFile(link){
            console.log(link)
            window.open(link, "_blank"); 
        }, setSelectedJenjang(value){
            //get data Kelas
            if (this.selectedKelas === ''){
             
                this.$http.get('/master/kelas/'+value.Jenjang_id).then(response => {
                this.dataKelas = response.data.values;
              }).catch(() => this.dataKelas = []);
            }
           else{
                this.selectedKelas = ''
                this.selectedMapel = ''
                this.selectedKompetensi = ''
                this.selectedTopik = ''
           }
        },
        setSelectedKelas(value){
                //get data Kelas
            if (this.selectedMapel === ''){
                this.$http.get('/master/mapel/'+value.id_kelas).then(response => {
                this.dataMapel = response.data.values;
              }).catch(() => this.dataMapel = []);
            }
           else{
                this.selectedMapel = ''
                this.selectedKompetensi = ''
                this.selectedTopik = ''
           }
        },
        setSelectedMapel(value){
            if (this.selectedKompetensi === ''){
                this.$http.get('/master/kompetensi/'+value.Id_mapel).then(response => {
                this.dataKompetensi = response.data.values;
              }).catch(() => this.dataKompetensi = []);
            }
           else{
                this.selectedKompetensi = ''
                this.selectedTopik = ''
           }
        },
        setSelectedKd(value){
            if (this.selectedTopik === ''){
                this.$http.get('/master/topik/'+value.Id_kd).then(response => {
                this.dataTopik = response.data.values;
              }).catch(() => this.dataTopik = []);
            }
           else{
                this.selectedTopik = ''
           }
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