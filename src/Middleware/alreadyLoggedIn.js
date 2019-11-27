/* eslint-disable no-undef */
const alreadyLoggedIn =(data)=>{return new Promise((resolve,reject)=>{
    const data="Some data"
    try{
        axios.get(`/user`)
        .then((response)=>{
            if(response.status===200) resolve({valid:true,data:data})
            else reject(false)
        }).catch((error)=>{
            reject(false)
        })
    }
    catch{
        reject(false)
    }
})
}
export default alreadyLoggedIn;
