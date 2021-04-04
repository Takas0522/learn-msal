import { MsalAuth } from './auth';
const authClient = new MsalAuth();
authClient.login().then(res => {
  console.log(res);
});

const button = document.getElementById('gettoken');
if (button) {
  button.onclick = (event) => {
    authClient.acquireToken().then(res => {
      console.log(res);
    });
};
}