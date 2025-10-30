// public/js/Home.js

// Global variables
let currentUser = null;
let cart = [];
let appointments = [];

// Section management
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('hidden'));

    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        targetSection.classList.add('active');
    }

    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        toggleMobileMenu();
    }
}

// Modal management
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// Authentication
function login(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Mock login - in real app, this would be an API call
    if (email && password) {
        currentUser = {
            name: 'Usuário Teste',
            email: email,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
        };
        updateUserInterface();
        closeModal('loginModal');
        showNotification('Login realizado com sucesso!', 'success');
    } else {
        showNotification('Por favor, preencha todos os campos.', 'error');
    }
}

function register(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const accountType = document.getElementById('accountType').value;

    // Mock registration
    if (name && email && phone && password) {
        currentUser = {
            name: name,
            email: email,
            phone: phone,
            accountType: accountType,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
        };
        updateUserInterface();
        closeModal('registerModal');
        showNotification('Cadastro realizado com sucesso!', 'success');
    } else {
        showNotification('Por favor, preencha todos os campos.', 'error');
    }
}

function logout() {
    currentUser = null;
    cart = [];
    appointments = [];
    updateUserInterface();
    showSection('home');
    showNotification('Logout realizado com sucesso!', 'success');
}

function updateUserInterface() {
    const userInfo = document.getElementById('userInfo');
    const authButtons = document.getElementById('authButtons');
    const userAvatar = document.getElementById('userAvatar');
    const userName = document.getElementById('userName');
    const appointmentsList = document.getElementById('appointmentsList');

    if (currentUser) {
        userInfo.classList.remove('hidden');
        authButtons.classList.add('hidden');
        userAvatar.src = currentUser.avatar;
        userName.textContent = currentUser.name;

        // Update appointments list
        if (appointments.length > 0) {
            appointmentsList.innerHTML = appointments.map(apt => `
                <div class="bg-gray-700 rounded-lg p-4 mb-4">
                    <h4 class="font-semibold">${apt.service}</h4>
                    <p class="text-sm text-gray-400">com ${apt.barber} - ${apt.date} às ${apt.time}</p>
                </div>
            `).join('');
        } else {
            appointmentsList.innerHTML = '<p class="text-gray-400 text-center py-4">Nenhum agendamento encontrado.</p>';
        }
    } else {
        userInfo.classList.add('hidden');
        authButtons.classList.remove('hidden');
        appointmentsList.innerHTML = '<div class="text-center text-gray-400 py-8"><i class="fas fa-calendar-alt text-4xl mb-4"></i><p>Faça login para ver seus agendamentos</p></div>';
    }

    updateCart();
}

// Appointments
function makeAppointment(event) {
    event.preventDefault();

    if (!currentUser) {
        showNotification('Faça login para agendar.', 'error');
        openModal('loginModal');
        return;
    }

    const barber = document.getElementById('barberSelect').value;
    const service = document.getElementById('serviceSelect').value;
    const date = document.getElementById('dateSelect').value;
    const time = document.querySelector('input[name="timeSlot"]:checked')?.value;

    if (!barber || !service || !date || !time) {
        showNotification('Por favor, preencha todos os campos.', 'error');
        return;
    }

    const appointment = {
        barber: barber,
        service: service,
        date: date,
        time: time
    };

    appointments.push(appointment);
    updateUserInterface();
    showNotification('Agendamento realizado com sucesso!', 'success');
    event.target.reset();
}

function scheduleWithBarber(barberId) {
    if (!currentUser) {
        showNotification('Faça login para agendar.', 'error');
        openModal('loginModal');
        return;
    }

    showSection('appointments');
    document.getElementById('barberSelect').value = barberId;
}

// Shop
function addToCart(productId) {
    const product = {
        id: productId,
        name: getProductName(productId),
        price: getProductPrice(productId)
    };

    cart.push(product);
    updateCart();
    showNotification(`${product.name} adicionado ao carrinho!`, 'success');
}

function getProductName(id) {
    const names = {
        'pomada': 'Pomada Modeladora',
        'navalha': 'Navalha Profissional',
        'shampoo': 'Shampoo para Barba',
        'oleo': 'Óleo para Barba'
    };
    return names[id] || 'Produto';
}

function getProductPrice(id) {
    const prices = {
        'pomada': 25.90,
        'navalha': 89.90,
        'shampoo': 32.90,
        'oleo': 28.90
    };
    return prices[id] || 0;
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const totalAmount = document.getElementById('totalAmount');

    if (cart.length > 0) {
        cartItems.innerHTML = cart.map(item => `
            <div class="flex justify-between items-center py-2 border-b border-gray-600">
                <span>${item.name}</span>
                <span>R$ ${item.price.toFixed(2)}</span>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        totalAmount.textContent = `R$ ${total.toFixed(2)}`;
        cartTotal.classList.remove('hidden');
    } else {
        cartItems.innerHTML = '<p class="text-gray-400 text-center py-4">Seu carrinho está vazio</p>';
        cartTotal.classList.add('hidden');
    }
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Seu carrinho está vazio.', 'error');
        return;
    }

    // Mock checkout
    cart = [];
    updateCart();
    showNotification('Compra realizada com sucesso!', 'success');
}

// Contact
function sendMessage(event) {
    event.preventDefault();
    const name = event.target.querySelector('input[type="text"]').value;
    const email = event.target.querySelector('input[type="email"]').value;
    const phone = event.target.querySelector('input[type="tel"]').value;
    const message = event.target.querySelector('textarea').value;

    if (!name || !email || !message) {
        showNotification('Por favor, preencha os campos obrigatórios.', 'error');
        return;
    }

    // Mock send message
    showNotification('Mensagem enviada com sucesso!', 'success');
    event.target.reset();
}

// Mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Notifications
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.remove('hidden');

        setTimeout(() => {
            notification.classList.add('hidden');
        }, 3000);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Generate time slots for appointments
    const timeSlots = document.getElementById('timeSlots');
    if (timeSlots) {
        const times = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
        timeSlots.innerHTML = times.map(time => `
            <label class="flex items-center">
                <input type="radio" name="timeSlot" value="${time}" class="mr-2">
                <span>${time}</span>
            </label>
        `).join('');
    }

    updateUserInterface();
});
