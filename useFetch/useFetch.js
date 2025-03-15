import { useEffect, useState } from "react"

const localCache = {

}


export const useFetch = (url) => {
    const [state, setState] =  useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null
    });

    useEffect(() =>{
        getFetch();
    }, [url]);

    const setLoadingState = () =>{
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null
        })
    }

    const getFetch = async() => {
        setLoadingState();

        if (localCache[url]){
            console.log('usando caché');
            setState({
                data: localCache[url],
                isloading: false,
                hasError: false,
                error: null
            });

            return;
        }


        const respo = await fetch(url);

        //sleep
         await new Promise(resolve => setTimeout(resolve, 1500));

        if (!respo.ok){
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: respo.status,
                    message: respo.statusText
                }
            });

            return;
        }

        const data = await respo.json();
        setState({
            data,
            isLoading: false,
            hasError: false,
            error: null
        });

        // manejo del caché
        localCache[url] = data;

        // console.log({data});
    }

    return {
        data: state.data,
        isloading: state.isLoading,
        hasError: state.hasError,
    }
}


