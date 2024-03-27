	
<script lang="ts">
    import Sun from "svelte-radix/Sun.svelte";
    import Moon from "svelte-radix/Moon.svelte";
    import { Button } from "$lib/components/ui/button/index.js";
   
    import { toggleMode } from "mode-watcher";
  </script>
   
  <Button on:click={toggleMode} size="icon" class="bg-transparent text-forground hover:bg-transparent mx-2">
    <Sun
      class="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:text-forground/90"
    />
    <Moon
      class="absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
    <span class="sr-only">Toggle theme</span>
  </Button>
  
  