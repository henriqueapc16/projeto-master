# frozen_string_literal: true
module VERIFICAR_LOGIN
  def verificar_login
    gmail_de_login = params[:loginEmail].to_s.strip.downcase
    senha_de_login = params[:loginPassword]

    # Procura o usuário pelo e-mail (com comparação em lowercase)
    procurar_usuarios = BANCO_DE_DADOS_CLIENT.find do |u|
      u[:gmail].downcase == gmail_de_login
    end

    # Valida a senha
    if procurar_usuarios && BCrypt::Password.new(procurar_usuarios[:senha]) == senha_de_login
      session[:user_email] = procurar_usuarios[:gmail]
      redirect '/home'
    else
      @error_login = "Email ou senha incorretos"
      erb :login
    end
  end
end
