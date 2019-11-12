import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import alreadyLoggedIn from '../../Middleware/alreadyLoggedIn';
import validStackId from '../../Middleware/validStackId';
import validContentType from '../../Middleware/validContentType';
import validEntryId from '../../Middleware/validEntryId';
import NotFound from '../NotFound/NotFound';

class RouteWithSubRoutes extends React.Component {
  state = {
    render: <div className="loading"><img alt="" title="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAeFBMVEX////uVkTzWEbvVEL+8e/3g3X3Z1b6e2z72dX84N395+TwZFP+9PL71M/4uLH2m5D4bVz++Pj4YE76mo72fW/2Y1H97OrxW0nzb1/4ta30hXf5xsH0jYH5wrz6raT0c2T6zMf5opj6qZ/1lIj5r6f0iHz6vrb6xcBtYZOlAAADwUlEQVR4nO3di3KiQBAFUAVRQHyMAUXUiM/8/x9uBPGRNbXVPZ2aDntPVbYMtZC5ZZC2mTGdDgAAAAAAAAAAAAAAAMAvFZ3HFB9z1wP+xmjQJVmslSaZ+LQg3cWH6yG/ZNbUIN2x6zG/ZE4tCZK0JkjRkiC9oCVB6M/IYuN6zK+NM48mjV0P+TWzmZDsI9cjBoB/i85MZeJ66E/KfMaUTTQlMQfyVfymP3I9+geMuup+PV+5Hv0DBEGQH9KaIIz3Hjez0vXoHx1nxJL9rlBVvCfnNyZ1xbthcj1ugJ8Sj2xEas6NMu3byI9KkiSBx74CXnhaivd5bpVDTzNunts9IwgiDUG0BeltbYMoeRdi3jzfykBL0RvvAhvr0nWAu54NJdd1gB/Ui2zMryeJiWn7yTe8R+nQRr6skiT7KW2/tXTLJSksy/hpeDnMJqPutxcOIlTGv1P7ev5a+IVbqNZCEARpbRD7Mr6a9nd0HsQc2N33Wl6V8WWfut9SNkenE70NbAT1PEwzTreU3dJ9TzpIx1iV8bdSI0H5D/+JXsjUNCFMxD2C6PkfnaZM22tB/55zj3CSbMhM2NfHa0FfZvwjTORy2E8YWLL37/qF3PtGt0ECubMEQUSCpHILaNwGGch1JGwm1dRBxvwgXcEgNs35uqAfTdkH8A6CpWR8YBf09Y0Scw64RziI3qEwMdPtFWfOPQJKe/i9EhLD2+3bw4jpvackxUc1BrMpaPt9sRNfKLukTtisC/pwSm0RPZvtpFtf9CWu58t+Ntf4Cy8VvhvEXeJqUXXVQQZtCbIVbuJxl7giSBMkF37Z4q7VtQ3SlQ7yWdrTBuD3y8t+JfUG6RdeIH0POwqGWdbvX77qfz+/suy2KWu2NtuH++st62H2OCH1+k1Wux6h3po9/Zfrz0lL4Rzk7mMzF5jfc6wo/QQMAEF2N8Ncj/5udbKaZbjXcraHObsxVHeHpMt4LnVlPJe6Mp5LXfXLhSBNEOnql0tdGc+14t8WrZ8R8TKeKdlNrdah/UAZz2RCq5WBqtYwAwgy3Pa764E/M+W6uAiComgeVI9vG6pH9+9uTkclV/JamLPb74uj68E/sije/ZOSNyCVJX/GgeRcFHsIIjupxl57grBziM4Osrfi9+C9QtM5kuyafjvZtnQ9+Cf84l3TLxYAfCPckT5Jd1dqqg8fhFtiyd7X+dHy9MLEl5xRKsj9OkQhCKINgmgzpjbefcFlSJLiYkELMlDyQWl/iTekv35z1vKJQwAAAAAAAAAAAAAAAABkfwBEa7Asj/kFGgAAAABJRU5ErkJggg=="/><p>Loading...</p></div>
  };
  async componentDidMount () {
    let url=this.props.location.pathname;
    let stackId=url.split('/')[2]
    let contentType=url.split('/')[4]
    let entryId=url.split('/')[7]
    let render=""

    if(await alreadyLoggedIn(url)){
      if(stackId){
        if(validStackId(url)){
          if(contentType){
            if(await validContentType(url)){
              if(entryId){
                if(await validEntryId(url)){
                  render=<Route path={this.props.path} render={props => {return (
                    <this.props.component {...props} routes={this.props.routes} />
                    );}}/>
                }else{
                  render=<Route path={this.props.path} render={props => {return (
                    <NotFound {...props}/>
                    );}}/>
                }
              }else{
                render=<Route path={this.props.path} render={props => {return (
                    <this.props.component {...props} routes={this.props.routes} />
                    );}}/>
              }
            }else{
              render=<Route path={this.props.path} render={props => {return (
                    <NotFound {...props}/>
                    );}}/>
            }
          }else{
            render=<Route path={this.props.path} render={props => {return (
              <this.props.component {...props} routes={this.props.routes} />
              );}}/>
          }
        }else{
          render=<Route path={this.props.path} render={props => {return (
                    <NotFound {...props}/>
                    );}}/>
        }
      }else{
        render=<Route path={this.props.path} render={props => {return (
          <this.props.component {...props} routes={this.props.routes} />
          );}}/>
      }
    }else{
      if(this.props.location.pathname==="/login"){
        render=<Route path={this.props.path} render={props => {return (
          <this.props.component {...props} routes={this.props.routes} />
          );}}/>
      }else{
        render=<Redirect to="/login" />
      }
    }
    this.setState({
      render:render
    })

  }
    render () {
      let t = this.state.render;
      return (
        <React.Fragment>
          {t}
        </React.Fragment>
      );
    }
  }
export default RouteWithSubRoutes;
