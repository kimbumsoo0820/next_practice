"use client"

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Update() {
    const [title,setTitle] = useState<string>('');
    const [body,setBody] = useState<string>('');
    const router = useRouter()
    const params = useParams()
    const id = params.id

    useEffect(() => {
        fetch('http://localhost:9999/topics/'+id)
        .then(resp => resp.json())
        .then((result) => {
            console.log(result)
            setTitle(result.title)
            setBody(result.body)
        })
    }, [])


    return (
        <form onSubmit={(e : any) => {
            e.preventDefault(); // input의 submit타입이 눌렸을 때의 url변경 방지 (서버로 값 전송하기 위해 주소가 바뀜)
            const title : string = e.target.title.value
            const body : string = e.target.body.value
            const options = {
                method:'PATCH',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({title, body})
            }
            fetch(`http://localhost:9999/topics/`+id, options)
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                const lastId = result.id
                router.push(`/read/${lastId}`)
                router.refresh()
            })
        }}> 
            <p>
                <input type="text" name="title" placeholder="title" value={title} onChange={e => setTitle(e.target.value)} />
            </p>
            <p>
                <textarea name="body" placeholder="body" value={body} onChange={e => setBody(e.target.value)} ></textarea>
            </p>
            <p>
                <input type="submit" value="update"/>
            </p>
        </form>
    )
}