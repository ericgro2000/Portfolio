import { useEffect, useRef } from 'react';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ isOpen, onClose }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Disable scrolling
      document.body.classList.add('no-scroll');
      // Create and load the game iframe
      if (iframeRef.current) {
        iframeRef.current.src = '/game.html'; // Ensure this path points to an HTML file that includes the game script
        iframeRef.current.style.width = '100%';
        iframeRef.current.style.height = '100%';
      }
    } else {
      // Enable scrolling
      document.body.classList.remove('no-scroll');
    }

    // Clean up when modal is closed
    return () => {
      if (iframeRef.current) {
        iframeRef.current.src = ''; // Remove the src to unload the iframe content
      }
      document.body.classList.remove('no-scroll'); // Ensure scrolling is re-enabled
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

        {/* Game iframe */}
        <iframe
          ref={iframeRef}
          title="Game"
          style={{ width: '100%', height: '100%', border: 'none' }}
        ></iframe>
      </div>
    </div>
  );
};

export default GameModal;
