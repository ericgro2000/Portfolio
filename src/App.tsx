
import Hero from './widgets/Navbar/Hero'
import Navbar from './widgets/Navbar/Navbar'
import {AnimationManager} from  './shared/lib/animator'
import About from './features/About'

// export const animatorManager = new AnimationManager

function App() {

  return (
    <main className="max-w-7xl mx-auto relative">
    <Navbar />
    <Hero/>
    <About />
  </main>
  )
}

export default App
