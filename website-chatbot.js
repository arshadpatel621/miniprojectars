// EduCartoon AI Study Assistant Chatbot
// Enhanced version with comprehensive educational responses

(function() {
    'use strict';

    // Enhanced educational responses for students
    const responses = {
        // Mathematics responses
        math: {
            general: "I'd love to help with math! 📊 What specific problem are you working on?\n\n• Algebra equations and inequalities\n• Geometry theorems and proofs\n• Calculus derivatives and integrals\n• Statistics and probability\n• Trigonometry functions\n• Number theory\n\nShare your question and I'll guide you step-by-step!",
            algebra: "Algebra can be fun! 🔢 I can help with:\n\n• Solving linear equations (ax + b = c)\n• Quadratic equations (ax² + bx + c = 0)\n• Factoring polynomials\n• Systems of equations\n• Graphing functions\n\nWhat algebra topic would you like to explore?",
            calculus: "Calculus concepts made simple! 📈 I can explain:\n\n• Limits and continuity\n• Derivatives and chain rule\n• Integration techniques\n• Applications of calculus\n• Differential equations\n\nWhat calculus problem are you working on?",
            geometry: "Geometry is all about shapes and space! 📐 Let me help with:\n\n• Triangle properties and theorems\n• Circle equations and properties\n• Area and perimeter calculations\n• Volume and surface area\n• Coordinate geometry\n\nWhat geometry concept do you need help with?"
        },

        // Science responses
        science: {
            general: "Science questions are exciting! 🔬 I can explain:\n\n• Physics concepts and laws\n• Chemistry reactions and formulas\n• Biology processes and systems\n• Earth science phenomena\n• Environmental science\n• Space and astronomy\n\nWhat science topic would you like to explore?",
            physics: "Physics explains how our world works! ⚡ I can help with:\n\n• Newton's laws of motion\n• Energy and momentum\n• Electricity and magnetism\n• Waves and optics\n• Thermodynamics\n• Modern physics concepts\n\nWhat physics concept interests you?",
            chemistry: "Chemistry is the science of matter! ⚗️ Let's explore:\n\n• Atomic structure and periodic table\n• Chemical bonds and reactions\n• Stoichiometry and molarity\n• Acids, bases, and pH\n• Organic chemistry basics\n• Laboratory safety\n\nWhat chemistry topic can I explain?",
            biology: "Biology is the study of life! 🧬 I can help with:\n\n• Cell structure and function\n• Genetics and DNA\n• Evolution and natural selection\n• Ecosystems and biodiversity\n• Human anatomy and physiology\n• Plant biology\n\nWhat biological concept interests you?"
        },

        // Programming responses
        programming: {
            general: "Programming help is here! 💻 I can assist with:\n\n• Python, JavaScript, Java, C++\n• HTML, CSS, and web development\n• Debugging and troubleshooting\n• Algorithm explanations\n• Data structures\n• Software design principles\n\nWhat coding challenge are you facing?",
            python: "Python programming made easy! 🐍 I can help with:\n\n• Basic syntax and data types\n• Functions and modules\n• Object-oriented programming\n• File handling and databases\n• Web frameworks (Django, Flask)\n• Data analysis with pandas\n\nWhat Python concept do you need help with?",
            javascript: "JavaScript for modern web development! 🌐 Let's cover:\n\n• Variables and functions\n• DOM manipulation\n• Async programming (promises, async/await)\n• React.js and frameworks\n• Node.js backend development\n• API integration\n\nWhat JavaScript topic interests you?",
            web: "Web development fundamentals! 🎨 I can explain:\n\n• HTML structure and semantics\n• CSS styling and layouts\n• Responsive design principles\n• JavaScript interactivity\n• Backend and frontend integration\n• Web accessibility\n\nWhat web development concept do you want to learn?"
        },

        // Study techniques and tips
        study: {
            general: "Great question about studying! 🎯 Here are proven techniques:\n\n• Pomodoro Technique (25-min focused sessions)\n• Active recall and spaced repetition\n• Mind mapping and visual learning\n• Practice testing and self-assessment\n• Study groups and peer learning\n• Time management strategies\n\nWhat subject are you studying for?",
            tips: "Effective study strategies! 📚 Try these methods:\n\n• Break large topics into smaller chunks\n• Use multiple senses (visual, auditory, kinesthetic)\n• Teach concepts to someone else\n• Create summaries and flashcards\n• Take regular breaks and stay hydrated\n• Find your optimal study environment\n\nWhat specific study challenge are you facing?",
            exam: "Exam preparation strategies! 📝 Here's how to succeed:\n\n• Create a study schedule weeks in advance\n• Review past exams and practice questions\n• Form study groups with classmates\n• Get adequate sleep before exams\n• Use stress management techniques\n• Review key concepts, don't cram\n\nWhat type of exam are you preparing for?"
        },

        // Homework assistance
        homework: {
            general: "I'm here to guide your learning! 📚 Instead of giving direct answers, I'll help you understand concepts.\n\n• Break down complex problems step-by-step\n• Explain underlying principles\n• Provide similar examples\n• Suggest study resources\n• Help identify knowledge gaps\n\nWhat subject is your homework in? Let's work through it together!",
            approach: "Let's approach your homework systematically! 🔍\n\n1. First, identify what the problem is asking\n2. List what information you already have\n3. Determine what concepts apply\n4. Break it into smaller, manageable steps\n5. Work through each step carefully\n6. Check your answer for reasonableness\n\nWhat specific homework question needs guidance?"
        },

        // General help and greetings
        help: {
            general: "I'm your AI study assistant! 🤖 I can help with:\n\n• Math problem solving and explanations\n• Science concepts and experiments\n• Programming and computer science\n• Study strategies and techniques\n• Homework guidance and support\n• Exam preparation tips\n\nWhat academic question can I help you with today?",
            features: "Here's what I can do for you! ✨\n\n• Explain complex concepts simply\n• Provide step-by-step problem solving\n• Suggest effective study methods\n• Offer practice problems\n• Help with research and projects\n• Give motivational study tips\n\nI'm designed to help you learn, not just give answers!"
        },

        // Default and fallback responses
        default: {
            general: "Hi! I'm here to help with your studies! 🎓 I can assist with math, science, programming, study tips, and homework guidance.\n\nWhat academic question can I help you with?",
            encouragement: "Learning is a journey, and I'm here to support you! 🌟 Don't worry if something seems difficult - we can break it down together.\n\nWhat would you like to learn about today?",
            clarification: "I want to make sure I give you the most helpful response! 🤔 Could you provide more details about:\n\n• What subject you're working on\n• The specific topic or problem\n• What part is confusing you\n• Your current grade level (if relevant)\n\nThe more specific you are, the better I can help!"
        }
    };

    // API configuration
    const API_URL = 'http://localhost:3000/api';
    
    // Enhanced ChatGPT API integration with fallback
    async function getSmartResponse(message) {
        console.log('🎯 Getting response for message:', message);
        
        if (!message || message.trim() === '') {
            console.log('⚠️ Empty message received');
            return "Hello! How can I help you today?";
        }
        
        const msg = message.toLowerCase().trim();
        console.log('🔄 Processing message:', msg);
        
        // Try to use backend API first
        try {
            const response = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Got API response:', data.source);
                return data.response;
            } else {
                throw new Error(`HTTP ${response.status}`);
            }
        } catch (error) {
            console.log('⚠️ API unavailable, using fallback:', error.message);
            return getFallbackResponse(message);
        }
    }
    
    // Fallback response function for when API is unavailable
    function getFallbackResponse(message) {
        const msg = message.toLowerCase().trim();
        console.log('🔄 Getting fallback response for:', msg);
        
        // Greetings and basic conversation
        if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey') || msg === 'h') {
            const greetings = [
                "Hello! How can I assist you today?",
                "Hi there! What can I help you with?",
                "Hey! Great to meet you. What's on your mind?",
                "Hello! I'm here to help with whatever you need."
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }
        
        // Personal questions
        if (msg.includes('how are you') || msg.includes('how r u')) {
            return "I'm doing well, thank you for asking! I'm an AI assistant, so I don't have feelings in the traditional sense, but I'm functioning properly and ready to help you with anything you need. How are you doing today?";
        }
        
        if (msg.includes('who are you') || msg.includes('what are you') || msg.includes('about yourself')) {
            return "I'm an AI assistant designed to help with a wide variety of topics and questions. I can assist with academic subjects, creative projects, general knowledge, problem-solving, and casual conversation. Think of me as a helpful digital companion that's here to chat and assist however I can. What would you like to know or discuss?";
        }
        
        // Creative and image generation requests
        if ((msg.includes('create') || msg.includes('make') || msg.includes('generate')) && (msg.includes('image') || msg.includes('picture') || msg.includes('photo') || msg.includes('drawing'))) {
            return "I can't directly create images, but I can definitely help you with image creation! Here are some great options:\n\n• **AI Image Generators**: DALL-E, Midjourney, Stable Diffusion, or Bing Image Creator\n• **Design Tools**: Canva, GIMP, or Adobe Creative Suite\n• **Prompt Writing**: I can help you write detailed prompts for better AI-generated results\n\nWhat kind of image are you looking to create? I can help you craft the perfect prompt or suggest the best tools for your project.";
        }
        
        // Writing and content creation
        if ((msg.includes('write') || msg.includes('create') || msg.includes('make')) && (msg.includes('story') || msg.includes('essay') || msg.includes('content') || msg.includes('text'))) {
            return "I'd be happy to help you with writing! I can assist with:\n\n• Creative stories and narratives\n• Essays and academic writing\n• Blog posts and articles\n• Business content and emails\n• Poetry and creative writing\n• Editing and improving existing text\n\nWhat type of writing project are you working on? Let me know the topic, style, or any specific requirements you have in mind.";
        }
        
        // Weather questions
        if (msg.includes('weather') || msg.includes('temperature') || msg.includes('rain') || msg.includes('sunny')) {
            return "I don't have access to real-time weather data, but I'd recommend checking:\n\n• **Weather.com** or **AccuWeather** for detailed forecasts\n• **Your phone's weather app** for location-based updates\n• **Local news websites** for regional weather information\n\nIs there anything else I can help you with regarding weather-related topics or planning?";
        }
        
        // News and current events
        if (msg.includes('news') || msg.includes('current events') || msg.includes('latest') || msg.includes('today')) {
            return "I don't have access to real-time news or current events, as my knowledge has a cutoff date and I can't browse the internet. For the latest news, I'd recommend:\n\n• **Reputable news websites**: BBC, Reuters, AP News, CNN, etc.\n• **News aggregators**: Google News, Apple News\n• **Local news sources** for regional updates\n\nIs there a particular topic or type of news you're interested in? I might be able to provide some general background information.";
        }
        
        // Math and calculations
        if (msg.includes('calculate') || msg.includes('math') || msg.includes('solve') || /\d+[+\-*\/]\d+/.test(msg)) {
            if (msg.includes('what is') || msg.includes('calculate')) {
                // Try to extract simple math expressions
                const mathMatch = msg.match(/(\d+)\s*([+\-*\/])\s*(\d+)/);
                if (mathMatch) {
                    const [, a, op, b] = mathMatch;
                    const numA = parseInt(a);
                    const numB = parseInt(b);
                    let result;
                    switch (op) {
                        case '+': result = numA + numB; break;
                        case '-': result = numA - numB; break;
                        case '*': result = numA * numB; break;
                        case '/': result = numA / numB; break;
                    }
                    return `${numA} ${op} ${numB} = ${result}`;
                }
            }
            return "I can help with math problems! For complex calculations, you might want to use a calculator or math software, but I can assist with:\n\n• Basic arithmetic and algebra\n• Explaining mathematical concepts\n• Step-by-step problem solving\n• Geometry and trigonometry\n\nWhat specific math problem are you working on?";
        }
        
        // Programming and coding
        if (msg.includes('code') || msg.includes('program') || msg.includes('javascript') || msg.includes('python') || msg.includes('html') || msg.includes('css')) {
            return "I'd be happy to help with programming! I can assist with:\n\n• Writing code in various languages (Python, JavaScript, HTML/CSS, etc.)\n• Debugging and troubleshooting\n• Explaining programming concepts\n• Code review and optimization\n• Algorithm design and data structures\n\nWhat programming language or specific coding challenge are you working on?";
        }
        
        // Science questions
        if (msg.includes('science') || msg.includes('physics') || msg.includes('chemistry') || msg.includes('biology') || msg.includes('explain')) {
            return "I love science questions! I can help explain concepts in:\n\n• Physics (mechanics, thermodynamics, electromagnetism, etc.)\n• Chemistry (atomic structure, reactions, organic chemistry, etc.)\n• Biology (cell biology, genetics, ecology, anatomy, etc.)\n• Earth science and astronomy\n• Mathematics and statistics\n\nWhat scientific concept would you like to explore or understand better?";
        }
        
        // Study and learning
        if (msg.includes('study') || msg.includes('learn') || msg.includes('exam') || msg.includes('homework') || msg.includes('school')) {
            return "I'm here to help with your studies! I can assist with:\n\n• Explaining difficult concepts in simple terms\n• Creating study guides and summaries\n• Practice problems and examples\n• Study techniques and time management\n• Exam preparation strategies\n\nWhat subject or topic are you working on? I'm ready to help you understand it better!";
        }
        
        // Fun and entertainment
        if (msg.includes('joke') || msg.includes('funny') || msg.includes('entertain')) {
            const jokes = [
                "Why don't scientists trust atoms? Because they make up everything!",
                "Why did the math book look so sad? Because it was full of problems!",
                "What do you call a fake noodle? An impasta!",
                "Why don't eggs tell jokes? They'd crack each other up!"
            ];
            return jokes[Math.floor(Math.random() * jokes.length)] + "\n\nWould you like to hear another joke or chat about something else?";
        }
        
        // Positive responses
        if (msg.includes('good') || msg.includes('great') || msg.includes('awesome') || msg.includes('excellent') || msg.includes('perfect')) {
            return "That's wonderful to hear! I'm glad things are going well for you. Is there anything I can help you with or would you like to chat about something specific?";
        }
        
        // Gratitude
        if (msg.includes('thank') || msg.includes('thanks') || msg.includes('appreciate')) {
            return "You're very welcome! I'm always happy to help. Feel free to ask me anything else whenever you need assistance.";
        }
        
        // Yes/No responses
        if (msg === 'yes' || msg === 'yeah' || msg === 'yep' || msg === 'y') {
            return "Great! What would you like to do or discuss?";
        }
        if (msg === 'no' || msg === 'nope' || msg === 'nah' || msg === 'n') {
            return "No problem! Is there something else I can help you with?";
        }
        
        // Questions starting with question words
        if (msg.startsWith('what') || msg.startsWith('how') || msg.startsWith('why') || msg.startsWith('when') || msg.startsWith('where') || msg.startsWith('who')) {
            return `That's a great question! You asked: "${message}"\n\nI'd be happy to help answer that. Could you provide a bit more context or let me know what specific aspect you'd like me to focus on? The more details you can share, the better I can assist you with a comprehensive answer.`;
        }
        
        // General conversation starters
        const conversationStarters = [
            `Interesting! You mentioned: "${message}"\n\nI'd love to help you with that. Could you tell me a bit more about what you're looking for or what specific aspect you'd like to explore?`,
            `Thanks for sharing that with me! Regarding "${message}" - I'm here to help however I can. What would you like to know or discuss about this topic?`,
            `I see you're interested in discussing "${message}". I'm ready to help! Could you provide more details about what you'd like to know or explore?`,
            `That's an interesting topic! About "${message}" - I'd be happy to assist. What specific information or help are you looking for?`
        ];
        
        return conversationStarters[Math.floor(Math.random() * conversationStarters.length)];
    }

    // Enhanced message addition with better formatting
    function addMessage(content, sender) {
        const messagesDiv = document.getElementById('ai-messages');
        if (!messagesDiv) {
            console.error('Messages container not found');
            return;
        }

        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = 'margin-bottom: 16px; display: flex; align-items: flex-start; gap: 10px; animation: slideIn 0.3s ease-out;';
        
        if (sender === 'user') {
            messageDiv.style.justifyContent = 'flex-end';
            messageDiv.innerHTML = `
                <div style="
                    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
                    color: white;
                    padding: 12px 16px;
                    border-radius: 18px;
                    max-width: 85%;
                    font-size: 14px;
                    line-height: 1.5;
                    margin-left: 50px;
                    box-shadow: 0 2px 8px rgba(0,123,255,0.3);
                ">${escapeHtml(content)}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div style="
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #00c851 0%, #007e33 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 16px;
                    flex-shrink: 0;
                    box-shadow: 0 2px 8px rgba(0,200,81,0.3);
                ">🤖</div>
                <div style="
                    background: white;
                    color: #333;
                    border: 1px solid #e1e8ed;
                    padding: 12px 16px;
                    border-radius: 18px;
                    max-width: 85%;
                    font-size: 14px;
                    line-height: 1.5;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                ">${content.replace(/\n/g, '<br>')}</div>
            `;
        }
        
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;

        // Add fade-in animation
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.animation = 'fadeIn 0.5s ease-out forwards';
        }, 10);
    }

    // Utility function to escape HTML
    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }

    // Enhanced typing indicator
    function showTypingIndicator() {
        const messagesDiv = document.getElementById('ai-messages');
        if (!messagesDiv) return;

        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.style.cssText = 'margin-bottom: 16px; display: flex; align-items: flex-start; gap: 10px;';
        typingDiv.innerHTML = `
            <div style="
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: linear-gradient(135deg, #00c851 0%, #007e33 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 16px;
                flex-shrink: 0;
            ">🤖</div>
            <div style="
                background: white;
                color: #666;
                border: 1px solid #e1e8ed;
                padding: 12px 16px;
                border-radius: 18px;
                max-width: 85%;
                font-size: 14px;
                line-height: 1.5;
                display: flex;
                align-items: center;
                gap: 8px;
            ">
                <span>Thinking</span>
                <div style="display: flex; gap: 2px;">
                    <div style="width: 4px; height: 4px; border-radius: 50%; background: #666; animation: typing 1.4s infinite;" class="dot1"></div>
                    <div style="width: 4px; height: 4px; border-radius: 50%; background: #666; animation: typing 1.4s infinite 0.2s;" class="dot2"></div>
                    <div style="width: 4px; height: 4px; border-radius: 50%; background: #666; animation: typing 1.4s infinite 0.4s;" class="dot3"></div>
                </div>
            </div>
        `;
        
        messagesDiv.appendChild(typingDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function hideTypingIndicator() {
        const typingDiv = document.getElementById('typing-indicator');
        if (typingDiv) {
            typingDiv.remove();
        }
    }

    // Enhanced send message function
    function sendMessage() {
        console.log('🔄 sendMessage function called');
        
        const input = document.getElementById('ai-input');
        if (!input) {
            console.error('❌ Input element not found');
            return;
        }

        const message = input.value.trim();
        console.log('📝 User message:', message);
        
        if (!message) {
            console.log('⚠️ Empty message, returning');
            return;
        }
        
        try {
            // Add user message
            console.log('➕ Adding user message to chat');
            addMessage(message, 'user');
            input.value = '';
            input.style.height = 'auto';
            
            // Show typing indicator
            console.log('⌛ Showing typing indicator');
            showTypingIndicator();
            
            // Generate response with API integration
            console.log('🧠 Getting AI response');
            getSmartResponse(message).then(response => {
                console.log('💬 AI response:', response);
                
                // Short delay for better UX
                const thinkingTime = 500 + Math.random() * 800;
                setTimeout(() => {
                    console.log('✅ Adding bot response');
                    hideTypingIndicator();
                    addMessage(response, 'bot');
                }, thinkingTime);
            }).catch(error => {
                console.error('❌ Error getting response:', error);
                hideTypingIndicator();
                addMessage('Sorry, I encountered an error. Please try again!', 'bot');
            });
            
        } catch (error) {
            console.error('❌ Error in sendMessage:', error);
            hideTypingIndicator();
            addMessage('Sorry, I encountered an error. Please try again!', 'bot');
        }
    }

    // Enhanced auto-resize for textarea
    function setupTextareaAutoResize() {
        const textarea = document.getElementById('ai-input');
        if (!textarea) return;

        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 100) + 'px';
        });

        textarea.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // Initialize chatbot when page loads
    function initializeChatbot() {
        console.log('🤖 Initializing EduCartoon AI Study Assistant...');

        try {
            // Get DOM elements
            const chatBtn = document.getElementById('ai-chat-btn');
            const chatWindow = document.getElementById('ai-chat-window');
            const closeBtn = document.getElementById('ai-close-btn');
            const sendBtn = document.getElementById('ai-send-btn');
            const input = document.getElementById('ai-input');

            if (!chatBtn || !chatWindow || !closeBtn || !sendBtn || !input) {
                console.error('⚠️ Some chatbot elements not found in DOM');
                return;
            }

            // Function to open chatbot
            function openChatbot() {
                chatWindow.style.display = 'flex';
                setTimeout(() => {
                    input.focus();
                }, 100);
                console.log('💬 Chatbot opened');
            }

            // Function to close chatbot
            function closeChatbot() {
                chatWindow.style.display = 'none';
                console.log('💬 Chatbot closed');
            }

            // Setup event handlers
            chatBtn.onclick = function() {
                const isVisible = chatWindow.style.display === 'flex';
                if (!isVisible) {
                    openChatbot();
                } else {
                    closeChatbot();
                }
            };

            closeBtn.onclick = function(e) {
                e.stopPropagation(); // Prevent event bubbling
                closeChatbot();
                console.log('💬 Chatbot closed via close button');
            };

            // Close chatbot when clicking outside
            document.addEventListener('click', function(e) {
                const chatbotContainer = document.getElementById('ai-study-chatbot');
                if (chatbotContainer && !chatbotContainer.contains(e.target) && chatWindow.style.display === 'flex') {
                    closeChatbot();
                }
            });

            // Prevent chatbot from closing when clicking inside the chat window
            chatWindow.onclick = function(e) {
                e.stopPropagation();
            };

            sendBtn.onclick = sendMessage;

            // Setup textarea auto-resize and enter key
            setupTextareaAutoResize();

            // Add CSS animations
            const style = document.createElement('style');
            style.textContent = `
                @keyframes typing {
                    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
                    30% { transform: translateY(-10px); opacity: 1; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `;
            document.head.appendChild(style);

            console.log('✅ Chatbot initialized successfully');

        } catch (error) {
            console.error('❌ Error initializing chatbot:', error);
        }
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeChatbot);
    } else {
        initializeChatbot();
    }

    // Expose functions globally for testing
    window.EduChatbot = {
        sendMessage,
        addMessage,
        getSmartResponse
    };

    console.log('📚 EduCartoon AI Study Assistant loaded and ready!');

})();
