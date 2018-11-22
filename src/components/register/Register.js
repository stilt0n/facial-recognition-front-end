import React from 'react';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			registerUserName: '',
			registerEmail: '',
			registerPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({registerEmail: event.target.value});
	}

	onUserNameChange = (event) => {
		this.setState({registerUserName: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({registerPassword: event.target.value});
	}

	onSubmitSignIn = (route) => {
		fetch('https://agile-oasis-19176.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.registerUserName,
				email: this.state.registerEmail,
				password: this.state.registerPassword
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user) {
				this.props.loadUser(user);
				this.props.onRouteChange(route);
			}
		})
	}

	render() {
		return (
				<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center glass">
					<main className="pa4 black-80">
					  <div className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f1 fw6 ph0 mh0">Register</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
					        <input 
					        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        	type="text" 
					        	name="name"  
					        	id="name"
					        	onChange={this.onUserNameChange}
					        />
					      </div>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input 
					        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        	type="email" 
					        	name="email-address"  
					        	id="email-address"
					        	onChange={this.onEmailChange}
					        	/>
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input 
					        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        	type="password" 
					        	name="password"  
					        	id="password"
					        	onChange={this.onPasswordChange}
					        	/>
					      </div>
					    </fieldset>
					    <div className="">
					      <input
					      onClick={() => this.onSubmitSignIn('homepage')} 
					      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
					      type="submit" 
					      value="Register"
					      />
					    </div>
					  </div>
					</main>
				</article>
		);
	}
}

export default Register;