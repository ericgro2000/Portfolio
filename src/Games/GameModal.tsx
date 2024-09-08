import { useEffect, useRef } from 'react';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ isOpen, onClose }) => {
  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGameStyles = () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'snakeStyle.css'; // Path to your CSS file
      link.id = 'game-styles'; // Give it an ID to identify later
      document.head.appendChild(link);
    };

    const removeGameStyles = () => {
      const existingLink = document.getElementById('game-board');
      if (existingLink) {
        document.head.removeChild(existingLink);
      }
    };

    if (isOpen && gameContainerRef.current) {
      const gameDiv = document.getElementById('game-board');
      
      if (gameDiv) {
        // Load the CSS
        loadGameStyles();

        // Load and initialize the game
        const script = document.createElement('script');
        script.src = '/snake.js';
        script.async = true;
        gameDiv.appendChild(script);
      }

      // Clean up styles and game when modal is closed
      return () => {
        if (gameDiv) {
          gameDiv.innerHTML = ''; // Clear the game
        }
        removeGameStyles(); // Remove the injected CSS
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[70vw] h-[70vh] p-6 relative rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          X
        </button>

        {/* Game container where the game will be loaded */}
        <div id="game-board" ref={gameContainerRef}></div>
      </div>
    </div>
  );
};

export default GameModal;
