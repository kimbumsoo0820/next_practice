"use client"
import Link from "next/link";
import { useParams,useRouter } from "next/navigation";

//원래 아래 control은 최상단 layout.tsx에 있던 코드였으나, useParam(클라이언트 컴포넌트 훅)을 사용하기 위해
// 따로 파일로 분리함. ( 분리할 때 전구모양 누르고 파일로 분리 하면 빠르게 가능 )

export function Control() {
  const router = useRouter()
  const params = useParams()
  const id = params.id

  function onClickDelete() {
    const options = {
      method:'DELETE'
    }
    fetch(process.env.NEXT_PUBLIC_API_URL+'topics/'+id,options)
    .then(res => res.json())
    .then(result => {
      router.push('/')
      router.refresh()
    })
  }

  return (
    <ul>
      <li><Link href="/create">Create</Link></li>
      {id ? 
      <>
        <li><Link href={"/update/"+id}>Update</Link></li>
        <li><input type="button" value="delete" onClick={()=> {onClickDelete()}} /></li>  
      </> 
      : null}
    </ul>
  );
}
