/* eslint-disable no-undef */
let validStackId=()=>{return new Promise((resolve,reject)=>{
    try{
        let url=window.location.pathname
        let stackId=url.split('/')[2]
        axios.get('/stacks')
        .then((response)=>{
            let api_key;
            response.data.stacks.forEach((e)=>{
                if(e.api_key===stackId){
                    api_key=true;
                }
            })
            if(api_key) resolve(true);
            else reject(false);
        })
    }catch{
        reject(false);
    }
})
}
export default validStackId;