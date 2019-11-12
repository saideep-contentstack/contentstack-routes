/* eslint-disable no-undef */
import React, {Fragment} from 'react';
import {Link,Switch,Redirect} from 'react-router-dom';
import RouteWithSubRoutes from '../RouteWithSubRoutes/RouteWithSubRoutes';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
 export default class Entries extends React.Component{
     constructor(props){
         super(props)
         this.state={
             stackUid:true,
             contentType:true,
             r:<LoadingComponent/>,
              isauth:false,
             render:<LoadingComponent/>
            }
            this.logoutHandler=this.logoutHandler.bind(this);
     }
     async logoutHandler () {
        let result = await axios.delete ('/user-session');
        this.setState ({isauth: false, render: <Redirect noThrow to="/login" />});
      }
     async componentDidMount(){
         try{
        let r=[]
        let url=window.location.pathname;
        let stackId=url.split('/')[2]
        const callApi=async ()=>{
                let content_type=window.location.pathname.split('/')[4];
                let result1=await axios.get('/v3/content_types',
                                    {headers:{
                                        "api_key":stackId
                                    }});
                try{
                    var result=await axios.get(`/v3/content_types/${content_type}/entries`,
                                    {headers:{
                                        "api_key":stackId
                                    }});
                }catch{
                    console.log("Error fetching entries")
                }
                result1.data.content_types.forEach((e,i)=>{
                        if(e.options.singleton&& (e.uid===content_type)) {
                            if(result){
                                if(result.data.entries.length===0){
                                    this.setState({isauth:false,render:<Redirect to={`/stack/${stackId}/content-type/${content_type}/en-us/entry/create`}/>})
                                    }
                            else{
                                let entryUid=result.data.entries["0"].uid
                            this.setState({isauth:false,render:<Redirect to={`/stack/blt7b4423f85ca9cec0/content-type/${content_type}/en-us/entry/${entryUid}/edit`}/>})
                        }
                        }
                }});
                if(result){
            result.data.entries.forEach((e,i)=>{
                r.push(<tr key={i}>
                    <td><Link to={`/stack/${stackId}/content-type/${content_type}/en-us/entry/${e.uid}/edit`}>{e.title}</Link></td>
                    <td>{e.description}</td>
                    <td>{e.updated_at}</td>
                </tr>)
            })
        }
            this.setState({isauth:true,r:r})
        }
        try{
        callApi()
        }catch{
            console.log("Error at api")
        }
         }catch{
             console.log("from catch");
         }
    }

 render(){
    let t=this.state.render
    if(this.state.isauth){
        return(
            <div>

            <div className="message-display">Entries</div>
            <br />
            <table>
                <thead>
                    <tr>
                     <td>Title</td>
                     <td>Description</td>
                     <td>Updated at</td>
                    </tr>
                </thead>
                <tbody>
                {this.state.r}
                </tbody>
                <tfoot></tfoot>
            </table>
            {this.props.routes?
           <Switch>
           {this.props.routes.map (route => {
                    return <RouteWithSubRoutes key={route.path} {...route} />
                })}
           </Switch>:null}
        </div>
        )
}
    else{
        return(
            <Fragment>
                {t}
            </Fragment>
        )
    }
}
 }