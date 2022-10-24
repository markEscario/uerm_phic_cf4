<template>
  <EditPatientDataDialog :ePatientDataDialog="editPatientDataDialog" :dTitle="dialogTitle" :pInfo="patientDetails"
    :cf4PData="cf4PatientData" @close="closeEditPatientDataDialog" @hide="closeEditPatientDataDialog" />
  <q-expansion-item class="bg-amber-3" v-model="expOpen">
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar>
          <q-avatar icon="account_box" color="primary" text-color="white" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        II. PATIENT DATA
      </q-item-section>
      <q-btn class="q-mr-sm" outline rounded color="primary" label="UPDATE" @click="patientDataDialog(cf4PD)"
        size="sm" />
    </template>

    <q-card>
      <q-card-section>
        <div class="row">
          <div class="col-md-3">
            <label class="text-weight-bold">Name of Patient: </label>
            {{ patientDetails.FIRSTNAME }} {{ patientDetails.LASTNAME }}, {{ patientDetails.MIDDLENAME }}
          </div>
          <div class="col-md-2">
            <label class="text-weight-bold">PIN:</label>
            {{ Array.isArray(patientDetails.PATIENTNO) ? patientDetails.PATIENTNO[0] : patientDetails.PATIENTNO }}
          </div>
          <div class="col-md-2">
            <label class="text-weight-bold">Age:</label>
            {{ Array.isArray(patientDetails.AGE) ? patientDetails.AGE[0] : patientDetails.AGE }}
          </div>
          <div class="col-md-2">
            <label class="text-weight-bold">Sex:</label>
            {{ patientDetails.SEX }}
          </div>
          <div class="col-md-2">
            <label class="text-weight-bold">Date Admitted:</label>
            {{ pAdDate.date }}
          </div>
        </div>
        <q-space class="q-pa-sm" />
        <div class="row">
          <div class="col-md-3">
            <label class="text-weight-bold">Time Admitted:</label>
            {{ pAdDate.time }}
          </div>
          <div class="col-md-2">
            <label class="text-weight-bold">Date Discharged:</label>
            {{ pDisDate.date }}
          </div>
          <div class="col-md-2">
            <label class="text-weight-bold">Time Discharged:</label>
            {{ pDisDate.time }}
          </div>
          <div class="col-md-2">
            <label class="text-weight-bold">1st Case Rate:</label>
            <!-- {{ cf4PD.AFIRST_CASE_RATE }} -->
          </div>
          <div class="col-md-2">
            <label class="text-weight-bold">2nd Case Rate</label>
            <!-- {{ cf4PD.ASECOND_CASE_RATE }} -->
          </div>
        </div>
        <q-space class="q-pa-md" />
        <div class="row">
          <div class="col-md-6">
            <label class="text-weight-bold">Chief Complaint:</label>
            <q-space />
            {{ cf4PD.CHIEF_COMPLAINT }}
          </div>
        </div>
        <q-space class="q-pa-sm" />
        <div class="row">
          <div class="col-md-5">
            <label class="text-weight-bold">Admitting Diagnosis:</label>
            <q-space />
            <div class="text-uppercase">
              {{ cf4PD.AD_DIAGNOSIS }}
            </div>
          </div>
        </div>
        <q-space class="q-mb-lg" />
        <div class="row">
          <div class="col-md-6">
            <label class="text-weight-bold">Discharge Diagnosis:</label>
            <q-space />
            <div class="text-uppercase">
              {{ cf4PD.DIS_DIAGNOSIS }}
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
import EditPatientDataDialog from 'components/EditPatientDataDialog.vue'

export default defineComponent({
  name: 'PatientData',
  components: {
    EditPatientDataDialog
  },
  data() {
    return {
      moment,
      expOpen: true,
      dialogTitle: '',
      editPatientDataDialog: false,
      patientInfo: {},
      pAdDate: '',
      pDisDate: '',
      cf4PatientData: {
        id: 0,
        patient_no: '',
        case_no: '',
        chief_complaint: '',
        admitting_diagnosis: '',
        discharge_diagnosis: '',
        a_first_case_rate: '',
        a_second_case_rate: '',
        cf4_status: ''
      },
    }
  },
  created() {
    this.getCf4PatientData()
  },
  computed: {
    ...mapGetters({
      searchStatus: 'patientsCf4/searchStatus',
      patientDetails: 'patientsCf4/patientDetails',
      cf4PD: 'patientsCf4/cf4PatientData',
    })
  },
  methods: {
    async fetchPatientData() {
      await this.$store.dispatch('patientsCf4/getPatientDetails', this.$route.query.pNo)
    },
    async getCf4PatientData() {
      await this.$store.dispatch('patientsCf4/getCf4PatientData', this.$route.query.pNo)
      const nDate = this.formatDate(this.patientDetails.DATEAD)
      this.pAdDate = nDate
      const dDate = this.patientDetails.DATEDIS ? this.formatDate(this.patientDetails.DATEDIS) : ''
      this.pDisDate = dDate
    },
    patientDataDialog(data) {
      this.dialogTitle = 'EDIT PATIENT DATA'
      this.editPatientDataDialog = true
      console.log('idx: ', data.ID[2])
      this.cf4PatientData = {
        id: data.ID[2],
        patient_no: data.PATIENT_NO,
        case_no: data.CASE_NO,
        chief_complaint: data.CHIEF_COMPLAINT,
        admitting_diagnosis: data.AD_DIAGNOSIS,
        discharge_diagnosis: data.DIS_DIAGNOSIS,
        a_first_case_rate: data.AFIRST_CASE_RATE,
        a_second_case_rate: data.ASECOND_CASE_RATE,
        cf4_status: 'UPDATED'
      }
    },
    formatDate(dateInfo) {
      const formatDate = dateInfo
        .replace(/T/, " ")
        .replace(/Z/, " ")
        .substr("0", "16");
      const date = new Date(`${formatDate}`);
      const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
        date
      );
      const mo = new Intl.DateTimeFormat("en", { month: "long" }).format(date);
      const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
      var min = date.getMinutes();
      var hr = date.getHours();
      if (min < 10) {
        min = "0" + min;
      }
      var ampm = "AM";
      if (hr > 12) {
        hr -= 12;
        ampm = "PM";
      }
      const time = `${hr}:${min} ${ampm}`;
      return {
        date: `${mo} ${da}, ${ye}`,
        time: time,
      };
    },
    closeEditPatientDataDialog() {
      this.editPatientDataDialog = false
      this.expOpen = true
    }
  }
})
</script>
