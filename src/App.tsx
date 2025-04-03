import './App.css'
import './AppMediaQuery.css'
import { Footer } from './components/footer/footer';
import Menu from './components/header/menu';
import AppRoute from './Routes';

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
        <AppRoute></AppRoute>
        </div>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App;
