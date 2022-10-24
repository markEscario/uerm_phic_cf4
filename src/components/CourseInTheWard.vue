<template>
  <CourseInTheWardDialog :eCourseInTheWardDialog="CInTheWardDialog" :dTitle="dialogTitle" :pInfo="patientDetails"
    :cf4CIW="cf4CourseInTheWard" @close="closeCourseInTheDialog" @hide="closeCourseInTheDialog" />
  <q-expansion-item class="bg-amber-3">
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar icon="medication" color="primary" text-color="white" />
      </q-item-section>

      <q-item-section>
        IV. COURSE IN THE WARD
      </q-item-section>
      <q-btn class="q-mr-sm" outline rounded color="primary" label="CREATE" @click="courseInTheWardDialog()"
        size="sm" />
    </template>

    <q-card>
      <q-card-section>
        <div class="row">
          <div class="col-md-3">
            <label class="text-weight-bold">Date:</label>
            <q-space class="q-mb-xs" />
            Sept. 25, 2022
          </div>
          <div class="col-md-2">
            <label class="text-weight-bold">Doctors Order:</label>
            <q-space class="q-mb-xs" />
            Orders and Action example data
          </div>
        </div>

      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>
<script>
import { defineComponent, ref } from "vue";
import { mapGetters } from 'vuex'
import moment from 'moment'
import CONSTANTS from '../constants'
import CourseInTheWardDialog from 'components/CourseInTheWardDialog.vue'

export default defineComponent({
  name: 'CourseInTheWardPage',
  components: {
    CourseInTheWardDialog
  },
  data() {
    return {
      moment,
      dialogTitle: '',
      CInTheWardDialog: false,
      patientInfo: {},
      cf4CourseInTheWard: {
        id: 0,
        patient_no: '',
        case_no: '',
        date_of_order: '',
        doctors_order: '',
        ciw_status: ''
      },
    }
  },
  created() {
    // this.getCf4PCourseInTheWard()
  },
  computed: {
    ...mapGetters({
      searchStatus: 'patientsCf4/searchStatus',
      patientDetails: 'patientsCf4/patientDetails',
      cf4CIW: 'patientsCf4/cf4CourseInTheWard',
    })
  },
  methods: {
    async fetchPatientData() {
      await this.$store.dispatch('patientsCf4/getPatientDetails', this.$route.query.pNo)
    },
    async getCf4PCourseInTheWard() {
      await this.$store.dispatch('patientsCf4/getCf4PCourseInTheWard', this.$route.query.pNo)
    },
    courseInTheWardDialog(data) {
      this.dialogTitle = 'CREATE COURSE IN THE WARD'
      this.CInTheWardDialog = true
      this.cf4CourseInTheWard = {
        id: 0,
        patient_no: '',
        case_no: '',
        date_of_order: '',
        emp_code: '',
        ciw_status: 'NEW ENTRY'
      }
    },
    closeCourseInTheDialog() {
      this.CInTheWardDialog = false
    }
  }
})
</script>
