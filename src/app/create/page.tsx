"use client"

// import { useRouter } from "next/router"; // next 12버전에서 사용하는 라우터
// 앱 라우터 사용하려면 아래와 같이 navigation에서 가져와야함 ***
import { useRouter } from "next/navigation";

 // 사용자와 상호작용 하는 
export default function Create() {
    const router = useRouter()
    return (
        // onClick같은 사용자와 상호작용은 클라이언트 컴포넌트에서 가능
        <form onSubmit={(e : any) => {
            e.preventDefault(); // input의 submit타입이 눌렸을 때의 url변경 방지 (서버로 값 전송하기 위해 주소가 바뀜)
            const title : string = e.target.title.value
            const body : string = e.target.body.value
            const options = {
                method:'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({title, body})
            }
            fetch(process.env.NEXT_PUBLIC_API_URL+`topics`, options)
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                const lastId = result.id
                router.push(`/read/${lastId}`)
                router.refresh()
            })
        }}> 
            <p>
                <input type="text" name="title" placeholder="title" />
            </p>
            <p>
                <textarea name="body" placeholder="body" ></textarea>
            </p>
            <p>
                <input type="submit" value="create"/>
            </p>
        </form>
    )
}