interface ConversationBubbleProps {
  speaker: string;
  message: string;
  timestamp?: string;
}

const ConversationBubble = ({ speaker, message, timestamp }: ConversationBubbleProps) => {
  const isVick = speaker.toLowerCase() === 'vick';
  
  return (
    <div className="mb-4 animate-slide-in-left">
      <div className={`flex items-start gap-3 ${isVick ? 'flex-row-reverse' : ''}`}>
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 border border-primary/30">
          <span className="text-sm font-bold text-primary">
            {speaker.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className={`flex-1 ${isVick ? 'items-end' : ''}`}>
          <div
            className={`p-4 rounded-2xl backdrop-blur-sm border ${
              isVick
                ? 'bg-secondary/80 border-border ml-auto max-w-[80%]'
                : 'bg-primary/10 border-primary/30 max-w-[85%]'
            }`}
          >
            <p className="text-sm text-foreground leading-relaxed">{message}</p>
          </div>
          {timestamp && (
            <p className="text-xs text-muted-foreground mt-1 px-2">{timestamp}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationBubble;
