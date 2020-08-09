import { Auth } from './auth';
const authClient = new Auth();
authClient.loginRedirect();

const button = document.getElementById('gettoken');
if (button) {
    button.onclick = (event) => {
        authClient.acquireToken().then(res => {
            console.log(res);
        });
    };
}
