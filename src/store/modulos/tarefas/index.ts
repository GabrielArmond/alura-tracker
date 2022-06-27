import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from "@/store/tipo-acoes";
import { DEFINIR_TAREFAS, ADICIONA_TAREFA, ALTERA_TAREFA } from "@/store/tipo-mutations";
import { Module } from "vuex";

export interface EstadoDaTarefa {
  tarefas: ITarefa[]
}

export const tarefa: Module<EstadoDaTarefa, Estado> = {
  state: {
    tarefas: []
  },
  mutations: {
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa)
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex(tarefa => tarefa.id === tarefa.id)
      state.tarefas[index] = tarefa
    },
  },
  actions: {
    [OBTER_TAREFAS]({ commit }, filtro: string) {
      let url = 'tarefas'

      if (filtro) {
        url += '?descricao=' + filtro
      }
      
      http.get(url)
      .then(response => commit(DEFINIR_TAREFAS, response.data))
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http.post('/tarefas', tarefa)
        .then(response => commit(ADICIONA_TAREFA, response.data))
    },
    [ALTERAR_TAREFA]({commit}, tarefa: ITarefa) {
      return http.put(`/tarefas/${tarefa.id}`, tarefa)
        .then(response => commit(ALTERA_TAREFA, response.data))
    },
  }
}