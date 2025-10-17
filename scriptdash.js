// dasboard// 

      // Sample data
        const appointments = [
            { id: 1, client: "Marco Silva", service: "Corte + Barba", date: "2024-12-08", time: "09:00", status: "confirmed", price: 50, phone: "(11) 99999-1111" },
            { id: 2, client: "Roberto Costa", service: "Corte Clássico", date: "2024-12-08", time: "10:30", status: "pending", price: 35, phone: "(11) 99999-2222" },
            { id: 3, client: "Carlos Mendes", service: "Fade + Desenho", date: "2024-12-08", time: "14:00", status: "confirmed", price: 45, phone: "(11) 99999-3333" },
            { id: 4, client: "Pedro Santos", service: "Barba Completa", date: "2024-12-08", time: "15:30", status: "completed", price: 30, phone: "(11) 99999-4444" },
            { id: 5, client: "Lucas Oliveira", service: "Corte Social", date: "2024-12-08", time: "16:00", status: "cancelled", price: 35, phone: "(11) 99999-5555" },
            { id: 6, client: "André Costa", service: "Pompadour Moderno", date: "2024-12-09", time: "09:30", status: "pending", price: 55, phone: "(11) 99999-6666" },
            { id: 7, client: "Rafael Lima", service: "Undercut Moderno", date: "2024-12-09", time: "11:00", status: "confirmed", price: 50, phone: "(11) 99999-7777" }
        ];

        let cuts = [
            { 
                id: 1, 
                name: "Fade Clássico", 
                price: 45, 
                duration: 35, 
                category: "classico",
                description: "Corte degradê tradicional com acabamento impecável",
                image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                rating: 4.9,
                popular: true
            },
            { 
                id: 2, 
                name: "Pompadour Moderno", 
                price: 55, 
                duration: 40, 
                category: "moderno",
                description: "Estilo vintage com toque contemporâneo",
                image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                rating: 4.8,
                popular: false
            },
            { 
                id: 3, 
                name: "Barba Completa", 
                price: 30, 
                duration: 25, 
                category: "barba",
                description: "Aparar, modelar e finalizar com produtos premium",
                image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                rating: 4.9,
                popular: true
            },
            { 
                id: 4, 
                name: "Undercut Moderno", 
                price: 50, 
                duration: 30, 
                category: "moderno",
                description: "Corte lateral raspado com volume no topo",
                image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                rating: 4.7,
                popular: false
            },
            { 
                id: 5, 
                name: "Corte Social", 
                price: 35, 
                duration: 25, 
                category: "classico",
                description: "Elegante e profissional para o dia a dia",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                rating: 4.6,
                popular: false
            },
            { 
                id: 6, 
                name: "Buzz Cut Estilizado", 
                price: 25, 
                duration: 15, 
                category: "moderno",
                description: "Corte bem baixo com detalhes nas laterais",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                rating: 4.5,
                popular: false
            },
            { 
                id: 7, 
                name: "Barba + Bigode", 
                price: 35, 
                duration: 30, 
                category: "barba",
                description: "Cuidado completo da barba com modelagem do bigode",
                image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                rating: 4.8,
                popular: true
            },
            { 
                id: 8, 
                name: "Corte Executivo", 
                price: 40, 
                duration: 30, 
                category: "classico",
                description: "Sofisticado e conservador para ambientes corporativos",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                rating: 4.7,
                popular: false
            }
        ];

        let currentFilter = 'all';

        const clients = [
            { id: 1, name: "Marco Silva", phone: "(11) 99999-1111", lastCut: "2024-12-01", totalSpent: 450 },
            { id: 2, name: "Roberto Costa", phone: "(11) 99999-2222", lastCut: "2024-11-28", totalSpent: 280 },
            { id: 3, name: "Carlos Mendes", phone: "(11) 99999-3333", lastCut: "2024-12-05", totalSpent: 320 }
        ];

        // Navigation
        function showSection(sectionId) {
            // Hide all sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.add('hidden');
                section.classList.remove('active');
            });
            
            // Show selected section
            const targetSection = document.getElementById(sectionId);
            targetSection.classList.remove('hidden');
            targetSection.classList.add('active');
            
            // Update navigation
            document.querySelectorAll('.nav-item').forEach(btn => {
                btn.classList.remove('active');
                btn.classList.add('text-slate-300');
                btn.classList.remove('text-white');
            });
            
            event.target.classList.add('active', 'text-white');
            event.target.classList.remove('text-slate-300');
            
            // Load section-specific data
            if (sectionId === 'appointments') {
                renderAppointments();
            } else if (sectionId === 'services') {
                renderCuts();
            } else if (sectionId === 'clients') {
                renderClients();
            }
        }

        // Render functions
        function renderAppointments() {
            const appointmentsList = document.getElementById('appointmentsList');
            
            const getStatusColor = (status) => {
                switch(status) {
                    case 'confirmed': return 'text-green-400 bg-green-400/10';
                    case 'pending': return 'text-yellow-400 bg-yellow-400/10';
                    case 'completed': return 'text-blue-400 bg-blue-400/10';
                    case 'cancelled': return 'text-red-400 bg-red-400/10';
                    default: return 'text-slate-400 bg-slate-400/10';
                }
            };
            
            const getStatusText = (status) => {
                switch(status) {
                    case 'confirmed': return 'Confirmado';
                    case 'pending': return 'Pendente';
                    case 'completed': return 'Concluído';
                    case 'cancelled': return 'Cancelado';
                    default: return status;
                }
            };
            
            appointmentsList.innerHTML = appointments.map(appointment => `
                <div class="appointment-card p-5 rounded-xl border border-slate-700/50">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-black font-bold text-lg">
                                ${appointment.client.charAt(0)}
                            </div>
                            <div>
                                <p class="font-semibold text-white text-lg">${appointment.client}</p>
                                <p class="text-slate-400 mb-1">${appointment.service}</p>
                                <p class="text-xs text-slate-500">${appointment.phone}</p>
                            </div>
                        </div>
                        
                        <div class="text-center">
                            <p class="font-bold text-lg text-white">${appointment.time}</p>
                            <p class="text-sm text-slate-400">${appointment.date}</p>
                            <p class="text-sm font-medium text-amber-400 mt-1">R$ ${appointment.price}</p>
                        </div>
                        
                        <div class="flex flex-col items-end gap-3">
                            <span class="px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}">
                                ${getStatusText(appointment.status)}
                            </span>
                            
                            <div class="flex gap-2">
                                ${appointment.status === 'pending' ? `
                                    <button onclick="confirmAppointment(${appointment.id})" class="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-xs transition-colors">
                                        Confirmar
                                    </button>
                                ` : ''}
                                
                                ${appointment.status === 'confirmed' ? `
                                    <button onclick="completeAppointment(${appointment.id})" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs transition-colors">
                                        Concluir
                                    </button>
                                ` : ''}
                                
                                ${appointment.status !== 'completed' && appointment.status !== 'cancelled' ? `
                                    <button onclick="cancelAppointment(${appointment.id})" class="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-xs transition-colors">
                                        Cancelar
                                    </button>
                                ` : ''}
                                
                                <button onclick="viewAppointmentDetails(${appointment.id})" class="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded text-xs transition-colors">
                                    Detalhes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function renderCuts() {
            const cutsGallery = document.getElementById('cutsGallery');
            const filteredCuts = currentFilter === 'all' ? cuts : cuts.filter(cut => cut.category === currentFilter);
            
            cutsGallery.innerHTML = filteredCuts.map(cut => `
                <div class="premium-card card-hover rounded-2xl overflow-hidden relative group">
                    ${cut.popular ? '<div class="absolute top-4 left-4 z-10 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">Popular</div>' : ''}
                    
                    <div class="relative overflow-hidden">
                        <img src="${cut.image}" alt="${cut.name}" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110">
                        
                        <!-- Overlay com informações -->
                        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div class="absolute bottom-4 left-4 right-4">
                                <p class="text-white text-sm mb-2">${cut.description}</p>
                                <div class="flex items-center gap-2 mb-3">
                                    <div class="flex text-yellow-400 text-sm">
                                        ${'★'.repeat(Math.floor(cut.rating))}${'☆'.repeat(5 - Math.floor(cut.rating))}
                                    </div>
                                    <span class="text-white text-sm">${cut.rating}</span>
                                </div>

                            </div>
                        </div>
                        
                        <!-- Botões de ação -->
                        <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button onclick="editCut(${cut.id})" class="w-8 h-8 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                </svg>
                            </button>
                            <button onclick="deleteCut(${cut.id})" class="w-8 h-8 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-500/90 transition-colors">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Informações do corte -->
                    <div class="p-5">
                        <div class="flex justify-between items-start mb-3">
                            <h3 class="text-lg font-bold text-white">${cut.name}</h3>
                            <span class="text-2xl font-bold stat-number">R$ ${cut.price}</span>
                        </div>
                        
                        <div class="flex items-center justify-between text-sm">
                            <div class="flex items-center gap-2 text-slate-400">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                                ${cut.duration} min
                            </div>
                            <div class="flex items-center gap-1">
                                <div class="flex text-yellow-400 text-xs">★★★★★</div>
                                <span class="text-slate-400 text-xs">${cut.rating}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Filter functions
        function filterCuts(category) {
            currentFilter = category;
            
            // Update filter buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active', 'bg-amber-600', 'text-black');
                btn.classList.add('bg-slate-700', 'text-white');
            });
            
            event.target.classList.add('active', 'bg-amber-600', 'text-black');
            event.target.classList.remove('bg-slate-700', 'text-white');
            
            renderCuts();
        }

        function renderClients() {
            const clientsTable = document.getElementById('clientsTable');
            clientsTable.innerHTML = clients.map(client => `
                <tr class="border-b border-slate-700">
                    <td class="p-4">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                ${client.name.charAt(0)}
                            </div>
                            <span class="font-medium">${client.name}</span>
                        </div>
                    </td>
                    <td class="p-4 text-slate-300">${client.phone}</td>
                    <td class="p-4 text-slate-300">${client.lastCut}</td>
                    <td class="p-4 text-green-400 font-medium">R$ ${client.totalSpent}</td>
                    <td class="p-4">
                        <div class="flex gap-2">
                            <button onclick="viewClient(${client.id})" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors">
                                Ver
                            </button>
                            <button onclick="editClient(${client.id})" class="px-3 py-1 bg-amber-600 hover:bg-amber-700 rounded text-sm transition-colors">
                                Editar
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }

        // Modal functions
        function openNewAppointmentModal() {
            document.getElementById('newAppointmentModal').classList.remove('hidden');
            document.getElementById('newAppointmentModal').classList.add('flex');
        }

        function openNewCutModal() {
            document.getElementById('newCutModal').classList.remove('hidden');
            document.getElementById('newCutModal').classList.add('flex');
        }

        function openNewClientModal() {
            // Implementation for new client modal
            showNotification('Funcionalidade em desenvolvimento', 'info');
        }

        function closeModal(modalId) {
            document.getElementById(modalId).classList.add('hidden');
            document.getElementById(modalId).classList.remove('flex');
        }

        // Form handlers
        function createAppointment(event) {
            event.preventDefault();
            showNotification('Agendamento criado com sucesso!', 'success');
            closeModal('newAppointmentModal');
            renderAppointments();
        }

        function createCut(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            
            const newCut = {
                id: cuts.length + 1,
                name: formData.get('name'),
                price: parseFloat(formData.get('price')),
                duration: parseInt(formData.get('duration')),
                category: formData.get('category'),
                description: formData.get('description'),
                image: formData.get('image'),
                rating: 4.5,
                popular: false
            };
            
            cuts.push(newCut);
            showNotification('Corte adicionado com sucesso!', 'success');
            closeModal('newCutModal');
            renderCuts();
            event.target.reset();
        }

        // Action functions
        function confirmAppointment(id) {
            const appointment = appointments.find(a => a.id === id);
            if (appointment) {
                appointment.status = 'confirmed';
                showNotification(`Agendamento de ${appointment.client} confirmado!`, 'success');
                renderAppointments();
            }
        }

        function completeAppointment(id) {
            const appointment = appointments.find(a => a.id === id);
            if (appointment) {
                appointment.status = 'completed';
                showNotification(`Atendimento de ${appointment.client} concluído!`, 'success');
                renderAppointments();
            }
        }

        function cancelAppointment(id) {
            const appointment = appointments.find(a => a.id === id);
            showConfirmDialog(`Tem certeza que deseja cancelar o agendamento de ${appointment.client}?`, () => {
                appointment.status = 'cancelled';
                showNotification('Agendamento cancelado', 'success');
                renderAppointments();
            });
        }

        function viewAppointmentDetails(id) {
            const appointment = appointments.find(a => a.id === id);
            showNotification(`Visualizando detalhes de ${appointment.client}...`, 'info');
        }

        function refreshAppointments() {
            showNotification('Atualizando lista de agendamentos...', 'info');
            renderAppointments();
        }

        function editCut(id) {
            showNotification('Editando corte...', 'info');
        }

        function deleteCut(id) {
            showConfirmDialog('Tem certeza que deseja excluir este corte?', () => {
                cuts = cuts.filter(cut => cut.id !== id);
                showNotification('Corte excluído', 'success');
                renderCuts();
            });
        }

        function bookCut(id) {
            const cut = cuts.find(c => c.id === id);
            showNotification(`Agendando ${cut.name}...`, 'info');
            openNewAppointmentModal();
        }

        function viewClient(id) {
            showNotification('Visualizando cliente...', 'info');
        }

        function editClient(id) {
            showNotification('Editando cliente...', 'info');
        }

        // Notification system
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white z-50 fade-in ${
                type === 'success' ? 'bg-green-600' : 
                type === 'error' ? 'bg-red-600' : 
                'bg-blue-600'
            }`;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }

        // Confirmation dialog system
        function showConfirmDialog(message, onConfirm) {
            const overlay = document.createElement('div');
            overlay.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
            
            overlay.innerHTML = `
                <div class="bg-slate-800 rounded-xl p-6 max-w-sm w-full mx-4">
                    <h3 class="text-lg font-bold mb-4">Confirmação</h3>
                    <p class="text-slate-300 mb-6">${message}</p>
                    <div class="flex gap-3">
                        <button onclick="this.closest('.fixed').remove()" class="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors">
                            Cancelar
                        </button>
                        <button onclick="this.closest('.fixed').remove(); (${onConfirm})()" class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
                            Confirmar
                        </button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(overlay);
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            renderAppointments();
            renderCuts();
            renderClients();
        });