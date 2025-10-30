# config/mercadopago.rb
require 'mercadopago'
require 'dotenv/load' # em dev

ACCESS_TOKEN = ENV['MERCADOPAGO_ACCESS_TOKEN'] # setar no .env ou infra
SDK = Mercadopago::SDK.new(ACCESS_TOKEN)
