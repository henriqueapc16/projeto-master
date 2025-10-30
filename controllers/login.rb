# frozen_string_literal: true
require_relative '../helpers/verificar_login'
class LOGIN < Sinatra::Base

  get "/" do
    erb :login

  end

  post "/" do
    helpers VERIFICAR_LOGIN
    end
end
