import { ScrollView, StyleSheet } from 'react-native';

export default function RootHtml({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* Force inject structural styles to guarantee full screen height and dark canvas */}
        <style>{`
          html, body, #root {
            height: 100% !important;
            min-height: 100vh !important;
            background-color: #0f172a !important;
            margin: 0;
            padding: 0;
          }
        `}</style>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}