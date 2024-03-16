<script lang="ts">
  import type { PageData } from './$types';
  import { enhance } from '$app/forms';
  export let data: PageData;

  $: ({ articles } = data);
  // export let title;
  // export let content;
  // function validate() {
  //   if (title === 'admin' && content === 'admin') {
  //     alert('Welcome admin');
  //   } else {
  //     alert('Invalid credentials');
  //   }
  // }
</script>



<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">


<ul role="list" class="divide-y divide-gray-100">
{#each articles as article (article.id)}
  <li class="flex justify-between gap-x-6 py-5">
    <div class="flex min-w-0 gap-x-4">
      <div class="min-w-0 flex-auto">
        <a href="/article/{article.id}">
          <p class="text-sm font-semibold leading-6 text-gray-900">{article.title}</p>
        </a>
        <p class="mt-1 truncate text-xs leading-5 text-gray-500">{article.content}</p>
        
      </div>
    </div>
    <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
      <form action="?/deleteArticle&id={article.id}" method="POST">
        <button type="submit" class="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700">delete</button>
      </form>
    </div>
  </li>
{/each}
  <!-- <li class="flex justify-between gap-x-6 py-5">
    <div class="flex min-w-0 gap-x-4">
      <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
      <div class="min-w-0 flex-auto">
        <p class="text-sm font-semibold leading-6 text-gray-900">Leslie Alexander</p>
        <p class="mt-1 truncate text-xs leading-5 text-gray-500">leslie.alexander@example.com</p>
      </div>
    </div>
    <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
      <p class="text-sm leading-6 text-gray-900">Co-Founder / CEO</p>
      <p class="mt-1 text-xs leading-5 text-gray-500">Last seen <time datetime="2023-01-23T13:23Z">3h ago</time></p>
    </div>
  </li> -->
</ul>

<div class="sm:mx-auto sm:w-full sm:max-w-sm">
  <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">add new article</h2>
</div>

<form class="space-y-6" action="?/createArticle" method="POST" use:enhance>
  <div>
    <label for="title" class="block text-sm font-medium leading-6 text-gray-900">title</label>
    <div class="mt-2">
      <input id="title" name="title" type="text" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
    </div>
  </div>

  <div>
    <div class="flex items-center justify-between">
      <label for="content" class="block text-sm font-medium leading-6 text-gray-900">content</label>
    </div>
    <div class="mt-2">
      <input id="content" name="content" type="text" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
    </div>
  </div>

  <div>
    <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add article</button>
  </div>
</form>

</div>
</div>