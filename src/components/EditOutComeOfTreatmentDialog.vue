<template>
  <q-dialog v-if="eOutComeOfTreamentDialog" :model-value="true">
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
            {{ updateOutComeOfTreatmentMsg }}
          </label>
        </q-banner>

        <q-space class="q-mb-sm" />
        <div class="text-caption text-weight-bold text-uppercase">{{ dTitle }}</div>
      </q-card-section>
      <q-form @submit="submitCf4OutComeOfTreatment" class="q-gutter-md" ref="form">
        <div class="row" style="max-width: 1800px">
          <div class="text-caption text-uppercase">
            <q-checkbox size="xl" v-model="outComeOfTreatment" val="IMPROVED" label="IMPROVED" disable />
          </div>
          <div class="text-caption text-uppercase">
            <q-checkbox size="xl" v-model="outcomeOfTreatment" val="RECOVERED" label="RECOVERED" disable />
          </div>
          <div class="text-caption text-uppercase">
            <q-checkbox size="xl" v-model="outComeOfTreatment" val="HAMNDAMA" label="HAMNDAMA" disable />
          </div>
          <div class="text-caption text-uppercase">
            <q-checkbox size="xl" v-model="outComeOfTreatment" val="EXPIRED" label="EXPIRED" disable />
          </div>
          <div class="text-caption text-uppercase">
            <q-checkbox size="xl" v-model="outComeOfTreatment" val="ABSCONDED" label="ABSCONDED" disable />
          </div>
          <div class="text-caption text-uppercase">
            <q-checkbox size="xl" v-model="outcomeOfTreatment" val="TRANSFERRED" label="TRANSFERRED" disable />
          </div>
        </div>
        <div class="row q-pa-md">
          <div class="col-md-2">
            <div class="text-caption text-uppercase">
              <q-input outlined v-model="cf4OutComeOfTreatment.outcome_reason" label="Outcome Reason" />
            </div>
          </div>
        </div>
        <div class="row q-pa-md">
          <q-btn class="q-mr-md" label="Update" type="submit" color="primary" />
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
  name: 'EditOutComeOfTreatmentDialog',
  props: ['eOutComeOfTreamentDialog', 'pInfo', 'cf4OOT', 'dTitle'],
  setup() {
    outCome: [

    ]
  },
  data() {
    return {
      cBox: false,
      cf4OutComeOfTreatment: {
        id: '',
        patient_no: '',
        case_no: '',
        outcome_of_treatment: false,
        outcome_reason: '',
        emp_code: '',
        cf4_status: ''
      },
      submitAlert: false,
      updateOutComeOfTreatmentMsg: CONSTANTS.FORM_UPDATE_OUTCOME_OF_TREATMENT_MESSAGE
    }
  },
  watch: {
    cf4OOT: {
      handler(val) {
        if (val) {
          this.cf4OutComeOfTreatment.id = val.id
          this.cf4OutComeOfTreatment.patient_no = val.patient_no
          this.cf4OutComeOfTreatment.case_no = val.case_no
          this.cf4OutComeOfTreatment.outcome_of_treatment = val.outcome_of_treatment
          this.cf4OutComeOfTreatment.outcome_reason = val.outcome_reason
          this.cf4OutComeOfTreatment.emp_code = val.emp_code
          this.cf4OutComeOfTreatment.cf4_status = val.cf4_status
        }
      },
      immediate: true
    }
  },
  methods: {
    async updateCf4OutComeOfTreatment() {
      let data = {
        id: this.cf4OutComeOfTreatment.id,
        patient_no: this.cf4OutComeOfTreatment.patient_no,
        case_no: this.cf4OutComeOfTreatment.case_no,
        outcome_of_treatment: this.cf4OutComeOfTreatment.outcome_of_treatment,
        outcome_reason: this.cf4OutComeOfTreatment.outcome_reason,
        emp_code: this.cf4OutComeOfTreatment.emp_code,
        cf4_status: this.cf4OutComeOfTreatment.cf4_status
      }
      const result = await this.$store.dispatch('patientsCf4/updateCf4OutComeOfTreatment', data)
      result.status === 200 ? (() => { this.submitAlert = true; })() : null
    },
    submitCf4OutComeOfTreatment() {
      this.updateCf4OutComeOfTreatment()
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
