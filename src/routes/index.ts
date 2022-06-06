import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Tarefas from "@/views/TarefasTracker.vue";
import Projetos from "@/views/ProjetosTracker.vue";
import Formulario from "@/views/Projetos/FormularioProjeto.vue";
import Lista from '@/views/Projetos/ListaProjetos.vue';

const routes: RouteRecordRaw[] = [{
  path: '/',
  name: 'Tarefas',
  component: Tarefas
},
{
  path: '/projetos',
  component: Projetos,
  children:[
    {
      path: '',
      name: 'Projetos',
      component: Lista
    },
    {
      path: 'novo',
      name: 'Novo projeto',
      component: Formulario
    },
    {
      path: ':id',
      name: 'Editar projeto',
      component: Formulario,
      props: true
    }
  ]
}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;