<script>
  import { enhance } from '$app/forms';
    export let authData  = {
      authMethod: "username",
      password: "password"
    };
    // export let ApiPath = "/login";
    // let email = '';
    // let password = '';

    function validate(event) {
      console.log('handleSubmit called');
        const response = {
            ok: true}; 

        if (response.ok) {
            alert('Logged in!');
            // Handle successful login
        } else {
            const data = "false"
            alert(`Login failed: ${data}`);
            // Handle error
        }
    }
    import Container from '$lib/container.svelte';
    import * as Tabs from '$lib/components/ui/tabs/index';
    import * as Card from '$lib/components/ui/card/index';
    import { Button } from '$lib/components/ui/button/index';
    import { Input } from '$lib/components/ui/input/index';
    import { Label } from '$lib/components/ui/label/index';

</script>

<Container>
  <Tabs.Root value="login" class="w-full">
    <Tabs.List class="grid w-full grid-cols-2">
      <Tabs.Trigger value="login">Log in</Tabs.Trigger>
      <Tabs.Trigger value="sign in">Sign in</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="login">
      <Card.Root>
        <form action="/login" method="post" on:submit|preventDefault={validate} use:enhance>
        <Card.Header>
          <Card.Title>Log in</Card.Title>
          <Card.Description>
            log in to your account
          </Card.Description>
        </Card.Header>
        <Card.Content class="space-y-2">
            <div class="space-y-1">
              <Label for="{authData.authMethod}">Username</Label>
              <Input placeholder="username" id={authData.authMethod} name={authData.authMethod} type="text" autocomplete={authData.authMethod} />
            </div>
            <div class="space-y-1">
              <Label for="{authData.password}">Password</Label>
              <Input placeholder="username" id={authData.password} name={authData.password} type="password" autocomplete={authData.password} />
            </div>
          </Card.Content>
          <Card.Footer>
            <Button type="submit" class="w-full" on:click={()=> console.log("clicked")}>log in</Button>
          </Card.Footer>
        </form>
      </Card.Root>
    </Tabs.Content>
    <Tabs.Content value="sign in">
      <Card.Root>
        <form action="/signup" method="post" on:submit|preventDefault={validate} use:enhance>
        <Card.Header>
          <Card.Title>Sign in</Card.Title>
          <Card.Description>
            create acount
          </Card.Description>
        </Card.Header>
        <Card.Content class="space-y-2">
            <div class="space-y-1">
              <Label for="{authData.authMethod}">Username</Label>
              <Input placeholder="username" id={authData.authMethod} name={authData.authMethod} type="text" autocomplete={authData.authMethod} />
            </div>
            <div class="space-y-1">
              <Label for="{authData.password}">Password</Label>
              <Input placeholder="username" id={authData.password} name={authData.password} type="password" autocomplete={authData.password} />
            </div>
          </Card.Content>
          <Card.Footer>
            <Button type="submit" class="w-full">sign in</Button>
          </Card.Footer>
        </form>
      </Card.Root>
    </Tabs.Content>
  </Tabs.Root>
</Container>

<!-- <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>
  
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action={ApiPath} method="POST" on:submit|preventDefault={validate} use:enhance>
        <div>
          <label for={authData.authMethod} class="block text-sm font-medium leading-6 text-gray-900">User name or Email</label>
          <div class="mt-2">
            <input id={authData.authMethod} name={authData.authMethod} type="text" autocomplete={authData.authMethod} bind:value={email} required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for={authData.password} class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="text-sm">
              <a href="/" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input id={authData.password} name={authData.password} type="password" autocomplete="current-password" bind:value={password} required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>
  
        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>
  
      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        <a href="/signup" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">create acount</a>
      </p>
    </div>
  </div> -->