/* eslint-disable no-undef */
let validStackId=()=>{return new Promise((resolve,reject)=>{
    try{
        let url=window.location.pathname
        let stackId=url.split('/')[2]
        axios.get('/stacks')
        .then((response)=>{
            response.data.stacks.forEach((e)=>{
                if(e.api_key===stackId){
                    resolve(true);
                }
            })
            reject(false);
        }).catch((error)=>{
            reject(false);
        })
    }catch{
        reject(false);
    }
})
}
export default validStackId;
