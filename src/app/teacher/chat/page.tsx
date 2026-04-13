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
    <div>
      <h1 className="text-xl font-bold text-[#1A1A18] mb-4">채팅</h1>

      <div
        className="flex border border-black/10 rounded-xl overflow-hidden"
        style={{ height: "calc(100vh - 200px)" }}
      >
        {/* Left Panel - Chat List */}
        <div className="w-72 bg-[#F5F2EA] border-r border-black/10 flex flex-col flex-shrink-0">
          <div className="p-3 border-b border-black/10">
            <SearchInput placeholder="이름 검색" value={searchQuery} onChange={setSearchQuery} dark={false} />
            <div className="flex gap-1 mt-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTabFilter(tab)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    tabFilter === tab
                      ? "bg-[#C9E535] text-[#1A1A18] font-medium"
                      : "text-[#6B6B68] hover:bg-black/5"
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
                className={`flex items-start gap-3 px-4 py-3 cursor-pointer border-b border-black/5 transition-colors ${
                  selectedRoom === room.id ? "bg-[#C9E535]/10" : "hover:bg-black/5"
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-[#EBE7DA] flex items-center justify-center flex-shrink-0">
                  <User size={16} weight="light" className="text-[#6B6B68]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#1A1A18]">{room.studentName}</span>
                    <span className="text-[10px] text-[#6B6B68]">{room.lastMessageTime}</span>
                  </div>
                  <p className="text-xs text-[#6B6B68]">{room.teacherName} · {room.studentPhone}</p>
                  <p className="text-xs text-[#6B6B68] truncate mt-0.5">{room.lastMessage}</p>
                </div>
                {room.unreadCount > 0 && (
                  <span className="bg-[#C9E535] text-[#1A1A18] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                    {room.unreadCount}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Chat Window */}
        <div className="flex-1 bg-white flex flex-col">
          {currentRoom && (
            <>
              {/* Header */}
              <div className="px-4 py-3 border-b border-black/10 bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EBE7DA] flex items-center justify-center">
                    <User size={16} weight="light" className="text-[#6B6B68]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1A1A18]">{currentRoom.studentName}</p>
                    <p className="text-[10px] text-[#6B6B68]">{currentRoom.studentPhone}</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {currentMessages.map((msg) => {
                  if (msg.type === "deleted") {
                    return (
                      <div key={msg.id} className="text-center">
                        <span className="text-xs text-[#6B6B68] italic">삭제된 메시지</span>
                      </div>
                    );
                  }

                  const isTeacher = msg.sender === "teacher";
                  return (
                    <div key={msg.id} className={`flex ${isTeacher ? "justify-end" : "justify-start"}`}>
                      <div className="max-w-[70%]">
                        <div
                          className={`px-3 py-2 rounded-2xl text-sm ${
                            isTeacher
                              ? "bg-[#C9E535]/30 text-[#1A1A18] rounded-br-sm"
                              : "bg-[#EBE7DA] text-[#1A1A18] rounded-bl-sm"
                          }`}
                        >
                          {msg.type === "youtube" ? (
                            <a
                              href={msg.content}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline text-[#1A1A18]"
                            >
                              {msg.content}
                            </a>
                          ) : (
                            msg.content
                          )}
                        </div>
                        <p className={`text-[10px] text-[#6B6B68] mt-1 ${isTeacher ? "text-right" : ""}`}>
                          {msg.timestamp.split(" ")[1]}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input */}
              <div className="px-4 py-3 border-t border-black/10 bg-[#F5F2EA]">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-[#6B6B68] hover:text-[#1A1A18] transition-colors">
                    <Camera size={20} weight="light" />
                  </button>
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="메시지를 입력하세요..."
                    className="flex-1 px-4 py-2 bg-white border border-black/10 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#C9E535]/50 text-[#1A1A18] placeholder-[#6B6B68]/50 transition-colors"
                  />
                  <button className="w-9 h-9 bg-[#C9E535] hover:bg-[#B3CC20] rounded-full flex items-center justify-center transition-colors flex-shrink-0">
                    <PaperPlaneRight size={18} weight="fill" className="text-[#1A1A18]" />
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
