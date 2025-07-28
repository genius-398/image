
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { TabButton } from './components/TabButton';
import { PromptInput } from './components/PromptInput';
import { SizeSelector } from './components/SizeSelector';
import { ImageUploader } from './components/ImageUploader';
import { GenerateButton } from './components/GenerateButton';
import { Loader } from './components/Loader';
import { ImageGrid } from './components/ImageGrid';
import { GenerationMode, ImageSizeOption } from './types';
import { generateTextToImage, generateImageToImage } from './services/geminiService';
import { IMAGE_SIZE_OPTIONS } from './constants';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mode, setMode] = useState<GenerationMode>(GenerationMode.TEXT_TO_IMAGE);
  const [prompt, setPrompt] = useState<string>('');
  const [size, setSize] = useState<ImageSizeOption>(IMAGE_SIZE_OPTIONS[0]);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setTheme('light');
    }
  };

  const handleGenerate = useCallback(async () => {
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }
    if (mode === GenerationMode.IMAGE_TO_IMAGE && !uploadedImage) {
      setError('Please upload an image for image-to-image generation.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      let result: string[] | null = null;
      if (mode === GenerationMode.TEXT_TO_IMAGE) {
        result = await generateTextToImage(prompt, size.aspectRatio);
      } else if (uploadedImage) {
        result = await generateImageToImage(prompt, uploadedImage);
      }
      if (result) {
        setGeneratedImages(result);
      } else {
        setError('Failed to generate image(s). The result was empty.');
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      console.error(errorMessage);
      setError(`Failed to generate images. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, size, mode, uploadedImage]);

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text font-sans transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">VibeGen AI</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">Unleash your imagination with the boldest image AI</p>
        </div>

        <div className="max-w-3xl mx-auto bg-light-surface dark:bg-dark-surface p-6 md:p-8 rounded-2xl shadow-lg">
          <div className="flex justify-center border-b border-gray-200 dark:border-gray-700 mb-6">
            <TabButton isActive={mode === GenerationMode.TEXT_TO_IMAGE} onClick={() => setMode(GenerationMode.TEXT_TO_IMAGE)}>Text to Image</TabButton>
            <TabButton isActive={mode === GenerationMode.IMAGE_TO_IMAGE} onClick={() => setMode(GenerationMode.IMAGE_TO_IMAGE)}>Image to Image</TabButton>
          </div>

          <div className="space-y-6">
            {mode === GenerationMode.IMAGE_TO_IMAGE && (
              <ImageUploader uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} />
            )}
            <PromptInput prompt={prompt} setPrompt={setPrompt} placeholder={mode === GenerationMode.TEXT_TO_IMAGE ? "e.g., A futuristic cyberpunk city at night, neon lights, flying cars..." : "e.g., Transform into a watercolor painting..."}/>
            {mode === GenerationMode.TEXT_TO_IMAGE && <SizeSelector selectedSize={size} setSelectedSize={setSize} />}
            <GenerateButton onClick={handleGenerate} isLoading={isLoading} />
          </div>
        </div>
        
        {error && (
            <div className="max-w-3xl mx-auto mt-6 bg-red-100 dark:bg-red-900/20 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
            </div>
        )}

        {isLoading && <div className="flex justify-center mt-12"><Loader /></div>}
        
        {!isLoading && generatedImages.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-center mb-6">Your Creations</h2>
            <ImageGrid images={generatedImages} />
          </div>
        )}

      </main>
      <footer className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
        <p>Powered by Google Gemini. Designed by a World-Class AI Engineer.</p>
      </footer>
    </div>
  );
};

export default App;
