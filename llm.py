import langchain
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.prompts import MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser

from dotenv import load_dotenv
from langchain_groq import ChatGroq

import os

load_dotenv()

groq_api_key = os.getenv("GROQ_API_KEY")

llm_model = ChatGroq(
    api_key=groq_api_key,
    model="llama-3.1-8b-instant",
    temperature=0.2,
    max_tokens=50
)

prompt = ChatPromptTemplate.from_messages([
    ("system",
     "You are a helpful assistant. Answer in less than two lines."),

    MessagesPlaceholder("history"),

    ("human", "{input}")
])

chain = prompt | llm_model | StrOutputParser()

conversation = []

def chat_with_bot(payload):

    global conversation

    user_input = payload["input"]

    conversation.append(
        HumanMessage(content=user_input)
    )

    result = chain.invoke({
        "input": user_input,
        "history": conversation
    })

    conversation.append(
        AIMessage(content=result)
    )

    # Keep only recent chats
    conversation = conversation[-6:]

    return result


def get_llm_response(user_input):

    response = chat_with_bot({
        "input": user_input
    })

    return response