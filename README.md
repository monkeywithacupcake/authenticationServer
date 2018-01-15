This authentication server will issue and check JWT for local signin with email and password and also existing signed in users to protect any resource beind "requireAuth" in router.
In order to user it, the directory requires a few things:
1. node_modules folder with all of the packages in package.json
2. a config.js file in the root directory that contains:
`module.exports = {
    secret: '[somethingyouputhere]'
};
`
