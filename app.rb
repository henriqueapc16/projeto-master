require 'sinatra/base'
require 'bcrypt'
require 'securerandom'
require 'sequel'
require 'rack/protection'

require_relative 'controllers/register'
require_relative 'controllers/login'
require_relative 'controllers/home'
require_relative 'controllers/recover'
require_relative 'controllers/terms'

class App < Sinatra::Base
  
  use Rack::Protection
  use Rack::Protection::AuthenticityToken
enable :sessions
set :session_secret, "$2a$12$QvFzSoeCp9S8VhJKxR6u9eMbSdc8uV6F4.Z6gZ1y5fs2BGFhiGBnm"
#Defino qual porta e ip vai rodar toda a aplicaçao
#set :bind, '0.0.0.0'
#set :port, 3333
DB = Sequel.sqlite('DB/banco_de_dados.sqlite3')

DB.create_table?(:clientes_cadastros) do
  primary_key :id
  String :cpf, size:11, unique: true ,null: false
  String :gmail, size:40, unique: true, null: false
  String :telefone, size:30, null: false
  String :senha_hash, null: false
end
DB.create_table?(:proprietarios_da_barbearia) do
  primary_key :id
  String :cpf, size:11, unique: true ,null: false
  String :gmail, size:40, unique: true, null: false
  String :telefone, size:30, null: false
  String :senha_hash, null: false
  String :anos_de_experiencia, size:99, null:false
  String :Expecialidades, size:500
  String :foto_certificado, size:400, null:false, unique: true
end

DB.create_table?(:informacao_da_barbearias) do
  primary_key :id
  String :nome_completo_gerente, size:200, null: false
  String :nome_da_barbearia, size:70, null: false
  String :foto_de_perfil_barbearia, size:400, null:false, unique:true
  String :descricao_da_barbearia, size:400, null:false
  String :endereco_da_barbearia, size:500, null:false
  String :telefone_da_barbearia, size:30, null:false
  String :comodidades_da_barbearia, size:200, null:false
  String :horario_de_abertura, null:false
  String :horario_de_fechamento, null:false
  Float  :preco_maximo
  Float  :preco_minimo
end

DB.create_table?(:servicos_da_barbearia) do
  primary_key :id
  foreign_key :barbearia_id, :informacao_da_barbearias
  String :nome_dos_servico_oferecido, size:60, null:false
  String :descricao_do_servico_oferecido, size:100, null:false
  Float  :preco_dos_servicos_oferecido,  null:false
end

DB.create_table?(:fucionarios_da_barbearia) do
  primary_key :id
  foreign_key :barbearia_id, :informacao_da_barbearias
  String :nome_do_barbeiro, size:50, null:false
  String :foto_do_barbeiro, size:400, null:false
end

DB.create_table?(:produtos_da_barbearia) do
  primary_key :id
  foreign_key :barbearia_id, :informacao_da_barbearias
  String :nome_dos_produto, size:100, null:false
  Float :preco_dos_produto, null:false
  String :decricao_do_produto, size:200, null:false
end


use LOGIN
use REGISTER
use RECOVER
use TERMS
use HOME



end








