<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/images/phic_logo.jpg">
          </q-avatar>
          {{ appTitle }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-blue-10 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div class="text-caption">{{ appFooterLabel }}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>
<script>
import { defineComponent } from 'vue'
import CONSTANTS from '../constants'

export default defineComponent({
  name: 'MainLayout',
  data() {
    return {
      appTitle: CONSTANTS.APP_TITLE,
      appFooterLabel: CONSTANTS.APP_FOOTER_LABEL
    }
  }
})
</script>