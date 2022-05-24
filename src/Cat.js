import {useEffect, useState } from "react";

export default function Cat ({ tag, text }) {
    const [img, setImg] = useState(null);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const getCat = async () => {
            const tagParam = tag ? "/"+tag : "";
            const textParam = text ? "/s/"+encodeURIComponent(text) : "";
            const resp = await fetch(`https://cataas.com/c${tagParam}${textParam}?json=true`)
            if(!resp.ok){
                alert("Error happened :(");
                return;
            }
            const data = await resp.json();
            setImg(data.url);
            setTags(data.tags);
        }
        setImg(null);
        getCat();
    }, [tag, text]);

    if(!img) return;
    return(
        <div>
            <img src={"https://cataas.com" + img} alt={tags.join(", ")}/>
            <br/>
            Tags: { tags.length ? tags.map( s => "#"+s).join(", ") : "No tags"}
        </div>
    )
} 