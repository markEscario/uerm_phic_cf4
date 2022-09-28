const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/patient_cf4/', component: () => import('pages/PatientCf4Page.vue'), name: 'PatientCf4', props: true },
      { path: '/admitting_diagnosis/', component: () => import('pages/AdmittingDiagnosis.vue'), name: 'AdmittingDiagnosis', props: true }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
