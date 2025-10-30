# services/mercadopago_service.rb
require 'securerandom'
class MercadopagoService
  def initialize(sdk = SDK) # usa a constante do config
    @sdk = sdk
  end

  def create_pix_payment(amount:, description:, payer_email:, payer_cpf:)
    headers = { 'x-idempotency-key': SecureRandom.uuid }
    options = Mercadopago::RequestOptions.new(custom_headers: headers)

    payment_data = {
      transaction_amount: amount.to_f,
      description: description,
      payment_method_id: 'pix',
      payer: {
        email: payer_email,
        identification: { type: 'CPF', number: payer_cpf }
      }
    }

    response = @sdk.payment.create(payment_data, options)

    # tratar status / erros
    if response[:status] == 201 || response[:status] == 200
      return { success: true, payment: response[:response] }
    else
      return { success: false, error: response }
    end
  rescue StandardError => e
    return { success: false, error: e.message }
  end

  def get_payment(payment_id)
    resp = @sdk.payment.get(payment_id)
    { status: resp[:status], body: resp[:response] }
  end
end
