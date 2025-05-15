export default function Sidebar() {
    return (
        <div className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col h-full" >
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between" >
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6 text-gray-500" />
                </Button>
                <h1 className="text-xl font-bold">Chats</h1>
                <div className="w-6"></div> {/* Spacer for alignment */}
            </div >

            {/* Search */}
            <div className="p-4" >
                <Input placeholder="Search" className="bg-gray-100" />
            </div >

            {/* Contacts List */}
            <div className="flex-1 overflow-y-auto" >
                {
                    contacts.map((contact) => (
                        <div
                            key={contact.id}
                            className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${activeChat === contact.name ? "bg-blue-50" : ""}`}
                            onClick={() => setActiveChat(contact.name)}
                        >
                            <Avatar className="h-12 w-12 mr-3">
                                <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-sm font-medium truncate">{contact.name}</h3>
                                    <span className="text-xs text-gray-500">12:34</span>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <p className="text-xs text-gray-500 truncate">{contact.lastMessage}</p>
                                    {contact.lastSeen === "online" && <span className="h-2 w-2 bg-green-500 rounded-full"></span>}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div >
        </div >
    )
}