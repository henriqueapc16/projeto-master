# frozen_string_literal: true
class RECOVER < Sinatra::Base
    get "/recover" do
      erb :recover
    end
end


