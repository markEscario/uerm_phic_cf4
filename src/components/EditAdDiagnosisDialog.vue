<template>
  <q-dialog v-if="EditAdModal" :model-value="true">
    <q-card style="width: 1980px; max-width: 180vw;">
      <q-card-section>
        <q-banner dense inline-actions class="text-white bg-primary q-mb-sm">
          <label class="text-caption">
            {{ PtInfo.LASTNAME }}, {{ PtInfo.FIRSTNAME }} {{ PtInfo.MIDDLENAME }} {{ PtInfo.PATIENTNO[0] }}
          </label>
        </q-banner>

        <q-banner v-if="submitAlert" dense inline-actions class="text-white bg-green-3">
          <label class="text-caption">
            <q-spinner-hourglass color="primary" size="2em" />
            {{ formSubmitMsg }}
          </label>
        </q-banner>

        <q-space class="q-mb-sm" />
        <div class="text-caption text-weight-bold text-uppercase">EDIT PATIENT'S ADMITTING DIAGNOSIS</div>
      </q-card-section>
      <q-form @submit="submitUpdatedDiagnosis" class="q-gutter-md" ref="form">
        <div class="row" style="max-width: 1800px">
          <div class="col-md-12 q-ml-md">
            <q-input outlined v-model="editAdDiagnosis.admitting_diagnosis" autogrow hint="ADMITTING DIAGNOSIS"
              lazy-rules :rules="[val => val && val.length > 0 || 'This is required']" />
          </div>
          <q-space class="q-mb-md" />
          <div class="col-md-12 q-ml-md">
            <q-input class="text-uppercase" outlined v-model="editAdDiagnosis.discharge_diagnosis" autogrow
              hint="DISCHARGE DIAGNOSIS" lazy-rules :rules="[val => val && val.length > 0 || 'This is required']" />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-space class="q-mb-md" />
            <q-input class="text-uppercase" outlined v-model="editAdDiagnosis.a_first_case_rate"
              hint="FIRST CASE RATE" />
          </div>
          <div class="col-md-2 q-ml-md">
            <q-space class="q-mb-md" />
            <q-input class="text-uppercase" outlined v-model="editAdDiagnosis.a_second_case_rate"
              hint="SECOND CASE RATE" />
          </div>
        </div>
        <div class="row q-pa-md">
          <q-btn class="q-mr-md" label="Submit" type="submit" color="primary" />
        </div>
      </q-form>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="Close" @click="close" v-close-popup />
      </q-card-actions>

      <q-space class="q-mb-sm" />
      <q-space class="q-mb-xl" />
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { mapGetters } from 'vuex'
import CONSTANTS from '../constants'

export default defineComponent({
  name: 'EditAdDiagnosisDialog',
  props: ['EditAdModal', 'PtInfo', 'PtDiagnosis'],
  data() {
    return {
      editAdDiagnosis: {
        admitting_diagnosis: '',
        discharge_diagnosis: '',
        a_first_case_rate: '',
        a_second_case_rate: ''
      },
    }
  },
  watch: {
    PtDiagnosis: {
      handler(val) {
        if (val) {
          this.editAdDiagnosis.admitting_diagnosis = val.admitting_diagnosis
          this.editAdDiagnosis.discharge_diagnosis = val.discharge_diagnosis
          this.editAdDiagnosis.a_first_case_rate = val.a_first_case_rate
          this.editAdDiagnosis.a_second_case_rate = val.a_second_case_rate
        } else {
          this.editAdDiagnosis.admitting_diagnosis = ''
          this.editAdDiagnosis.discharge_diagnosis = ''
          this.editAdDiagnosis.a_first_case_rate = ''
          this.editAdDiagnosis.a_second_case_rate = ''
        }
      },
      immediate: true
    }
  },
  methods: {
    async editAdDiagnosisEntry() {
      let data = {
        admitting_diagnosis: this.editAdDiagnosis.admitting_diagnosis,
        discharge_diagnosis: this.editAdDiagnosis.discharge_diagnosis,
        a_first_case_rate: this.editAdDiagnosis.a_first_case_rate,
        a_second_case_rate: this.editAdDiagnosis.a_second_case_rate
      }
      const result = await this.$store.dispatch('patientsCf4/updateAdDiagnosis', data)
      result.status === 200 ? (() => { this.submitAlert = true; })() : null
    },
    submitUpdatedDiagnosis() {
      // this.title === 'Assign Project' ? this.saveProject() : this.title === 'Edit Project' ? this.saveEditProject() : this.deleteProject()
      this.editAdDiagnosisEntry();
      setTimeout(() => {
        this.submitAlert = false
        this.close()
        this.$router.go()
      }, 3000)
    },
    close() {
      this.$emit('close')
    }
  }

})
</script>