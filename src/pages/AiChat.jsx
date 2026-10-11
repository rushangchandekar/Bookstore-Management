import React, { useState, useEffect, useRef } from "react";
import api from "../api/axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";
import { v4 as uuidv4 } from "uuid";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function AiChat() {
    const [userId, setUserId] = useState("");
    const [conversationId, setConversationId] = useState("");
    const [chat, setChat] = useState([]);
    const [message, setmessage] = useState("");
    const [loading, setloading] = useState(false);
    const [showChatList, setShowChatList] = useState(true);
    const chatEndRef = useRef(null);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) return setUserId("guest-user");

        try {
            const decoded = jwtDecode(token);
            const id = 
                decoded.sub ||
                decoded.userId ||
                decoded.id ||
                decoded.nameid ||
                decoded[
                    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
                ];

            setUserId(id || "guest-user");
        } catch {
            setUserId("guest-user");
        }
    }, []);

    useEffect(() => {
        if (!userId) return;

        let stored = localStorage.getItem(`conv_${userId}`);
        if (!stored) {
            stored = uuidv4();
            localStorage.setItem(`conv_${userId}`, stored);
        }

        setConversationId(stored);
    }, [userId]);

    useEffect(() => {
        if (!userId || !conversationId) return;

        const saved = localStorage.getItem(`chat_${userId}_${conversationId}`);

        setChat(saved ? JSON.parse(saved) : []);
    }, [userId, conversationId]);

    useEffect(() => {
        if (!userId || !conversationId) return;

        localStorage.setItem(
            `chat_${userId}_${conversationId}`,
            JSON.stringify(chat),
        );

        const list = JSON.parse(localStorage.getItem(`convs_${userId}`)) || [];

        if (!list.includes(conversationId)) {
            list.unshift(conversationId);
            localStorage.setItem(`convs_${userId}`, JSON.stringify(list));
        }
    }, [chat]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat, loading]);

    const getTime = () => 
        new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMsg = {
            sender: "user",
            text: message,
            time: getTime(),
        };

        setChat((prev) => [...prev, userMsg]);
        setmessage("");
        setloading(true);

        try {
            const res = await api.post("/Ai/chat", {
                text: message,
                userId,
                conversationId,
            });

            const fullText = res.data.text;

            let aiIndex;

            setChat((prev) => {
                aiIndex = prev.length;
                return [...prev, {sender:"ai", text: "", time: getTime() }];
            });

            let current = "";

            for (let i=0; i<fullText.length; i++) {
                current += fullText[i];

                setChat((prev) => {
                    const updated = [...prev];
                    updated[aiIndex] = {
                        ...updated[aiIndex],
                        text: current,
                    };
                    return updated;
                });

                await new Promise((r) => setTimeout(r, 10));
            }
        } catch {
            setChat((prev) => [
                ...prev,
                { sender: "ai", text: "❌ Error getting response", time: getTime()},
            ]);
        }

        setloading(false);
    };

    const startNewChat = () => {
        const newId = uuidv4();
        localStorage.setItem(`conv_${userId}`, newId);
        setConversationId(newId);
        setChat([]);
    };

    const loadChat = (id) => {
        const saved = localStorage.getItem(`chat_${userId}_${id}`);
        setChat(saved ? JSON.parse(saved) : []);
        setConversationId(id);
    };

    const conversations = JSON.parse(localStorage.getItem(`convs_${userId}`)) || [];

    return (
        <div className="d-flex" style={{minHeight: "100vh"}}>
            <Sidebar />

            <div className="flex-grow-1 d-flex flex-column">
                <Navbar />

                <div className="d-flex flex-grow-1" style={{ position: "relative", overflow: "hidden" }}>
                    {/* Background ambience */}
                    <div
                        style={{
                            position: "absolute",
                            top: "10%",
                            right: "5%",
                            width: "300px",
                            height: "300px",
                            background: "radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)",
                            animation: "morphBlob 20s ease-in-out infinite",
                            pointerEvents: "none",
                        }}
                    />

                    {/* Chat List Sidebar */}
                    {showChatList && (
                        <div className="chat-sidebar fade-in-left">
                            <div className="chat-sidebar-header">
                                <button
                                    className="glow-btn glow-btn-outline w-100"
                                    style={{ padding: "6px 12px", fontSize: "0.8rem" }}
                                    onClick={() => setShowChatList(false)}
                                >
                                    <i className="bi bi-chevron-left me-1"></i>
                                    Hide
                                </button>
                            </div>

                            <button
                                className="glow-btn glow-btn-blue w-100 mb-3"
                                style={{ padding: "10px", fontSize: "0.85rem" }}
                                onClick={startNewChat}
                            >
                                <i className="bi bi-plus-lg me-1"></i>
                                New Chat
                            </button>

                            <div className="chat-list">
                                {conversations.map((id, idx) => (
                                    <div
                                        key={id}
                                        className={`chat-list-item fade-in-up ${
                                            id === conversationId ? "active" : ""
                                        }`}
                                        style={{
                                            animationDelay: `${idx * 0.05}s`,
                                            animationFillMode: "both",
                                        }}
                                    >
                                        <div 
                                            className="chat-list-item-name"
                                            onClick={() => loadChat(id)}
                                        >
                                            <i className="bi bi-chat-dots me-2" style={{ fontSize: "0.85rem" }}></i>
                                            {localStorage.getItem(`conv_name_${id}`) ||
                                            `Chat ${id.slice(0, 6)}`}
                                        </div>

                                        <div className="chat-list-item-actions">
                                            <span
                                                className="chat-action-btn"
                                                onClick={() => {
                                                    const newName = prompt("Enter new chat name:");
                                                    if (newName) {
                                                        localStorage.setItem(`conv_name_${id}`, newName);
                                                        window.location.reload();
                                                    }
                                                }}
                                                title="Rename"
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </span>

                                            <span
                                                className="chat-action-btn delete"
                                                onClick={() => {
                                                    localStorage.removeItem(`chat_${userId}_${id}`);

                                                    const updated = conversations.filter((c) => c !== id);
                                                    localStorage.setItem(`convs_${userId}`, JSON.stringify(updated),);

                                                    if (id === conversationId) {
                                                        setConversationId("");
                                                        setChat([]);
                                                    }

                                                    window.location.reload();
                                                }}
                                                title="Delete"
                                            >
                                                <i className="bi bi-trash3"></i>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Main Chat Area */}
                    <div className="flex-grow-1 d-flex flex-column p-3" style={{ position: "relative", zIndex: 1 }}>
                        {!showChatList && (
                            <button
                                className="glow-btn glow-btn-outline mb-2"
                                style={{ padding: "6px 16px", fontSize: "0.8rem", alignSelf: "flex-start" }}
                                onClick={() => setShowChatList(true)}
                            >
                                <i className="bi bi-list me-1"></i>
                                Chats
                            </button>
                        )}

                        <div className="chat-box flex-grow-1">
                            {chat.length === 0 && (
                                <div className="empty-state" style={{ marginTop: "60px" }}>
                                    <div
                                        style={{
                                            fontSize: "4rem",
                                            marginBottom: "16px",
                                            display: "inline-block",
                                            animation: "float 3s ease-in-out infinite",
                                            filter: "drop-shadow(0 4px 20px rgba(167,139,250,0.3))",
                                        }}
                                    >
                                        📚
                                    </div>
                                    <h4
                                        className="glow-text-purple"
                                        style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}
                                    >
                                        Ask anything about books
                                    </h4>
                                    <p>Get recommendations, prices, and details instantly</p>
                                </div>
                            )}

                            {chat.map((msg, i) => (
                                <div 
                                    key={i}
                                    className={`chat-message ${
                                        msg.sender === "user" ? "user" : "ai"
                                    }`}
                                >
                                    {msg.sender === "ai" && (
                                        <div className="chat-avatar ai">🤖</div>
                                    )}

                                    <div className="chat-bubble-wrapper">
                                        <div className={`chat-bubble ${msg.sender}`}>
                                            {msg.sender === "ai" ? (
                                                <ReactMarkdown 
                                                    remarkPlugins={[remarkGfm]}
                                                    components={{
                                                        strong: ({ children }) => (
                                                            <strong style={{ color: "var(--accent-blue)" }}>
                                                                {children}
                                                            </strong>
                                                        ),
                                                        code: ({ children }) => (
                                                            <code className="chat-code">{children}</code>
                                                        ),
                                                    }}
                                                >
                                                    {msg.text}
                                                </ReactMarkdown>
                                            ) : (
                                                msg.text
                                            )}
                                        </div>
                                        <small className="chat-time">{msg.time}</small>
                                    </div>

                                    {msg.sender === "user" && (
                                        <div className="chat-avatar user">👤</div>
                                    )}
                                </div>
                            ))}

                            {loading && (
                                <div className="chat-message ai">
                                    <div className="chat-avatar ai">🤖</div>
                                    <div className="chat-bubble ai typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            )}

                            <div ref={chatEndRef}></div>
                        </div>

                        {/* Input Area */}
                        <div className="chat-input-area">
                            <input
                                className="form-control glass-input chat-input-field"
                                value={message}
                                onChange={(e) => setmessage(e.target.value)}
                                placeholder="Ask anything about books..."
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            />
                            <button
                                className="glow-btn glow-btn-blue chat-send-btn"
                                onClick={sendMessage}
                                disabled={loading || !message.trim()}
                            >
                                <i className="bi bi-send"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                /* Chat Sidebar */
                .chat-sidebar {
                    width: 260px;
                    flex-shrink: 0;
                    background: rgba(10, 15, 26, 0.7);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-right: 1px solid var(--glass-border);
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                }

                .chat-sidebar-header {
                    margin-bottom: 12px;
                }

                .chat-list {
                    flex-grow: 1;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .chat-list-item {
                    padding: 10px 12px;
                    border-radius: var(--radius-sm);
                    border: 1px solid transparent;
                    cursor: pointer;
                    transition: all var(--transition-base);
                }

                .chat-list-item:hover {
                    background: var(--glass-bg-hover);
                    border-color: var(--glass-border);
                    transform: translateX(4px);
                }

                .chat-list-item.active {
                    background: rgba(96, 165, 250, 0.1);
                    border-color: rgba(96, 165, 250, 0.2);
                    box-shadow: inset 0 0 20px rgba(96, 165, 250, 0.05);
                }

                .chat-list-item-name {
                    font-size: 0.85rem;
                    color: var(--text-primary);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .chat-list-item-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 8px;
                    margin-top: 6px;
                    opacity: 0;
                    transition: opacity var(--transition-fast);
                }

                .chat-list-item:hover .chat-list-item-actions {
                    opacity: 1;
                }

                .chat-action-btn {
                    font-size: 0.75rem;
                    color: var(--text-muted);
                    cursor: pointer;
                    padding: 3px 6px;
                    border-radius: 4px;
                    transition: all var(--transition-fast);
                }

                .chat-action-btn:hover {
                    color: var(--accent-blue);
                    background: var(--glass-bg-hover);
                }

                .chat-action-btn.delete:hover {
                    color: var(--accent-red);
                }

                /* Chat Box */
                .chat-box {
                    height: 65vh;
                    overflow-y: auto;
                    background: var(--glass-bg);
                    border: 1px solid var(--glass-border);
                    border-radius: var(--radius-lg);
                    padding: 20px;
                    animation: fadeIn 0.5s ease;
                }

                /* Chat Messages */
                .chat-message {
                    display: flex;
                    margin-bottom: 16px;
                    align-items: flex-start;
                    gap: 10px;
                    animation: fadeInUp 0.35s ease forwards;
                }

                .chat-message.user {
                    justify-content: flex-end;
                }

                .chat-message.ai {
                    justify-content: flex-start;
                }

                .chat-avatar {
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1rem;
                    flex-shrink: 0;
                    border: 1px solid var(--glass-border);
                    transition: transform 0.3s;
                }

                .chat-avatar:hover {
                    transform: scale(1.1);
                }

                .chat-avatar.user {
                    background: rgba(59, 130, 246, 0.15);
                    box-shadow: 0 0 15px rgba(59, 130, 246, 0.1);
                }

                .chat-avatar.ai {
                    background: rgba(167, 139, 250, 0.15);
                    box-shadow: 0 0 15px rgba(167, 139, 250, 0.1);
                }

                .chat-bubble-wrapper {
                    max-width: 70%;
                }

                .chat-bubble {
                    padding: 14px 20px;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    line-height: 1.6;
                    word-break: break-word;
                    transition: transform 0.2s;
                }

                .chat-bubble:hover {
                    transform: scale(1.01);
                }

                .chat-bubble.user {
                    background: linear-gradient(135deg, #2563eb, #3b82f6, #60a5fa);
                    color: white;
                    border-bottom-right-radius: 4px;
                    box-shadow: 0 4px 15px rgba(37, 99, 235, 0.25);
                }

                .chat-bubble.ai {
                    background: var(--glass-bg-strong);
                    border: 1px solid var(--glass-border);
                    color: var(--text-primary);
                    border-bottom-left-radius: 4px;
                }

                .chat-time {
                    color: var(--text-muted);
                    font-size: 0.7rem;
                    margin-top: 4px;
                    display: block;
                }

                .chat-message.user .chat-time {
                    text-align: right;
                }

                .chat-code {
                    background: rgba(96, 165, 250, 0.1);
                    padding: 3px 6px;
                    border-radius: 4px;
                    font-size: 0.85em;
                    color: var(--accent-cyan);
                }

                ul, ol {
                    padding-left: 20px;
                }

                li {
                    margin-bottom: 4px;
                }

                /* Typing Indicator */
                .typing-indicator {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    padding: 16px 22px !important;
                }

                .typing-indicator span {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: var(--accent-purple);
                    animation: pulse 1.4s ease-in-out infinite;
                    box-shadow: 0 0 8px var(--accent-purple-glow);
                }

                .typing-indicator span:nth-child(2) {
                    animation-delay: 0.2s;
                }

                .typing-indicator span:nth-child(3) {
                    animation-delay: 0.4s;
                }

                /* Chat Input */
                .chat-input-area {
                    display: flex;
                    gap: 10px;
                    margin-top: 12px;
                }

                .chat-input-field {
                    flex-grow: 1;
                }

                .chat-send-btn {
                    padding: 10px 22px !important;
                    flex-shrink: 0;
                }

                @media(max-width: 768px) {
                    .chat-sidebar { display: none; }
                }
            `}</style>
        </div>
    );
}

export default AiChat;