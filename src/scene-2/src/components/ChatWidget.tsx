import { MessageCircle } from "lucide-react";

interface ChatWidgetProps {
  message: string;
  avatar?: string;
}

export function ChatWidget({ message, avatar }: ChatWidgetProps) {
  return (
    <div className="fixed left-6 bottom-6 z-50 w-80">
      <div className="bg-chat-bg border-2 border-chat-border rounded-2xl p-4 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-chat-message flex items-center justify-center flex-shrink-0">
            {avatar ? (
              <img src={avatar} alt="Dot" className="w-full h-full rounded-full" />
            ) : (
              <MessageCircle className="w-5 h-5 text-foreground" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm text-foreground leading-relaxed">{message}</p>
          </div>
        </div>
        <button className="mt-4 w-12 h-12 rounded-full bg-chat-message border-2 border-chat-border flex items-center justify-center mx-auto hover:scale-110 transition-transform">
          <MessageCircle className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </div>
  );
}
