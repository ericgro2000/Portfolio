
import Hero from './widgets/Navbar/Room'
import Navbar from './widgets/Navbar/Navbar'
import {AnimationManager} from  './shared/lib/animator'
import About from './features/About'
import Projects from './widgets/Navbar/Projects'

// export const animatorManager = new AnimationManager

function App() {

  return (
    <main className="max-w-7xl mx-auto relative">
    <Navbar />
    <Hero />
    <About />
    <Projects />
  </main>
  )
}

export default App
