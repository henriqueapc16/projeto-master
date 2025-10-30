# frozen_string_literal: true

module REGISTER_CLIENT

  def register_client
  nome_completo_usuario = params[:name].strip
  senha_pura = params[:password].strip
  email_usuario = params[:email].strip.downcase

  # Verificar se já existe usuário antes de salvar
  verificao_se_usuario_existe = BANCO_DE_DADOS_CLIENT.any? do |verificar|
    verificar[:gmail] == email_usuario
  end

  if verificao_se_usuario_existe
    @erro_username_email = "Usuário já existe ou dados inválidos."
    return erb :register_client
  end

  # Verifica se as senhas coincidem
  if senha_pura != params[:confirm_password]
    @erro_senhas = "As senhas são diferentes!"
    return erb :register_client
  end

  # Criptografa e salva
  hash_senha = BCrypt::Password.create(senha_pura)
  BANCO_DE_DADOS_CLIENT << { nome: nome_completo_usuario, gmail: email_usuario, telefone: params[:phone], senha: hash_senha }

  redirect '/'
  end

end
