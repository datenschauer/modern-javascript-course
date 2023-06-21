export function login() {
    return async function (req, res) {
        const { email, password } = req.body;
        console.log(email, password);
        if (email) {
            res.redirect("/");
        }
    }
}