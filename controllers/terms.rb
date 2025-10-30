# frozen_string_literal: true
class TERMS < Sinatra::Base
  get "/terms" do
    erb :terms
  end
end
