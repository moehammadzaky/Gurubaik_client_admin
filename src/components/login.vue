<template>
  <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
          <div class="row w-100">
            <div class="col-lg-4 mx-auto">
              <div class="auto-form-wrapper">
                <form @submit.prevent="login">
                  <div class="form-group">
                    <label class="label">Email</label>
                    <div class="input-group">
                      <input type="text" class="form-control" placeholder="Username" v-model="input.email">
                      <div class="input-group-append">
                        <span class="input-group-text">
                          <i class="mdi mdi-check-circle-outline"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="label">Password</label>
                    <div class="input-group">
                      <input type="password" class="form-control" placeholder="*********" v-model="input.password">
                      <div class="input-group-append">
                        <span class="input-group-text">
                          <i class="mdi mdi-check-circle-outline"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                 
                  <div class="form-group">
                    <button class="btn btn-primary submit-btn btn-block" type="submit">Login</button>
                  <br>
                     <label class="label" style="color:red" v-if="wrong"> {{ wrong }} </label>
                  </div>
                  <!--
                  <div class="form-group d-flex justify-content-between">
                    <div class="form-check form-check-flat mt-0">
                      <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" checked> Keep me signed in </label>
                    </div>
                    <a href="#" class="text-small forgot-password text-black">Forgot Password</a>
                  </div>
                   
                  <div class="form-group">
                    <button class="btn btn-block g-login">
                      <img class="mr-3" src="../assets/images/file-icons/icon-google.svg" alt="">Log in with Google</button>
                  </div>
                 
                  <div class="text-block text-center my-3">
                    <span class="text-small font-weight-semibold">Not a member ?</span>
                    <a href="register.html" class="text-black text-small">Create new account</a>
                  </div>
                 -->
                </form>
              </div>
              <!--
              <ul class="auth-footer">
                <li>
                  <a href="#">Conditions</a>
                </li>
                <li>
                  <a href="#">Help</a>
                </li>
                <li>
                  <a href="#">Terms</a>
                </li>
              </ul>
              <p class="footer-text text-center">copyright © 2018 Bootstrapdash. All rights reserved.</p>
              -->
            </div>
          </div>
        </div>
        <!-- content-wrapper ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>

</template>

<script>

export default {
        name: 'Login',
        data() {
            return {
                input: {
                    email: "",
                    password: "",
                    error: false
                },
                wrong:null
            }
        },
       
        methods: {
          checkCurrentLogin () {
            if (this.currentUser) {
                this.$router.replace(this.$route.query.redirect || '/dashboard')
             }
            },
            login () {
              this.$http.post('/admin', { 
                email: this.input.email, 
                password: this.input.password })
                .then(request => this.loginSuccessful(request))
                .catch(() => this.loginFailed())
            },
            loginSuccessful (req) {
              if (!req.data.access_token) {
                this.loginFailed()
                return
              }
              this.error = false
              localStorage.token = req.data.access_token
              localStorage.setItem("user", JSON.stringify(req.data.values));
            
              this.$store.dispatch('login')
              this.$router.replace(this.$route.query.redirect || '/dashboard')
            },
            loginFailed () {
              this.wrong =  "Email or Password is incorrect"
              delete localStorage.token
            }
  
        }
    }
</script>

