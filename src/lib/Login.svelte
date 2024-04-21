<script>
	import { enhance } from '$app/forms';
	export let authData = {
		authMethod: 'username',
		password: 'password'
	};
	export let loginApi = '/login';
	export let signupApi = '/signup';
	// let email = '';
	// let password = '';

	// function validate(event) {
	// 	console.log('handleSubmit called');
	// 	console.log(event);
	// 	return;
	// 	const response = event.response;

	// 	if (response.ok) {
	// 		console.log(response);
	// 		alert('Logged in!');
	// 		// Handle successful login
	// 	} else {
	// 		const data = 'false';
	// 		alert(`Login failed: ${data}`);
	// 		// Handle error
	// 	}
	// }
	import Container from '$lib/container.svelte';
	import * as Tabs from '$lib/components/ui/tabs/index';
	import * as Card from '$lib/components/ui/card/index';
	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import { toast } from "svelte-sonner";
</script>

<!-- <form action="/user?/updateInfo" method="post" 
        use:enhance={({ formData}) => {

          return async ({ result, update }) => {
            if (result.type === "success" && result.data) {
              console.log("submitted data with success");
              let newClient = result.data.body;
              // console.log("returned client data: " + JSON.stringify(newClient));
              // $clients = [...$clients, newClient];
              update();
              toast("info updated succesfuly")
            }
            else {
                toast("client creation failed", {
                description: result.data.message,
                // action: {
                //   label: "Undo",
                //   onClick: () => console.log("Undo")
                // }
              })
              console.log("error: " + JSON.stringify(result));
            }
          };
        }}> -->

<div class="flex min-h-full flex-col justify-center px-6 py-8 lg:px-8">
	<div class="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">

		<Tabs.Root value="login" class="w-full">
			<Tabs.List class="grid w-full grid-cols-2">
				<Tabs.Trigger value="login">Log in</Tabs.Trigger>
				<Tabs.Trigger value="sign in">Sign in</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="login">
				<Card.Root>
					<form action={loginApi} method="post"
					use:enhance={({ formData}) => {
			
						return async ({ result, update }) => {
						if (result.type === "failure") {
							toast("credentials are incorrect", {
								type: "error",
							})
						}
						else {
							update();
						}
						};
					}}>	
						<Card.Header>
							<Card.Title>Log in</Card.Title>
							<Card.Description>log in to your account</Card.Description>
						</Card.Header>
						<Card.Content class="space-y-2">
							<div class="space-y-1">
								<Label for={authData.authMethod}>Username</Label>
								<Input
									placeholder="username"
									id={authData.authMethod}
									name={authData.authMethod}
									type="text"
									autocomplete={authData.authMethod}
								/>
							</div>
							<div class="space-y-1">
								<Label for={authData.password}>Password</Label>
								<Input
									placeholder="password"
									id={authData.password}
									name={authData.password}
									type="password"
									autocomplete={authData.password}
								/>
							</div>
						</Card.Content>
						<Card.Footer>
							<Button type="submit" class="w-full">log in</Button>
						</Card.Footer>
					</form>
				</Card.Root>
			</Tabs.Content>
			<Tabs.Content value="sign in">
				<Card.Root>
					<form action={signupApi} method="post"
					use:enhance={({ formData}) => {
						return async ({ result, update }) => {
						if (result.type === "failure") {
							toast("credentials are incorrect", {
								type: "error",
							})
						}
						else {
							update();
						}
						};
					}}>		
						<Card.Header>
							<Card.Title>Sign in</Card.Title>
							<Card.Description>create acount</Card.Description>
						</Card.Header>
						<Card.Content class="space-y-2">
							<div class="space-y-1">
								<Label for={authData.authMethod}>Username</Label>
								<Input
									placeholder="username"
									id={authData.authMethod}
									name={authData.authMethod}
									type="text"
									autocomplete={authData.authMethod}
								/>
							</div>
							<div class="space-y-1">
								<Label for={authData.password}>Password</Label>
								<Input
									placeholder="password"
									id={authData.password}
									name={authData.password}
									type="password"
									autocomplete={authData.password}
								/>
							</div>
						</Card.Content>
						<Card.Footer>
							<Button type="submit" class="w-full">sign in</Button>
						</Card.Footer>
					</form>
				</Card.Root>
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>
