<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="Logo" />
    </h1>
    <div class="has-text-centered">
      <button class="button" @click="alterarTema">{{ textoBotao }}</button>
    </div>
    <nav class="panel mt-5 has-text-left">
      <ul>
        <li>
          <router-link to="/" class="link">
            <i class="fas fa-tasks"></i>
            Tarefas
          </router-link>
        </li>
        <li>
          <router-link to="/projetos" class="link">
            <i class="fas fa-project-diagram"></i>
            Projetos
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "BarraLateral",
  emits: ["aoTemaAlterado"],

  setup(props, { emit }) {
    const modoEscuroAtivo = ref(false);

    const textoBotao = computed(() => modoEscuroAtivo.value ? "Modo claro" : "Modo escuro")

    const alterarTema = (): void => {
      modoEscuroAtivo.value = !modoEscuroAtivo.value;
      emit("aoTemaAlterado", modoEscuroAtivo.value);
    }

    return {
      modoEscuroAtivo,
      textoBotao,
      alterarTema
    }
  }
});
</script>

<style scoped>
header {
  background: #0d3b66;
  padding: 1rem;
  width: 100%;
  height: 100vh;
  text-align: center;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}

.link {
  color: #fff;
}

.link:hover {
  color: #faf0ca;
}

.link.router-link-active {
  color: #faf0ca;
}
</style>

