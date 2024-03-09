<script>
        import "../app.css";
        import Navbar from "$lib/navbar.svelte";
        let navIteams = [
            {name: "Home", href: "/"},
            {name: "User", href: "/user"}
        ];
</script>

<Navbar {navIteams} />

<slot></slot>