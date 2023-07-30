import { Auth } from './auth';

const auth = new Auth();

const getTokenButton = document.getElementById('gettoken');
getTokenButton?.addEventListener('click', async () => {
  const res = await auth.acquireToken();
  if (res) {
    console.log(res);
  }
});

const signinButton = document.getElementById('signin');
signinButton?.addEventListener('click', async () => {
  const res = await auth.signin();
});