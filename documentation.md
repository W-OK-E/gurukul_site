1.Node scripts don’t automatically load .env.local (Next.js does it for you inside the app, but raw scripts don’t).

2.You need to explicitly load them with dotenv. This needed to be done for the .env.local file which contained the supabase dashboard creds

So npm install dotenv was required.

