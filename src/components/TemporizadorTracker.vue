<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempoEmSegundos="tempoEmSegundos" />
    <Botao
      @clicado="iniciar"
      icone="fas fa-play"
      texto="Play"
      :desabilitado="cronometroRodando"
    />
    <Botao
      @clicado="finalizar"
      icone="fas fa-stop"
      texto="Stop"
      :desabilitado="!cronometroRodando"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Cronometro from "./CronometroTracker.vue";
import Botao from "./BotaoTracker.vue";

export default defineComponent({
  name: "TemporizadorTracker",
  emits: ["aoTemporizadorFinalizado"],
  components: {
    Cronometro,
    Botao,
  },

  setup(props, { emit }) {
    const tempoEmSegundos = ref(0);
    const cronometro = ref(0);
    const cronometroRodando = ref(false);


    const iniciar = () => {
      cronometroRodando.value = true;
      cronometro.value = setInterval(() => {
        tempoEmSegundos.value += 1;
      }, 1000);
    }

    const finalizar = () => {
      emit("aoTemporizadorFinalizado", tempoEmSegundos.value);
      tempoEmSegundos.value = 0;
      cronometroRodando.value = false;
      clearInterval(cronometro.value);
    }
 
    return {
      tempoEmSegundos,
      cronometro,
      cronometroRodando,
      iniciar,
      finalizar
    }
  }
});
</script>