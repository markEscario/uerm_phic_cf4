<template>
  <AdmittingDiagnosis :AdModal="adModal" :vData="projects" @close="closeDialog" @hide="closeDialog" />
  <div class="q-pa-md" style="max-width: 1940px">
    <q-banner dense inline-actions class="text-white bg-grey">
      <label class="text-h6">
        {{ patientDetails.LASTNAME }}, {{ patientDetails.FIRSTNAME }} {{ patientDetails.MIDDLENAME }} - {{
        Array.isArray(patientDetails.PATIENTNO) ? patientDetails.PATIENTNO[0] : patientDetails.PATIENTNO }}
      </label>

    </q-banner>

    <q-space class="q-pa-sm" />
    <div class="row">
      <div class="col-md-12">
        <q-btn class="q-mr-sm" outline rounded color="primary" label="ADMITTING DIAGNOSIS" size="sm" />
        <q-btn class="q-mr-sm" outline rounded color="primary" label="HISTORY OF PRESENT ILLNESS" size="sm" />
        <q-btn class="q-mr-sm" outline rounded color="primary" label="PERTINENT PAS MEDICAL HISTORY" size="sm" />
        <q-btn class="q-mr-sm" outline rounded color="primary" label="OB / GYN HISTORY" size="sm" />
        <q-btn class="q-mr-sm" outline rounded color="primary" label="PERTINENT SIGN AND SYMPTOMS ON ADMISSION"
          size="sm" />
        <q-btn class="q-mr-sm" outline rounded color="primary" label="PHYSICAL EXAMINATION ON ADMISSION" size="sm" />
        <q-btn class="q-mr-sm" outline rounded color="primary" label="COURSE IN THE WARD" size="sm" />
        <q-btn class="q-mr-sm" outline rounded color="primary" label="DRUGS AND MEDICINES" size="sm" />
        <q-btn class="q-mr-sm" outline rounded color="primary" label="OUTCOME OF TREATMENT" size="sm" />
      </div>

    </div>
    <q-space class="q-pa-sm" />

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
                <label class="text-weight-bold text-uppercase">1. Name of HCI</label>
                <q-space />
                {{ nameOfHci }}
              </div>
              <div class="col-md-3">
                <label class="text-weight-bold text-uppercase">2. Accreditation Number</label>
                <q-space />
                {{ accreditationNo }}
              </div>
            </div>

            <q-space class="q-pa-sm" />

            <div class="row">
              <div class="col-md-6">
                <label class="text-weight-bold text-uppercase">3. Address of HCI</label>
                <q-space />
                {{ addressOfHci }}
              </div>

            </div>
            <q-space />
            {{ addressBottomLabel }}
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
                <label class="text-weight-bold">1. NAME OF PATIENT</label>
                <q-space />
                <div class="row">
                  <div class="col-md-3">
                    {{ patientDetails.LASTNAME }}
                    <q-space />
                    <label class="text-caption">LASTNAME</label>
                  </div>
                  <div class="col-md-3">
                    {{ patientDetails.FIRSTNAME }}
                    <q-space />
                    <label class="text-caption">FIRSTNAME</label>
                  </div>
                  <div class="col-md-3">
                    {{ patientDetails.MIDDLENAME }}
                    <q-space />
                    <label class="text-caption">MIDDLENAME</label>
                  </div>
                </div>

              </div>
              <div class="col-md-2">
                <label class="text-weight-bold">2. PIN</label>
                <q-space />
                <div class="row">
                  <div class="col-md-3">
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <label class="text-weight-bold">3. AGE</label>
                <q-space />
                <div class="row">
                  <div class="col-md-3">
                    {{ Array.isArray(patientDetails.AGE) ? patientDetails.AGE[0] : patientDetails.AGE }}
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <label class="text-weight-bold">3. SEX</label>
                <q-space />
                <div class="row">
                  <div class="col-md-3">
                    {{ patientDetails.SEX }}
                  </div>
                </div>
              </div>

            </div>
            <q-space class="q-pa-sm" />

            <div class="row">
              <div class="col-md-3">
                <label class="text-weight-bold">5. CHIEF COMPLAINT</label>
                <q-space />
                {{ patientDetails.CC }}
              </div>
            </div>
            <q-space class="q-pa-sm" />
            <div class="row">
              <div class="col-md-4">
                <label class="text-weight-bold">6. Admitting Diagnosis</label>
                <q-space />
                G3P1(1011)PREGNANCY UTERINE 35 3/7 WEEKS AOG BY2ND TRIMESTER ULTRASOUND THREATENED PRE
                TERM LABOR GESTATIONAL DIABETES MELLITUS INSULIN CONTROLLED,POLUHYDRAMNIOS,
                GESTATIONAL HYPERTENTION, ADVANCED MATERNAL AGE WITH 1 PREVIOUS CESAREAN
                SECTION FOR LOSSING MATERNAL CONDITION
              </div>
              <div class="col-md-4">
                <label class="text-weight-bold">7. Discharge Diagnosis</label>
                <q-space />
                G3P1(1011)PREGNANCY UTERINE 35 3/7 WEEKS AOG BY2ND TRIMESTER ULTRASOUND THREATENED PRE
                TERM LABOR GESTATIONAL DIABETES MELLITUS INSULIN CONTROLLED,POLUHYDRAMNIOS,
                GESTATIONAL HYPERTENTION, ADVANCED MATERNAL AGE WITH 1 PREVIOUS CESAREAN
                SECTION FOR LOSSING MATERNAL CONDITION
              </div>
              <div class="col-md-2">
                <label class="text-weight-bold">8 a. 1st Case Rate Code </label>
                <q-space />
              </div>
              <div class="col-md-2">
                <label class="text-weight-bold">8 a. 2nd Case Rate Code </label>
                <q-space />
              </div>

            </div>

            <q-space class="q-pa-sm" />

            <div class="row">
              <div class="col-md-3">
                <label class="text-weight-bold">9. a. Date Admitted </label>
                <q-space />
                {{ patientDetails.DATEAD ? moment(patientDetails.DATEAD.substr(0, 10)).format('MMMM d, YYYY') :
                patientDetails.DATEAD }}

              </div>

              <div class="col-md-3">
                <label class="text-weight-bold">9. b. Time Admitted </label>
                <q-space />
                {{ patientDetails.DATEAD ? moment(patientDetails.DATEAD).format('hh:mm A') :
                patientDetails.DATEAD }}
              </div>

            </div>
            <div class="row">
              <div class="col-md-3">
                <label class="text-weight-bold">9. a. Date Discharged </label>
                <q-space />
                {{ patientDetails.DATEDIS ? moment(patientDetails.DATEDIS.substr(0, 10)).format('MMMM d, YYYY') :
                patientDetails.DATEDIS }}
              </div>

              <div class="col-md-3">
                <label class="text-weight-bold">9. b. Time Discharged </label>
                <q-space />
                {{ patientDetails.DATEAD ? moment(patientDetails.DATEDIS).format('hh:mm A') :
                patientDetails.DATEDIS }}
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
            <div class="row">
              <div class="col-md-11">
                <label class="text-weight-bold">1. History of Present Illness</label>
                <q-space />
                9 hours PTA, the patient noted hypogastric pain described as ???parang naninigas??? (PS 4-5/10),
                of 2-3 seconds duration, with a 15 second interval. 1 hour PTA, patient was given unrecalled
                medications for her contractions which increased the interval duration to 20-25 seconds,
                with a PS of 3/10. At the time of admission, the patient was experiencing contractions
                of 1-2 seconds duration with 25 min interval with a PS of 2/10, and was admitted at UERM
                for monitoring. Pertinent positive: (+) fetal movements Pertinent negative: (-) rupture BOW,
                fever, vomiting, headache, blurring of vision, coughs, and colds
              </div>
              <q-space class="q-pa-md" />
              <div class="col-md-11">
                <label class="text-weight-bold">2. a. Pertinent Past Medical History</label>
                <q-space />

              </div>
              <q-space class="q-pa-md" />
              <div class="col-md-11">
                <label class="text-weight-bold">2. b. OB/GYN History</label>
                <q-space />

              </div>
              <q-space class="q-pa-md" />
              <div class="col-md-11">
                <label class="text-weight-bold">3. Pertinent Signs and Symptoms on Admission (tick applicable
                  box/es)</label>
                <q-space />

              </div>
              <q-space class="q-pa-md" />
              <div class="col-md-11">
                <label class="text-weight-bold">4. Referred from another health care institution (HCI)</label>
                <q-space />

              </div>
            </div>
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
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import { mapGetters } from 'vuex'
import moment from 'moment'
import CONSTANTS from '../constants'

export default defineComponent({
  name: 'patientCf4',
  props: ['plan'],
  setup() {
    const $q = useQuasar()
    return {
      triggerPositive() {
        $q.notify({
          type: 'positive',
          message: 'Your inputs was submitted'
        })
      },
      triggerInfo() {
        $q.notify({
          type: 'info',
          message: 'Your inputs was updated'
        })
      },
      triggerNegative() {
        $q.notify({
          type: 'negative',
          message: 'Your inputs was deleted'
        })
      }
    }
  },
  data() {
    return {
      moment,
      patientsInfo: {},
      nameOfHci: CONSTANTS.NAME_OF_HCI,
      accreditationNo: CONSTANTS.ACCREDITATION_NO,
      addressOfHci: CONSTANTS.ADDRESS_OF_HCI,
      addressBottomLabel: CONSTANTS.ADDRESS_BOTTOM_LABEL
    }
  },
  computed: {
    ...mapGetters({
      employees: 'patientsCf4/patients',
      searchStatus: 'patientsCf4/searchStatus',
      patientDetails: 'patientsCf4/patientDetails',
      searchedPatients: 'patientsCf4/searchedPatients',
    })
  },

  created() {
    this.fetchPatientData()
  },
  watch: {
    pInfo: {
      handler(val) {
        if (val) {
          console.log('val: ', val)
        }
      },
      immediate: true
    }

  },
  methods: {
    async fetchPatientData() {
      console.log('pNo: ', this.$route.query.pNo)
      const result = await this.$store.dispatch('patientsCf4/getPatientDetails', this.$route.query.pNo)
      console.log('pInfo: ', result)
    }
  }


}) 
</script>