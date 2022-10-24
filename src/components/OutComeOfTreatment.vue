<template>
  <EditOutComeOfTreatmentDialog :eOutComeOfTreamentDialog="editOutComeOfTreamentDialog" :dTitle="dialogTitle"
    :pInfo="patientDetails" :cf4OOT="cf4OutComeOfTreament" @close="closeEditOutComeOfTreatmentDialog"
    @hide="closeEditOutComeOfTreatmentDialog" />
  <q-expansion-item class="bg-amber-3">
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar icon="folder" color="primary" text-color="white" />
      </q-item-section>

      <q-item-section>
        VI. OUTCOME TREATMENT
      </q-item-section>
      <q-btn class="q-mr-sm" outline rounded color="primary" label="UPDATE" @click="outComeOfTreatment(cf4OOTreatment)"
        size="sm" />
    </template>

    <q-card>
      <q-card-section>
        <div class="row q-ml-md pssa-mt">
          <div class="col-md-1 q-ml-md">
            <div class="text-caption text-uppercase">
              <q-checkbox size="xl" v-model="checker" val="IMPROVED" label="IMPROVED" disable />
            </div>
          </div>
          <div class="col-md-1 q-ml-md">
            <div class="text-caption text-uppercase">
              <q-checkbox size="xl" v-model="checker" val=" RECOVERED" label=" RECOVERED" disable />
            </div>
          </div>
          <div class="col-md-1 q-ml-md">
            <div class="text-caption text-uppercase">
              <q-checkbox size="xl" v-model="checker" val="HAMNDAMA" label="HAMNDAMA" disable />
            </div>
          </div>
          <div class="col-md-1 q-ml-md">
            <div class="text-caption text-uppercase">
              <q-checkbox size="xl" v-model="checker" val="EXPIRED" label="EXPIRED" disable />
            </div>
          </div>
          <div class="col-md-1 q-ml-md">
            <div class="text-caption text-uppercase">
              <q-checkbox size="xl" v-model="checker" val="ABSCONDED" label="ABSCONDED" disable />
            </div>
          </div>
          <div class="col-md-1 q-ml-md">
            <div class="text-caption text-uppercase">
              <q-checkbox size="xl" v-model="checker" val="TRANSFERRED" label="TRANSFERRED" disable />
            </div>
          </div>
          <div class="col-md-1 q-ml-md">
            <q-space class="q-mb-lg" />
            <label>Specify Reason: </label>
          </div>
          <div class="col-md-2">
            <div class="text-caption text-uppercase s-reason">
              <q-input v-model="text" disable />
            </div>
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
import EditOutComeOfTreatmentDialog from 'components/EditOutComeOfTreatmentDialog.vue'
import { date } from "quasar";

export default defineComponent({
  name: 'OutComeOfTreatment',
  components: {
    EditOutComeOfTreatmentDialog
  },
  data() {
    return {
      checker: false,
      moment,
      dialogTitle: '',
      editOutComeOfTreamentDialog: false,
      patientInfo: {},
      cf4OutComeOfTreament: {
        patient_no: '',
        case_no: '',
        outcome_of_treatment: '',
        outcome_reason: '',
        cf4_status: 'UPDATED'
      },
    }
  },
  created() {
    this.getCf4OutComeOfTreatment()
  },
  computed: {
    ...mapGetters({
      searchStatus: 'patientsCf4/searchStatus',
      patientDetails: 'patientsCf4/patientDetails',
      cf4OOTreatment: 'patientsCf4/cf4OutComeOfTreatment',
    })
  },
  methods: {
    async fetchPatientData() {
      await this.$store.dispatch('patientsCf4/getPatientDetails', this.$route.query.pNo)
    },
    async getCf4OutComeOfTreatment() {
      await this.$store.dispatch('patientsCf4/getCf4OutComeOfTreatment', this.$route.query.pNo)
    },
    outComeOfTreatment(data) {
      this.dialogTitle = 'UPDATE OUTCOME OF TREATMENT'
      this.editOutComeOfTreamentDialog = true
      this.cf4OutComeOfTreament = {
        id: data.ID,
        patient_no: data.PATIENT_NO,
        case_no: data.CASE_NO,
        outcome_of_treatment: data.OUTCOME_OF_TREATMENT,
        outcome_reason: data.OUTCOME_REASON,
        emp_code: '',
        cf4_status: 'UPDATED'
      }
    },
    closeEditOutComeOfTreatmentDialog() {
      this.editOutComeOfTreamentDialog = false
    }
  }
})
</script>
<style>
.s-reason {
  margin-left: -30px;
}
</style>
