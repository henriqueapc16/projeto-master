# app/controllers/payments_controller.rb
require_relative '../../config/mercadopago'
require_relative '../services/mercadopago_service'

post '/criar_pagamento' do
  data = JSON.parse(request.body.read)
  service = MercadopagoService.new
  result = service.create_pix_payment(
    amount: data["amount"],
    description: data["description"],
    payer_email: data["email"],
    payer_cpf: data["cpf"]
  )

  if result[:success]
    payment = result[:payment]
    content_type :json
    status 201
    { id: payment['id'], qr_code: payment.dig('point_of_interaction','transaction_data','qr_code'),
      qr_code_base64: payment.dig('point_of_interaction','transaction_data','qr_code_base64')
    }.to_json
  else
    status 422
    { error: result[:error] }.to_json
  end
end
