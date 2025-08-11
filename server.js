app.post("/login", async (req, res) => {
  try {
    // Faz uma consulta qualquer simples, só pra testar conexão
    const { data, error } = await supabase.from("login").select("usuario").limit(1);

    if (error) {
      console.error("Erro Supabase:", error);
      return res.status(500).json({ success: false, mensagem: "Erro interno no servidor" });
    }

    // Se chegou aqui, conexão OK
    return res.json({ success: true, mensagem: "Conectou ao Supabase com sucesso!" });

  } catch (err) {
    console.error("Erro inesperado:", err);
    return res.status(500).json({ success: false, mensagem: "Erro no servidor" });
  }
});
