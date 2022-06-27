<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Box v-if="semTarefas">
      Você não está muito produtivo hoje
      <span class="has-text-weight-bold">:(</span>
    </Box>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="text"
          placeholder="Digite para filtrar"
          v-model="filtro"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <Tarefa
      v-for="(tarefa, i) in tarefas"
      :key="i"
      :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa"
    />
    <Modal :mostrar="!!tarefaSelecionada">
      <template v-slot:cabecalho>
        <p class="modal-card-title">Editar tarefa</p>
        <button @click="fecharModal" class="delete" aria-label="close"></button>
      </template>
      <template v-slot:corpo>
        <div class="field">
          <label for="descricaoDaTarefa" class="label">
            Descrição da tarefa
          </label>
          <input
            type="text"
            v-model="tarefaSelecionada.descricao"
            class="input"
            id="descricaoDaTarefa"
          />
        </div>
      </template>
      <template v-slot:rodape>
        <button @click="alterarTarefa" class="button is-success">
          Salvar alterações
        </button>
        <button class="button" @click="fecharModal">Cancelar</button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";

import { useStore } from "@/store";
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from "@/store/tipo-acoes";

import ITarefa from "@/interfaces/ITarefa";
import Box from "@/components/BoxTracker.vue";
import Tarefa from "@/components/TarefaTracker.vue";
import Formulario from "@/components/FormularioTracker.vue";
import Modal from "@/components/Modal.vue";

export default defineComponent({
  name: "TarefasTracker",
  components: {
    Formulario,
    Tarefa,
    Box,
    Modal,
  },
  setup() {
    const store = useStore();

    const filtro = ref("");

    // const tarefas = computed(() =>
    //   store.state.tarefa.tarefas.filter(
    //     (t) => !filtro.value || t.descricao.includes(filtro.value)
    //   )
    // );

    const tarefas = computed(() => store.state.tarefa.tarefas);

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value);
    });

    const semTarefas = computed(() => tarefas.value.length === 0);

    const tarefaSelecionada = ref<ITarefa | null>(null);

    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);

    const salvarTarefa = (tarefa: ITarefa): void => {
      store.dispatch(CADASTRAR_TAREFA, tarefa);
    };

    const alterarTarefa = () => {
      store.dispatch(ALTERAR_TAREFA, tarefaSelecionada.value).then(() => {
        fecharModal();
      });
    };

    const selecionarTarefa = (tarefa: ITarefa) => {
      tarefaSelecionada.value = tarefa;
    };

    const fecharModal = (): void => {
      tarefaSelecionada.value = null;
    };

    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      semTarefas,
      filtro,
      store,
      salvarTarefa,
      alterarTarefa,
      selecionarTarefa,
      tarefaSelecionada,
      fecharModal,
    };
  },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
</style>
