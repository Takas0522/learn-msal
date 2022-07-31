import { Auth } from './auth';

const auth = new Auth();

const button = document.getElementById('gettoken');
button?.addEventListener('click', async () => {
  const res = await auth.acquireToken();
  console.log(res.accessToken);
});