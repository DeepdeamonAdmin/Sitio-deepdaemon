import {useEffect, useState } from 'react'

export const useGet = (getFuncion, status) => { 
    
    const [state, setstate] = useState({
        data:[],
        loading: true
    })

    useEffect( () => {
        getFuncion(status)
            .then( data => {
                setstate({
                    data: data,
                    loading:false}
                );
            })            
     }, [getFuncion])

    return state;//data[], loading: true
}