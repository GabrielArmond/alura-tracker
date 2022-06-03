<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Tarefa v-for="(tarefa, i) in tarefas" :key="i" :tarefa="tarefa" />
    <Box v-if="semTarefas"> Você não está muito produtivo hoje :( </Box>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Box from "@/components/BoxTracker.vue";
import ITarefa from "../interfaces/ITarefa";
import Tarefa from "@/components/TarefaTracker.vue";
import Formulario from "@/components/FormularioTracker.vue";

export default defineComponent({
  name: "App",
  components: {
    Formulario,
    Tarefa,
    Box,
  },
  data() {
    return {
      tarefas: [] as ITarefa[],
    };
  },
  computed: {
    semTarefas(): boolean {
      return this.tarefas.length === 0;
    },
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa);
    },
  },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
</style>
