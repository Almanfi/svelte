<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData

    let article;

    const fetchArticle = async () => {
        if (data && data.article) {
            article = await data.article;
        }
    }

    fetchArticle();

    console.log(data);
    console.log(article);
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
  
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">editing article</h2>
        </div>

        {#if article}
        
        <form class="space-y-6" action="?/updateArticle" method="POST">
            <div>
            <label for="title" class="block text-sm font-medium leading-6 text-gray-900">title</label>
            <div class="mt-2">
                <input id="title" name="title" type="text" value={article.title} required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
            </div>
        
            <div>
            <div class="flex items-center justify-between">
                <label for="content" class="block text-sm font-medium leading-6 text-gray-900">content</label>
            </div>
            <div class="mt-2">
                <input id="content" name="content" type="text" value={article.content} required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
            </div>
        
            <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">update article</button>
            </div>
        </form>

        {/if}
  
  </div>
  </div>