<template>
 <div class="main-panel">
     <div class="content-wrapper">
         <!--start content-->
          <div class="row">
            <div class="col-md-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Buat Kegiatan</h4>
                           <div id="tabs" class="container">             
                                    <div class="tabs">
                                        <a  v-bind:class="[ activetab === 1 ? 'active' : '' ]">Detail</a>
                                        <a  v-bind:class="[ activetab === 2 ? 'active' : '' ]">Dokumentasi Kegiatan</a>
                                        <a  v-bind:class="[ activetab === 3 ? 'active' : '' ]">Alat & Bahan</a>
                                        <a  v-bind:class="[ activetab === 4 ? 'active' : '' ]">Langkah Kegiatan</a>
                                        <a  v-bind:class="[ activetab === 5 ? 'active' : '' ]">Preview</a>
                                    </div>

                                    <div class="content">
                                        <div v-if="activetab === 1" class="tabcontent">
                                            <form class="forms-sample" style="margin-top:30px" @submit.prevent="AddGeneral">
                                                    <div class="form-group row">
                                                        <div class="col-lg-2">
                                                        <label >Tipe Kegiatan : </label>
                                                        </div>  
                                                        <div class="col-lg-8" >
                                                            <div class="row">
                                                                    <div class="col-lg-2">
                                                                        <input class="form-check-input" type="checkbox" id="male" name="type" value="Pembuka" style="margin-top:0" v-model="checkedType">
                                                                        <label  for="male">Pembuka</label><br>
                                                                    </div>   
                                                                    <div class="col-lg-1">
                                                                        <input class="form-check-input" type="checkbox" id="male" name="type" value="Inti" style="margin-top:0" v-model="checkedType">
                                                                        <label  for="male">Inti</label><br>
                                                                    </div>  
                                                                    <div class="col-lg-2">
                                                                        <input class="form-check-input" type="checkbox" id="male" name="type" value="Penutup" style="margin-top:0" v-model="checkedType">
                                                                        <label  for="male">Penutup</label><br>
                                                                    </div>  
                                                            </div>
                                                        </div>    

                                                    </div>

                                                    <div class="form-group">
                                                        <label for="exampleInputName1">Judul Kegiatan</label>
                                                        <input type="text" class="form-control" id="exampleInputName1" placeholder="Masukkan Judul Kegiatan" v-model="Activity_title">
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="desc">Deksripsi Kegiatan</label>
                                                        <textarea class="form-control" id="exampleTextarea1" rows="3" v-model="Activity_desc" placeholder="Masukkan Deskripsi Kegiatan"></textarea>
                                                        
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="jenjang">Jenjang*</label>
                                                        <v-select style="width:100%" label="Jenjang_name" :options="dataJenjang" v-model="selectedJenjang" :value="selectedJenjang" @input="setSelectedJenjang"></v-select>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="kelas">Kelas*</label>
                                                        <v-select style="width:100%" label="Kelas_name" :options="dataKelas" v-model="selectedKelas" :value="selectedKelas" @input="setSelectedKelas"></v-select>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="mapel">Mata Pelajaran*</label>
                                                        <v-select style="width:100%" label="Mapel_name" :options="dataMapel" v-model="selectedMapel" :value="selectedMapel" @input="setSelectedMapel"></v-select>
                                                    </div>
                                                    
                                                    <div class="form-group">
                                                        <label for="kompetensi">Kompetensi*</label>
                                                        <v-select style="width:100%" label="Kd_name" :options="dataKompetensi" v-model="selectedKompetensi" :value="selectedKompetensi" @input="setSelectedKd"></v-select>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="topik">Topik*</label>
                                                        <v-select style="width:100%" label="Topik_name" :options="dataTopik" v-model="selectedTopik" :value="selectedTopik"></v-select>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="karakteristik">Karakteristik Siswa*</label>
                                                    </div>

                                                    <div v-for="(item, index) in filter" v-bind:key="index">
                                                        <div class="form-group row">
                                                            <div class="col-lg-4">
                                                                    <label > {{ item.name_convert}} : </label>
                                                            </div>  
                                                            <div class="col-lg-8" >
                                                                <div class="row">
                                                                        <div class="col-lg-4">
                                                                            <input class="form-check-input" type="checkbox"  :name="item.name" :value="item.type_convert[0]" style="margin-top:0" v-model="tagging[index]"> 
                                                                            <label :for="item.type_convert[0]">{{item.type_convert[0]}}</label><br> 
                                                                        </div>   
                                                                        <div class="col-lg-4">
                                                                            <input class="form-check-input" type="checkbox"  :name="item.name" :value="item.type_convert[1]"  style="margin-top:0" v-model="tagging[index]">
                                                                            <label  :for="item.type_convert[1]">{{item.type_convert[1]}}</label><br>
                                                                        </div>  
                                                                        <div class="col-lg-4">
                                                                            <input class="form-check-input" type="checkbox"  :name="item.name" :value="item.type_convert[2]"  style="margin-top:0" v-model="tagging[index]" > 
                                                                            <label :for="item.type_convert[2]">{{item.type_convert[2]}}</label><br>
                                                                        </div>  
                                                                </div>
                                                            </div>    

                                                        </div>
                                                    </div>

                                                

                                                    <button type="submit" class="btn btn-success mr-2" style="width: 200px;height: 40px;float: right;">Selanjutnya</button>
                                    
                                            </form>
                                        </div>
                                        <div v-if="activetab === 2" class="tabcontent">
                                            <form class="forms-sample" style="margin-top:30px" @submit.prevent="submitFile">
                                                    <div class="form-group">
                                                       
                                                        <label>Upload Dokumentasi</label>
                                                        <input type="file" id="file" ref="file" accept="image/*,video/*" v-on:change="handleFileUpload()" class="form-control file-upload-info" style="padding-top:5px" multiple/>
                                                        
                                                    </div>
                                                    <button type="button" class="btn btn-light mr-2" style="width: 200px;height: 40px;float: left;" v-on:click="activetab=1">Kembali</button>
                                                    <button type="submit" class="btn btn-success mr-2" style="width: 200px;height: 40px;float: right;">Selanjutnya</button>
                                    
                                            </form>
                                        </div>
                                        <div v-if="activetab === 3" class="tabcontent">
                                            <form class="forms-sample" style="margin-top:30px" @submit.prevent="submitFileKerja">
                                                    <div class="form-group">
                                                        <label>Lembar Kerja Peserta Didik</label>
                                                           <div class="row">
                                                                <input type="file" id="file" ref="filekerja" accept="*" v-on:change="handleFileKerjaUpload()" class="form-control file-upload-info" style="padding-top:5px"  multiple="multiple"/>
                                                           </div>        

                                                    </div>

                                                     <div class="form-group">
                                                        <label for="exampleInputName1">Alat & Bahan Lainnya</label>
                                                      
                                                        <div class="row" style="margin-top:15px;margin-bottom:15px" v-for="(item,index) in adb" v-bind:key="index">
                        
                                                                <div class="col-lg-3">
                                                                    <label for="jumlah">Jumlah</label>
                                                                    <input type="number" class="form-control" placeholder="XX" v-model="item.count">           
                                                                </div>
                                                                <div class="col-lg-6">
                                                                <label for="jumlah">Nama Alat</label>
                                                                    <input type="text" class="form-control" placeholder="Masukkan nama alat disini" v-model="item.name">   
                                                                </div>  
                                                                <div class="col-lg-1" v-if="adb.length > 1" style="margin-top:25px">
                                                                      <button type="button" class="btn btn-danger" v-on:click="removeAdb(index)">Remove</button>
                                                                </div>    
                                                        </div>   
                                                        <button type="button" class="btn btn-primary" v-on:click="AdbPush()">Tambah Alat Lainnya</button>
                                                        
                                                    </div>


                                                    <button type="button" class="btn btn-light mr-2" style="width: 200px;height: 40px;float: left;" v-on:click="activetab=2">Kembali</button>
                                                    <button type="submit" class="btn btn-success mr-2" style="width: 200px;height: 40px;float: right;">Selanjutnya</button>
                                    
                                            </form>
                                        </div>
                                        <div v-if="activetab === 4" class="tabcontent">
                                            <form class="forms-sample" style="margin-top:30px" @submit.prevent="submitStep">
                                                 <div class="form-group">
                                                     <label>Masukkan Langkah-langkah kegiatan</label>
                                                     <vue-editor v-model="contentStep" :editorToolbar="customToolbar"></vue-editor>
                                                 </div>
                                                <button type="button" class="btn btn-light mr-2" style="width: 200px;height: 40px;float: left;" v-on:click="activetab=3">Kembali</button>
                                                <button type="submit" class="btn btn-success mr-2" style="width: 200px;height: 40px;float: right;">Selanjutnya</button>
                                            </form>   
                                        </div>  
                                        <div v-if="activetab === 5" class="tabcontent">
                                            <!-- top row -->
                                            <div class="row" style="margin-top:50px">
                                                <div class="col-lg-6">
                                                        <div v-if="imageShow.Activity_file_type === 'video'" style="display: inline-block;height:250px;width: 100%;">   
                                                        <img  v-bind:src="imageShow.thumbnail" style="width:100%;float:left;cursor:pointer;height: inherit;object-fit: cover;" @click="showModalPreview">
                                                          <div  class="play-button" style="margin: -50px 0 0 -14px;cursor:pointer" @click="showModalPreview"></div>
                                                    </div>
                                                    <img v-else-if="imageShow.Activity_file_type === 'image'" v-bind:src="imageShow.Activity_dok_file" style="width:100%;height:250px;object-fit: contain;cursor:pointer" @click="showModalPreview"/>
                                                
                                                <div class="row" style="height:70px; overflow : hidden auto">
                                                    <div class=" col-lg-12" >
                                                        <div style="width:60px;height:60px;float:left;border: 1px solid #c1c1c1;margin:5px" v-for="item in dokumentasi" :key="item"> 
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
                                                    <h4>{{ Activity_title }}</h4>
                                                    <p style="font-weight: 500;"> {{ selectedTopik.Topik_name }}</p>
                                                    
                                                    <div class="row">
                                                        <div class="col-lg-6">
                                                            <label><code>Jenjang</code></label>
                                                            <p style="font-weight: 500;">{{ selectedJenjang.Jenjang_name }}</p>
                                                        </div>  
                                                         <div class="col-lg-6">
                                                            <label><code>Kelas</code></label>
                                                           <p style="font-weight: 500;">{{ selectedKelas.Kelas_name }}</p>
                                                        </div>   
                                                    </div>   

                                                     <div class="row">
                                                        <div class="col-lg-6">
                                                            <label><code>Mata Pelajaran</code></label>
                                                           <p style="font-weight: 500;">{{ selectedMapel.Mapel_name }}</p>
                                                        </div>  
                                                         <div class="col-lg-6">
                                                            <label><code>Kompetensi</code></label>
                                                           <p style="font-weight: 500;">{{ selectedKompetensi.Kd_name }}</p>
                                                        </div>   
                                                     </div>       
                                                </div>      
                                            </div>   
                                            
                                            <!--bottom row -->
                                            <div class="row" style="margin-top:20px">
                                                <div class="col-lg-12">
                                                    <label style="font-weight: 500;">Deskripsi</label>
                                                    <p>{{ Activity_desc }}</p>
                                                </div>    
                                            </div>  

                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <label style="font-weight: 500;">Lembar Kerja Peserta Didik</label>
                                                    <ul id="example-1">
                                                        <li v-for="item in dataFile" :key="item">
                                                            <router-link :to="item.Activity_step_file" target="_blank">{{ item.Activity_file_name }}</router-link>
                                                        </li>
                                                    </ul>
                                                 </div>
                                            </div>      

                                             <div class="row">
                                                 <div class="col-lg-12">
                                                    <label style="font-weight: 500;">Alat & Bahan</label>
                                                    <ul id="example-1">
                                                        <li v-for="item in adb" :key="item">
                                                            {{ item.count }} {{ item.name }}
                                                        </li>
                                                    </ul>
                                                 </div>
                                            </div> 

                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <label style="font-weight: 500;">Langkah Kegiatan</label>
                                                    <p><span v-html="contentStep"></span></p>
                                                </div>
                                            </div>   

                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <button type="button" class="btn btn-light mr-2" style="width: 200px;height: 40px;float: left;" v-on:click="activetab=4">Kembali</button>
                                                    <button type="button" class="btn btn-primary mr-2" style="width: 200px;height: 40px;float: right;" v-on:click="publishSave"> Publish and Save</button>
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

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { VueEditor } from "vue2-editor"

export default {
    name:'create_activity',
     data() {
        return {
            checkedType :[],
            filter : [],
            tagging :[],
            tab :'',
            Activity_title :'',
            Activity_desc :'',
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

            activetab: 1,
            activity:'',

            file: '',
            filekerja :'',
            lkpd : false,
            editadb : false,
            editstep : false,
            editdokumentasi : false,
            adb :[{
                 'count':'',
                 'name':''
             }],

            contentStep :'',
            customToolbar: [
                    [{ 'header': [false, 1, 2, 3, 4, 5, 6, ] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
                    [{ 'header': 1 }, { 'header': 2 }],
                    ['blockquote', 'code-block'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
                    [{ 'script': 'sub'}, { 'script': 'super' }],
                    [{ 'indent': '-1'}, { 'indent': '+1' }],
                    [{ 'color': [] }, { 'background': [] }],
                ],
            text:'',
            dataFile :[],
            dokumentasi : [],
            imageShow :''
       
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
        this.getFilter()
    },
    components:{
      'v-select': vSelect,
       VueEditor
    },
    methods:{
        getFilter(){
            this.$http.get('/master/filter').then(response => {

                  this.filter = response.data.values;
                  this.filter.map((item,index) => {
                      //let name = item.name.toString()
                      this.tagging[index] = []
                     return item
                  });
                  
            });
        },
        setSelectedJenjang(value){
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
        },
        AddGeneral(){
             let json = [{
                "title" : this.Activity_title,
                "deksripsi" : this.Activity_desc,
                "jenjang" : this.selectedJenjang.Jenjang_id,
                "kelas" : this.selectedKelas.id_kelas,
                "mapel" : this.selectedMapel.Id_mapel,
                "kd" : this.selectedKompetensi.Id_kd,
                "topik" :this.selectedTopik.Id_topik,
                "type" :this.checkedType.join(),
                "filter": []
                }]

             let tagging = []
             for ( let i = 0; i < this.filter.length ; i ++){
                 let value = this.tagging[i].toString();
                 let a = {
                 "name" : this.filter[i].name,
                 "value" : value
                 }
                 tagging.push(a)
             }
             json[0].filter = tagging
            if (this.activity === ''){
                this.$http.post('/activity/general/'+this.users[0].Id_user, json 
                ).then(request => this.Successful(request))
                .catch(() => this.Failed())
              }
            else{
                this.$http.put('/activity/general/'+this.activity, json).then(request => this.Successful(request))
               .catch(() => this.Failed())
             }  
        
          
         },
         Successful (req) {
              this.activity = req.data.values.Id_activity
              this.dataFile = req.data.values.file
           
              if (this.activetab  === 1){
                    this.activetab = 2
                }
              else if (this.activetab === 2 ){
                  this.activetab = 3
              }else if (this.activetab  === 3 ){
                  this.activetab = 4
              }else if (this.activetab  === 4 ){
                     this.dokumentasi = req.data.values.dokumentasi
              this.imageShow = req.data.values.dokumentasi[0]
                  this.activetab  = 5
              }
              else if (this.activetab === 5){
                  this.$router.push({ name: 'Detail',  params: { Activity_id: this.activity }})
              }
              else{
                  this.activetab  = 1
              }

        },
        Failed () {
              
        },
        handleFileUpload(){
            this.file = this.$refs.file.files;
        },
         handleFileKerjaUpload(){
            this.filekerja = this.$refs.filekerja.files;
        },
        submitFile(){

             let formData = new FormData();
               for( var i = 0; i < this.file.length; i++ ){
                let file = this.file[i];
                formData.append('files', file);
                }
            if (this.editdokumentasi === false){
           
                this.$http.post( '/activity/dokumentasi/'+this.activity+'/'+this.editdokumentasi,formData,{
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                }).then(request =>{
                    this.editdokumentasi = true
                    this.Successful(request)
                } )
                .catch(() => this.Failed())
            }
            else{
                this.$http.post( '/activity/dokumentasi/'+this.activity+'/'+this.editdokumentasi,formData,{
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                }).then(request =>{

                    this.Successful(request)
                } )
                .catch(() => this.Failed())
            } 
        },
        submitFileKerja(){
             let formData = new FormData();
               for( var i = 0; i < this.filekerja.length; i++ ){
                let file = this.filekerja[i];
                formData.append('files', file);
                }
            
            if (this.lkpd === false){
                this.$http.post( '/activity/file/'+this.activity+'/'+this.lkpd,formData,{
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                }).then(()  => { 
                    this.lkpd = true; 
                    this.submitAdb()
                 }).catch(() => this.Failed())
            }else{
                 this.$http.post( '/activity/file/'+this.activity+'/'+this.lkpd,formData,{
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                }).then(()  => { 
                  
                    this.lkpd = true; 
                    this.submitAdb()
                 }).catch(() => this.Failed())
            }
          
        },
        submitAdb(){
            if (this.editadb === false){
              this.$http.post('/activity/adb/'+this.activity+'/'+this.editadb, this.adb
                ).then(request => {
                    this.editadb = true
                    this.Successful(request)
                }).catch(() => this.Failed())
            }else{
                this.$http.post('/activity/adb/'+this.activity+'/'+this.editadb, this.adb
                ).then(request => this.Successful(request))
                .catch(() => this.Failed()) 
            }    
        },
        AdbPush(){
             this.adb.push( {'count':'','name' : ''})
        },
        removeAdb(index){
            if (index === 0){
                this.adb.shift()
            }
            else{
                let a = index -1;
                this.adb.splice(a,1) }            
        },
        submitStep(){
           this.text = this.contentStep.replace(/"/g,'\\"',this.contentStep);
            let step = {
                    "number" : 1,
                    "text" : this.text
                    }
            
            if (this.editstep === false){ 
                this.$http.post('/activity/step/'+this.activity, step
                    ).then(request => {
                        this.editstep = true
                        this.Successful(request)
                    }).catch(() => this.Failed())
            }else{
                  this.$http.put('/activity/step/'+this.activity, step
                    ).then(request => this.Successful(request))
                    .catch(() => this.Failed())
            }
        },
        publishSave(){
            if (this.activity !== ''){
                 this.$http.put('/activity/publish/'+this.activity
                    ).then(request => this.Successful(request))
                    .catch(() => this.Failed())
            }else{
                this.activetab = 5
            }
        },
          showModalPreview () {
            this.$modal.show('modal');
         },changeShow(item){
            this.imageShow = item
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