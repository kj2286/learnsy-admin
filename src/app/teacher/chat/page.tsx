"use client";

import { useState } from "react";
import { Camera, PaperPlaneRight, User } from "@phosphor-icons/react";
import { mockChatRooms, mockChatMessages } from "@/data/mock-chat";
import SearchInput from "@/components/shared/SearchInput";

type TabFilter = "전체" | "읽음" | "안읽음";

export default function ChatPage() {
  const [selectedRoom, setSelectedRoom] = useState(mockChatRooms[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [tabFilter, setTabFilter] = useState<TabFilter>("전체");
  const [messageInput, setMessageInput] = useState("");

  const filteredRooms = mockChatRooms.filter((room) => {
    const matchesSearch = room.studentName.includes(searchQuery) || room.teacherName.includes(searchQuery);
    const matchesTab = tabFilter === "전체" || (tabFilter === "읽음" && room.isRead) || (tabFilter === "안읽음" && !room.isRead);
    return matchesSearch && matchesTab;
  });

  const currentRoom = mockChatRooms.find((r) => r.id === selectedRoom);
  const currentMessages = mockChatMessages.filter((m) => m.roomId === selectedRoom);

  const tabs: TabFilter[] = ["전체", "읽음", "안읽음"];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-xl font-bold text-gray-900 mb-4">채팅 관리</h1>

      <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden" style={{ height: "calc(100vh - 160px)" }}>
        {/* Left Panel - Chat List */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          <div className="p-3 border-b border-gray-200">
            <SearchInput placeholder="이름 검색" value={searchQuery} onChange={setSearchQuery} dark={false} />
            <div className="flex gap-1 mt-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTabFilter(tab)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    tabFilter === tab ? "bg-blue-100 text-blue-600 font-medium" : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room.id)}
                className={`flex items-start gap-3 px-4 py-3 cursor-pointer border-b border-gray-100 transition-colors ${
                  selectedRoom === room.id ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <User size={18} weight="light" className="text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{room.studentName}</span>
                    <span className="text-[10px] text-gray-400">{room.lastMessageTime}</span>
                  </div>
                  <p className="text-xs text-gray-400">{room.teacherName} &middot; {room.studentPhone}</p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{room.lastMessage}</p>
                </div>
                {room.unreadCount > 0 && (
                  <span className="bg-blue-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                    {room.unreadCount}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Chat Window */}
        <div className="flex-1 flex flex-col">
          {currentRoom && (
            <>
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <User size={16} weight="light" className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{currentRoom.studentName}</p>
                    <p className="text-[10px] text-gray-400">{currentRoom.studentPhone}</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {currentMessages.map((msg) => {
                  if (msg.type === "deleted") {
                    return (
                      <div key={msg.id} className="text-center">
                        <span className="text-xs text-gray-400 italic">삭제된 메시지</span>
                      </div>
                    );
                  }

                  const isTeacher = msg.sender === "teacher";
                  return (
                    <div key={msg.id} className={`flex ${isTeacher ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[70%] ${isTeacher ? "order-1" : ""}`}>
                        <div
                          className={`px-3 py-2 rounded-2xl text-sm ${
                            isTeacher
                              ? "bg-blue-500 text-white rounded-br-sm"
                              : "bg-gray-100 text-gray-800 rounded-bl-sm"
                          }`}
                        >
                          {msg.type === "youtube" ? (
                            <a
                              href={msg.content}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`underline ${isTeacher ? "text-blue-100" : "text-blue-600"}`}
                            >
                              {msg.content}
                            </a>
                          ) : (
                            msg.content
                          )}
                        </div>
                        <p className={`text-[10px] text-gray-400 mt-1 ${isTeacher ? "text-right" : ""}`}>
                          {msg.timestamp.split(" ")[1]}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input */}
              <div className="px-4 py-3 border-t border-gray-200 bg-white">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Camera size={20} weight="light" />
                  </button>
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="메시지를 입력하세요..."
                    className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm outline-none focus:bg-gray-50 focus:ring-1 focus:ring-blue-300 transition-colors"
                  />
                  <button className="p-2 text-blue-500 hover:text-blue-700 transition-colors">
                    <PaperPlaneRight size={20} weight="fill" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
