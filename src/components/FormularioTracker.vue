<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          v-model="descricao"
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent, ref } from "vue";
import Temporizador from "./TemporizadorTracker.vue";

export default defineComponent({
  name: "FormularioTracker",
  emits: ["aoSalvarTarefa"],
  components: {
    Temporizador,
  },
  setup(props, { emit }) {
    const store = useStore();

    const descricao = ref("");
    const idProjeto = ref("");

    const projetos = computed(() => store.state.projeto.projetos)

    const finalizarTarefa = (tempoDecorrido: number) : void => {
      emit("aoSalvarTarefa", {
        duracaoEmSegundos: tempoDecorrido,
        descricao: descricao.value,
        projeto: projetos.value.find((proj) => proj.id === idProjeto.value),
      });
      descricao.value = "";
    }


    return {
      descricao, 
      idProjeto,
      projetos,
      finalizarTarefa,
    };
  },
});
</script>

<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>

