import { useState } from 'react';

function App() {
  const [enabled, setEnabled] = useState(false);

  const togglePesticide = () => {
    if (enabled) {
      console.log(document.getElementById('pesticide-style'));
      document.getElementById('pesticide-style')?.remove();
    } else {
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = '/pesticide.css'; // Ensure correct path
      style.id = 'pesticide-style';
      document.head.appendChild(style);
    }
    setEnabled(!enabled);
  };

  return (
    <button
      onClick={togglePesticide}
      className="p-1 w-6 h-6 bg-brand-500 text-white rounded text-sm"
    >
      🔨
    </button>
  );
}

export default App;
