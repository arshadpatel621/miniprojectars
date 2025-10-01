// EduCartoon Chatbot Backend with OpenAI Integration
// Optional backend for real AI-powered responses

import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again later.',
        details: 'Rate limit exceeded'
    }
});

app.use('/api/', limiter);

// OpenAI Configuration
let openai;

// Initialize OpenAI asynchronously
async function initializeOpenAI() {
    if (process.env.OPENAI_API_KEY) {
        try {
            const { default: OpenAI } = await import('openai');
            openai = new OpenAI({
                apiKey: process.env.OPENAI_API_KEY
            });
            console.log('✅ OpenAI initialized successfully');
        } catch (error) {
            console.warn('⚠️ OpenAI not installed. Using fallback responses.');
        }
    }
}

// Initialize OpenAI when the module loads
initializeOpenAI();

// Educational system prompt for the AI
const EDUCATIONAL_SYSTEM_PROMPT = `You are an AI Study Assistant for EduCartoon, an educational platform that creates AI-generated animated learning videos. Your role is to help students with their academic questions in a friendly, encouraging, and educational manner.

Guidelines:
- Always be supportive and encouraging
- Explain concepts step-by-step when helping with problems
- Use emojis appropriately to make responses engaging
- Focus on helping students learn, not just giving answers
- If asked to solve homework directly, guide them through the process instead
- Suggest studying techniques and learning strategies when appropriate
- Keep responses concise but informative
- Always maintain an educational focus

You can help with:
- Mathematics (algebra, geometry, calculus, statistics)
- Science (physics, chemistry, biology)
- Programming and computer science
- Study tips and techniques
- Exam preparation strategies
- General educational guidance

If asked about topics outside education, politely redirect to educational content.`;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({
                error: 'Invalid message format',
                details: 'Message must be a non-empty string'
            });
        }

        // Validate message length
        if (message.length > 1000) {
            return res.status(400).json({
                error: 'Message too long',
                details: 'Please keep your message under 1000 characters'
            });
        }

        // Check if OpenAI is configured
        if (!openai) {
            // Fallback to predefined responses if no API key
            const fallbackResponse = getFallbackResponse(message);
            return res.json({
                response: fallbackResponse,
                source: 'fallback'
            });
        }

        // Call OpenAI API
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: EDUCATIONAL_SYSTEM_PROMPT },
                { role: 'user', content: message }
            ],
            max_tokens: 300,
            temperature: 0.7,
            presence_penalty: 0.1,
            frequency_penalty: 0.1
        });

        const response = completion.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response. Please try again.';

        res.json({
            response: response.trim(),
            source: 'openai'
        });

    } catch (error) {
        console.error('Chat API Error:', error);

        // Handle different types of errors
        if (error.code === 'insufficient_quota') {
            return res.status(503).json({
                error: 'Service temporarily unavailable',
                details: 'AI service quota exceeded. Please try again later.',
                fallback: getFallbackResponse(req.body.message)
            });
        }

        if (error.code === 'rate_limit_exceeded') {
            return res.status(429).json({
                error: 'Rate limit exceeded',
                details: 'Too many requests to AI service. Please wait a moment.',
                fallback: getFallbackResponse(req.body.message)
            });
        }

        // Provide fallback response for any other errors
        res.status(200).json({
            response: getFallbackResponse(req.body.message),
            source: 'fallback',
            note: 'Using fallback response due to service unavailability'
        });
    }
});

// Fallback response function (same as frontend)
function getFallbackResponse(message) {
    const msg = message.toLowerCase();
    
    const responses = {
        math: "I'd love to help with math! 📊 What specific problem are you working on?\n\n• Algebra equations and inequalities\n• Geometry theorems and proofs\n• Calculus derivatives and integrals\n• Statistics and probability\n• Trigonometry functions\n• Number theory\n\nShare your question and I'll guide you step-by-step!",
        science: "Science questions are exciting! 🔬 I can explain:\n\n• Physics concepts and laws\n• Chemistry reactions and formulas\n• Biology processes and systems\n• Earth science phenomena\n• Environmental science\n• Space and astronomy\n\nWhat science topic would you like to explore?",
        programming: "Programming help is here! 💻 I can assist with:\n\n• Python, JavaScript, Java, C++\n• HTML, CSS, and web development\n• Debugging and troubleshooting\n• Algorithm explanations\n• Data structures\n• Software design principles\n\nWhat coding challenge are you facing?",
        study: "Great question about studying! 🎯 Here are proven techniques:\n\n• Pomodoro Technique (25-min focused sessions)\n• Active recall and spaced repetition\n• Mind mapping and visual learning\n• Practice testing and self-assessment\n• Study groups and peer learning\n• Time management strategies\n\nWhat subject are you studying for?",
        homework: "I'm here to guide your learning! 📚 Instead of giving direct answers, I'll help you understand concepts.\n\n• Break down complex problems step-by-step\n• Explain underlying principles\n• Provide similar examples\n• Suggest study resources\n• Help identify knowledge gaps\n\nWhat subject is your homework in? Let's work through it together!",
        help: "I'm your AI study assistant! 🤖 I can help with:\n\n• Math problem solving and explanations\n• Science concepts and experiments\n• Programming and computer science\n• Study strategies and techniques\n• Homework guidance and support\n• Exam preparation tips\n\nWhat academic question can I help you with today?",
        default: "Hi! I'm here to help with your studies! 🎓 I can assist with math, science, programming, study tips, and homework guidance.\n\nWhat academic question can I help you with?"
    };

    // Simple keyword matching
    if (msg.includes('math') || msg.includes('mathematics') || msg.includes('algebra') || msg.includes('calculus') || msg.includes('equation') || msg.includes('geometry')) {
        return responses.math;
    }
    if (msg.includes('science') || msg.includes('physics') || msg.includes('chemistry') || msg.includes('biology')) {
        return responses.science;
    }
    if (msg.includes('programming') || msg.includes('code') || msg.includes('javascript') || msg.includes('python') || msg.includes('java')) {
        return responses.programming;
    }
    if (msg.includes('study') || msg.includes('exam') || msg.includes('test') || msg.includes('learn')) {
        return responses.study;
    }
    if (msg.includes('homework') || msg.includes('assignment')) {
        return responses.homework;
    }
    if (msg.includes('help') || msg.includes('hi') || msg.includes('hello')) {
        return responses.help;
    }
    
    return responses.default;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        openai_configured: !!process.env.OPENAI_API_KEY,
        version: '1.0.0'
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server Error:', error);
    res.status(500).json({
        error: 'Internal server error',
        details: 'An unexpected error occurred'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        details: 'The requested endpoint does not exist'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🤖 EduCartoon Chatbot Backend running on port ${PORT}`);
    console.log(`🔑 OpenAI API: ${process.env.OPENAI_API_KEY ? 'Configured' : 'Not configured (using fallback responses)'}`);
    console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
    console.log(`💬 Chat endpoint: http://localhost:${PORT}/api/chat`);
});

export default app;
