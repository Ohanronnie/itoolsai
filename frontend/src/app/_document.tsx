// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Twitter conversion tracking base code */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(e,t,n,s,u,a){
                  e.twq||(s=e.twq=function(){
                    s.exe ? s.exe.apply(s,arguments) : s.queue.push(arguments);
                  },
                  s.version='1.1',
                  s.queue=[],
                  u=t.createElement(n),
                  u.async=!0,
                  u.src='https://static.ads-twitter.com/uwt.js',
                  a=t.getElementsByTagName(n)[0],
                  a.parentNode.insertBefore(u,a))
                }(window,document,'script');
                twq('config','q1m9z');
              `,
            }}
          />
          {/* End Twitter conversion tracking base code */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
