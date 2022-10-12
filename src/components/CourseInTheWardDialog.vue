<template>
  <q-dialog v-if="eCourseInTheWardDialog" :model-value="true">
    <q-card style="width: 1980px; max-width: 180vw;">
      <q-card-section>
        <q-banner dense inline-actions class="text-white bg-primary q-mb-sm">
          <label class="text-caption">
            {{ pInfo.LASTNAME }}, {{ pInfo.FIRSTNAME }} {{ pInfo.MIDDLENAME }} - {{ pInfo.PATIENTNO[0] }}
          </label>
        </q-banner>

        <q-banner v-if="submitAlert" dense inline-actions class="text-white bg-green-3">
          <label class="text-caption">
            <q-spinner-hourglass color="primary" size="2em" />
            {{ updateCourseInTheWardMsg }}
          </label>
        </q-banner>

        <q-space class="q-mb-sm" />
        <div class="text-caption text-weight-bold text-uppercase">{{ dTitle }}</div>
      </q-card-section>
      <q-form @submit="submitUpdateCourseInTheWard" class="q-gutter-md" ref="form">
        <div class="row" style="max-width: 1800px">
          <!-- <div class="col-md-3 q-ml-md">
            <q-input class="text-uppercase" outlined v-model="cf4CourseInTheWard.date_of_order" label="DATE OF ORDER"
              lazy-rules :rules="[val => val && val.length > 0 || 'This is required']" />
          </div> -->
          <div class="col-md-12 q-ml-md">
            <q-input class="text-uppercase" outlined v-model="cf4CourseInTheWard.doctors_order" autogrow
              label="DOCTORS ORDER" lazy-rules :rules="[val => val && val.length > 0 || 'This is required']" />
          </div>
        </div>
        <div class="row q-pa-md">
          <q-btn class="q-mr-md" label="SUBMIT" @click="consoleIt()" color="primary" />
          <!-- <q-btn class="q-mr-md" label="Update" type="submit" color="primary" /> -->
          <q-btn label="Close" @click="close" color="grey" v-close-popup />

        </div>
      </q-form>

    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, ref } from 'vue'
import CONSTANTS from '../constants'

export default defineComponent({
  name: 'EditPatientDataDialog',
  props: ['eCourseInTheWardDialog', 'pInfo', 'cf4CIW', 'dTitle'],
  data() {
    return {
      exData: [],
      cf4CourseInTheWard: {
        id: 0,
        patient_no: '',
        case_no: '',
        date_of_order: '',
        doctors_order: '',
        ciw_status: '',
        emp_code: ''
      },
      submitAlert: false,
      updateCourseInTheWardMsg: CONSTANTS.FORM_UPDATE_COURSE_IN_THE_WARD_MESSAGE
    }
  },
  watch: {
    cf4PData: {
      handler(val) {
        if (val) {
          this.cf4CourseInTheWard.id = val.id
          this.cf4CourseInTheWard.patient_no = val.patient_no
          this.cf4CourseInTheWard.case_no = val.case_no
          this.cf4CourseInTheWard.date_of_order = val.date_of_order
          this.cf4CourseInTheWard.doctors_order = new Array(val.doctors_order)
          this.cf4CourseInTheWard.ciw_status = val.ciw_status
          this.cf4CourseInTheWard.emp_code = val.emp_code
        } else {
          this.cf4CourseInTheWard.id = ''
          this.cf4CourseInTheWard.patient_no = ''
          this.cf4CourseInTheWard.case_no = ''
          this.cf4CourseInTheWard.date_of_order = ''
          this.cf4CourseInTheWard.doctors_order = ''
          this.cf4CourseInTheWard.ciw_status = ''
          this.cf4CourseInTheWard.emp_code = ''
        }
      },
      immediate: true
    }
  },
  methods: {
    async createCf4CourseInTheWard() {
      let data = {
        id: this.cf4CourseInTheWard.id,
        patient_no: this.pInfo.PATIENTNO[0],
        case_no: this.pInfo.CASENO,
        date_of_order: this.cf4CourseInTheWard.date_of_order,
        doctors_order: this.cf4CourseInTheWard.doctors_order,
        ciw_status: this.cf4CourseInTheWard.ciw_status,
        emp_code: this.cf4CourseInTheWard.emp_code
      }
      const result = await this.$store.dispatch('patientsCf4/createCf4CourseInTheWard', data)
      result.status === 200 ? (() => { this.submitAlert = true; })() : null
    },
    async updateCf4CourseInTheWard() {
      let data = {
        id: this.cf4CourseInTheWard.id,
        patient_no: this.cf4CourseInTheWard.patient_no,
        case_no: this.cf4CourseInTheWard.case_no,
        date_of_order: this.cf4CourseInTheWard.date_of_order,
        doctors_order: this.exData,
        ciw_status: this.cf4CourseInTheWard.ciw_status,
        emp_code: this.cf4CourseInTheWard.emp_code
      }
      const result = await this.$store.dispatch('patientsCf4/updateCf4CourseInTheWard', data)
      result.status === 200 ? (() => { this.submitAlert = true; })() : null
    },
    async deleteCf4CourseInTheWard() {
      let data = {
        id: this.cf4CourseInTheWard.id,
      }
      const result = await this.$store.dispatch('patientsCf4/deleteCf4CourseInTheWar', data)
      this.submitStatus === 200 ? (() => { this.close(); this.triggerNegative(); this.$router.go(); })() : null
    },
    submitUpdateCourseInTheWard() {
      // this.title === 'CREATE COURSE IN THE WARD'
      //   ? this.createCf4CourseInTheWard() : this.title === 'EDIT COURSE IN THE WARD' ? this.updateCf4CourseInTheWard() : this.deleteCf4CourseInTheWard();
      this.createCf4CourseInTheWard()
      setTimeout(() => {
        this.submitAlert = false
        this.close()
        // this.$router.go()
      }, 3000)
    },
    close() {
      this.$emit('close')
    },
    consoleIt() {
      // console.log('datax: ', this.cf4CourseInTheWard.doctors_order.replace(/\t\n|\n\t|\n|\t/g, ' ').split(' '))
      // console.log('datax: ', this.cf4CourseInTheWard.doctors_order.replace(/\t\n|\n\t|\n|\t/g, ' ').split(' '))
      const xl = this.cf4CourseInTheWard.doctors_order.replace(/"((?:[^"]*(?:\r\n|\n\r|\n|\r))+[^"]+)"/mg, function (match, p1) {
        return p1
          .replace(/""/g, '"')
          .replace(/\t\n|\n\t|\n|\t/g, ' ')
      }).replace(/\t/g, ' ').split(/\t\n|\n\t|\n|\r/g)
      this.exData = xl
      console.log('y: ', this.exData)
      this.submitUpdateCourseInTheWard()

    }
  }

})
</script>