/* eslint-disable no-undef */
let validContentType=(data)=>{return new Promise((resolve,reject)=>{
    const data="Some data";
    try{
        let url=window.location.pathname
        let content_type=url.split('/')[4]
        let stackId=url.split('/')[2]
        axios.get('/v3/content_types',{headers:{ "api_key":stackId}})
        .then((response)=>{
            response.data.content_types.forEach((e)=>{
                if(e.uid === content_type){
                    resolve({valid:true,data:data});
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
