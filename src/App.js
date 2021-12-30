import { useState } from 'react';

function App() {

  const [url, setUrl] = useState();
  const [name, setName] = useState();

  const onChange = (e) => {
    if (e.target.files.length <= 0) return;
    const name = e.target.files[0].name.split('.')[0];
    const reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    reader.onload = async (e) => {
      setName(name+".txt");
      var file = new File([e.target.result], name+".txt", {
        type: "text/plain",
      });
      setUrl(URL.createObjectURL(file));
    };
  };

  return <div className="center">
    <div style={{width: "100%"}}>
      <label htmlFor="upload">Datei hochladen</label>
      <input type="file" name="upload" id="upload" accept=".html" onChange={onChange} />
    </div>
    {!!url && <a href={url} className="button" download={name}>
      Konvertieren
    </a>}
  </div>;
}

export default App;
