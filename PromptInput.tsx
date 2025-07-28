
import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  placeholder: string;
}

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, placeholder }) => {
  return (
    <div>
      <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Prompt
      </label>
      <textarea
        id="prompt"
        name="prompt"
        rows={3}
        className="w-full p-3 bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 ease-in-out text-light-text dark:text-dark-text placeholder-gray-400 dark:placeholder-gray-500"
        placeholder={placeholder}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
    </div>
  );
};
