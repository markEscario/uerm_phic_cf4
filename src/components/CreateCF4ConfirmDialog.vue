<template>
  <q-dialog v-if="cf4Modal" :model-value="true">
    <q-card style="width: 1980px; max-width: 180vw;">

      <q-card-section>
        <q-banner dense inline-actions class="text-white bg-primary q-mb-sm">
          <label class="text-caption">
            {{ dTitle }}
          </label>
        </q-banner>

        <q-banner v-if="submitAlert" dense inline-actions class="text-white bg-green-3">
          <label class="text-caption">
            <q-spinner-hourglass color="primary" size="2em" />
            {{ createCf4msg }}
          </label>
        </q-banner>

        <q-space class="q-mb-sm" />
      </q-card-section>
      <q-form @submit="submitCf4" class="q-gutter-md" ref="form">
        <div class="row" style="max-width: 1800px">
          <div class="col-md-12 q-ml-md">
            ARE YOU SURE YOU WANT TO CREATE CF4 FOR PATIENT: <b>
              {{ pInfo.LASTNAME }} {{ pInfo.FIRSTNAME }} {{
              pInfo.MIDDLENAME }} - {{ pInfo.PATIENTNO[0] }}
            </b>
          </div>
        </div>
        <div class="row q-pa-md">
          <q-btn class="q-mr-md" label="CONFIRM" type="submit" color="primary" />
        </div>
      </q-form>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="Close" @click="close" v-close-popup />
      </q-card-actions>
      <q-space class="q-mb-xl" />
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { mapGetters } from 'vuex'
import CONSTANTS from '../constants'

export default defineComponent({
  name: 'CreateCF4ConfirmDialog',
  props: ['cf4Modal', 'pInfo', 'dTitle'],
  data() {
    return {
      patientAdData: {},
      patientInfo: {},
      submitAlert: false,
      searchHint: CONSTANTS.SEARCH_HINT,
      searchLabel: CONSTANTS.SEARCH_LABEL,
      btnCf4Label: CONSTANTS.BUTTON_CF4_LABEL,
      loadingLabel: CONSTANTS.LOADING_LABEL,
      AdLabel: CONSTANTS.AD_DIALOG_LABEL,
      createCf4msg: CONSTANTS.CREATE_CF4_MESSAGE
    }
  },

  computed: {
    ...mapGetters({
      employees: 'patientsCf4/patients',
      searchStatus: 'patientsCf4/searchStatus',
      patientDetails: 'patientsCf4/patientDetails',
      searchedPatients: 'patientsCf4/searchedPatients',
      pDataNo: 'patientsCf4/pDataNo',
    })
  },
  methods: {
    async createCf4() {
      let data = {
        patient_no: this.pInfo.PATIENTNO[0],
        case_no: this.pInfo.CASENO,
        cf4_status: 'CF4 CREATED'
      }
      const result = await this.$store.dispatch('patientsCf4/createCf4', data)
      result.status === 200 ? (() => { this.submitAlert = true; })() : null
      console.log('resultsXX: ', result)
    },
    submitCf4() {
      this.createCf4();
      setTimeout(() => {
        this.submitAlert = false
        this.close()
        this.getPatientDetails()
      }, 3000)
    },

    async getPatientDetails() {
      await this.$router.push({ path: "patient_cf4", query: { pNo: this.pDataNo } });
    },
    close() {
      this.$emit('close')
    }
  }
})
</script>
