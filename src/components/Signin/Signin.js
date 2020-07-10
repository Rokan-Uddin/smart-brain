import React from 'react';
class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state ={
			signInEmail: '',
			signInPassword : ''
		}
	}
	onEmailChange = (event)=> {
		this.setState({ signInEmail:event.target.value });
	}
	onPasswordChange = (event)=> {
		this.setState({signInPassword:event.target.value});
	}
	onSubmitSignIn =() => {
		fetch('http://localhost:3000/login', {
			method:'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
				email:this.state.signInEmail,
				password:this.state.signInPassword
			})
		})
		.then(response => response.json())
      .then(user => {
        if(user.id){
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      })		
		
	}
	render() {
		const { onRouteChange} =this.props;
	return (
		<article className="br3 shadow-3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l  center">
		<main className="pa1 black-80">
			<div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f4 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
				        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email"  id="email-address" />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
				      </div>
				      <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
				    </fieldset>
				    <div className="">
				      <input 
				      onClick= { this.onSubmitSignIn } 
				      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      type="submit" 
				      value="Sign in" />
				    </div>
				    <div className="lh-copy mt3">
				      <p href="#0" 
						onClick= { () => onRouteChange('register') }
				      className="f6 link dim black db">Register</p>
				    </div>
			</div>
		</main>
		</article>	
		);
	}

}
export default Signin;