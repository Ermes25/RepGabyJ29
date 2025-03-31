document.addEventListener('DOMContentLoaded', () => {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotBox = document.getElementById('chatbot-box');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-message');
  
    // Limpiar mensajes iniciales
    chatbotMessages.innerHTML = '';
  
    // Lista de opciones disponibles
    const optionsList = `
      <ul class="options-list">
        <li><strong>servicios</strong> - Información sobre nuestros servicios</li>
        <li><strong>horarios</strong> - Horarios de atención</li>
        <li><strong>ubicacion</strong> - Dónde encontrarnos</li>
        <li><strong>contacto</strong> - Formas de contactarnos</li>
      </ul>
    `;
  
    // Respuestas predefinidas del chatbot
    const botResponses = {
      'hola': '¡Hola! ¿En qué puedo ayudarte hoy?',
      'servicios': 'Ofrecemos servicios de reparación de computadoras, mantenimiento preventivo e instalación de software.',
      'horario': 'Nuestro horario de atención es de lunes a viernes de 24/7 y sábados de 8:00 AM a 3:00 PM.',
      'ubicacion': 'Estamos ubicados enurbanizacion villa sol, calle 8b Casa b7-14. Puedes encontrarnos en la sección de contacto.',
      'contacto': 'Puedes contactarnos al teléfono  8983-4281 o enviarnos un correo a om4107521@gmail.com . También puedes usar la sección de contacto en nuestra web.',
      'gracias': '¡De nada! Estamos para servirte.',
      'adios': '¡Hasta pronto! No dudes en contactarnos si necesitas ayuda adicional.'
    };
  
    // Función para mostrar/ocultar el chatbot
    chatbotToggle.addEventListener('click', () => {
      chatbotBox.classList.toggle('active');
      
      // Si el chatbot se está abriendo y no hay mensajes, mostrar mensaje de bienvenida
      if (chatbotBox.classList.contains('active') && chatbotMessages.children.length === 0) {
        showWelcomeMessage();
      }
    });
  
    chatbotClose.addEventListener('click', () => {
      chatbotBox.classList.remove('active');
    });
  
    // Función para mostrar mensaje de bienvenida con opciones
    function showWelcomeMessage() {
      addMessageHTML(`
        <p>¡Hola! Soy Lira ¿En qué puedo ayudarte hoy?</p>
        <p>Puedes preguntar sobre:</p>
        ${optionsList}
      `);
    }
  
    // Función para mostrar solo la lista de opciones
    function showOptions() {
      addMessageHTML(`
        <p>Puedes preguntar sobre:</p>
        ${optionsList}
      `);
    }
  
    // Función para añadir mensajes al chat (texto plano)
    function addMessage(message, isUser = false) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
      
      const messageContent = document.createElement('div');
      messageContent.className = 'message-content';
      
      const messageParagraph = document.createElement('p');
      messageParagraph.textContent = message;
      
      messageContent.appendChild(messageParagraph);
      messageDiv.appendChild(messageContent);
      chatbotMessages.appendChild(messageDiv);
      
      // Scroll al último mensaje
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
  
    // Función para añadir mensajes con HTML al chat
    function addMessageHTML(htmlContent, isUser = false) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
      
      const messageContent = document.createElement('div');
      messageContent.className = 'message-content';
      messageContent.innerHTML = htmlContent;
      
      messageDiv.appendChild(messageContent);
      chatbotMessages.appendChild(messageDiv);
      
      // Scroll al último mensaje
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
  
    // Función para mostrar indicador de escritura
    function showTypingIndicator() {
      const typingDiv = document.createElement('div');
      typingDiv.className = 'typing-indicator';
      typingDiv.id = 'typing-indicator';
      
      for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        typingDiv.appendChild(dot);
      }
      
      chatbotMessages.appendChild(typingDiv);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      
      return typingDiv;
    }
  
    // Función para procesar la entrada del usuario y generar respuesta
    function processUserInput(input) {
      input = input.toLowerCase().trim();
      
      // Mostrar indicador de escritura
      const typingIndicator = showTypingIndicator();
      
      // Simular tiempo de respuesta
      setTimeout(() => {
        // Eliminar indicador de escritura
        typingIndicator.remove();
        
        // Verificar si el usuario respondió "sí" a la pregunta de ayuda adicional
        if (input === 'si' || input === 'sí') {
          showOptions();
          return;
        }
        
        // Buscar respuesta
        let response = null;
        
        // Verificar palabras clave en la entrada del usuario
        for (const [keyword, reply] of Object.entries(botResponses)) {
          if (input.includes(keyword)) {
            response = reply;
            break;
          }
        }
        
        // Si no hay coincidencias exactas, intentar con respuestas más generales
        if (!response) {
          if (input.includes('precio') || input.includes('costo') || input.includes('valor')) {
            response = botResponses['precios'];
          } else if (input.includes('donde') || input.includes('direccion')) {
            response = botResponses['ubicacion'];
          } else if (input.includes('telefono') || input.includes('correo') || input.includes('email')) {
            response = botResponses['contacto'];
          } else if (input.includes('reparacion') || input.includes('arreglo') || input.includes('servicio')) {
            response = botResponses['servicios'];
          } else if (input.includes('hora') || input.includes('cuando') || input.includes('dias')) {
            response = botResponses['horario'];
          } else {
            // Si no se encuentra ninguna respuesta adecuada
            addMessageHTML(`
              <p>Lo siento, no entiendo tu pregunta. ¿Podrías seleccionar una de estas opciones?</p>
              ${optionsList}
            `);
            return;
          }
        }
        
        // Añadir respuesta del bot
        addMessage(response);
        
        // Preguntar si hay algo más en que podamos ayudar
        setTimeout(() => {
          addMessage("¿Hay algo más en lo que pueda ayudarte?");
        }, 1000);
      }, 1000); // Simular tiempo de respuesta de 1 segundo
    }
  
    // Evento para enviar mensaje
    function sendMessage() {
      const message = userInput.value.trim();
      if (message) {
        addMessage(message, true);
        userInput.value = '';
        processUserInput(message);
      }
    }
  
    sendButton.addEventListener('click', sendMessage);
    
    // Enviar mensaje al presionar Enter
    userInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  });