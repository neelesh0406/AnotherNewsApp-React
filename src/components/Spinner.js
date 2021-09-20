import React from 'react'
import loader from './loading.gif'

export default function Spinner (){
        return (
            <div className="text-center" style={{transform: "scale(.5)", margin: "-10px 0"}}>
                <img src={loader} alt="loading" />
            </div>
        )
}
