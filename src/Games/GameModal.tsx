import { useEffect, useRef } from 'react';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ isOpen, onClose }) => {
  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGameStyles = () => {
      if (!document.getElementById('game-styles')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'snakeStyle.css'; // Path to your CSS file
        link.id = 'game-styles';
        document.head.appendChild(link);
      }
    };

    const removeGameStyles = () => {
      const existingLink = document.getElementById('game-styles');
      if (existingLink) {
        document.head.removeChild(existingLink);
      }
    };

    const loadGameScript = () => {
      const existingScript = document.getElementById('game-script');
      if (existingScript) {
        existingScript.remove(); // Remove existing script if it exists
      }

      const script = document.createElement('script');
      script.src = '/snake.js'; // Ensure this path is correct
      script.id = 'game-script';
      script.async = true;
      gameContainerRef.current?.appendChild(script); // Append to the game container
    };

    if (isOpen && gameContainerRef.current) {
      loadGameStyles();
      loadGameScript();
    }

    // Clean up styles and game when modal is closed
    return () => {
      removeGameStyles(); // Remove the injected CSS
      const existingScript = document.getElementById('game-script');
      if (existingScript) {
        existingScript.remove(); // Remove the script when modal is closed
      }
    };
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
        <div id="game-board" ref={gameContainerRef} style={{ width: '100%', height: '100%' }}></div>
      </div>
    </div>
  );
};

export default GameModal;

