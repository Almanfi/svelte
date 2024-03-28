<script lang="ts">
    import { enhance } from '$app/forms';
    const authorizedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
</script>

<form method="post" use:enhance enctype="multipart/form-data">
    <div class="group">
      <label for="file">Upload your file</label>
      <input
        type="text"
        id="fileName"
        name="fileName"
        placeholder="File name"
        required
      />
      <input
        type="file"
        id="file"
        name="fileToUpload"
        accept={authorizedExtensions.join(',')}
        required
      />
    </div>
    <button type="submit">Submit</button>
  </form>
  
  