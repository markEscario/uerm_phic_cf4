<template>
  <q-dialog v-if="fModal" :model-value="true" maximized full-width full-height persistent>
    <q-card style="width: 1700px; max-width: 80vw;">
      <div class="q-pa-md" style="max-width: 1940px">
        <q-list bordered class="rounded-borders">
          <q-expansion-item class="bg-amber-3" default-opened>
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar icon="local_hospital" color="primary" text-color="white" />
              </q-item-section>

              <q-item-section>
                I. HEALTH CARE INSTITUTION
              </q-item-section>
            </template>

            <q-card>
              <q-card-section>
                <div class="row">
                  <div class="col-md-6">
                    <label class="text-weight-bold">1. Name of HCI</label>
                    <q-space />
                    UNIVERSITY OF THE EAST RAMON MAGSAYSAY MEMORIAL MEDICAL CENTER INC (UERMMMCI)
                  </div>
                  <div class="col-md-3">
                    <label class="text-weight-bold">2. Accreditation Number</label>
                    <q-space />
                    H93005943
                  </div>
                </div>

                <q-space class="q-pa-sm" />

                <div class="row">
                  <div class="col-md-6">
                    <label class="text-weight-bold">1. Address of HCI</label>
                    <q-space />
                    #64 AURORA BOULEVARD BARANGAY DOÑA IMELDA, QUEZON CITY 1113
                  </div>

                </div>
                <q-space />
                Bldg. No and Name/Lot/Block / Street / Subdivision/Village / Barangay/City / Municipality / Province /
                ZIP
                Code
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator class="q-pa-sm" />

          <q-expansion-item class="bg-amber-3" default-opened>
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar>
                  <q-avatar icon="account_box" color="primary" text-color="white" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                II. PATIENT DATA
              </q-item-section>
            </template>

            <q-card>
              <q-card-section>
                <div class="row">
                  <div class="col-md-6">
                    <label>1. NAME OF PATIENT</label>
                    <q-space />
                    NAME
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator class="q-pa-sm" />

          <q-expansion-item class="bg-amber-3">
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar icon="personal_injury" color="primary" text-color="white" />
              </q-item-section>

              <q-item-section>
                III. REASON FOR ADMISSION
              </q-item-section>
            </template>

            <q-card>
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos
                corrupti
                commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator class="q-pa-sm" />

          <q-expansion-item class="bg-amber-3">
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar icon="medication" color="primary" text-color="white" />
              </q-item-section>

              <q-item-section>
                IV. CURSE IN THE WARD
              </q-item-section>
            </template>

            <q-card>
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos
                corrupti
                commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator class="q-pa-sm" />

          <q-expansion-item class="bg-amber-3">
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar icon="local_pharmacy" color="primary" text-color="white" />
              </q-item-section>

              <q-item-section>
                V. DRUGS / MEDICINES
              </q-item-section>
            </template>

            <q-card>
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos
                corrupti
                commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator class="q-pa-sm" />

          <q-expansion-item class="bg-amber-3">
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar icon="folder" color="primary" text-color="white" />
              </q-item-section>

              <q-item-section>
                VI. OUTCOME TREATMENT
              </q-item-section>
            </template>

            <q-card>
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos
                corrupti
                commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator class="q-pa-sm" />

        </q-list>
      </div>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'PatientCf4Modal',
  setup() {
    const $q = useQuasar()
    return {
      triggerPositive() {
        $q.notify({
          type: 'positive',
          message: 'Project was submitted'
        })
      },
      triggerInfo() {
        $q.notify({
          type: 'info',
          message: 'Project was updated'
        })
      },
      triggerNegative() {
        $q.notify({
          type: 'negative',
          message: 'Project was deleted'
        })
      }
    }
  },
  created() {
    this.checkData()
  },
  data() {
    return {

      projects: {
        title: '',
        user_code: '',
        project_description: '',
        project_status: 'New Task',
        author: '',
        assigned_by: ''
      }
    }
  },
  props: ['fModal', 'pTDetails'],

  computed: {
    ...mapGetters({
      isLogged: 'projects/isLogged',
      loggedUsers: 'projects/loggedUsers',
      users: 'projects/users',
      submitStatus: 'projects/submitStatus'
    })
  },

  // watch: {
  //   vData: {
  //     handler(val) {
  //       if (val) {
  //         console.log('val: ', val)
  //         this.projects.title = val.title
  //         this.projects.user_code = val.user_code
  //         this.projects.project_description = val.project_description
  //         this.projects.project_status = val.project_status
  //         this.projects.author = val.author
  //         this.projects.assigned_by = val.assigned_by
  //       } else {
  //         this.projects.title = ''
  //         this.projects.user_code = ''
  //         this.projects.project_description = ''
  //         this.projects.project_status = ''
  //         this.projects.author = ''
  //         this.projects.assigned_by = ''
  //       }
  //     },
  //     immediate: true
  //   }

  // },

  methods: {
    submitForm() {
      console.log('action: ', this.title)
      this.title === 'Assign Project' ? this.saveProject() : this.title === 'Edit Project' ? this.saveEditProject() : this.deleteProject()
    },
    checkData() {
      this.pTDetails
    },
    close() {
      this.$emit('close')
    }
  }
})
</script>