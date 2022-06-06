<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label"> Nome do Projeto </label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjeto"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store/index";
import { ADICIONA_PROJETO, ALTERA_PROJETO } from "@/store/tipo-mutations";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";

export default defineComponent({
  name: "FormularioProjeto",
  props: {
    id: {
      type: String,
    },
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find(
        (proj) => proj.id === this.id
      );
      this.nomeDoProjeto = projeto?.nome || "";
    }
  },
  data() {
    return {
      nomeDoProjeto: "",
    };
  },
  methods: {
    salvar() {
      if (this.nomeDoProjeto) {
        if (this.id) {
          this.store.commit(ALTERA_PROJETO, {
            id: this.id,
            nome: this.nomeDoProjeto,
          });
        } else {
          this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto);
        }
        this.nomeDoProjeto = "";
        this.notificar(
          TipoNotificacao.SUCESSO,
          "Sucesso",
          "Projeto salvo com sucesso!"
        );
        this.$router.push({ name: "Projetos" });
      } else {
        this.notificar(
          TipoNotificacao.FALHA,
          "Erro",
          "Preencha o nome do Projeto"
        );
      }
    },
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    return {
      store,
      notificar,
    };
  },
});
</script>
