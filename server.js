import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do Supabase
const supabaseUrl = "https://wvpatscikilyayqgjvre.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2cGF0c2Npa2lseWF5cWdqdnJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4ODI0NDgsImV4cCI6MjA2OTQ1ODQ0OH0.jU-pz8iNL_Vzo5K2ZiEBEBMPnDJnNBEfU9Cn2-fRq4c";

const supabase = createClient(supabaseUrl, supabaseKey);

// Rota login
app.post("/login", async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const { data, error } = await supabase
      .from("login")
      .select("usuario, nivel_permissao")
      .eq("usuario", usuario)
      .eq("senha", senha);

    if (error) {
      console.error("Erro Supabase:", error);
      return res.status(500).json({ success: false, mensagem: "Erro interno no servidor" });
    }

    if (data.length > 0) {
      return res.json({
        success: true,
        usuario: data[0].usuario,
        nivel_permissao: data[0].nivel_permissao
      });
    } else {
      return res.status(401).json({ success: false, mensagem: "Usuário ou senha inválidos" });
    }
  } catch (err) {
    console.error("Erro inesperado:", err);
    return res.status(500).json({ success: false, mensagem: "Erro no servidor" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
