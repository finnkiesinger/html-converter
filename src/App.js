import { useState } from 'react';

function getText(html) {
  let div = document.createElement('div');
  div.innerHTML = html;
  const text = div.textContent || div.innerText || '';
  const lines = text.split('\n');
  let formattedText = '';
  for (let line of lines) {
    let formattedLine = line.trim();
    if (formattedLine.length > 0) formattedText += (formattedLine+'\n');
  }

  return formattedText;
}

function App() {

  const [files, setFiles] = useState([]);

  const onChange = (e) => {
    function readFile(index, array) {
      if (index >= e.target.files.length) {
        console.log(array);
        setFiles(array);
        return;
      }
      const name = e.target.files[index].name.split('.')[0];
      const reader = new FileReader();
      reader.readAsText(e.target.files[index]);
      reader.onload = (e) => {
        var file = new File([getText(e.target.result)], name+".txt", {
          type: "text/plain",
        });
        const fileObject = {
          name: name+'.txt', 
          url: URL.createObjectURL(file)
        }
        readFile(index+1, [...array, fileObject]);
      };
    }
    readFile(0, []);
  };

  return <div className="center">
    <div style={{width: "100%"}}>
      <label htmlFor="upload">Dateien hochladen</label>
      <input type="file" name="upload" id="upload" accept=".html" multiple onChange={onChange} />
    </div>
    {!(files.length === 0) && files.map(f => <a key={f.url} href={f.url} className="button" download={f.name}>
      Konvertieren ({f.name})
    </a>)}
  </div>;
}

export default App;
