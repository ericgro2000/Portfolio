
import Room from './widgets/Navbar/Room'
import Navbar from './widgets/Navbar/Navbar'
// import {AnimationManager} from  './shared/lib/animator'
import About from './features/About'
import Projects from './widgets/Navbar/Projects'
import WorkExperience from './widgets/Navbar/WorkExpirience'
import GameModal from './Games/GameModal'
import { useState } from 'react'

// export const animatorManager = new AnimationManager

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="max-w-7.5xl mx-auto relative">
    <Navbar openGameModal={openModal} />
    <Room />
    <About />
    <WorkExperience />
    <GameModal isOpen={isModalOpen} onClose={closeModal} />
  </main>
  )
}

export default App
