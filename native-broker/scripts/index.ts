import { Auth } from './auth';

const auth = new Auth();

const button = document.getElementById('gettoken');
button?.addEventListener('click', async () => {
  const res = await auth.acquireToken();
  if (res) {
    console.log(res.accessToken);
  }
});