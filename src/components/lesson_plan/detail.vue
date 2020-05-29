<template>
   <div class="main-panel">
     <div class="content-wrapper">
         <!--start content-->
          <div class="row">
            <div class="col-md-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Detail Rencana Pembelajaran</h4>

                       <div class="tabs">
                            <a  v-bind:class="[ activetab === 1 ? 'active' : '' ]" @click="activetab = 1">Kegiatan Pembuka</a>
                            <a  v-bind:class="[ activetab === 2 ? 'active' : '' ]" @click="activetab = 2">Kegiatan Inti</a>
                            <a  v-bind:class="[ activetab === 3 ? 'active' : '' ]" @click="activetab = 3">Kegiatan Penutup</a>
                        </div>

                         <div class="content">
                            <div v-if="activetab === 1" class="tabcontent">
                                    <div class="row" style="margin-top:50px">
                                            <div v-if="pembuka.dokumentasi && pembuka.dokumentasi.length === 0" class="col-lg-6">
                                              <img  src="../../assets/gurubaik_logo_long.png" style="width:100%;height:250px;object-fit: contain;cursor:pointer" />
                                            </div>       
                                            <div v-else class="col-lg-6">
                                                <div v-if="imageShow === ''">
                                                  
                                                         <div v-if="pembuka.dokumentasi[0].Activity_file_type === 'video'" style="display: inline-block;height:250px;width: 100%;">   
                                                            <img  v-bind:src="pembuka.dokumentasi[0].thumbnail" style="width:100%;float:left;cursor:pointer;height: inherit;object-fit: cover;" @click="showModalPreview">
                                                            <div  class="play-button" style="margin: -50px 0 0 -14px;cursor:pointer" @click="showModalPreview"></div>
                                                         </div>
                                                         <img v-else-if="pembuka.dokumentasi[0].Activity_file_type === 'image'" v-bind:src="pembuka.dokumentasi[0].Activity_dok_file" style="width:100%;height:250px;object-fit: contain;cursor:pointer" @click="showModalPreview"/>
                                                    
                                                </div>   
                                                <div v-else >
                                                    <div v-if="imageShow.Activity_file_type === 'video'" style="display: inline-block;height:250px;width: 100%;">   
                                                            <img  v-bind:src="imageShow.thumbnail" style="width:100%;float:left;cursor:pointer;height: inherit;object-fit: cover;" @click="showModalPreview">
                                                            <div  class="play-button" style="margin: -50px 0 0 -14px;cursor:pointer" @click="showModalPreview"></div>
                                                    </div>
                                                    <img v-else-if="imageShow.Activity_file_type === 'image'" v-bind:src="imageShow.Activity_dok_file" style="width:100%;height:250px;object-fit: contain;cursor:pointer" @click="showModalPreview"/>
                                                </div>
                                                <div class="row" style="height:70px; overflow : hidden auto">
                                                    <div class=" col-lg-12" >
                                                        <div style="width:60px;height:60px;float:left;border: 1px solid #c1c1c1;margin:5px" v-for="(item,index) in pembuka.dokumentasi" :key="index"> 
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
                                                    <h3>{{ pembuka.Activity_title }}</h3>
                                                    <p style="font-weight: 500;"> {{ pembuka.Topik_name }}</p>
                                                    
                                                    <div class="row">
                                                        <div class="col-lg-6">
                                                            <label><code>Jenjang</code></label>
                                                            <p style="font-weight: 500;">{{ pembuka.Jenjang_name }}</p>
                                                        </div>  
                                                         <div class="col-lg-6">
                                                            <label><code>Kelas</code></label>
                                                           <p style="font-weight: 500;">{{ pembuka.Kelas_name }}</p>
                                                        </div>   
                                                    </div>   

                                                     <div class="row">
                                                        <div class="col-lg-6">
                                                            <label><code>Mata Pelajaran</code></label>
                                                           <p style="font-weight: 500;">{{ pembuka.Mapel_name }}</p>
                                                        </div>  
                                                         <div class="col-lg-6">
                                                            <label><code>Kompetensi</code></label>
                                                           <p style="font-weight: 500;">{{ pembuka.Kd_name }}</p>
                                                        </div>   
                                                     </div>   
                                                </div>      
                                            </div>   
                                            
                                            <!--bottom row -->
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <label style="font-weight: 500;">Deskripsi</label>
                                                    <p>{{ pembuka.Activity_desk}}</p>
                                                </div>    
                                            </div>  
                                             <div class="row">
                                                <div class="col-lg-12">
                                                     <label style="font-weight: 500;">Lembar Kerja Peserta Didik</label>
                                                    <ul id="example-1">
                                                            <li v-for="(item,index) in pembuka.file" :key="index">
                                                                  <a :href="item.Activity_step_file" target="_blank">{{ item.Activity_file_name }}</a>
                                                            </li>
                                                        </ul>
                                                </div>    
                                            </div> 

                                             <div class="row">
                                                 <div class="col-lg-12">
                                                    <label style="font-weight: 500;">Alat & Bahan</label>
                                                    <ul id="example-1">
                                                        <li v-for="(item,index) in pembuka.adb" :key="index">
                                                            {{ item.Acitivty_adb_count }} {{ item.Activity_adb_name }}
                                                        </li>
                                                    </ul>
                                                 </div>
                                            </div> 

                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <label style="font-weight: 500;">Langkah Kegiatan</label>
                                                    <ul id="example-1" style="list-type:none">
                                                      <li v-for="(item,index) in pembuka.step" :key="index" >
                                                             <p><span v-html="item.Activity_step_text"></span></p>
                                                      </li>
                                                    </ul> 
                                                </div>
                                            </div>   
                            </div>
                            <div v-if="activetab === 2" class="tabcontent">
                                    <!-- top row -->
                                        <div class="row" style="margin-top:50px">
                                            <div v-if="inti.dokumentasi && inti.dokumentasi.length === 0" class="col-lg-6">
                                              <img  src="../../assets/gurubaik_logo_long.png" style="width:100%;height:250px;object-fit: contain;cursor:pointer" />
                                            </div>       
                                            <div v-else class="col-lg-6">
                                                <div v-if="imageShow === ''">
                                                    
                                                     <div v-if="inti.dokumentasi[0].Activity_file_type === 'video'" style="display: inline-block;height:250px;width: 100%;">   
                                                            <img  v-bind:src="inti.dokumentasi[0].thumbnail" style="width:100%;float:left;cursor:pointer;height: inherit;object-fit: cover;" @click="showModalPreview">
                                                            <div  class="play-button" style="margin: -50px 0 0 -14px;cursor:pointer" @click="showModalPreview"></div>
                                                    </div>
                                                    <img v-else-if="inti.dokumentasi[0].Activity_file_type === 'image'" v-bind:src="inti.dokumentasi[0].Activity_dok_file" style="width:100%;height:250px;object-fit: contain;cursor:pointer" @click="showModalPreview"/>
                                                </div>   
                                                <div v-else >
                                                    <div v-if="imageShow.Activity_file_type === 'video'" style="display: inline-block;height:250px;width: 100%;">   
                                                            <img  v-bind:src="imageShow.thumbnail" style="width:100%;float:left;cursor:pointer;height: inherit;object-fit: cover;" @click="showModalPreview">
                                                            <div  class="play-button" style="margin: -50px 0 0 -14px;cursor:pointer" @click="showModalPreview"></div>
                                                    </div>
                                                    <img v-else-if="imageShow.Activity_file_type === 'image'" v-bind:src="imageShow.Activity_dok_file" style="width:100%;height:250px;object-fit: contain;cursor:pointer" @click="showModalPreview"/>
                                                </div>
                                                <div class="row" style="height:70px; overflow : hidden auto">
                                                    <div class=" col-lg-12" >
                                                        <div style="width:60px;height:60px;float:left;border: 1px solid #c1c1c1;margin:5px" v-for="(item,index) in inti.dokumentasi" :key="index"> 
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
                                                    <h3>{{ inti.Activity_title }}</h3>
                                                    <p style="font-weight: 500;"> {{ inti.Topik_name }}</p>
                                                    
                                                    <div class="row">
                                                        <div class="col-lg-6">
                                                            <label><code>Jenjang</code></label>
                                                            <p style="font-weight: 500;">{{ inti.Jenjang_name }}</p>
                                                        </div>  
                                                         <div class="col-lg-6">
                                                            <label><code>Kelas</code></label>
                                                           <p style="font-weight: 500;">{{ inti.Kelas_name }}</p>
                                                        </div>   
                                                    </div>   

                                                     <div class="row">
                                                        <div class="col-lg-6">
                                                            <label><code>Mata Pelajaran</code></label>
                                                           <p style="font-weight: 500;">{{ inti.Mapel_name }}</p>
                                                        </div>  
                                                         <div class="col-lg-6">
                                                            <label><code>Kompetensi</code></label>
                                                           <p style="font-weight: 500;">{{ inti.Kd_name }}</p>
                                                        </div>   
                                                     </div>   
                                                </div>      
                                            </div>   
                                            
                                            <!--bottom row -->
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <label style="font-weight: 500;">Deskripsi</label>
                                                    <p>{{ inti.Activity_desk}}</p>
                                                </div>    
                                            </div>  
                                             <div class="row">
                                                <div class="col-lg-12">
                                                     <label style="font-weight: 500;">Lembar Kerja Peserta Didik</label>
                                                    <ul id="example-1">
                                                            <li v-for="(item,index) in inti.file" :key="index">
                                                                <a :href="item.Activity_step_file" target="_blank">{{ item.Activity_file_name }}</a>
                                                            </li>
                                                        </ul>
                                                </div>    
                                            </div> 

                                             <div class="row">
                                                 <div class="col-lg-12">
                                                    <label style="font-weight: 500;">Alat & Bahan</label>
                                                    <ul id="example-1">
                                                        <li v-for="(item,index) in inti.adb" :key="index">
                                                            {{ item.Acitivty_adb_count }} {{ item.Activity_adb_name }}
                                                        </li>
                                                    </ul>
                                                 </div>
                                            </div> 

                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <label style="font-weight: 500;">Langkah Kegiatan</label>
                                                    <ul id="example-1" style="list-type:none">
                                                      <li v-for="(item,index) in inti.step" :key="index" >
                                                             <p><span v-html="item.Activity_step_text"></span></p>
                                                      </li>
                                                    </ul> 
                                                </div>
                                            </div>   
                            </div> 
                           <div v-if="activetab === 3" class="tabcontent">
                               <!-- top row -->
                                    <div class="row" style="margin-top:50px">
                                            <div v-if="penutup.dokumentasi && penutup.dokumentasi.length === 0" class="col-lg-6">
                                              <img  src="../../assets/gurubaik_logo_long.png" style="width:100%;height:250px;object-fit: contain;cursor:pointer" />
                                            </div>       
                                            <div v-else class="col-lg-6">
                                                <div v-if="imageShow === ''">
                                                     <div v-if="penutup.dokumentasi[0].Activity_file_type === 'video'" style="display: inline-block;height:250px;width: 100%;">   
                                                            <img  v-bind:src="penutup.dokumentasi[0].thumbnail" style="width:100%;float:left;cursor:pointer;height: inherit;object-fit: cover;" @click="showModalPreview">
                                                            <div  class="play-button" style="margin: -50px 0 0 -14px;cursor:pointer" @click="showModalPreview"></div>
                                                    </div>
                                                    <img v-else-if="penutup.dokumentasi[0].Activity_file_type === 'image'" v-bind:src="penutup.dokumentasi[0].Activity_dok_file" style="width:100%;height:250px;object-fit: contain;cursor:pointer" @click="showModalPreview"/>
                                                </div>   
                                                <div v-else >
                                                    <div v-if="imageShow.Activity_file_type === 'video'" style="display: inline-block;height:250px;width: 100%;">   
                                                            <img  v-bind:src="imageShow.thumbnail" style="width:100%;float:left;cursor:pointer;height: inherit;object-fit: cover;" @click="showModalPreview">
                                                            <div  class="play-button" style="margin: -50px 0 0 -14px;cursor:pointer" @click="showModalPreview"></div>
                                                    </div>
                                                    <img v-else-if="imageShow.Activity_file_type === 'image'" v-bind:src="imageShow.Activity_dok_file" style="width:100%;height:250px;object-fit: contain;cursor:pointer" @click="showModalPreview"/>
                                                </div>
                                                <div class="row" style="height:70px; overflow : hidden auto">
                                                    <div class=" col-lg-12" >
                                                        <div style="width:60px;height:60px;float:left;border: 1px solid #c1c1c1;margin:5px" v-for="(item,index) in penutup.dokumentasi" :key="index"> 
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
                                                    <h3>{{ penutup.Activity_title }}</h3>
                                                    <p style="font-weight: 500;"> {{ penutup.Topik_name }}</p>
                                                    
                                                    <div class="row">
                                                        <div class="col-lg-6">
                                                            <label><code>Jenjang</code></label>
                                                            <p style="font-weight: 500;">{{ penutup.Jenjang_name }}</p>
                                                        </div>  
                                                         <div class="col-lg-6">
                                                            <label><code>Kelas</code></label>
                                                           <p style="font-weight: 500;">{{ penutup.Kelas_name }}</p>
                                                        </div>   
                                                    </div>   

                                                     <div class="row">
                                                        <div class="col-lg-6">
                                                            <label><code>Mata Pelajaran</code></label>
                                                           <p style="font-weight: 500;">{{ penutup.Mapel_name }}</p>
                                                        </div>  
                                                         <div class="col-lg-6">
                                                            <label><code>Kompetensi</code></label>
                                                           <p style="font-weight: 500;">{{ penutup.Kd_name }}</p>
                                                        </div>   
                                                     </div>   
                                                </div>      
                                            </div>   
                                            
                                            <!--bottom row -->
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <label style="font-weight: 500;">Deskripsi</label>
                                                    <p>{{ penutup.Activity_desk}}</p>
                                                </div>    
                                            </div>  
                                             <div class="row">
                                                <div class="col-lg-12">
                                                     <label style="font-weight: 500;">Lembar Kerja Peserta Didik</label>
                                                    <ul id="example-1">
                                                            <li v-for="(item,index) in penutup.file" :key="index">
                                                               <a :href="item.Activity_step_file" target="_blank">{{ item.Activity_file_name }}</a>
                                                            </li>
                                                        </ul>
                                                </div>    
                                            </div> 

                                             <div class="row">
                                                 <div class="col-lg-12">
                                                    <label style="font-weight: 500;">Alat & Bahan</label>
                                                    <ul id="example-1">
                                                        <li v-for="(item,index) in penutup.adb" :key="index">
                                                            {{ item.Acitivty_adb_count }} {{ item.Activity_adb_name }}
                                                        </li>
                                                    </ul>
                                                 </div>
                                            </div> 

                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <label style="font-weight: 500;">Langkah Kegiatan</label>
                                                    <ul id="example-1" style="list-type:none">
                                                      <li v-for="(item,index) in penutup.step" :key="index" >
                                                             <p><span v-html="item.Activity_step_text"></span></p>
                                                      </li>
                                                    </ul> 
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
    name : 'Detail_Lesson',
      data(){
        return{
            data:[],
            pembuka :[],
            inti :[],
            penutup :[],
            activetab: 1,
            imageShow : ''
        }
    },
    mounted(){
        //get data kelas
        this.$http.get('/lesson/'+this.$route.params.Lesson_id).then(response => {
            this.data = response.data.values[0];
            this.pembuka = this.data.pembuka
            
            this.inti = this.data.inti
            this.penutup = this.data.penutup
        });
    },methods:{
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
</style>