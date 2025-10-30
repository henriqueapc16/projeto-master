# frozen_string_literal: true
class HOME  < Sinatra::Base
  get "/home" do
    erb :home

  end
end
