import Image from "next/image";
import logoImage from '../../public/비튜브 로고.jpg'

export default function Home() {
  return (
    <>
    <div>
      <Image width={100} height={100} src={logoImage} alt="" />
      <div >
        hello bee
      </div>
    </div>
    </>
  );
}
