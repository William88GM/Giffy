import { petition } from "../Servicios/call_API"

export function Home(){
    const trends = petition()
    return(<>
        <h1>Giffy</h1>
        {
            trends.map((elem)=>{
                <img ></img>
            })
        }
    </>
    )
}