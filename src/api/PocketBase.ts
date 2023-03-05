import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.NEXT_PUBLIC_DATABASE_URL ?? '');
export default pb;
