<script>
    import themeJson from '../assets/themes/themes.json'
    export default {
        name: "BackgroundImage",
        data() {
            return {
                actualTheme: 0,
            };
        },
        methods: {
            returnThemePath(selectedTheme) {
                console.log("../assets/images/theme/" + themeJson.themeList[selectedTheme])
                return  "../assets/images/theme/" + themeJson.themeList[selectedTheme];
            }
        },
        beforeCreate() {
            let theme_data = localStorage.getItem("actualTheme");
            if (theme_data === null) {return;}
            actualTheme = theme_data;
        },
    }

</script>

<template>
    <div class="background-image" ></div>
</template>

<style>
    .background-image {
        
        background-size: contain;
        width: 100%;
        height: 100%;
        position: absolute;
    }
</style>
