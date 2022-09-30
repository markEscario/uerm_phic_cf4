<template>
  <q-expansion-item class="bg-amber-3">
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar icon="personal_injury" color="primary" text-color="white" />
      </q-item-section>

      <q-item-section>
        III. REASON FOR ADMISSION
      </q-item-section>
      <q-btn class="q-mr-sm" outline rounded color="primary" label="HISTORY OF PRESENT ILLNESS" size="sm" />
    </template>

    <q-card>
      <q-card-section>
        <div class="row">
          <div class="col-md-11">
            <label class="text-weight-bold">1. History of Present Illness</label>
            <q-space />
            9 hours PTA, the patient noted hypogastric pain described as “parang naninigas” (PS 4-5/10),
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
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ReasonForAdmission',
})
</script>