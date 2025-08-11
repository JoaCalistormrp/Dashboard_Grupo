<script>
  document.getElementById("login-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();

    try {
      const urlBackend = "https://dashboard-grupo.onrender.com/login";

      const resposta = await fetch(urlBackend, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, senha })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.mensagem || "Erro ao fazer login.");
        return;
      }

      if (dados.success) {
        localStorage.setItem("usuario", dados.usuario);
        localStorage.setItem("nivel_permissao", dados.nivel_permissao);
        window.location.replace("segunda tela.html");
      } else {
        alert(dados.mensagem || "Usuário ou senha incorretos.");
      }
    } catch (erro) {
      console.error("Erro de conexão:", erro);
      alert("Não foi possível conectar ao servidor.");
    }
  });
</script>
