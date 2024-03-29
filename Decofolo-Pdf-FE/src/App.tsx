import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

function App() {
  const [count, setCount] = useState(0)
  const converToPdf = async () => {
    const date = new Date();

    const canvas = await html2canvas(document.querySelector('#wrting')!);
    const imageFile = canvas.toDataURL('image/png');
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const widthRatio = pageWidth / canvas.width;
    const customHeight = canvas.height * widthRatio;
    doc.addImage(imageFile, 'png', 0, 0, pageWidth, customHeight);
    let heightLeft = customHeight;
    let heightAdd = -pageHeight;

    while (heightLeft >= pageHeight) {
      doc.addPage();
      doc.addImage(imageFile, 'png', 0, heightAdd, pageWidth, customHeight);
      heightLeft -= pageHeight;
      heightAdd -= pageHeight;
    }
    doc.save(
      `pdf${date.getFullYear()}-${date.getMonth() + 1
      }-${date.getDate()}.pdf`
    );
  };
  return (
    <div id='wrting'>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={converToPdf}>pdf</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
