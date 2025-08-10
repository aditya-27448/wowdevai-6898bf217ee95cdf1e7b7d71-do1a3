export function initChatbot() {
  const chatToggle = document.getElementById('chat-toggle');
  const chatWindow = document.getElementById('chat-window');
  const chatClose = document.getElementById('chat-close');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  const chatMessages = document.getElementById('chat-messages');
  const quickReplies = document.querySelectorAll('.quick-reply');

  // FAQ Data
  const faqData = {
    'admission process': 'Our admission process includes: 1) Online application 2) Entrance test (if applicable) 3) Document verification 4) Fee payment. Visit our admissions page for detailed information.',
    'fee structure': 'Annual tuition fees vary by program: B.Tech - ₹1,50,000, M.Tech - ₹80,000, MBA - ₹1,20,000. Additional fees for hostel and other facilities. Contact admissions for complete fee structure.',
    'placement records': 'TAT has achieved 95% placement rate with average package of ₹4.5 LPA. Top recruiters include TCS, Infosys, Wipro, Microsoft, Amazon. Visit our placements page for detailed statistics.',
    'library facilities': 'Our library has 50,000+ books, digital resources, 24/7 access for hostelers, and quiet study zones. Library card required for book borrowing.',
    'hostel facilities': 'Separate hostels for boys and girls with modern amenities, Wi-Fi, mess facilities, security, and recreational areas. Hostel fees are separate from tuition fees.',
    'contact details': 'Address: F2, Chandaka Industrial Estate, Bhubaneswar, Odisha 751024. Phone: +91 674-2720001. Email: info@trident.ac.in',
    'courses offered': 'We offer B.Tech (CSE, ECE, ME, CE), M.Tech, MBA, MCA programs. Each program has industry-relevant curriculum with practical exposure.',
    'scholarship': 'Merit-based scholarships available for top performers. Financial aid for economically weaker sections. Sports scholarships for state/national level players.'
  };

  function toggleChat() {
    chatWindow.classList.toggle('hidden');
  }

  function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `mb-3 ${isUser ? 'text-right' : ''}`;
    messageDiv.innerHTML = `
      <div class="inline-block p-2 rounded-lg text-sm max-w-xs ${
        isUser 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-100 text-gray-800'
      }">
        ${message}
      </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleUserQuery(query) {
    addMessage(query, true);
    
    // Simple keyword matching
    const lowerQuery = query.toLowerCase();
    let response = "I'm sorry, I don't have specific information about that. Please contact our office at +91 674-2720001 or email info@trident.ac.in for detailed assistance.";
    
    for (const [key, value] of Object.entries(faqData)) {
      if (lowerQuery.includes(key) || key.includes(lowerQuery.split(' ')[0])) {
        response = value;
        break;
      }
    }
    
    // Add some common keyword checks
    if (lowerQuery.includes('fee') || lowerQuery.includes('cost') || lowerQuery.includes('price')) {
      response = faqData['fee structure'];
    } else if (lowerQuery.includes('admission') || lowerQuery.includes('apply')) {
      response = faqData['admission process'];
    } else if (lowerQuery.includes('placement') || lowerQuery.includes('job') || lowerQuery.includes('career')) {
      response = faqData['placement records'];
    } else if (lowerQuery.includes('course') || lowerQuery.includes('program') || lowerQuery.includes('degree')) {
      response = faqData['courses offered'];
    }
    
    setTimeout(() => {
      addMessage(response);
    }, 500);
  }

  // Event listeners
  chatToggle.addEventListener('click', toggleChat);
  chatClose.addEventListener('click', toggleChat);

  chatSend.addEventListener('click', () => {
    const query = chatInput.value.trim();
    if (query) {
      handleUserQuery(query);
      chatInput.value = '';
    }
  });

  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = chatInput.value.trim();
      if (query) {
        handleUserQuery(query);
        chatInput.value = '';
      }
    }
  });

  quickReplies.forEach(button => {
    button.addEventListener('click', () => {
      const query = button.getAttribute('data-query');
      handleUserQuery(query);
    });
  });
}