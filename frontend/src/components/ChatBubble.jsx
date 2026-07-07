import ReactMarkdown from 'react-markdown';
import RecipeCard from './RecipeCard';

function isRecipe(text) {
  return /\n## .+/m.test(text) || /^## .+/m.test(text);
}

function UserBubble({ content }) {
  return (
    <div className="flex justify-end">
      <div className="bg-primary text-white rounded-xl rounded-br-sm px-3.5 py-3.5 max-w-[80%] leading-relaxed text-sm border-2 border-black shadow-[3px_3px_0_0_#000]">
        <p>{content}</p>
      </div>
    </div>
  );
}

function BotBubble({ content }) {
  if (isRecipe(content)) {
    return (
      <div className="max-w-full">
        <RecipeCard content={content} />
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="bg-white text-foreground rounded-xl rounded-bl-sm px-3.5 py-3.5 max-w-[85%] leading-relaxed text-sm border-2 border-black shadow-[3px_3px_0_0_#000]">
        <div className="prose prose-stone prose-sm max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default function ChatBubble({ message }) {
  if (message.role === 'user') {
    return <UserBubble content={message.content} />;
  }
  return <BotBubble content={message.content} />;
}
