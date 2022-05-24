import { useState, useEffect, useRef } from "react";
import Cat from  "./Cat";

export default function CatFinder() {
  const tagEl = useRef();
  const textEl  = useRef();
  const [tags, setTags] = useState([]);
  const [catData, setCatData] = useState({});
  useEffect(() => {
    async function getAndSetTags() {
      const resp = await fetch("https://cattas.com/api/tags");
      if (resp.ok) {
        const list = await resp.json();
        setTags(list);
      }
    }
    getAndSetTags();
  }, []);
  function findCat() {
    const tag = tagEl.current.value.toLowerCase();
    const text = textEl.current.value;
    if( tag && !tags.find( t => t.toLowerCase() === tag)){
      alert("Enter correct tag!");
      return;
    }
    setCatData({tag, text});
  }
  return(
    <div>
      <span>Category:</span>
      <input list="tagList" placeholder="Enter a picture tag" ref={tagEl}/>
      {}
      <datalist id="tagList">
        { tags.map(tag => <option>{tag}</option>)}
      </datalist>
      <br/>
      <span>Text:</span>
      <input placeholder="Enter text" ref={textEl}/>
      <br/>
      <button onClick={findCat}>Find a cat</button>
      <br/>
      {}
      <Cat {...catData}/>
    </div>
  );
}
