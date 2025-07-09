import React, { useState } from 'react';
import { Eye, Edit, Bold, Italic, Link, List, Code, Image } from 'lucide-react';

const MarkdownEditor = ({ value, onChange }) => {
  const [isPreview, setIsPreview] = useState(false);

  const insertText = (before, after = '') => {
    const textarea = document.getElementById('markdown-editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newText);
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const formatMarkdown = (content) => {
    return content
      .replace(/\n/g, '<br />')
      .replace(/#{6}\s+(.*?)(?=\n|$)/g, '<h6 class="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2">$1</h6>')
      .replace(/#{5}\s+(.*?)(?=\n|$)/g, '<h5 class="text-lg font-bold text-gray-900 dark:text-white mt-4 mb-2">$1</h5>')
      .replace(/#{4}\s+(.*?)(?=\n|$)/g, '<h4 class="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-2">$1</h4>')
      .replace(/#{3}\s+(.*?)(?=\n|$)/g, '<h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3">$1</h3>')
      .replace(/#{2}\s+(.*?)(?=\n|$)/g, '<h2 class="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4">$1</h2>')
      .replace(/#{1}\s+(.*?)(?=\n|$)/g, '<h1 class="text-4xl font-bold text-gray-900 dark:text-white mt-8 mb-4">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">$1</code>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline">$1</a>')
      .replace(/^- (.*?)(?=\n|$)/gm, '<li class="ml-4">• $1</li>');
  };

  const toolbarButtons = [
    { icon: Bold, action: () => insertText('**', '**'), title: 'Bold' },
    { icon: Italic, action: () => insertText('*', '*'), title: 'Italic' },
    { icon: Link, action: () => insertText('[](', ')'), title: 'Link' },
    { icon: List, action: () => insertText('- '), title: 'List' },
    { icon: Code, action: () => insertText('`', '`'), title: 'Code' },
    { icon: Image, action: () => insertText('![](', ')'), title: 'Image' },
  ];

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {toolbarButtons.map((button, index) => (
              <button
                key={index}
                onClick={button.action}
                title={button.title}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors duration-200"
              >
                <button.icon className="h-4 w-4" />
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPreview(false)}
              className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
                !isPreview
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Edit className="h-4 w-4 inline mr-1" />
              Edit
            </button>
            <button
              onClick={() => setIsPreview(true)}
              className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
                isPreview
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Eye className="h-4 w-4 inline mr-1" />
              Preview
            </button>
          </div>
        </div>
      </div>

      {/* Editor/Preview */}
      <div className="min-h-96">
        {isPreview ? (
          <div className="p-4 prose prose-lg dark:prose-invert max-w-none">
            <div
              className="text-gray-700 dark:text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: formatMarkdown(value)
              }}
            />
          </div>
        ) : (
          <textarea
            id="markdown-editor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-96 p-4 border-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-0 focus:outline-none resize-none"
            placeholder="Start writing your post in Markdown..."
          />
        )}
      </div>
    </div>
  );
};

export default MarkdownEditor;