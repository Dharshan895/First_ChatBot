# First_ChatBot - Chat With Groq

A simple AI chatbot built for learning FastAPI, LangChain, and frontend-backend integration.

This project uses:
- FastAPI for backend
- Groq API with Llama 3.1
- LangChain for conversation handling
- HTML, CSS, and JavaScript for frontend

Features:
- Chat UI with modern styling
- Typing animation effect
- Scrollable chat history
- Conversational memory
- Fast LLM responses using Groq

## Setup

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file and add:

```env id="4tdmvs"
GROQ_API_KEY=your_api_key
```

Run the backend first:

```bash id="8jlwm7"
uvicorn main:app --reload
```

Then run the frontend using Live Server or a local HTTP server and open `index.html` in the browser.

This project was created for learning and experimentation with AI chatbot development.
