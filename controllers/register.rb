# frozen_string_literal: true
require_relative '../helpers/register_client'

class REGISTER  < Sinatra::Base
  include REGISTER_CLIENT

  get "/register" do

    erb :register

  end

  get '/register/client' do
    erb :register_client

  end

  post '/register/client' do
    register_client
  end

  get '/register/barber' do
    erb :register_barber


  end

  get '/register/barbershop' do
    erb :register_barbershop
  end



end
