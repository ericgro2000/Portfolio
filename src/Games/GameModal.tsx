import { useEffect, useRef } from 'react';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ isOpen, onClose }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');

      if (iframeRef.current) {

        const randomGame = Math.floor(Math.random() * 4);

        let gamePath = '';
        switch (randomGame) {
          case 0:
            gamePath = '/games/snake/game.html';
            break;
          case 1:
            gamePath = '/games/tetris/game.html';
            break;
          case 2:
            gamePath = '/games/ttfe/game.html'; 
            break;
          case 3:
            gamePath = '/games/minesweeper/game.html';
            break;
          default:
            gamePath = '/games/tetris/game.html'; 
        }

        iframeRef.current.src = gamePath;
      }
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      if (iframeRef.current) {
        iframeRef.current.src = '';
      }
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-0 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <img src="assets/close.svg" alt="close" className="w-6 h-6" />
        </button>

        <iframe
          ref={iframeRef}
          title="Game"
          className="w-[90vw] h-[90vw] max-w-[41rem] max-h-[41rem] sm:w-[40rem] sm:h-[40rem] lg:w-[50rem] lg:h-[50rem] border-none block mx-auto"
        ></iframe>
      </div>
    </div>
  );
};

export default GameModal;
