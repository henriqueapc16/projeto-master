
        // Global state
        let currentUser = null;
        let barbershops = [];
        let appointments = [];
        let favorites = [];

        // Sample data
        const sampleServices = [
            { id: 1, name: "Corte Simples", price: 35.00, duration: 30, description: "Corte básico com máquina e tesoura" },
            { id: 2, name: "Corte + Barba", price: 55.00, duration: 45, description: "Corte completo com design de barba" },
            { id: 3, name: "Barba Completa", price: 25.00, duration: 20, description: "Design e finalização da barba" },
            { id: 4, name: "Corte Premium", price: 65.00, duration: 60, description: "Corte personalizado com tratamentos" },
            { id: 5, name: "Sobrancelha", price: 15.00, duration: 15, description: "Design e limpeza das sobrancelhas" },
            { id: 6, name: "Relaxamento", price: 45.00, duration: 30, description: "Massagem e tratamentos relaxantes" }
        ];

        const sampleBarbershops = [
            {
                id: 1,
                name: "BarberPro Elite",
                address: "Rua Augusta, 1234 - Consolação, SP",
                phone: "(11) 3456-7890",
                whatsapp: "(11) 99999-8888",
                rating: 4.9,
                reviews: 127,
                distance: "1.2km",
                image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=300&fit=crop",
                description: "Barbearia premium com mais de 10 anos de tradição no coração de São Paulo. Oferecemos serviços de alta qualidade com profissionais experientes e ambiente sofisticado.",
                services: ["Corte Clássico", "Barba", "Tratamentos", "Relaxamento"],
                priceRange: "R$ 35 - R$ 80",
                hours: {
                    weekdays: "9h às 19h",
                    saturday: "8h às 18h",
                    sunday: "Fechado"
                },
                amenities: ["Wi-Fi", "Ar Condicionado", "TV", "Café", "Estacionamento"],
                gallery: [
                    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=300&h=200&fit=crop",
                    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&h=200&fit=crop",
                    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=300&h=200&fit=crop",
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=200&fit=crop"
                ],
                products: [
                    {
                        id: 1,
                        name: "Pomada Modeladora Premium",
                        price: 45.90,
                        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&h=200&fit=crop",
                        description: "Pomada de alta fixação para todos os tipos de cabelo"
                    },
                    {
                        id: 2,
                        name: "Óleo para Barba Artesanal",
                        price: 32.50,
                        image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200&h=200&fit=crop",
                        description: "Óleo natural para hidratação e brilho da barba"
                    }
                ],
                barbers: [
                    {
                        id: 1,
                        name: "João Silva",
                        specialty: "Cortes Clássicos",
                        experience: "5 anos",
                        rating: 4.9,
                        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                        bio: "Especialista em cortes clássicos e modernos, com formação em técnicas europeias."
                    },
                    {
                        id: 2,
                        name: "Carlos Mendes",
                        specialty: "Barbas e Bigodes",
                        experience: "8 anos",
                        rating: 4.8,
                        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                        bio: "Mestre em design de barbas e tratamentos faciais masculinos."
                    }
                ]
            },
            {
                id: 2,
                name: "Modern Cuts",
                address: "Av. Paulista, 567 - Bela Vista, SP",
                phone: "(11) 3234-5678",
                whatsapp: "(11) 98888-7777",
                rating: 4.7,
                reviews: 89,
                distance: "2.8km",
                image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop",
                description: "Especializada em cortes modernos e tendências atuais. Ambiente jovem e descontraído com as últimas novidades do mundo da barbearia.",
                services: ["Fade", "Undercut", "Cortes Modernos", "Coloração"],
                priceRange: "R$ 40 - R$ 90",
                hours: {
                    weekdays: "10h às 20h",
                    saturday: "9h às 19h",
                    sunday: "10h às 16h"
                },
                amenities: ["Wi-Fi", "Música", "Jogos", "Bebidas"],
                gallery: [
                    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&h=200&fit=crop",
                    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=300&h=200&fit=crop",
                    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=300&h=200&fit=crop"
                ],
                products: [
                    {
                        id: 3,
                        name: "Cera Texturizadora",
                        price: 38.90,
                        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&h=200&fit=crop",
                        description: "Cera para texturização e volume"
                    }
                ],
                barbers: [
                    {
                        id: 3,
                        name: "Rafael Costa",
                        specialty: "Cortes Modernos",
                        experience: "6 anos",
                        rating: 4.9,
                        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
                        bio: "Especialista em tendências e cortes modernos, sempre atualizado com as novidades."
                    }
                ]
            },
            {
                id: 3,
                name: "Vintage Barber",
                address: "Rua Oscar Freire, 890 - Jardins, SP",
                phone: "(11) 3567-8901",
                whatsapp: "(11) 97777-6666",
                rating: 4.8,
                reviews: 156,
                distance: "3.5km",
                image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=300&fit=crop",
                description: "Ambiente clássico com técnicas tradicionais. Uma experiência única que combina tradição e sofisticação em cada atendimento.",
                services: ["Corte Tradicional", "Barba à Navalha", "Relaxamento", "Massagem"],
                priceRange: "R$ 50 - R$ 120",
                hours: {
                    weekdays: "8h às 18h",
                    saturday: "8h às 17h",
                    sunday: "Fechado"
                },
                amenities: ["Whisky", "Charutos", "Jornal", "Engraxate"],
                gallery: [
                    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=300&h=200&fit=crop",
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=200&fit=crop",
                    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=300&h=200&fit=crop"
                ],
                products: [
                    {
                        id: 4,
                        name: "Balm Pós-Barba Clássico",
                        price: 55.00,
                        image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200&h=200&fit=crop",
                        description: "Balm tradicional para cuidados pós-barba"
                    }
                ],
                barbers: [
                    {
                        id: 4,
                        name: "Antonio Barbosa",
                        specialty: "Técnicas Tradicionais",
                        experience: "15 anos",
                        rating: 4.9,
                        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
                        bio: "Mestre barbeiro com décadas de experiência em técnicas clássicas e tradicionais."
                    }
                ]
            }
        ];

        // Initialize app
        document.addEventListener('DOMContentLoaded', function() {
            barbershops = sampleBarbershops;
            loadFeaturedBarbershops();
            loadBarbershopsList();
            loadNearbyBarbershops();
        });

        // Professional fields toggle
        function toggleProfessionalFields() {
            const accountType = document.getElementById('accountType').value;
            const professionalFields = document.getElementById('professionalFields');
            
            if (accountType === 'barbershop' || accountType === 'barber') {
                professionalFields.classList.remove('hidden');
                // Make professional fields required
                document.getElementById('registerCPF').required = true;
                document.getElementById('registerExperience').required = true;
                document.getElementById('registerSpecialties').required = true;
            } else {
                professionalFields.classList.add('hidden');
                // Remove required from professional fields
                document.getElementById('registerCPF').required = false;
                document.getElementById('registerExperience').required = false;
                document.getElementById('registerSpecialties').required = false;
            }
        }

        // Booking state
        let currentBooking = {
            barbershopId: null,
            serviceId: null,
            barberId: null,
            date: null,
            time: null
        };

        // Barbershop tabs
        function showBarbershopTab(tabName) {
            // Hide all tab contents
            document.querySelectorAll('.barbershop-tab-content').forEach(content => {
                content.classList.add('hidden');
            });
            
            // Remove active class from all tabs
            document.querySelectorAll('.barbershop-tab').forEach(tab => {
                tab.classList.remove('active', 'border-yellow-400', 'text-yellow-400');
                tab.classList.add('border-transparent', 'text-gray-400');
            });
            
            // Show selected tab content
            document.getElementById(tabName + '-tab').classList.remove('hidden');
            
            // Add active class to selected tab
            event.target.classList.add('active', 'border-yellow-400', 'text-yellow-400');
            event.target.classList.remove('border-transparent', 'text-gray-400');

            // Load scheduling data if schedule tab is selected
            if (tabName === 'schedule') {
                loadSchedulingData();
            }
        }

        // Scheduling functions
        function loadSchedulingData() {
            loadServices();
            loadBarbers();
            loadDates();
        }

        function loadServices() {
            const container = document.getElementById('serviceSelection');
            container.innerHTML = sampleServices.map(service => `
                <div onclick="selectService(${service.id})" class="service-option bg-gray-700 hover:bg-gray-600 p-4 rounded-lg cursor-pointer transition-colors border-2 border-transparent">
                    <h5 class="font-semibold mb-1">${service.name}</h5>
                    <p class="text-gray-400 text-sm mb-2">${service.description}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-yellow-400 font-semibold">R$ ${service.price.toFixed(2)}</span>
                        <span class="text-gray-400 text-sm">${service.duration}min</span>
                    </div>
                </div>
            `).join('');
        }

        function loadBarbers() {
            const barbershop = barbershops.find(b => b.id === currentBooking.barbershopId);
            if (!barbershop) return;

            const container = document.getElementById('barberSelection');
            container.innerHTML = barbershop.barbers.map(barber => `
                <div onclick="selectBarber(${barber.id})" class="barber-option bg-gray-700 hover:bg-gray-600 p-4 rounded-lg cursor-pointer transition-colors border-2 border-transparent">
                    <div class="flex items-center mb-3">
                        <img src="${barber.image}" alt="${barber.name}" class="w-12 h-12 rounded-full mr-3 object-cover">
                        <div>
                            <h5 class="font-semibold">${barber.name}</h5>
                            <p class="text-gray-400 text-sm">${barber.specialty}</p>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="star-rating text-sm">
                            ${generateStars(barber.rating)}
                            <span class="ml-1 text-gray-300">${barber.rating}</span>
                        </div>
                        <span class="text-gray-400 text-sm">${barber.experience}</span>
                    </div>
                </div>
            `).join('');
        }

        function loadDates() {
            const container = document.getElementById('dateSelection');
            const today = new Date();
            const dates = [];

            // Generate next 14 days
            for (let i = 0; i < 14; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() + i);
                dates.push(date);
            }

            container.innerHTML = dates.map(date => {
                const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' });
                const dayNumber = date.getDate();
                const monthName = date.toLocaleDateString('pt-BR', { month: 'short' });
                const isToday = date.toDateString() === today.toDateString();
                const dateString = date.toISOString().split('T')[0];

                return `
                    <div onclick="selectDate('${dateString}')" class="date-option bg-gray-700 hover:bg-gray-600 p-3 rounded-lg cursor-pointer transition-colors border-2 border-transparent text-center ${isToday ? 'ring-2 ring-yellow-400' : ''}">
                        <div class="text-gray-400 text-xs uppercase">${dayName}</div>
                        <div class="text-lg font-semibold">${dayNumber}</div>
                        <div class="text-gray-400 text-xs">${monthName}</div>
                        ${isToday ? '<div class="text-yellow-400 text-xs mt-1">Hoje</div>' : ''}
                    </div>
                `;
            }).join('');
        }

        function loadTimes() {
            const container = document.getElementById('timeSelection');
            
            // Generate available times (9:00 to 18:00, 30min intervals)
            const times = [];
            for (let hour = 9; hour < 18; hour++) {
                for (let minute = 0; minute < 60; minute += 30) {
                    const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                    const isAvailable = Math.random() > 0.3; // 70% chance of being available
                    times.push({ time: timeString, available: isAvailable });
                }
            }

            container.innerHTML = times.map(timeSlot => `
                <button onclick="selectTime('${timeSlot.time}')" 
                        class="time-option p-3 rounded-lg text-sm font-medium transition-colors border-2 border-transparent ${
                            timeSlot.available 
                                ? 'bg-gray-700 hover:bg-gray-600 text-white cursor-pointer' 
                                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        }" 
                        ${!timeSlot.available ? 'disabled' : ''}>
                    ${timeSlot.time}
                </button>
            `).join('');
        }

        function selectService(serviceId) {
            currentBooking.serviceId = serviceId;
            const service = sampleServices.find(s => s.id === serviceId);
            
            // Update UI
            document.querySelectorAll('.service-option').forEach(option => {
                option.classList.remove('border-yellow-400', 'bg-yellow-600');
                option.classList.add('border-transparent');
            });
            event.target.closest('.service-option').classList.add('border-yellow-400');
            
            // Update summary
            document.getElementById('selectedService').classList.remove('hidden');
            document.getElementById('serviceName').textContent = service.name;
            document.getElementById('servicePrice').textContent = `R$ ${service.price.toFixed(2)}`;
            document.getElementById('totalPrice').textContent = `R$ ${service.price.toFixed(2)}`;
            
            updateBookingButton();
        }

        function selectBarber(barberId) {
            currentBooking.barberId = barberId;
            const barbershop = barbershops.find(b => b.id === currentBooking.barbershopId);
            const barber = barbershop.barbers.find(b => b.id === barberId);
            
            // Update UI
            document.querySelectorAll('.barber-option').forEach(option => {
                option.classList.remove('border-yellow-400');
                option.classList.add('border-transparent');
            });
            event.target.closest('.barber-option').classList.add('border-yellow-400');
            
            // Update summary
            document.getElementById('selectedBarber').classList.remove('hidden');
            document.getElementById('barberName').textContent = barber.name;
            
            updateBookingButton();
        }

        function selectDate(dateString) {
            currentBooking.date = dateString;
            const date = new Date(dateString + 'T00:00:00');
            
            // Update UI
            document.querySelectorAll('.date-option').forEach(option => {
                option.classList.remove('border-yellow-400');
                option.classList.add('border-transparent');
            });
            event.target.closest('.date-option').classList.add('border-yellow-400');
            
            // Update summary
            document.getElementById('selectedDate').classList.remove('hidden');
            document.getElementById('dateName').textContent = date.toLocaleDateString('pt-BR');
            
            // Load available times for selected date
            loadTimes();
            
            updateBookingButton();
        }

        function selectTime(timeString) {
            currentBooking.time = timeString;
            
            // Update UI
            document.querySelectorAll('.time-option').forEach(option => {
                option.classList.remove('border-yellow-400', 'bg-yellow-600');
            });
            event.target.classList.add('border-yellow-400', 'bg-yellow-600');
            
            // Update summary
            document.getElementById('selectedTime').classList.remove('hidden');
            document.getElementById('timeName').textContent = timeString;
            
            updateBookingButton();
        }

        function updateBookingButton() {
            const button = document.getElementById('confirmBooking');
            const isComplete = currentBooking.serviceId && currentBooking.barberId && currentBooking.date && currentBooking.time;
            
            if (isComplete) {
                button.disabled = false;
                button.classList.remove('bg-gray-600', 'text-gray-400', 'cursor-not-allowed');
                button.classList.add('bg-yellow-600', 'hover:bg-yellow-700', 'text-black', 'cursor-pointer');
                button.textContent = 'Confirmar Agendamento';
            } else {
                button.disabled = true;
                button.classList.add('bg-gray-600', 'text-gray-400', 'cursor-not-allowed');
                button.classList.remove('bg-yellow-600', 'hover:bg-yellow-700', 'text-black', 'cursor-pointer');
                button.textContent = 'Selecione todas as opções';
            }
        }

        function confirmBooking() {
            if (!currentUser) {
                showNotification('Faça login para agendar!', 'error');
                return;
            }

            const service = sampleServices.find(s => s.id === currentBooking.serviceId);
            const barbershop = barbershops.find(b => b.id === currentBooking.barbershopId);
            const barber = barbershop.barbers.find(b => b.id === currentBooking.barberId);

            const newAppointment = {
                id: Date.now(),
                barbershop: barbershop.name,
                barber: barber.name,
                service: service.name,
                date: currentBooking.date,
                time: currentBooking.time,
                status: 'confirmado',
                price: service.price
            };

            appointments.push(newAppointment);
            
            // Reset booking state
            currentBooking = {
                barbershopId: null,
                serviceId: null,
                barberId: null,
                date: null,
                time: null
            };

            showNotification('Agendamento confirmado com sucesso!');
            showAppSection('appointments');
            loadAppointmentsList();
        }

        // Location functions
        function requestLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        document.getElementById('currentLocation').textContent = `Localização atual (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
                        showNotification('Localização atualizada!');
                        loadNearbyBarbershops();
                    },
                    function(error) {
                        showNotification('Erro ao obter localização', 'error');
                    }
                );
            } else {
                showNotification('Geolocalização não suportada', 'error');
            }
        }

        function loadNearbyBarbershops() {
            const container = document.getElementById('nearbyBarbershopsList');
            
            container.innerHTML = barbershops.map(barbershop => `
                <div class="barbershop-card rounded-lg overflow-hidden card-hover">
                    <div class="flex">
                        <img src="${barbershop.image}" alt="${barbershop.name}" class="w-32 h-32 object-cover">
                        <div class="flex-1 p-4">
                            <div class="flex justify-between items-start mb-2">
                                <h4 class="text-lg font-semibold">${barbershop.name}</h4>
                                <div class="text-right">
                                    <span class="text-yellow-400 font-semibold text-sm">${barbershop.distance}</span>
                                    <button onclick="toggleFavorite(${barbershop.id})" class="block text-gray-400 hover:text-yellow-400 mt-1">
                                        <i class="fas fa-heart ${favorites.includes(barbershop.id) ? 'text-yellow-400' : ''}"></i>
                                    </button>
                                </div>
                            </div>
                            <p class="text-gray-400 text-sm mb-2">${barbershop.address}</p>
                            <div class="flex items-center mb-2">
                                <div class="star-rating mr-2 text-sm">
                                    ${generateStars(barbershop.rating)}
                                </div>
                                <span class="text-sm text-gray-300">${barbershop.rating} (${barbershop.reviews})</span>
                            </div>
                            <div class="flex flex-wrap gap-1 mb-3">
                                ${barbershop.services.slice(0, 3).map(service => 
                                    `<span class="bg-yellow-600 text-black px-2 py-1 rounded text-xs">${service}</span>`
                                ).join('')}
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-yellow-400 font-semibold text-sm">${barbershop.priceRange}</span>
                                <button onclick="viewBarbershop(${barbershop.id})" class="bg-yellow-600 hover:bg-yellow-700 text-black px-4 py-1 rounded text-sm transition-colors">
                                    Ver Perfil
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Store functions
        function addToCart(productId) {
            if (!currentUser) {
                showNotification('Faça login para comprar!', 'error');
                return;
            }
            showNotification('Produto adicionado ao carrinho!');
        }

        function openAddProductModal() {
            // This would open a modal for adding products (barbershop owners only)
            showNotification('Modal de adicionar produto (em desenvolvimento)');
        }

        function openImageModal(imageUrl) {
            // This would open a modal to view the image in full size
            window.open(imageUrl, '_blank', 'noopener,noreferrer');
        }

        function openWhatsApp(phone) {
            const message = encodeURIComponent('Olá! Gostaria de agendar um horário.');
            window.open(`https://wa.me/${phone.replace(/\D/g, '')}?text=${message}`, '_blank', 'noopener,noreferrer');
        }

        // Auth functions
        function showAuthForm(type) {
            const loginTab = document.getElementById('loginTab');
            const registerTab = document.getElementById('registerTab');
            const loginForm = document.getElementById('loginForm');
            const registerForm = document.getElementById('registerForm');

            if (type === 'login') {
                loginTab.classList.add('bg-yellow-400', 'text-black');
                loginTab.classList.remove('text-gray-400');
                registerTab.classList.remove('bg-yellow-400', 'text-black');
                registerTab.classList.add('text-gray-400');
                loginForm.classList.remove('hidden');
                registerForm.classList.add('hidden');
            } else {
                registerTab.classList.add('bg-yellow-400', 'text-black');
                registerTab.classList.remove('text-gray-400');
                loginTab.classList.remove('bg-yellow-400', 'text-black');
                loginTab.classList.add('text-gray-400');
                registerForm.classList.remove('hidden');
                loginForm.classList.add('hidden');
            }
        }

        function login(event) {
            event.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // Simulate login
            currentUser = {
                id: 1,
                name: 'João Cliente',
                email: email,
                type: 'client',
                credibility: 95,
                avatar: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"%3E%3Ccircle cx="16" cy="16" r="14" fill="%23374151"/%3E%3Ccircle cx="16" cy="12" r="5" fill="%23d1d5db"/%3E%3Cpath d="M6 24 Q16 20 26 24" fill="%23d1d5db"/%3E%3C/svg%3E'
            };

            showSection('app');
            updateUserInterface();
            showNotification('Login realizado com sucesso!');
            loadUserData();
        }

        function register(event) {
            event.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const phone = document.getElementById('registerPhone').value;
            const type = document.getElementById('accountType').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                showNotification('As senhas não coincidem!', 'error');
                return;
            }

            // Simulate registration
            currentUser = {
                id: Date.now(),
                name: name,
                email: email,
                phone: phone,
                type: type,
                credibility: 100,
                avatar: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"%3E%3Ccircle cx="16" cy="16" r="14" fill="%23374151"/%3E%3Ccircle cx="16" cy="12" r="5" fill="%23d1d5db"/%3E%3Cpath d="M6 24 Q16 20 26 24" fill="%23d1d5db"/%3E%3C/svg%3E'
            };

            showSection('app');
            updateUserInterface();
            showNotification('Cadastro realizado com sucesso!');
            loadUserData();
        }

        function logout() {
            currentUser = null;
            appointments = [];
            favorites = [];
            showSection('auth');
            showNotification('Logout realizado com sucesso!');
        }

        function updateUserInterface() {
            if (currentUser) {
                document.getElementById('userAvatar').src = currentUser.avatar;
                document.getElementById('userName').textContent = currentUser.name;
                document.getElementById('credibilityScore').textContent = currentUser.credibility;
            }
        }

        function loadUserData() {
            // Load user appointments
            appointments = [
                {
                    id: 1,
                    barbershop: "BarberPro Elite",
                    barber: "João Silva",
                    service: "Corte + Barba",
                    date: "2024-01-15",
                    time: "14:30",
                    status: "confirmado"
                }
            ];

            // Load favorites
            favorites = [1, 3]; // Barbershop IDs

            loadAppointmentsList();
            loadFavoritesList();
        }

        // Navigation
        function showSection(sectionId) {
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(sectionId).classList.add('active');
        }

        function showAppSection(sectionId) {
            document.querySelectorAll('.app-section').forEach(section => {
                section.classList.add('hidden');
                section.classList.remove('active');
            });
            
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
                targetSection.classList.add('active');
            }

            // Update nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('text-yellow-400');
            });
            
            const currentLink = document.querySelector(`[onclick="showAppSection('${sectionId}')"]`);
            if (currentLink) {
                currentLink.classList.add('text-yellow-400');
            }
        }

        function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            mobileMenu.classList.toggle('hidden');
        }

        // Barbershops
        function loadFeaturedBarbershops() {
            const container = document.getElementById('featuredBarbershops');
            const featured = barbershops.slice(0, 3);
            
            container.innerHTML = featured.map(barbershop => `
                <div class="barbershop-card rounded-lg overflow-hidden card-hover">
                    <img src="${barbershop.image}" alt="${barbershop.name}" class="h-48 w-full object-cover">
                    <div class="p-6">
                        <h4 class="text-xl font-semibold mb-2">${barbershop.name}</h4>
                        <p class="text-gray-400 text-sm mb-3">${barbershop.address}</p>
                        <div class="flex items-center mb-4">
                            <div class="star-rating mr-2">
                                ${generateStars(barbershop.rating)}
                            </div>
                            <span class="text-sm text-gray-300">${barbershop.rating} (${barbershop.reviews} avaliações)</span>
                        </div>
                        <p class="text-gray-300 text-sm mb-4">${barbershop.description}</p>
                        <button onclick="viewBarbershop(${barbershop.id})" class="w-full bg-yellow-600 hover:bg-yellow-700 py-2 rounded-lg transition-colors">
                            Ver Perfil
                        </button>
                    </div>
                </div>
            `).join('');
        }

        function loadBarbershopsList() {
            const container = document.getElementById('barbershopsList');
            
            container.innerHTML = barbershops.map(barbershop => `
                <div class="barbershop-card rounded-lg overflow-hidden card-hover">
                    <div class="flex">
                        <img src="${barbershop.image}" alt="${barbershop.name}" class="w-32 h-32 object-cover">
                        <div class="flex-1 p-4">
                            <div class="flex justify-between items-start mb-2">
                                <h4 class="text-lg font-semibold">${barbershop.name}</h4>
                                <button onclick="toggleFavorite(${barbershop.id})" class="text-gray-400 hover:text-yellow-400">
                                    <i class="fas fa-heart ${favorites.includes(barbershop.id) ? 'text-yellow-400' : ''}"></i>
                                </button>
                            </div>
                            <p class="text-gray-400 text-sm mb-2">${barbershop.address}</p>
                            <div class="flex items-center mb-2">
                                <div class="star-rating mr-2 text-sm">
                                    ${generateStars(barbershop.rating)}
                                </div>
                                <span class="text-sm text-gray-300">${barbershop.rating} (${barbershop.reviews})</span>
                            </div>
                            <div class="flex flex-wrap gap-1 mb-3">
                                ${barbershop.services.slice(0, 3).map(service => 
                                    `<span class="bg-yellow-600 text-black px-2 py-1 rounded text-xs">${service}</span>`
                                ).join('')}
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-yellow-400 font-semibold text-sm">${barbershop.priceRange}</span>
                                <button onclick="viewBarbershop(${barbershop.id})" class="bg-yellow-600 hover:bg-yellow-700 text-black px-4 py-1 rounded text-sm transition-colors">
                                    Ver Perfil
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function viewBarbershop(id) {
            const barbershop = barbershops.find(b => b.id === id);
            if (!barbershop) return;

            const content = document.getElementById('barbershopProfileContent');
            content.innerHTML = `
                <div class="relative h-64 bg-gradient-to-r from-gray-900 to-gray-800" style="background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${barbershop.image}'); background-size: cover; background-position: center;">
                    <div class="absolute inset-0 flex items-end">
                        <div class="container mx-auto px-4 pb-8">
                            <button onclick="showAppSection('barbershops')" class="mb-4 text-yellow-400 hover:text-yellow-300">
                                <i class="fas fa-arrow-left mr-2"></i>Voltar
                            </button>
                            <h1 class="text-4xl font-bold mb-2">${barbershop.name}</h1>
                            <p class="text-gray-300">${barbershop.address}</p>
                            <div class="flex items-center mt-2">
                                <div class="star-rating mr-2">
                                    ${generateStars(barbershop.rating)}
                                </div>
                                <span class="text-gray-300">${barbershop.rating} (${barbershop.reviews} avaliações)</span>
                                ${barbershop.distance ? `<span class="ml-4 text-yellow-400">• ${barbershop.distance}</span>` : ''}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Navigation Tabs -->
                <div class="bg-gray-800 border-b border-gray-700">
                    <div class="container mx-auto px-4">
                        <nav class="flex space-x-8">
                            <button onclick="showBarbershopTab('overview')" class="barbershop-tab active py-4 px-2 border-b-2 border-yellow-400 text-yellow-400 font-medium">Visão Geral</button>
                            <button onclick="showBarbershopTab('schedule')" class="barbershop-tab py-4 px-2 border-b-2 border-transparent text-gray-400 hover:text-white font-medium">Agendar</button>
                            <button onclick="showBarbershopTab('gallery')" class="barbershop-tab py-4 px-2 border-b-2 border-transparent text-gray-400 hover:text-white font-medium">Galeria</button>
                            <button onclick="showBarbershopTab('team')" class="barbershop-tab py-4 px-2 border-b-2 border-transparent text-gray-400 hover:text-white font-medium">Equipe</button>
                            <button onclick="showBarbershopTab('store')" class="barbershop-tab py-4 px-2 border-b-2 border-transparent text-gray-400 hover:text-white font-medium">Loja</button>
                        </nav>
                    </div>
                </div>

                <div class="container mx-auto px-4 py-8">
                    <!-- Overview Tab -->
                    <div id="overview-tab" class="barbershop-tab-content">
                        <div class="grid lg:grid-cols-3 gap-8">
                            <div class="lg:col-span-2">
                                <div class="bg-gray-800 rounded-lg p-6 mb-6">
                                    <h3 class="text-xl font-semibold mb-4">Sobre</h3>
                                    <p class="text-gray-300 mb-4">${barbershop.description}</p>
                                    <div class="flex flex-wrap gap-2 mb-6">
                                        ${barbershop.services.map(service => 
                                            `<span class="bg-yellow-600 text-black px-3 py-1 rounded">${service}</span>`
                                        ).join('')}
                                    </div>
                                    
                                    <h4 class="text-lg font-semibold mb-3">Comodidades</h4>
                                    <div class="grid grid-cols-2 gap-2">
                                        ${barbershop.amenities.map(amenity => 
                                            `<div class="flex items-center text-gray-300">
                                                <i class="fas fa-check text-green-400 mr-2"></i>
                                                ${amenity}
                                            </div>`
                                        ).join('')}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div class="bg-gray-800 rounded-lg p-6 mb-6">
                                    <h3 class="text-xl font-semibold mb-4">Informações</h3>
                                    <div class="space-y-3">
                                        <div class="flex items-center">
                                            <i class="fas fa-map-marker-alt text-yellow-400 mr-3"></i>
                                            <span class="text-gray-300 text-sm">${barbershop.address}</span>
                                        </div>
                                        <div class="flex items-center">
                                            <i class="fas fa-phone text-yellow-400 mr-3"></i>
                                            <span class="text-gray-300 text-sm">${barbershop.phone}</span>
                                        </div>
                                        <div class="flex items-center">
                                            <i class="fab fa-whatsapp text-yellow-400 mr-3"></i>
                                            <span class="text-gray-300 text-sm">${barbershop.whatsapp}</span>
                                        </div>
                                        <div class="flex items-start">
                                            <i class="fas fa-clock text-yellow-400 mr-3 mt-1"></i>
                                            <div class="text-gray-300 text-sm">
                                                <div>Seg-Sex: ${barbershop.hours.weekdays}</div>
                                                <div>Sábado: ${barbershop.hours.saturday}</div>
                                                <div>Domingo: ${barbershop.hours.sunday}</div>
                                            </div>
                                        </div>
                                        <div class="flex items-center">
                                            <i class="fas fa-dollar-sign text-yellow-400 mr-3"></i>
                                            <span class="text-gray-300 text-sm">${barbershop.priceRange}</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="bg-gray-800 rounded-lg p-6">
                                    <h3 class="text-xl font-semibold mb-4">Ações</h3>
                                    <div class="space-y-3">
                                        <button onclick="toggleFavorite(${barbershop.id})" class="w-full ${favorites.includes(barbershop.id) ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'} py-2 rounded-lg transition-colors">
                                            <i class="fas fa-heart mr-2"></i>
                                            ${favorites.includes(barbershop.id) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                                        </button>
                                        <button onclick="openWhatsApp('${barbershop.whatsapp}')" class="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg transition-colors">
                                            <i class="fab fa-whatsapp mr-2"></i>
                                            Contato WhatsApp
                                        </button>
                                        <button class="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition-colors">
                                            <i class="fas fa-share mr-2"></i>
                                            Compartilhar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Gallery Tab -->
                    <div id="gallery-tab" class="barbershop-tab-content hidden">
                        <h3 class="text-2xl font-bold mb-6">Galeria de Trabalhos</h3>
                        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            ${barbershop.gallery.map((image, index) => `
                                <div class="relative group cursor-pointer" onclick="openImageModal('${image}')">
                                    <img src="${image}" alt="Trabalho ${index + 1}" class="w-full h-48 object-cover rounded-lg">
                                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
                                        <i class="fas fa-expand text-white opacity-0 group-hover:opacity-100 text-2xl"></i>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Team Tab -->
                    <div id="team-tab" class="barbershop-tab-content hidden">
                        <h3 class="text-2xl font-bold mb-6">Nossa Equipe</h3>
                        <div class="grid md:grid-cols-2 gap-6">
                            ${barbershop.barbers.map(barber => `
                                <div class="bg-gray-800 rounded-lg p-6">
                                    <div class="flex items-center mb-4">
                                        <img src="${barber.image}" alt="${barber.name}" class="w-20 h-20 rounded-full mr-4 object-cover">
                                        <div>
                                            <h4 class="text-xl font-semibold">${barber.name}</h4>
                                            <p class="text-yellow-400">${barber.specialty}</p>
                                            <p class="text-gray-400 text-sm">${barber.experience} de experiência</p>
                                        </div>
                                    </div>
                                    <p class="text-gray-300 mb-4">${barber.bio}</p>
                                    <div class="flex items-center justify-between">
                                        <div class="star-rating">
                                            ${generateStars(barber.rating)}
                                            <span class="ml-1 text-gray-300">${barber.rating}</span>
                                        </div>
                                        <button onclick="scheduleWithBarber(${barbershop.id}, ${barber.id})" class="bg-yellow-600 hover:bg-yellow-700 text-black px-4 py-2 rounded transition-colors">
                                            Agendar
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Store Tab -->
                    <div id="store-tab" class="barbershop-tab-content hidden">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-2xl font-bold">Loja da Barbearia</h3>
                            ${currentUser && currentUser.type === 'barbershop' ? `
                                <button onclick="openAddProductModal()" class="bg-yellow-600 hover:bg-yellow-700 text-black px-4 py-2 rounded transition-colors">
                                    <i class="fas fa-plus mr-2"></i>Adicionar Produto
                                </button>
                            ` : ''}
                        </div>
                        
                        ${barbershop.products && barbershop.products.length > 0 ? `
                            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                ${barbershop.products.map(product => `
                                    <div class="bg-gray-800 rounded-lg overflow-hidden">
                                        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                                        <div class="p-4">
                                            <h4 class="font-semibold mb-2">${product.name}</h4>
                                            <p class="text-gray-400 text-sm mb-3">${product.description}</p>
                                            <div class="flex justify-between items-center">
                                                <span class="text-yellow-400 font-bold text-lg">R$ ${product.price.toFixed(2)}</span>
                                                <button onclick="addToCart(${product.id})" class="bg-yellow-600 hover:bg-yellow-700 text-black px-3 py-1 rounded text-sm transition-colors">
                                                    Comprar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        ` : `
                            <div class="text-center py-12">
                                <i class="fas fa-store text-4xl text-gray-600 mb-4"></i>
                                <p class="text-gray-400">Nenhum produto disponível ainda</p>
                            </div>
                        `}
                    </div>

                    <!-- Schedule Tab -->
                    <div id="schedule-tab" class="barbershop-tab-content hidden">
                        <h3 class="text-2xl font-bold mb-6">Agendar Horário</h3>
                        
                        <div class="grid lg:grid-cols-3 gap-8">
                            <div class="lg:col-span-2">
                                <!-- Service Selection -->
                                <div class="bg-gray-800 rounded-lg p-6 mb-6">
                                    <h4 class="text-lg font-semibold mb-4">1. Escolha o Serviço</h4>
                                    <div class="grid md:grid-cols-2 gap-4" id="serviceSelection">
                                        <!-- Services will be loaded here -->
                                    </div>
                                </div>

                                <!-- Barber Selection -->
                                <div class="bg-gray-800 rounded-lg p-6 mb-6">
                                    <h4 class="text-lg font-semibold mb-4">2. Escolha o Profissional</h4>
                                    <div class="grid md:grid-cols-2 gap-4" id="barberSelection">
                                        <!-- Barbers will be loaded here -->
                                    </div>
                                </div>

                                <!-- Date Selection -->
                                <div class="bg-gray-800 rounded-lg p-6 mb-6">
                                    <h4 class="text-lg font-semibold mb-4">3. Escolha a Data</h4>
                                    <div class="grid grid-cols-7 gap-2" id="dateSelection">
                                        <!-- Dates will be loaded here -->
                                    </div>
                                </div>

                                <!-- Time Selection -->
                                <div class="bg-gray-800 rounded-lg p-6">
                                    <h4 class="text-lg font-semibold mb-4">4. Escolha o Horário</h4>
                                    <div class="grid grid-cols-4 gap-3" id="timeSelection">
                                        <!-- Times will be loaded here -->
                                    </div>
                                </div>
                            </div>

                            <!-- Booking Summary -->
                            <div>
                                <div class="bg-gray-800 rounded-lg p-6 sticky top-24">
                                    <h4 class="text-lg font-semibold mb-4">Resumo do Agendamento</h4>
                                    
                                    <div class="space-y-4 mb-6">
                                        <div id="selectedService" class="hidden">
                                            <div class="flex justify-between items-center">
                                                <span class="text-gray-400">Serviço:</span>
                                                <span id="serviceName" class="font-semibold"></span>
                                            </div>
                                            <div class="flex justify-between items-center">
                                                <span class="text-gray-400">Preço:</span>
                                                <span id="servicePrice" class="text-yellow-400 font-semibold"></span>
                                            </div>
                                        </div>

                                        <div id="selectedBarber" class="hidden">
                                            <div class="flex justify-between items-center">
                                                <span class="text-gray-400">Profissional:</span>
                                                <span id="barberName" class="font-semibold"></span>
                                            </div>
                                        </div>

                                        <div id="selectedDate" class="hidden">
                                            <div class="flex justify-between items-center">
                                                <span class="text-gray-400">Data:</span>
                                                <span id="dateName" class="font-semibold"></span>
                                            </div>
                                        </div>

                                        <div id="selectedTime" class="hidden">
                                            <div class="flex justify-between items-center">
                                                <span class="text-gray-400">Horário:</span>
                                                <span id="timeName" class="font-semibold"></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="border-t border-gray-700 pt-4 mb-6">
                                        <div class="flex justify-between items-center text-lg font-semibold">
                                            <span>Total:</span>
                                            <span id="totalPrice" class="text-yellow-400">R$ 0,00</span>
                                        </div>
                                    </div>

                                    <button id="confirmBooking" onclick="confirmBooking()" disabled class="w-full bg-gray-600 text-gray-400 py-3 rounded-lg font-semibold cursor-not-allowed">
                                        Confirmar Agendamento
                                    </button>

                                    <p class="text-gray-400 text-xs mt-3 text-center">
                                        Você pode cancelar até 2 horas antes do horário agendado
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Set current barbershop for booking
            currentBooking.barbershopId = id;
            
            showAppSection('barbershop-profile');
        }

        function scheduleWithBarber(barbershopId, barberId) {
            if (!currentUser) {
                showNotification('Faça login para agendar!', 'error');
                return;
            }
            
            // Pre-select the barber and switch to schedule tab
            currentBooking.barbershopId = barbershopId;
            currentBooking.barberId = barberId;
            
            showBarbershopTab('schedule');
            
            // Scroll to schedule tab
            setTimeout(() => {
                document.getElementById('schedule-tab').scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }

        function toggleFavorite(barbershopId) {
            if (!currentUser) {
                showNotification('Faça login para favoritar!', 'error');
                return;
            }

            const index = favorites.indexOf(barbershopId);
            if (index > -1) {
                favorites.splice(index, 1);
                showNotification('Removido dos favoritos!');
            } else {
                favorites.push(barbershopId);
                showNotification('Adicionado aos favoritos!');
            }

            loadBarbershopsList();
            loadFavoritesList();
        }

        function loadAppointmentsList() {
            const container = document.getElementById('appointmentsList');
            
            if (appointments.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-8">
                        <i class="fas fa-calendar-alt text-4xl text-gray-600 mb-4"></i>
                        <p class="text-gray-400">Nenhum agendamento encontrado</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = appointments.map(appointment => `
                <div class="bg-gray-700 rounded-lg p-4 mb-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <h4 class="font-semibold mb-1">${appointment.barbershop}</h4>
                            <p class="text-gray-400 text-sm mb-1">${appointment.barber} - ${appointment.service}</p>
                            <p class="text-yellow-400 text-sm">${formatDate(appointment.date)} às ${appointment.time}</p>
                        </div>
                        <div class="text-right">
                            <span class="bg-green-600 text-white px-2 py-1 rounded text-xs">${appointment.status}</span>
                            <button onclick="cancelAppointment(${appointment.id})" class="block mt-2 text-red-400 hover:text-red-300 text-sm">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function loadFavoritesList() {
            const container = document.getElementById('favoritesList');
            const favoriteBarbershops = barbershops.filter(b => favorites.includes(b.id));
            
            if (favoriteBarbershops.length === 0) {
                container.innerHTML = `
                    <div class="col-span-full text-center py-8">
                        <i class="fas fa-heart text-4xl text-gray-600 mb-4"></i>
                        <p class="text-gray-400">Nenhuma barbearia favorita ainda</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = favoriteBarbershops.map(barbershop => `
                <div class="barbershop-card rounded-lg overflow-hidden card-hover">
                    <img src="${barbershop.image}" alt="${barbershop.name}" class="h-32 w-full object-cover">
                    <div class="p-4">
                        <h4 class="font-semibold mb-2">${barbershop.name}</h4>
                        <p class="text-gray-400 text-sm mb-2">${barbershop.address}</p>
                        <div class="flex items-center mb-3">
                            <div class="star-rating mr-2 text-sm">
                                ${generateStars(barbershop.rating)}
                            </div>
                            <span class="text-sm text-gray-300">${barbershop.rating}</span>
                        </div>
                        <button onclick="viewBarbershop(${barbershop.id})" class="w-full bg-yellow-600 hover:bg-yellow-700 text-black py-2 rounded transition-colors">
                            Ver Perfil
                        </button>
                    </div>
                </div>
            `).join('');
        }

        function cancelAppointment(appointmentId) {
            appointments = appointments.filter(app => app.id !== appointmentId);
            loadAppointmentsList();
            showNotification('Agendamento cancelado!');
        }

        // Utility functions
        function generateStars(rating) {
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 !== 0;
            let stars = '';
            
            for (let i = 0; i < fullStars; i++) {
                stars += '<i class="fas fa-star"></i>';
            }
            
            if (hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            }
            
            const emptyStars = 5 - Math.ceil(rating);
            for (let i = 0; i < emptyStars; i++) {
                stars += '<i class="far fa-star"></i>';
            }
            
            return stars;
        }

        function formatDate(dateString) {
            const date = new Date(dateString + 'T00:00:00');
            return date.toLocaleDateString('pt-BR');
        }

        function showNotification(message, type = 'success') {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.className = `notification ${type} show`;
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Close modals when clicking outside
        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.classList.remove('active');
            }
        }
        
    (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'98e1b76433842749',t:'MTc2MDM4ODcwMS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();