export default function Chat() {
    return (
        <div className="hidden md:flex flex-col flex-1 h-full">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt={activeChat} />
                        <AvatarFallback>{activeChat.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="font-medium">{activeChat}</h2>
                        <p className="text-xs text-gray-500">online</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                        <Phone className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Video className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5 text-gray-500" />
                    </Button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#e6ebee]">
                {messages.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-gray-500">
                        <p>No messages yet. Start a conversation!</p>
                    </div>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex mb-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            {message.role !== "user" && (
                                <Avatar className="h-8 w-8 mr-2 mt-1">
                                    <AvatarFallback>{activeChat.charAt(0)}</AvatarFallback>
                                </Avatar>
                            )}
                            <div
                                className={`max-w-[70%] p-3 rounded-lg ${message.role === "user"
                                    ? "bg-[#effdde] text-gray-800 rounded-br-none"
                                    : "bg-white text-gray-800 rounded-bl-none"
                                    }`}
                            >
                                <p>{message.content}</p>
                                <span className="text-xs text-gray-500 flex justify-end mt-1">
                                    {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-gray-200">
                <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                    <Button type="button" variant="ghost" size="icon">
                        <Paperclip className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Input value={input} onChange={handleInputChange} placeholder="Write a message..." className="flex-1" />
                    <Button type="button" variant="ghost" size="icon">
                        <Smile className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Button type="submit" size="icon" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full">
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </div>
    )
}