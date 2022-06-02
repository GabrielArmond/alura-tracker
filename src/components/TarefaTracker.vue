<template>
  <Box>
    <div class="columns">
      <div class="column is-7">
        {{ tarefa.descricao || "Tarefa sem descrição" }}
      </div>
      <div class="column">
        <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Cronometro from "./CronometroTracker.vue";
import ITarefa from "../interfaces/ITarefa";
import Box from "./BoxTracker.vue";

export default defineComponent({
  name: "TarefaTracker",
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true,
    },
  },
  components: {
    Cronometro,
    Box,
  },
});
</script>

<style scoped>
</style>