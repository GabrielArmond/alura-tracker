
import { INotificacao } from "@/interfaces/INotificacao";
import { EstadoDoProjeto, projeto } from "./modulos/projeto";
import { EstadoDaTarefa, tarefa } from "./modulos/tarefas";

import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";

import { NOTIFICAR } from "@/store/tipo-mutations";

export interface Estado {
  tarefa: EstadoDaTarefa,
  notificacoes: INotificacao[],
  projeto: EstadoDoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    projeto: {
      projetos: [],
    },
    tarefa: {
      tarefas: []
    },
    notificacoes: []
  },
  mutations: {
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime()
      state.notificacoes.push(novaNotificacao)

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id !== novaNotificacao.id)
      }, 3000)
    }
  },
  actions: {},
  modules: {
    projeto,
    tarefa
  }
})

export function useStore(): Store<Estado> {
  return vuexUseStore(key)
}
