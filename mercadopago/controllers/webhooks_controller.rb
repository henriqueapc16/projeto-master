post '/webhook/mercadopago' do
  payload = JSON.parse(request.body.read)
  # O Mercado Pago envia um body com info sobre o evento.
  # Buscar payment_id em payload e validar:
  if payload["type"] == "payment"
    payment_id = payload.dig("data", "id")
    service = MercadopagoService.new
    info = service.get_payment(payment_id)
    # atualize seu DB com info[:body]["status"] etc
  end
  status 200
end
