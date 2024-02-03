export const GoogleAnalytics = () =>{
    return (
        <div>
          <div dangerouslySetInnerHTML={{ __html: `
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-K9L3VEPV7R"></script>
            <script>
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
    
              gtag('config', 'G-K9L3VEPV7R');
            </script>
          ` }} />
        </div>
      );
}