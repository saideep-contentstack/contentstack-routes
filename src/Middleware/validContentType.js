/* eslint-disable no-undef */
let validContentType=()=>{return new Promise((resolve,reject)=>{
    try{
        let url=window.location.pathname
        let content_type=url.split('/')[4]
        let stackId=url.split('/')[2]
        axios.get('/v3/content_types',{headers:{ "api_key":stackId}})
        .then((response)=>{
            response.data.content_types.forEach((e)=>{
                if(e.uid === content_type){
                    resolve(true)
                }
        })
        reject(false)
        }).catch((error)=>{
            reject(false);
        })
    }catch{
        reject(false)
    }
})
}
export default validContentType;
